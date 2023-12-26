const app = require("express")();
const connectToMongo = require("./database/db");
const router = require("./routes/route");
const adminRouter = require("./routes/adminRoute");
const cors = require("cors");
const bodyparser = require("body-parser");

require("dotenv").config();
const PORT = 5001;

app.use(cors());
// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// available routes
app.use("/", router);
app.use("/", adminRouter);

connectToMongo()
  .then(() => {
    try {
      const server = app.listen(PORT, () => {
        console.log(`Server listening on port http://localhost:${PORT}`);
      });
      const io = require("socket.io")(server, {
        pingTimeout: 60000,
        cors: {
          origin: "http://localhost:5173/",
        },
      });
      io.on("connection", (socket) => {
        console.log("connected to socket.io");
        socket.on("setup", (userData) => {
          socket.join(userData._id);
          // console.log(userData._id);
          socket.emit("connected");
        });
        socket.on("join chat", (room) => {
          socket.join(room);
          console.log("User joined Room :" + room);
        });
      });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid database connection");
  });
