import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

const Login = ({ setLoginUser }) => {
  const history = useHistory();
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
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    axios.post("http://localhost:9002/login", user).then((res) => {
      alert(res.data.message);
      setLoginUser(res.data.user);
      history.push("/");
    });
  };

  return (
    <motion.form
      className="login"
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h1>Login</h1>
      <input
        required
        type="text"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Enter your Email"
      ></input>
      <input
        required
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Enter your Password"
      ></input>
      <motion.div
        whileHover={{ cursor: "pointer", scale: 1 }}
        whileTap={{ scale: 0.8 }}
        type="submit"
        onClick={login}
        className="button"
      >
        Login
      </motion.div>

      <div>or</div>
      <motion.div
        whileHover={{ cursor: "pointer", scale: 1 }}
        whileTap={{ scale: 0.8 }}
        className="button"
        onClick={() => history.push("/register")}
      >
        Register
      </motion.div>
    </motion.form>
  );
};

export default Login;
