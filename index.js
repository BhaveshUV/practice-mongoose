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

// --------- CREATE: Insert one document --------- //

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

// --------- CREATE: Insert Many documents --------- //

User.insertMany([
  {name: "cde", email: "cde@gmail.com", age: 37},
  {name: "def", email: "def@gmail.com", age: 39},
  {name: "efg", email: "efg@gmail.com", age: 20},
]).then(res => console.log(res)).catch(e => console.log(e));

// ----------- READ: Find Many documents ----------- //

User.find({ name: { $in: ["cde", "def"] } })
  .then(res => console.log(res))
  .catch(e => console.log(e));

User.findOne({ age: 40 })
  .then(res => console.log(res))
  .catch(e => console.log(e));

User.findById("6846efd95833aad91b0e210a")
  .then(res => console.log(res))
  .catch(e => console.log(e));

// ---------- UPDATE: Update One document ---------- //
//  Returns metadata //

User.updateOne({age: 39}, {age: 29})
  .then(res => console.log(res))
  .catch(e => console.log(e));

User.updateMany({age: {$gt: 35}}, {age: 40})
  .then(res => console.log(res))
  .catch(e => console.log(e));

//  Returns the document //

User.findOneAndUpdate({name: "bcd"}, {age: 35}, {returnDocument: "after"})
  .then(res => console.log(res))
  .catch(e => console.log(e));

User.findByIdAndUpdate({_id: "684966780624673d26099bb7"}, {age: 25}, {returnDocument: "after"})
  .then(res => console.log(res))
  .catch(e => console.log(e));

// ------- DELETE: Delete One & Many document ------- //
//  Returns metadata //

User.deleteOne({name: "def"})
  .then(res => console.log(res))
  .catch(e => console.log(e));

User.deleteMany({age: {$gt: 30}})
  .then(res => console.log(res))
  .catch(e => console.log(e));

//  Returns the deleted document //

User.findByIdAndDelete({_id: "684966780624673d26099bb7"})
  .then(res => console.log(res))
  .catch(e => console.log(e));

User.findOneAndDelete({name: "efg"})
  .then(res => console.log(res))
  .catch(e => console.log(e));