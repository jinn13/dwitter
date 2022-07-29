import { dbService, storageService } from "fbase";
import { React, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const DweetFactory = ({ userObj }) => {
  const [dweet, setDweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    if (dweet === "") {
      return;
    }
    // const attachmentRef = storageService
    //   .ref()
    //   .child(`${userObj.uid}/${uuidv4()}`);
    // const response = await attachmentRef.putString(attachment, "data_url");

    let attachmentUrl = "";
    if (attachment !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(fileRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(response.ref);
    }

    await dbService.collection("dweets").add({
      text: dweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    });
    setDweet("");
    setAttachment("");
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setDweet(value);
  };

  const onFileChange = (event) => {
    // console.log(event.target.files);
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      // console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment("");

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={dweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        {/* <input type="submit" value="Dweet" /> */}
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{ opacity: 0 }}
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <img src={attachment} style={{ backgroundImage: attachment }} />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
            {/* <button onClick={onClearAttachment}>Clear</button> */}
          </div>
        </div>
      )}
    </form>
  );
};

export default DweetFactory;
