import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from "../Navbar/Nav";
import RecipeCard from "../RecipeCard/RecipeCard";
import "./MyRecipes.css";

const MyRecipes = ({ user, setLoginUser }) => {
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    const url = `http://localhost:9002/MyRecipes/${user._id}`;

    axios.get(url).then((res) => {
      setAllRecipes(res.data);
    });
  };
  const [allRecipes, setAllRecipes] = useState([]);
  return (
    <div className="MyRecipes">
      <Nav user={user} getData={getData} setLoginUser={setLoginUser} />
      <div className="private">
        <h1>My Recipes</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          {allRecipes.map((item) => {
            return (
              <RecipeCard
                getData={getData}
                key={item.name}
                type="private"
                name={item.name}
                _id={item._id}
                isPublic={item.isPublic}
                mealType={item.mealType}
                procedure={item.procedure}
                userid={item.userid}
                image={item.image}
              ></RecipeCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyRecipes;
