const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const customer_routes = require("./router/auth_users.js").authenticated;
const genl_routes = require("./router/general.js").general;

const app = express();

app.use(express.json());
app.use(cors()); // Fixes "Network Error" in Hoppscotch/Postman

// Authentication Middleware
app.use("/customer/auth/*", function auth(req, res, next) {
  const authHeader = req.header("Authorization");

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "access", (err, decoded) => {
      if (!err) {
        req.user = decoded; // Sets the user info from token
        next();
      } else {
        return res.status(403).json({ message: "User not authenticated" });
      }
    });
  } else {
    return res.status(403).json({ message: "User not logged in" });
  }
});

const PORT = 5000;
app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
