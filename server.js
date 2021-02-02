import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dbModel from "./dbModel.js";
import posts from "./dbModel.js";
import Pusher from "pusher";

// app config
const app = express();
const PORT = process.env.PORT || 7000;

// const pusher = new Pusher({
//   appId: "1147963",
//   key: "0333989238031fc52003",
//   secret: "36b1723ab5be6f49ef6d",
//   cluster: "ap2",
//   useTLS: true,
// });

// middleware
app.use(express.json());
app.use(cors());

// db config
const connection_url =
  "mongodb+srv://admin:admin@cluster0.gy2cc.mongodb.net/olx?retryWrites=true&w=majority";
mongoose.connect(
  connection_url,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected")
);

// mongoose.connection.once("open", () => {
//   const changeStream = mongoose.connection.collection("posts").watch();
//   changeStream.on("change", (change) => {
//     if (change.operationType === "insert") {
//       const postDetails = change.fullDocument;
//       pusher.trigger("posts", "inserted", {
//         user: postDetails.user,
//         caption: postDetails.caption,
//         price: postDetails.price,
//         image: postDetails.image,
//       });
//     } else {
//       console.log("unknown trigger from pusher");
//     }
//   });
// });

// api route

app.get("/", (req, res) => {
  res.json("hello").status(200);
});

app.post("/upload", (req, res) => {
  const body = req.body;
  dbModel.create(body, (err, data) => {
    if (err) res.status(500).send(err);
    res.status(201).send(data);
  });

  //   const obj = {
  //     caption: req.body.caption,
  //     user: req.body.user,
  //     image: req.body.image,
  //     price: req.body.price,
  //   };
});

app.get("/sync", (req, res) => {
  posts.find((err, data) => {
    if (err) res.status(500).send(err);
    res.status(200).send(data);
  });
});

// listner
app.listen(PORT);
