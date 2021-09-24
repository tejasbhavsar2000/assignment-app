import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import "./AddRecipe.css";
const AddRecipe = ({ User, handleClose }) => {
  const [recipe, setRecipe] = useState({
    userid: User._id,
    image: "",
    name: "",
    procedure: "",
    isPublic: true,
    mealType: "Breakfast",
  });
  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({
      ...recipe,
      [name]: value,
    });
  };
  const add = () => {
    axios.post("http://localhost:9002/addRecipe", recipe).then((res) => {
      alert(res.data.message);

      handleClose();
    });
  };
  return (
    <Backdrop>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="recipe"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1>Add Recipe</h1>
        <input
          required
          type="text"
          name="name"
          value={recipe.name}
          onChange={handleChange}
          placeholder="Name of Recipe"
        ></input>
        <input
          type="text"
          name="image"
          value={recipe.image}
          onChange={handleChange}
          placeholder="Recipe Image url"
        ></input>
        <textarea
          required
          type="text"
          rows="auto"
          name="procedure"
          value={recipe.procedure}
          onChange={handleChange}
          placeholder="Procedure"
        ></textarea>
        <label>
          Type:{" "}
          <select
            name="mealType"
            onChange={handleChange}
            placeholder="Select Type of Meal"
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </label>
        <label>
          Status:{" "}
          <select
            onChange={(e) => {
              setRecipe({
                ...recipe,
                isPublic: e.target.value === "private" ? false : true,
              });
            }}
            name="isPublic"
            placeholder="Select Type of Meal"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </label>
        <motion.button
          whileHover={{ cursor: "pointer", scale: 1 }}
          whileTap={{ scale: 0.8 }}
          onClick={add}
        >
          Submit
        </motion.button>
        <motion.button
          whileHover={{ cursor: "pointer", scale: 1 }}
          whileTap={{ scale: 0.8 }}
          onClick={handleClose}
        >
          Close
        </motion.button>
      </motion.div>
    </Backdrop>
  );
};

export default AddRecipe;
