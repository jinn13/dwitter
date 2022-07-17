import { React, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

// const AppRouter = () = {
//     const [isLoggedIn, SetIsLoggedIn] = useState(false);

//     return(
//         <Router>
//         <Switch>
//         {isLoggedIn ? (
//             <Route exact path="/">
//             <Home />
//             </Route>
//         ):(<Route exact path = "/">
//             <Auth />
//         </Route>
//         )}
//         </Switch>
//         </Router>
//     );
// };

export default function AppRouter() {
  const [isLoggedIn, SetIsLoggedIn] = useState(true);

  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </Router>

    // <Routes>
    //   <Route path="/" />
    // </Routes>
  );
}
