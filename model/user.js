import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: "string",
        required: true
    },
    email: {
        type: "string",
        required: true
    },
    password: {
        type: "string",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const userSchema = mongoose.model("users", schema);
export default userSchema;