import { useState, useEffect } from "react";
import axios from "axios"
import { useGetUserID } from "../hooks/useGetUserID";

export const SavedRecipes = () => {
    const[savedRecipes, setSavedRecipes] = useState([]);
    const userID =useGetUserID();
    
    
//useEffect automatically shows the recipes because look at 
// how we called the function after the useEffect hook
    useEffect( ()=>{
        const fetchSavedRecipes = async ()=>{
            try{
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`)
                //notice how the link is different from the request in the home page
                //because we do not need the ids here
                setSavedRecipes(response.data.savedRecipes) 
                console.log(response.data)
            }
            catch(err){
                console.error(err)
            }
        };
        fetchSavedRecipes();//DO NOT FORGET TO CALL YOUR FUNCTION
    },[]);

    return (
    <div>
        <h1>Recipes</h1>
        <ul>
            {savedRecipes.map((savedRecipe)=>(
                <li key ={savedRecipe._id}>
                    {/* {savedRecipes.includes(recipe._id) && <h1>Saved Already</h1>} */}
                    <div>
                        <h2>{savedRecipe.name}</h2>
                       </div>
                    <div className="instructions">
                        <h2>Instructions</h2>
                        {savedRecipe.instructions.map((instruction, index) => (
                            <p key={index}>-{instruction}</p>
                        ))}
                    </div>
                    <img src={savedRecipe.imageUrl} alt={savedRecipe.name}/>
                    <p> Cooking Time: {savedRecipe.cookingTime}(min)</p>
                </li>
            ))}
        </ul>
    </div>
    );
}