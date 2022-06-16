import React from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import classes from "./Home.module.css";

const Home = (props) => {
  return (
    <Card className={classes.home}>
      <h1>어서오세요. Welcome back!</h1>
      <Button onClick={props.onLogout}>로그아웃</Button>
    </Card>
  );
};

export default Home;
