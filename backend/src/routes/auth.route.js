import express from "express";


const router = express.Router();

router.post("/signup", (req, res) => {
    res.send("signup")
})
router.post("/login", (req, res) => {
    res.send("signup")
})
router.post("/logout", (req, res) => {
    res.send("signup")
})



export default router