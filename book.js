const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}

main()
    .then(() => console.log("You're now connected to amazon's database"))
    .catch(err => console.log(err));

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
    },
    price: {
        type: Number,
        min: [0, "Entered price is lower than min=0 value"] // Defines a custom error
    },
    genre: {
        type: [String]
    },
    category: {
        type: String,
        enum: ["educational", "fictional", "non-fictional"]
    }
});

const Book = mongoose.model("Book", bookSchema);

const book1 = new Book({
    title: "Mathematics XII",
    author: "RD Sharma",
    price: 1200,
    category: "educational"
});
const book2 = new Book({
    title: "Concepts of Physics",
    author: "H.C. Verma",
    price: 500
});
const book3 = new Book({
    title: "Comics compilation",
    price: 400,
    genre: ["comics", "fiction"]
});
const book4 = new Book({
    title: "Engineering Mathematics",
    author: "B.V. Ramana",
    price: 400,
    category: "educational"
});

book1.save().then(res => console.log(res)).catch(e => console.log(e));
book2.save().then(res => console.log(res)).catch(e => console.log(e));
book3.save().then(res => console.log(res)).catch(e => console.log(e));
book4.save().then(res => console.log(res)).catch(e => console.log(e));

Book.findByIdAndUpdate({ _id: '68516350a710d4ebb9e080fe' }, { price: -100 }, { runValidators: true })  // This will throw an error due to 'min' validator on price path
    .then(res => console.log(res))
    .catch(e => console.log("Error type: ", e.errors?.price?.properties?.type, "\nError message: ", e.errors?.price?.properties?.message));