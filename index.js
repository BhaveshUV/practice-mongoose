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
const Employee = mongoose.model("Employee", userSchema);