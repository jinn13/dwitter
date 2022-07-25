import { async } from "@firebase/util";
import { dbService, storageService } from "fbase";
import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";

const Dweet = ({ dweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newDweet, setNewDweet] = useState(dweetObj.text);
  const urlRef = ref(storageService, dweetObj.attachmentUrl);

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    // console.log(ok);

    if (ok) {
      // console.log(dweetObj.id);
      await dbService.doc(`dweets/${dweetObj.id}`).delete();
      // console.log(data);
      if (dweetObj.attachmentUrl !== "") await deleteObject(urlRef);
      // await storageService.refFromURL(dweetObj.attachmentUrl).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDweet(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    // console.log(dweetObj.id, newDweet);
    await dbService.doc(`dweets/${dweetObj.id}`).update({ text: newDweet });
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input onChange={onChange} value={newDweet} required />
            <input type="submit" value="Update Dweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{dweetObj.text}</h4>
          {dweetObj.attachmentUrl && (
            <img src={dweetObj.attachmentUrl} width="50px" height="50px" />
          )}

          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Dweet</button>
              <button onClick={toggleEditing}>Edit Dweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dweet;
