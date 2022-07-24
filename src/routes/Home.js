import { dbService } from "fbase";
import { React, useState, useEffect } from "react";
import Dweet from "components/Dweet";

const Home = ({ userObj }) => {
  // console.log(userObj);
  const [dweet, setDweet] = useState("");
  const [dweets, setDweets] = useState([]);
  const [attachment, setAttachment] = useState("");

  // const getDweets = async () => {
  //   const dbDweets = await dbService.collection("dweets").get();
  //   // console.log(dbDweets);
  //   dbDweets.forEach((document) => {
  //     const dweetObject = { ...document.data(), id: document.id };
  //     setDweets((prev) => [dweetObject, ...prev]);
  //   });
  // };

  useEffect(() => {
    // getDweets();
    dbService.collection("dweets").onSnapshot((snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setDweets(newArray);
    });
  }, []);

  // console.log(dweets);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("dweets").add({
      text: dweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setDweet("");
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setDweet(value);
  };

  const onFileChange = (event) => {
    // console.log(event.target.files);
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      // console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment("");

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={dweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Dweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {dweets.map((dweet) => (
          <Dweet
            key={dweet.id}
            dweetObj={dweet}
            isOwner={dweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
