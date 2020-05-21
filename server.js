const express = require("express")
const mongoose = require("mongoose")
// const bodyParser = require("body-parser")
const cors = require("cors")
const passport = require("passport")

const users = require("./routes/api/users")

const app = express()

// // Bodyparser middleware
// app.use(
//     bodyParser.urlencoded({
//       extended: false
//     })
//   );
// app.use(bodyParser.json());

app.use(cors())
app.use(express.json())

const db = require("./config/keys").mongoURI

// Connect to MongoDB
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(function(){
            console.log('connected to db')
        })
        .catch(function(err){
            console.log(err)
        })

// Passport middleware
app.use(passport.initialize())

// Passport config
require("./config/passport")(passport)

// Routes
app.use("/api/users", users)

// process.env.port is Heroku's port if you choose to deploy the app there
const port = process.env.PORT || 5000

app.listen(port, function(){
    console.log("listening on port", port)
})