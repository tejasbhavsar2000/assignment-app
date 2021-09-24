import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import "./Modal.css";
const Modal = ({ type, handleClose }) => {
  const [menu, setMenu] = useState([]);
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
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios.get(`http://localhost:9002/${type}`).then((res) => {
      setMenu(res.data);
    });
  };
  return (
    <Backdrop>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div class="wrapper">
          <h1>{type}</h1>
          <h2>Breakfast</h2>
          <hr />
          <ul class="">
            {menu[0] &&
              menu[0].Breakfast.map((item) => {
                return (
                  <li class="el-item">
                    <div class="flex-grid" uk-grid="">
                      <div class="width-expand">
                        <span class="leader">
                          <span
                            class="leader-fill"
                            data-fill="....................................................................................................................................................................................................................................................................................."
                          >
                            {item.name}
                          </span>
                        </span>
                      </div>
                      <div class="width-auto">
                        <div class="price">5.80</div>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
          <h2>Lunch</h2>
          <hr />
          <ul class="">
            {menu[0] &&
              menu[0].Lunch.map((item) => {
                return (
                  <li class="el-item">
                    <div class="flex-grid" uk-grid="">
                      <div class="width-expand">
                        <span class="leader">
                          <span
                            class="leader-fill"
                            data-fill="....................................................................................................................................................................................................................................................................................."
                          >
                            {item.name}
                          </span>
                        </span>
                      </div>
                      <div class="width-auto">
                        <div class="price">5.80</div>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
          <h2>Dinner</h2>
          <hr />
          <ul class="">
            {menu[0] &&
              menu[0].Dinner.map((item) => {
                return (
                  <li class="el-item">
                    <div class="flex-grid" uk-grid="">
                      <div class="width-expand">
                        <span class="leader">
                          <span
                            class="leader-fill"
                            data-fill="....................................................................................................................................................................................................................................................................................."
                          >
                            {item.name}
                          </span>
                        </span>
                      </div>
                      <div class="width-auto">
                        <div class="price">5.80</div>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>

        <button onClick={handleClose}>Close</button>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
