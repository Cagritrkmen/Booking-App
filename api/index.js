const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const UserModel = require("./models/User");
require("dotenv").config()
const jwt = require("jsonwebtoken")
const app = express();
const bcrypt = require("bcryptjs")
const bcyrptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "adsabdashkdbasjdasömdsajkd";
const cookieParser = require("cookie-parser")

app.use(express.json());
app.use(cookieParser())

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
}));

mongoose.connect(process.env.MONGO_URL);
app.get("/test", (req, res) => {
    res.json("test ok");
});
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await UserModel.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcyrptSalt),
        });
        res.json(user);
    } catch (e) {
        res.status(422).json(e);
    }


});
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
        const passOk = bcrypt.compareSync(password, user.password);
        if (passOk) {

            jwt.sign({
                email: user.email,
                id: user._id
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie("token", token, {
                    sameSite: "none",
                    secure: true
                }).json(user);
            })
        }
        else {
            res.status(422).json("pass not ok");
        }
    } else {
        res.json("not found");
    }
})
app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await UserModel.findById(userData.id);

            res.json({name, email, _id});
        })

    } else {
        res.json(null)
    }

})
app.listen(4000);

