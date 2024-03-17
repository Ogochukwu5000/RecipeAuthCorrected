import express from "express";
import mongoose from "mongoose" 
/*looks like you will always import mongoose when you have
get requests and not necessarily when all you have are post requests*/
import {RecipeModel} from "../models/recipes.js"
import {UserModel} from "../models/users.js"
import {verifyToken} from "./users.js";
//NEVER FORGET TO IMPORT YOUR MODEL, I WAS DEBUGGING FOR AN HOUR ONLY TO DISCOVER THIS,CHILE!!!!!!!

const router = express.Router();

router.get("/", async (req, res) =>{
    try{
        const response = await RecipeModel.find({})
        /*the object in the .find() method is empty
        is because we do not want to find anything specifically, 
        so it will bring out all the info u=you need without 
        filtering nothing.*/  
    res.json(response)
    }
    catch(err){
        res.json(err);
    }
});

router.post("/", verifyToken, async (req, res) => {
    const recipe = new RecipeModel(req.body)
    try{
        const response = await recipe.save();
        res.json(recipe)
    }
    catch(err){
        res.json(err)
    }
})//post is used for creating stuff
router.put("/", verifyToken, async (req, res) => {
    try{
        console.log(req.body)
        const recipe = await RecipeModel.findById(req.body.recipeID)
        //change this to recipeID also try other variable names
        const user = await UserModel.findById(req.body.userID)
        //change this to userID, just trying to know wher the two variable 
        //names(userID and recipeID) originate from
        user.savedRecipes.push(recipe)
        await user.save();//save changes added to our collection
        res.json({savedRecipes: user.savedRecipes})
    }
    catch(err){
        res.json(err)
    }
});
//You cannot send data BY data to get requests, with get requests,
//you send the data throught the PARAMS, we cannot get get requests through the body
//change "/savedRecipes/ids" to "/savedRecipes/ids/:userID"
router.get("/savedRecipes/ids/:userID", async(req,res) =>{
    try{
        // change findById(req.body.USER_ID) to findById(req.params.USER_ID)
        const user = await UserModel.findById(req.params.userID)
        res.json({savedRecipes : user?.savedRecipes})// the "?" is there just incase the user might be null
    }
    catch(err){
        res.json(err)
    }
});
router.get("/savedRecipes/:userID", async(req,res) =>{
    try{
        const user = await UserModel.findById(req.params.userID);
        const savedRecipes = await RecipeModel.find({
            _id: {$in: user.savedRecipes}
            //we are trying to get those which their id is in the user.savedrecipes
        });
        res.json({savedRecipes});
    }
    catch(err){
        res.json(err)
    }
});
export {router as recipesRouter}
