import { motion } from "framer-motion";

import { useState } from "react";
import Modal from "../Modal/Modal";
import "./MenuList.css";
const MenuList = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [type, setType] = useState("");
  const close = () => {
    setModalOpen(false);
  };
  const open = () => setModalOpen(true);
  return (
    <main className="main">
      {modalOpen && <Modal type={type} handleClose={close}></Modal>}
      <motion.div
        onClick={() => {
          setType("DailyMenu");
          open();
        }}
        whileHover={{ cursor: "pointer", scale: 1 }}
        whileTap={{ scale: 0.8 }}
        className="button"
      >
        DailyMenu
      </motion.div>
      <motion.div
        onClick={() => {
          setType("WeeklyMenu");
          open();
        }}
        whileHover={{ cursor: "pointer", scale: 1 }}
        whileTap={{ scale: 0.8 }}
        className="button"
      >
        WeeklyMenu
      </motion.div>
      <motion.div
        onClick={() => {
          setType("MonthlyMenu");
          open();
        }}
        whileHover={{ cursor: "pointer", scale: 1 }}
        whileTap={{ scale: 0.8 }}
        className="button"
      >
        MonthlyMenu
      </motion.div>
    </main>
  );
};
export default MenuList;
