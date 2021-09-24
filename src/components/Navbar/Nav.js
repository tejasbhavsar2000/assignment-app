import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useHistory } from "react-router";
import AddRecipe from "../AddRecipe/AddRecipe";

import "./Nav.css";
const Nav = ({ getData, user, setLoginUser }) => {
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const close = () => {
    getData();
    setModalOpen(false);
  };

  const open = () => setModalOpen(true);
  return (
    <nav className="nav">
      <AnimatePresence exitBeforeEnter={true}>
        {modalOpen && <AddRecipe User={user} handleClose={close}></AddRecipe>}
      </AnimatePresence>
      <div>
        <div onClick={() => history.push("/")}>Homepage</div>
      </div>
      <div className="topnav">
        <motion.button
          whileHover={{ cursor: "pointer", scale: 1 }}
          whileTap={{ scale: 0.8 }}
          className="button"
          onClick={() => history.push("/MyRecipes")}
        >
          My Recipes
        </motion.button>
        <motion.button
          whileHover={{ cursor: "pointer", scale: 1 }}
          whileTap={{ scale: 0.8 }}
          className="button"
          onClick={() => history.push("/Menu")}
        >
          Menu
        </motion.button>
        <motion.button
          whileHover={{ cursor: "pointer", scale: 1 }}
          whileTap={{ scale: 0.8 }}
          className="button"
          onClick={open}
        >
          Add
        </motion.button>
        <motion.button
          whileHover={{ cursor: "pointer", scale: 1 }}
          whileTap={{ scale: 0.8 }}
          className="button"
          onClick={() => setLoginUser({})}
        >
          Logout
        </motion.button>
      </div>
    </nav>
  );
};
export default Nav;
