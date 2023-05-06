const mongoose = require('mongoose')

const ReactFormDataSchema = new mongoose.Schema({
    _id: { type: Number },
    title: { type: String },
    price: { type: Number },
    description: { type: String },
    genres: { type: String },
    image: { type: String },
    image2: { type: String },
    image3: { type: String },
    releaseDate: { type: String },
    developer: { type: String },
    publisher: { type: String },
    platforms: { type: String },
    numOfPlayers: { type: String },
    recommender: { type: String },
    rating: {
        rate: { type: String },
        count: { type: Number }
    }
},
    { collection: "games" }
)

const Product = mongoose.model('Product', ReactFormDataSchema)
module.exports = Product