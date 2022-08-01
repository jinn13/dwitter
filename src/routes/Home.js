import { dbService } from "fbase";
import { React, useState, useEffect } from "react";
import Dweet from "components/Dweet";
import DweetFactory from "components/DweetFactory";

const Home = ({ userObj }) => {
  // console.log(userObj);
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
    dbService
      .collection("dweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const newArray = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));
        setDweets(newArray);
      });
  }, []);

  // console.log(dweets);

  return (
    <div className="container">
      <DweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {dweets.map((dweet) => (
          <Dweet
            key={dweet.id}
            dweetObj={dweet}
            isOwner={dweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
