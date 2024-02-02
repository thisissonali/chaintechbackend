import Express from "express";
import { app } from "./app.js";    
import { connectDb } from "./data/database.js";

const PORT = process.env.PORT || 8000;
connectDb();

app.get('/', (req, res) => { 
    res.send("working");
})
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})