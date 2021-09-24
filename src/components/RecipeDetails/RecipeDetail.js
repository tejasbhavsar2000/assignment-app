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
        <div className="recipe-card">
          <img
            src={image}
            style={{
              height: "15rem",
              borderRadius: "0",
              backgroundSize: "cover",
              width: "100%",
            }}
            alt="Cover"
          ></img>
          <div className="recipe-card__body">
            <h1 className="recipe-card__heading">{name}</h1>

            <ul className="recipe-card__nav">
              <li>
                <h3 className="active">Method</h3>
              </li>
            </ul>

            <ul className="recipe-card__ingredients">
              {procedure.split("\n").map((item) => {
                return <li>{item}</li>;
              })}
            </ul>
          </div>
        </div>

        <button onClick={handleClose}>Close</button>
      </motion.div>
    </Backdrop>
  );
};

export default RecipeDetail;
