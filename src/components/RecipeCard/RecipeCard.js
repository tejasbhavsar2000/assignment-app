import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import RecipeDetail from "../RecipeDetails/RecipeDetail";
import UpdateRecipe from "../UpdateRecipe/UpdateRecipe";
import "./RecipeCard.css";
const RecipeCard = ({
  _id,
  mealType,
  name,
  getData,
  image,
  userid,
  procedure,
  type,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const close = () => {
    setModalOpen(false);
  };
  const open = () => setModalOpen(true);

  return (
    <div className="card" onClick={open}>
      <AnimatePresence exitBeforeEnter={true}>
        {modalOpen &&
          (type === "public" ? (
            <RecipeDetail
              name={name}
              image={image}
              userid={userid}
              procedure={procedure}
              handleClose={close}
            ></RecipeDetail>
          ) : (
            <UpdateRecipe
              getdata={getData}
              _id={_id}
              mealType={mealType}
              name={name}
              image={image}
              userid={userid}
              procedure={procedure}
              handleClose={close}
            />
          ))}
      </AnimatePresence>
      <div className="img">
        <img src={image} alt="image" />
      </div>
      <h3>{name}</h3>
    </div>
  );
};
export default RecipeCard;
