import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cron from "node-cron";
import _ from "underscore";
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
const uri = `mongodb+srv://recipesapp:recipe@cluster0.o6c0m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log(" Mongoose is connected");
    }
  );
} catch (e) {
  console.log("could not connect");
}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const menuSchema = new mongoose.Schema({
  Breakfast: Array,
  Lunch: Array,
  Dinner: Array,
});

const recipeSchema = new mongoose.Schema({
  userid: String,
  image: String,
  isPublic: Boolean,
  mealType: String,
  name: String,
  procedure: String,
});

const User = new mongoose.model("User", userSchema);
const Recipe = new mongoose.model("Recipes", recipeSchema);
const DailyMenu = new mongoose.model("DailyMenu", menuSchema);
const WeeklyMenu = new mongoose.model("WeeklyMenu", menuSchema);
const MonthlyMenu = new mongoose.model("MonthlyMenu", menuSchema);

//Routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) return res.send("error");
        if (!result)
          return res.send({ message: "Username or Password didn't match" });

        res.send({ message: "Login Successfull", user: user });
      });
    } else {
      res.send({ message: "User not registered" });
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User already registerd" });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        const user = new User({
          name,
          email,
          password: hash,
        });
        user.save((err) => {
          if (err) {
            res.send(err);
          } else {
            res.send({ message: "Successfully Registered, Please login now." });
          }
        });
      });
    }
  });
});

app.post("/addRecipe", (req, res) => {
  const { userid, image, name, procedure, isPublic, mealType } = req.body;
  User.findOne({ userid: userid }, (err, user) => {
    if (user) {
      const recipe = new Recipe({
        userid,
        image,
        name,
        procedure,
        isPublic,
        mealType,
      });
      if ((!name, !procedure)) {
        res.send({ message: "Fill All Details" });
      } else {
        recipe.save((err) => {
          if (err) {
            res.send(err);
          } else {
            res.send({ message: "Successfully Added" });
          }
        });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
});
app.get("/allRecipes", (req, res) => {
  Recipe.find({ isPublic: true }, (err, docs) => {
    if (docs) res.send(docs);
  });
});

app.get("/MyRecipes/:id", (req, res) => {
  Recipe.find({ userid: req.params.id }, (err, docs) => {
    if (docs) res.send(docs);
  });
});
app.get("/DailyMenu", (req, res) => {
  DailyMenu.find({}, (err, docs) => {
    if (docs) res.send(docs);
  });
});
app.get("/WeeklyMenu", (req, res) => {
  WeeklyMenu.find({}, (err, docs) => {
    if (docs) res.send(docs);
  });
});
app.get("/MonthlyMenu", (req, res) => {
  MonthlyMenu.find({}, (err, docs) => {
    if (docs) res.send(docs);
  });
});

app.put("/UpdateRecipes/:id", (req, res) => {
  Recipe.findByIdAndUpdate(
    req.params.id,
    {
      image: req.body.image,
      isPublic: req.body.isPublic,
      mealType: req.body.mealType,
      name: req.body.name,
      procedure: req.body.procedure,
    },
    { new: true }
  ).then((recipe) => {
    if (!recipe) {
      return res.status(404).send({
        message: "No recipe",
      });
    }
    res.send({ message: "Recipe Updated" });
  });
});

app.delete("/DeleteRecipe/:id", (req, res) => {
  Recipe.deleteOne({ _id: req.params.id })
    .then(function () {
      res.send({ message: "Deleted Successfully" }); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
});

// These are cron jobs which will be trigered daily, Montly, Weekly
// cron.schedule("0 0 1 * *", function () {
//   let menu = {};
//   console.log("running a task every month");
//   MonthlyMenu.deleteMany({}).then(
//     Recipe.find({ mealType: "Breakfast" }, (err, docs) => {
//       if (docs) {
//         menu["Breakfast"] = _.shuffle(docs).slice(0, 5);
//         Recipe.find({ mealType: "Lunch" }, (err, docs) => {
//           if (docs) {
//             menu["Lunch"] = _.shuffle(docs).slice(0, 5);
//             Recipe.find({ mealType: "Dinner" }, (err, docs) => {
//               if (docs) {
//                 menu["Dinner"] = _.shuffle(docs).slice(0, 5);
//                 const daily = new MonthlyMenu({
//                   Breakfast: menu.Breakfast,
//                   Lunch: menu.Lunch,
//                   Dinner: menu.Dinner,
//                 });

//                 daily.save((err) => {
//                   if (err) {
//                     console.log(err);
//                   } else {
//                     console.log("Successfully Added");
//                   }
//                 });
//               }
//             });
//           }
//         });
//       }
//     })
//   );
// });
// cron.schedule("0 0 0 * * *", function () {
//   let menu = {};
//   console.log("will run every day at 12:00 AM");
//   DailyMenu.deleteMany({}).then(
//     Recipe.find({ mealType: "Breakfast" }, (err, docs) => {
//       if (docs) {
//         menu["Breakfast"] = _.shuffle(docs).slice(0, 5);
//         Recipe.find({ mealType: "Lunch" }, (err, docs) => {
//           if (docs) {
//             menu["Lunch"] = _.shuffle(docs).slice(0, 5);
//             Recipe.find({ mealType: "Dinner" }, (err, docs) => {
//               if (docs) {
//                 menu["Dinner"] = _.shuffle(docs).slice(0, 5);
//                 const daily = new DailyMenu({
//                   Breakfast: menu.Breakfast,
//                   Lunch: menu.Lunch,
//                   Dinner: menu.Dinner,
//                 });

//                 daily.save((err) => {
//                   if (err) {
//                     console.log(err);
//                   } else {
//                     console.log("Successfully Added");
//                   }
//                 });
//               }
//             });
//           }
//         });
//       }
//     })
//   );
// });

// cron.schedule("5 8 * * Sun", function () {
//   console.log("will run every week at 12:00 AM");
//   let menu = {};
//   console.log("running a task every minute");
//   WeeklyMenu.deleteMany({}).then(
//     Recipe.find({ mealType: "Breakfast" }, (err, docs) => {
//       if (docs) {
//         menu["Breakfast"] = _.shuffle(docs).slice(0, 5);
//         Recipe.find({ mealType: "Lunch" }, (err, docs) => {
//           if (docs) {
//             menu["Lunch"] = _.shuffle(docs).slice(0, 5);
//             Recipe.find({ mealType: "Dinner" }, (err, docs) => {
//               if (docs) {
//                 menu["Dinner"] = _.shuffle(docs).slice(0, 5);
//                 const daily = new WeeklyMenu({
//                   Breakfast: menu.Breakfast,
//                   Lunch: menu.Lunch,
//                   Dinner: menu.Dinner,
//                 });

//                 daily.save((err) => {
//                   if (err) {
//                     console.log(err);
//                   } else {
//                     console.log("Successfully Added");
//                   }
//                 });
//               }
//             });
//           }
//         });
//       }
//     })
//   );
// });
app.listen(9002, () => {
  console.log("BE started at port 9002");
});
