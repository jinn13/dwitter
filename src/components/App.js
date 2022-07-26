import { useEffect, useState } from "react";
import AppRouter from "components/Router";
// import { authService } from "fbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { authService } from "fbase";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // setIsLoggedIn(true);
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        // setIsLoggedIn(false);
        setUserObj(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    // setUserObj(authService.currentUser);
    const user = authService.currentUser;
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
          // ↓ userObj의 여부로 true,false 설정 시 로그아웃이 제대로 안됨. 추후 확인 예정
          // 확인해보니 setUserObj(false)를 설정하니 해결되었음.
          isLoggedIn={Boolean(userObj)}
          // isLoggedIn={isLoggedIn}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "initializing..."
      )}
      {/* <footer>&copy; {new Date().getFullYear()} Dwitter</footer> */}
    </>
  );
}

export default App;
