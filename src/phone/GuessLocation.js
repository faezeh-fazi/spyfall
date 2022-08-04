import React from "react";

const GuessLocation = () => {
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

  return (
    <>
      <div className="full-screen bg-home">
        <div className="places-list">
          <h3>The Location is</h3>
          {items.map((item) => (
            <button className="location-btn" type="button">
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default GuessLocation;
