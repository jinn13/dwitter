import React from "react";
import "../UI/Card.css";

const NewItem = (props) => {
  const deleteHandler = () => {
    console.log("여기는 아이템 : " + props.id);
    props.onDelete(props.id);
  };

  return (
    <div
      className="item"
      onClick={deleteHandler}
      //   style={{ backgroundColor: "pink", width: "50%", margin: "auto" }}
    >
      <p style={{ fontWeight: "bold" }}>
        {props.name} <span>({props.age} years old)</span>
      </p>
    </div>
  );
};

export default NewItem;
