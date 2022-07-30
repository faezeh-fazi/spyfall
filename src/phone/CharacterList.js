import React,{useState} from 'react'
import "../style/rounds.css";
import character1 from "../assets/avatars/c1.png";
import character2 from "../assets/avatars/c2.png";
import character3 from "../assets/avatars/c3.png";
import character4 from "../assets/avatars/c4.png";
import character5 from "../assets/avatars/c5.png";
import character6 from "../assets/avatars/c6.png";
import character7 from "../assets/avatars/c7.png";
import character8 from "../assets/avatars/c8.png";
import character9 from "../assets/avatars/c9.png";
import character10 from "../assets/avatars/c10.png";
import character11 from "../assets/avatars/c11.png";
import character12 from "../assets/avatars/c12.png";
import { useNavigate } from 'react-router-dom';


const CharacterList = () => {
    const [isVip, setIsVip] = useState(true)
    const navigate= useNavigate();


    const onSubmit = (data) => {
      console.log(data)
      navigate('/startpage')
      
    }
  

    return (
        <>
         <div className="full-screen bg-home">
        <div className='avatar-container'>
            <h5>Select Your Character</h5>
            <div className='avatar-images'>
        <img src={character1} alt="avatar" />
        <img src={character2} alt="avatar" />
        <img src={character3} alt="avatar" />
        <img src={character4} alt="avatar" />
        <img src={character5} alt="avatar" />
        <img src={character6} alt="avatar" />
        <img src={character7} alt="avatar" />
        <img src={character8} alt="avatar" />
        <img src={character9} alt="avatar" />
        <img src={character10} alt="avatar" />
        <img src={character11} alt="avatar" />
        <img src={character12} alt="avatar" />
        </div>
        {!isVip ? 
        <>
        <h7>Wait for other players</h7>
        <br/>
        </>
        :
        <button className="vip-start-btn" onClick={onSubmit} type="button">
            everyone is in
          </button>
}
        </div>
   
        </div>
        </>
    )
}

export default CharacterList
