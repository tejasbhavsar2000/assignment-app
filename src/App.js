import "./App.css";
import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";
import Register from "./components/register/register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import MyRecipes from "./components/MyRecipes/MyRecipes";
import MenuList from "./components/MenuList/MenuList";

function App() {
  const [user, setLoginUser] = useState({});

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {user && user._id ? (
              <Homepage user={user} setLoginUser={setLoginUser} />
            ) : (
              <Login setLoginUser={setLoginUser} />
            )}
          </Route>

          <Route path="/login">
            <Login setLoginUser={setLoginUser} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route exact path="/MyRecipes">
            {user && user._id ? (
              <MyRecipes user={user} setLoginUser={setLoginUser} />
            ) : (
              <Login setLoginUser={setLoginUser} />
            )}
          </Route>
          <Route exact path="/Menu">
            {user && user._id ? (
              <MenuList />
            ) : (
              <Login setLoginUser={setLoginUser} />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
