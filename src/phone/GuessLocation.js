import axios from "axios";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import RoomReq from "../context/RoomReq";

const GuessLocation = () => {
  const navigate = useNavigate();
  const { headers } = RoomReq();
  const [search, setSearch] = useState("")
  const [filtered, setFiltered] = useState([]);

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const items = [
    {
      name: "Airplane",
      id: "airplane",
    },
    {
      name: "Bank",
      id: "bank",
    },
    {
      name: "Beach",
      id: "beach",
    },
    {
      name: "Casino",
      id: "casino",
    },
    {
      name: "Club",
      id: "club",
    },
    {
      name: "Hotel",
      id: "hotel",
    },
    {
      name: "Cinema",
      id: "cinema",
    },
    {
      name: "Hospital",
      id: "hospital",
    },
    {
      name: "Restaurant",
      id: "restaurant",
    },
    {
      name: "School",
      id: "school",
    },
    {
      name: "Supermarket",
      id: "supermarket",
    },
    {
      name: "Zoo",
      id: "zoo",
    },
    {
      name: "Library",
      id: "library",
    },
    {
      name: "Museum",
      id: "museum",
    },
    {
      name: "Embassy",
      id: "embassy",
    },
    {
      name: "Jail",
      id: "jail",
    },
    {
      name: "Cemetery",
      id: "cemetery",
    },
  ];
  useEffect(() => {
    const result = items.filter((item) => {
      return (
        item.name.toLowerCase().match(search.toLowerCase())
      );
    });
    setFiltered(result);
  }, [search]);
  const onSubmit = (location) => {
    axios.post(`${baseUrl}/room/spy/${location}`, {}, { headers }).then((response) => {
      if (response.status == 200) {
        console.log(response.data)
          navigate("/vote");
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
                style={{  height: "35px", width:"350px" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
        </div>
        <div className="places-list">
          {filtered.map((item) => (
            <button className="location-btn" value={item.name} type="button" onClick={(e)=> onSubmit(e.target.value)}>
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default GuessLocation;
