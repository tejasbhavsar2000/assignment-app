import { motion } from "framer-motion";
import Backdrop from "../Backdrop/Backdrop";
import "./RecipeDetail.css";
const RecipeDetail = ({ name, image, procedure, handleClose }) => {
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

  return (
    <Backdrop>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="detail"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1>{name}</h1>
        <div className="image">
          <img src={image} alt="image" />
        </div>
        <h3>Procedure</h3>
        <ul>
          {procedure.split("\n").map((item) => {
            return <li>{item}</li>;
          })}
        </ul>
        <button onClick={handleClose}>Close</button>
      </motion.div>
    </Backdrop>
  );
};

export default RecipeDetail;
