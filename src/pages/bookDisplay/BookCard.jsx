import { useState } from "react";
import "./Book.scss";

import { db } from "../../Firebase-config";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { useLongPress } from "use-long-press";

export default function BookCard(props) {
  // update Availability
  const updateAvailability = async (id) => {
    if (!props.available) {
      const userDoc = doc(db, "books", id);
      const newField = { is_avalible: !props.available, out_name: "" };
      await updateDoc(userDoc, newField);
    } else {
      const getName = window.prompt("Enter Name of Byers");

      if (getName != null) {
        const userDoc = doc(db, "books", id);
        const newField = { is_avalible: !props.available, out_name: getName };
        await updateDoc(userDoc, newField);
      }
    }

    props.trigger(!props.triggerSupport);
  };

  // delete with long press
  const cardId = props.uniqueId;

  const pressDelete = async (id) => {
    await deleteDoc(doc(db, "books", id));
    props.trigger(!props.triggerSupport);
  };

  const bind = useLongPress(() => {
    if (props.available === true) {
      let confirm = window.prompt("Enter 'Y' and confirm delete.");
      if (confirm.toLowerCase() === "y") {
        pressDelete(cardId);
      }
    } else {
      window.alert("You can't delete OUT book");
    }
  });

  return (
    <>
      <div className="main5">
        <div className="information" {...bind()}>
          <h1>{props.bookName}</h1>
          <hr className="hr" />
          <h2>ID : {props.bookId}</h2>
          <p style={{ padding: "3px 0" }}>Author : {props.authnr}</p>
          <p style={{ padding: "3px 0" }}>Category : {props.category}</p>
          {props.outName ? (
            <p
              style={{
                color: "#fff",
                background: "rgba(0,0,0,0.5)",
                padding: "2px 3px",
                borderRadius: "5px",
                margin: "2px 0",
              }}
            >
              {" "}
              {props.outName}
            </p>
          ) : null}
        </div>
        <div className="contrailBtn">
          <button
            style={!props.available ? { backgroundColor: "red" } : {}}
            onClick={() => {
              updateAvailability(props.uniqueId);
            }}
          ></button>
        </div>
      </div>
    </>
  );
}
