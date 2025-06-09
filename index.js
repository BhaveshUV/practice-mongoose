const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

main()
.then(() => console.log("Successfully connected to MongoDB server"))
.catch(err => console.log(err));

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);

const user1 = new User({
  name: "abc",
  email: "abc@gmail.com",
  age: 35
});

const user2 = new User({
  name: "bcd",
  email: "bcd@gmail.com",
  age: 40
});

console.log(user1, user2);

user1.save();
user2.save();