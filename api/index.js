import express from "express";
import path from "path"
import dotenv from "dotenv"

dotenv.config();

// console.log(process)

const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cookieParser());


// define route middleware


app.listen(3000, () => {
  console.log("server is running on port 3000");
});


app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// define middleware for error

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});