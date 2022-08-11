import axios from "axios";
import React, {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RoomReq from "../context/RoomReq";

const GuessLocation = () => {
  const loc = useLocation();
  const navigate = useNavigate();
  const { headers } = RoomReq();
  const [search, setSearch] = useState("")
  const [filtered, setFiltered] = useState([]);

  const baseUrl = process.env.REACT_APP_BASE_URL;

  let locations = loc.state.locations
  
  useEffect(() => {
      const result = locations.filter((item) => {
        return (
          item.toLowerCase().match(search.toLowerCase())
        );
      });
      setFiltered(result);
    
  }, [search]);

  const onSubmit = (location) => {
    axios.post(`${baseUrl}/room/spy/${location}`, {}, { headers }).then((response) => {
      if (response.status == 200 && response.response == true) {
          navigate("/spyWin");
      }
      else {
        navigate("/spyLose");
      }
    })
  };
  return (
    <>
      <div className="full-screen bg-home">
        <div className="loc" >
        <h3>The Location is</h3>
        <input
                type="text"
                placeholder="Search here"
                className="w-90 form-control"
                style={{  height: "35px", width:"330px" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
        </div>
        <div className="places-list">
          {filtered.map((item) => (
            <button className="location-btn" value={item} type="button" onClick={(e)=> onSubmit(e.target.value)}>
              {item}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default GuessLocation;
