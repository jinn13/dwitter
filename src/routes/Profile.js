import { authService, dbService } from "fbase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  QuerySnapshot,
} from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { React, useEffect, useState } from "react";
import Dweet from "components/Dweet";

//1. 로그인한 유저 정보 prop으로 받기
const Profile = ({ userObj, refreshUser }) => {
  const [dweets, setDweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const navigate = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  // 프로필 네임 따로 설정하기
  const onSubmit = async (event) => {
    event.preventDefault();
    const auth = getAuth();

    if (userObj.displayName !== newDisplayName) {
      // await userObj.updateProfile({ displayName: newDisplayName });
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName,
      })
        .then(() => {
          // Profile updated!
          // ...
        })
        .catch((error) => {
          // An error occurred
          // ...
        });
      refreshUser();
    }
  };

  //2. 내 dweets 얻는 function 생성
  const getMyDweets = async () => {
    //3. 트윗 불러오기
    //3-1. dbService의 컬렉션 중 "dweets" Docs에서 userObj의 uid와 동일한 creatorID를 가진 모든 문서를 내림차순으로 가져오는 쿼리(요청) 생성
    const q = query(
      collection(dbService, "dweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "asc")
    );

    //3-2. getDocs()메서드로 쿼리 결과 값 가져오기
    const querySnapshot = await getDocs(q);
    const newArray = querySnapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));
    setDweets(newArray);
  };

  useEffect(() => {
    getMyDweets();
  }, []);

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{ marginTop: 10 }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
      <br />
      <br />

      <div>
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

export default Profile;
