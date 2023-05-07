const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const {Product} = require('./dataSchema.js');
const {Order} = require('./dataSchema.js');

app.use(express.json());
app.use(cors());

app.use(express.static("public"));
app.use("/images", express.static("images"));

mongoose.connect("mongodb://127.0.0.1:27017/finaldata",
    {
        dbName: "finaldata",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const port = process.env.PORT || 4000;
const host = "localhost";

app.listen(port, () => {
    console.log(`App listening at http://%s:%s`, host, port);
});

app.get("/", async (req, resp) => {
    const query = {};
    const allProducts = await Product.find(query);
    console.log(allProducts);
    resp.send(allProducts);
});

app.get("/getOrders", async (req, resp) => {
    const query = {};
    const allOrders = await Order.find(query);
    console.log(allOrders);
    resp.send(allOrders);
});

app.get("/:id", async (req, resp) => {
    const id = req.params.id;
    const query = { _id: id };
    const oneProduct = await Product.findOne(query);
    console.log(oneProduct);
    resp.send(oneProduct);
});

app.post("/insert", async (req, res) => {
    console.log(req.body);
    const p_id = req.body._id;
    const ptitle = req.body.title;
    const pprice = req.body.price;
    const pdescription = req.body.description;
    const pcategory = req.body.category;
    const pimage = req.body.image;
    const prate = req.body.rating.rate;
    const pcount = req.body.rating.count;
    const formData = new Product({
        _id: p_id,
        title: ptitle,
        price: pprice,
        description: pdescription,
        category: pcategory,
        image: pimage,
        rating: { rate: prate, count: pcount },
    });
    try {
        // await formData.save();
        await Product.create(formData);
        const messageResponse = { message: `Product ${p_id} added correctly` };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while adding a new product:" + err);
    }
});

app.delete("/delete", async (req, res) => {
    console.log("Delete :", req.body);
    try {
        const query = { _id: req.body._id };
        await Order.deleteOne(query);
        const messageResponse = {
            message: `Order ${req.body._id} deleted correctly`,
        };
    } catch (err) {
        console.log("Error while deleting :" + p_id + " " + err);
    }
});

app.put("/update", async (req, res) => {
    console.log("Update :", req.body._id);
    console.log("Value to be added :", req.body.inCart);

    try{
        const filter = { _id: `${req.body._id}` };
        const updateDoc = { $set: { inCart: `${req.body.inCart}`} };
        await Product.updateOne(filter, updateDoc, null);
        const messageResponse = {
            message: `Product ${req.body_id} updated correctly`
        };
    } catch (err) {
        console.log("Error while updating :" + p_id + " " + err);
    }
});

app.post("/order", async (req, res) => {
    console.log(req.body);
    const pname = req.body.Name;
    const pemail = req.body.Email;
    const pcard = req.body.Card;
    const pcity = req.body.City;
    const paddress = req.body.Address;
    const psecondary_address = req.body.Secondary_Address;
    const pzip = req.body.Zip;
    const pstate = req.body.State;
    const orderData = new Order({
        platforms: pname,
        name: pname,
        email: pemail,
        card: pcard,
        city: pcity,
        address: paddress,
        secondary_address: psecondary_address,
        zip: pzip,
        state: pstate,
    });
    console.log(orderData);
    try {
        // await formData.save();
        await Order.create(orderData);
        const messageResponse = { message: `Order ${orderData._id} added correctly` };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while adding a new order:" + err);
    }
});