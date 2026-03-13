require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));

app.use(cors());
app.options("*", cors());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

const db = require("./models");
const User = db.users;

db.sequelize.sync()
  .then(() => {
    console.log("Synced database.");
  })
  .catch((err) => {
    console.log("Failed to sync database: " + err.message);
  });

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", async (req, res) => {
  try {
    const { tk, mk } = req.body;

    const user = await User.findOne({
      where: {
        tk: tk,
        mk: mk
      }
    });

    if (!user) {
      return res.send("Sai tài khoản hoặc mật khẩu");
    }

    req.session.user = {
      id: user.id,
      tk: user.tk,
      email: user.email,
      role: user.role
    };

    if (user.role === "admin") {
      return res.redirect("/admin");
    } else {
      return res.redirect("/homepage");
    }
  } catch (error) {
    console.log("Login error:", error);
    return res.status(500).send("Lỗi server");
  }
});

app.get("/admin", (req, res) => {
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.status(403).send("Bạn không có quyền vào trang admin");
  }

  return res.render("admin.ejs");
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

require("./routes/tutorial.routes")(app);
require("./routes/tutorial.api")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});