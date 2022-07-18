import { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  console.log(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedin={isLoggedin} />
      <footer>&copy; {new Date().getFullYear()} Dwitter</footer>
    </>
  );
}

export default App;
