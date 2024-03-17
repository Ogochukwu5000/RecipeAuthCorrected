import { useState, useEffect } from "react";
import axios from "axios"
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

export const Home = () => {
    const[recipes, setRecipes] = useState([]);
    const[savedRecipes, setSavedRecipes] = useState([]);
    const[cookies, _] =useCookies(["access_token"])


    const userID =useGetUserID();
    
    

    useEffect( ()=>{//we cannot make an async call here, against JS stnds
//we create an async func inside the useEffect and call it after
        const fetchRecipe = async ()=>{
            try{
                const response = await axios.get("http://localhost:3001/recipes")
                setRecipes(response.data)
                // console.log(response.data)
            }
            catch(err){
                console.error(err)
            }
        };
        //NOTE THAT THIS FUNCTION IS INSIDE YOUR useEFFECT FUNC, WHY?
        //You cannot send data by data to get requests, with get requests,
        //you send the data throught the PARAMS, we cannot get get requests through the body
        const fetchSavedRecipes = async ()=>{
            try{
                //notice the big switch up from
                // const response = await axios.get("http://localhost:3001/recipes/savedRecipes/ids", {userID})
                //TO const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`)
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`)
                setSavedRecipes(response.data.savedRecipes)
                // setSavedRecipes(response.data ) includes works on arrays and not objects or maps and so this will not work because
                //because response.data returns an object and so you have to got to the console to see what it returns and fix the 
                // code accordingly as you can see 
                console.log(response.data)

            }
            catch(err){
                console.error(err)
            }
        };
        fetchRecipe();
        if(cookies.access_token) fetchSavedRecipes();//DO NOT FORGET TO CALL YOUR FUNCTIONs after creating them in the useEffect

    },[]);

    const  saveRecipe= async(recipeID) =>{
        try{
            const response = await axios.put("http://localhost:3001/recipes", {
                recipeID, 
                userID
            }, {headers: {authorization:cookies.access_token}})// to send something to headers, you create it
            //as an object that will be an argument in the axios request
            setSavedRecipes(response.data.savedRecipes);
        }
        catch(err){
            console.error(err)
        }
    }
    // const isRecipeSaved=(id)=>{ 
    //     savedRecipes.includes(id);
    // }this will not work use the next line
    const isRecipeSaved=(id)=> savedRecipes.includes(id);

    return (
    <div>
        <h1>Recipes</h1>
        <ul>
            {recipes.map((recipe)=>(
                <li key ={recipe._id}>
                    {/* {savedRecipes.includes(recipe._id) && <h1>Saved Already</h1>} */}
                    <div>
                        <h2>{recipe.name}</h2>
                        <button 
                        onClick={() =>saveRecipe(recipe._id)} 
                        disabled={isRecipeSaved(recipe._id)}>
                            {isRecipeSaved(recipe._id)? "Saved": "Save"}
                            </button>
                        {/* TAKE NOTE OF THIS AND FIGURE WHY THE BUTTON IS PASSING A FUNCTION AND ANOTHER FUNCTION */}
                    </div>
                    <div className="instructions">
                        <h2>Instructions</h2>
                        {recipe.instructions.map((instruction, index) => (
                            <p key={index}>-{instruction}</p>
                        ))}
                    </div>
                    <img src={recipe.imageUrl} alt={recipe.name}/>
                    <p> Cooking Time: {recipe.cookingTime}(min)</p>
                </li>
            ))}
        </ul>
    </div>
    );
}