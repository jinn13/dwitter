import React, { useContext } from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import classes from "./Home.module.css";
import AuthContext from "../../store/auth-context";

const Home = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Card className={classes.home}>
      <h1>어서오세요. Welcome back!</h1>
      <Button onClick={authCtx.onLogout}>로그아웃</Button>
    </Card>
  );
};

export default Home;
