// import { React, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";

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

export default function AppRouter({ isLoggedIn }) {
  // const [isLoggedIn, SetIsLoggedIn] = useState(false);

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
  );
}
