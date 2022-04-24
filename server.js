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
    X- Create my Models, Views, Public folders
    - Create my model database with 5/11 drinks
    - Create all my EJS files
        - Home
        - Index 
            + create my partials file
        - Show
        - Edit
        - New (create)
        
3. Link to DB
    - Create Schema with Mongoose
    - Connect to Mongo DB 
        Collection: ondaroxdb

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
// override request methods (Post - Put / Post - Delete)
const methodOverride = require("method-override")
const morgan = require("morgan") // used for logging

// Config
const PORT = process.env.PORT

// Database


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
app.use(express.static("public"))


////////////////
// Routes
////////////////

// INDUCES - Index, New, Delete, Update, Create, Edit, Show

//Test Route
app.get("/", (req, res) => {
    res.send("home is working!")
})

////////////////
// Server Listener
////////////////

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})