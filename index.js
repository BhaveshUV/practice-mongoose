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

// --------- Insert one document --------- //

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

user1.save().then(res => console.log(res)).catch(e => console.log(e));
user2.save().then(res => console.log(res)).catch(e => console.log(e));

// --------- Insert Many documents --------- //

User.insertMany([
  {name: "cde", email: "cde@gmail.com", age: 37},
  {name: "def", email: "def@gmail.com", age: 39},
]).then(res => console.log(res)).catch(e => console.log(e));