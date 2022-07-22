import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedin, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  // setInterval(() => console.log(authService.currentUser), 2000);
  // console.log(authService.currentUser);
  return (
    <>
      {init ? <AppRouter isLoggedin={isLoggedin} /> : "initializing..."}
      <footer>&copy; {new Date().getFullYear()} Dwitter</footer>
    </>
  );
}

export default App;
