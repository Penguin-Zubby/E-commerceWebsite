const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://zubairafzal769:Penguin#2020@apprael01.gq5jfkm.mongodb.net/",
  {
    userNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);
