import { dbService } from "fbase";
import { React, useState, useEffect } from "react";
import Dweet from "components/Dweet";

const Home = ({ userObj }) => {
  // console.log(userObj);
  const [dweet, setDweet] = useState("");
  const [dweets, setDweets] = useState([]);

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
        <input type="submit" value="Dweet" />
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
