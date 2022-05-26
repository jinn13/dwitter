import React from "react";
import NewItem from "./NewItem";

const ItemList = (props) => {
  return (
    <ul style={{ "padding-inline-start": "0px" }}>
      {/* <NewItem key="1" name={props.name} age={props.age}></NewItem> */}
      {props.items.map((expense) => (
        <NewItem
          key={expense.id}
          id={expense.id}
          name={expense.name}
          age={expense.age}
          onDelete={props.onDeleteItem}
        />
      ))}
    </ul>
  );
};

export default ItemList;
