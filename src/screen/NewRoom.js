import React from "react";
import "../style/room.css";
import character1 from "../assets/avatars/c1.png";
import character2 from "../assets/avatars/c2.png";
import character3 from "../assets/avatars/c3.png";
import character4 from "../assets/avatars/c4.png";

const NewRoom = () => {
  return (
    <>
      <div className="full-screen bg-home">
        <div className="room-code">
          <h3>Room code</h3>
          <h2>QTGYU</h2>
        </div>

        <section className="avatars">
          <div className="memebers">
            <img src={character1} alt="avatar" />
            <h3>hossein</h3>
          </div>
          <div className="memebers">
            <img src={character2} alt="avatar" />
            <h3>hamid</h3>
          </div>
          <div className="memebers">
            <img src={character3} alt="avatar" />
            <h3>ahmad</h3>
          </div>
          <div className="memebers">
            <img src={character4} alt="avatar" />
            <h3>amir</h3>
          </div>
        </section>
      </div>
    </>
  );
};

export default NewRoom;
