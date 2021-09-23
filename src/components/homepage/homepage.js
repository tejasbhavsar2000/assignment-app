import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from "../Navbar/Nav";
import RecipeCard from "../RecipeCard/RecipeCard";
import "./homepage.css";

const Homepage = ({ user, setLoginUser }) => {
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios.get("http://localhost:9002/allRecipes").then((res) => {
      console.log(res.data);
      setAllRecipes(res.data);
    });
  };
  const [allRecipes, setAllRecipes] = useState([]);
  return (
    <div className="homepage">
      <Nav user={user} getData={getData} setLoginUser={setLoginUser} />
      <div className="public">
        <h1>Public Recipes</h1>
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
                type="public"
                key={item.name}
                name={item.name}
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

export default Homepage;
