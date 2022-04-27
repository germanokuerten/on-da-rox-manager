//////////////////////////////
// On Da Rox Manager App
//////////////////////////////


//////////////////////////////
// Dependencies
//////////////////////////////

// .env
require("dotenv").config()
// Web framework
const express = require("express")
// Object Document Manager (Work with DB)
const mongoose = require("mongoose")
// Override request methods (Post - Put / Post - Delete)
const methodOverride = require("method-override")
// Used for logging
const morgan = require("morgan") 


//////////////////////////////
// Setup Database Connection
//////////////////////////////

// loading db url
const DATABASE_URL = process.env.DATABASE_URL

// Establish connection
mongoose.connect(DATABASE_URL)

// Save the connection
const cnx = mongoose.connection

// Setup mongoose connection messages
cnx
.on("open", () => console.log("Mongo Connection is Open"))
.on("close", () => console.log("Mongo Connection is Closed"))
.on("error", (err) => console.log(err))


//////////////////////////////
// Schemas and Models
//////////////////////////////

// Schema - the definition of our data type
// Model - the object working with our data type

const drinkSchema = new mongoose.Schema({
    idDrink: String,
    alcoholic: String,
    drinkName: String,
    drinkImage: String,
    ingredient1: String,
    ingredient2: String,
    ingredient3: String,
    ingredient4: String,
    ingredient5: String,
    ingredient6: String,
    ingredient7: String,
    ingredient8: String,
    ingredient9: String,
    ingredient10: String,
    instructions: String,
    drinkHistory: String
}, {timestamps: true})

const Drink = mongoose.model("Drink", drinkSchema)


//////////////////////////////
// Express Application
//////////////////////////////

const app = express()

//////////////////////////////
// Middleware
//////////////////////////////

// override request methods for form submissions
app.use(methodOverride("_method"))
// log every request
app.use(morgan("dev"))
// Parse html form bodies into req.body
app.use(express.urlencoded({extended: true}))
// serve files statically
app.use("/static", express.static("static"))


//////////////////////////////
// Routes
//////////////////////////////

// INDUCES - Index, New, Delete, Update, Create, Edit, Show

// Home Route
app.get("/", (req, res) => {
    res.render("home.ejs")
})

// Index Route
app.get("/drink", async (req, res) => {
    // go get Drinks
    const drinks = await Drink.find({})
    // render index.ejs
    res.render("index.ejs", {drink: drinks})
})

// Seed Route
app.get("/drink/seed", async (req, res) => {
    // delete all existing drinks
    await Drink.remove({}).catch((err) => res.send(err))
    // add sample drinks
    const drinks = await Drink.create([
        {idDrink: "001",
            alcoholic: "No",
            drinkName: "Mano's smoothie",
            drinkImage: "https://therecipecritic.com/wp-content/uploads/2021/04/berrysmoothiehero1-667x1000.jpg",
            ingredient1: "Mixed berries",
            ingredient2: "Avocado",
            ingredient3: "Honey",
            ingredient4: "Cononut Water",
            ingredient5: "",
            ingredient6: "",
            ingredient7: "",
            ingredient8: "",
            ingredient9: "",
            ingredient10: "",
            instructions: "In a blender add the berries, avocado, honey, and coconut water. Blend until smooth. If you need to stop and scrape the sides that will help too. It is delicious!",
            drinkHistory: "Made by Germano Kuerten in 2022"},
        {idDrink: "002",
            alcoholic: "Yes",
            drinkName: "Mano's smoothie 2",
            drinkImage: "https://therecipecritic.com/wp-content/uploads/2016/03/blackberrylimesmoothie-650x975.jpg",
            ingredient1: "Mixed berries",
            ingredient2: "Avocado",
            ingredient3: "Cane Sugar",
            ingredient4: "Cononut Water",
            ingredient5: "",
            ingredient6: "",
            ingredient7: "",
            ingredient8: "",
            ingredient9: "",
            ingredient10: "",
            instructions: "In a blender add the berries, avocado, honey, and coconut water. Blend until smooth. If you need to stop and scrape the sides that will help too. It is delicious!",
            drinkHistory: "Made by Germano Kuerten in 2022"}
    ]).catch((err) => res.send(err))
    // send the drinks as json
    res.json(drinks)
})

// New Route
app.get("/drink/new", (req, res) => {
    res.render("new.ejs")
})

// Delete Route
app.delete("/drink/:id", async (req, res) => {
    const index = req.params.id
    await Drink.findByIdAndDelete(index).catch((err) => console.log(err))
    res.redirect("/drink")
})

// Update Route
app.put("/drink/:id", async (req, res) => {
    const updatedDrink = await Drink.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.redirect("/drink")
})

// Create
app.post("/drink", async (req, res) => {
    await Drink.create(req.body).catch((err) => res.send(err))
    res.redirect("/drink/")
})

// Edit
app.get("/drink/:id/edit", async (req, res) => {
    const editedDrink = await Drink.findById(req.params.id).catch((err) => res.send(err))
    res.render("edit.ejs", {
        drink: editedDrink,
        index: req.params.id
    })
})

// Show Route
app.get("/drink/:id", async (req, res) => {
    const showDrink = await Drink.findById(req.params.id).catch((err) => res.send(err))
    res.render("show.ejs", {drink: showDrink})
})

//////////////////////////////
// Server Listener
//////////////////////////////

// Config
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})