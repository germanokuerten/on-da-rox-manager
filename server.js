//////////////////////////
// On Da Rox Manager App
//////////////////////////

/*

// Pseudo code: App outline

1. Set up all my configurations
    X- NPM init -y
    X- download all dependencies and sub dependencies
        + set up .env and gitignore
    X- Set up all my dep and middleware
    X- Create github repo and commit

2. Create all my Routes (For Full Crud Functionality)
    X- Create my Models, Views, Public (/static) folders
    - Create my model database with 5/11 drinks (/2 right now)
    - Create all my Routes and EJS files
        X- Home 
            - (Create EJS file)
        X- Index 
            + create my partials file
        - Show Route
            + Show.ejs
        - Edit
            + Edit.ejs
        - New (create)
            + Edit.ejs
        
3. Link to DB
    X- Create Schema with Mongoose
    X- Connect to Mongo DB 
        Collection: ondaroxdb
    X- Test Schema with json files
    X- Test Mongo DB connection

3.1. Style pages

3.2. Develop a nice readme.md (inspired by OnDaRox readme)

4. Extra (optionals)
    - Create public folder for CSS framework
    - Authenthication login
    - API that can feed/seed On Da Rox user app

5. Bug

Ps. Commit consistantly

*/

//////////////////////////////
// Dependencies
//////////////////////////////

// .env
require("dotenv").config()
// web framework
const express = require("express")
// Object Document Manager (Work with DB)
const mongoose = require("mongoose")
// Override request methods (Post - Put / Post - Delete)
const methodOverride = require("method-override")
const morgan = require("morgan") // used for logging


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
app.use(express.static("static"))


//////////////////////////////
// Routes
//////////////////////////////

// INDUCES - Index, New, Delete, Update, Create, Edit, Show

// Home Route
app.get("/", (req, res) => {
    res.send("home is working!")
})

// Index Route
app.get("/drink", async (req, res) => {
    // go get Drinks
    const drinks = await Drink.find({})
    // render index.ejs
    res.render("index.ejs", {drink: drinks})
})

// Test Seed Route
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

//////////////////////////////
// Server Listener
//////////////////////////////

// Config
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})