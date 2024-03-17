import express from "express"
import mongoose from "mongoose"
import cors from "cors"

import {userRouter} from "./routes/users.js"
import {recipesRouter} from "./routes/recipes.js"

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect("mongodb+srv://jennifesther:Jocavick5000_@cluster0.da1blzh.mongodb.net/recipes?retryWrites=true&w=majority"),
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}

app.listen(3001, () => console.log("SERVER IS RUNNING!!"));