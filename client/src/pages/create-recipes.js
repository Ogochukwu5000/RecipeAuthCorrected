import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipes = () => {
    const userID =useGetUserID();

    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: [],
        imageUrl: "",
        cookingTime: 0,
        userOwner:userID
    });
    const[cookies,_]=useCookies(["access_token"])
    const navigate = useNavigate();
    //if the recipes are strings, then we will assign the above statement to useState("") 
    //but in this case it returns an object so note the difference
    const handleChange =(event) =>{
        const{name, value} = event.target;
        setRecipe({...recipe, [name]: value});
    }
    const handleArrayChange = (event, idx, arrayType) => {
        const { value } = event.target;
        const newArray = [...recipe[arrayType]];
        newArray[idx] = value;
        setRecipe({ ...recipe, [arrayType]: newArray });
    };
    const addIngredient = () =>{
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]})
    }
    const addInstructions= () =>{
        setRecipe({...recipe, instructions: [...recipe.instructions, ""]})
    }
    const onSubmit = async (event)=>{
        //we pass the event so the event does not refresh everytime we click on the submit button
        event.preventDefault();
        try{
            await axios.post("http://localhost:3001/recipes",recipe,
            {headers:{authorization:cookies.access_token}
        });
            alert("recipe created")
            navigate("/")
        }
        catch(err){
            console.error(err)
    }
    // navigate("/")    check why ut cant be here though or never mind I Understand
}
    return (<div className = "create-recipe">
        <h2>Create Your Recipe Today</h2>
        <form onSubmit={onSubmit}>
            <label htmlFor = "name"> Name Of Recipe</label>
            <input 
                type="text" 
                id="nameOfRecipe" 
                name= "name" 
                placeholder = "Type in your recipe..." 
                onChange ={handleChange}
            />

            <label >Ingredients</label>
            <button onClick={addIngredient} type= "button">Add an Ingredient</button>
            {recipe.ingredients.map((ingredient, idx) => (
                <input 
                    key={idx} 
                    type = "text" 
                    name= "ingredients" 
                    value={ingredient} 
                    onChange={(event) => handleArrayChange(event, idx, 'ingredients')}
                />
            ))}

            <label >Instructions</label>
            <button onClick={addInstructions} type= "button">Add an Instruction</button>
            {recipe.instructions.map((instruction, idx) => (
                <input 
                    key={idx} 
                    type = "text" 
                    name= "instructions" 
                    value={instruction} 
                    onChange={(event) => handleArrayChange(event, idx, 'instructions')}
                />
            ))}
            <label htmlFor = "imageUrl">Image URL</label>
            <input 
                type="text" 
                id="imageUrl" 
                name="imageUrl" 
                placeholder = "Copy in your Image URL..." 
                onChange = {handleChange}
            />
            <label htmlFor = "cookingTime">Cooking Time</label>
            <input 
                type="number" 
                id="cookingTime" 
                name="cookingTime" 
                placeholder = "It took how long?" 
                onChange ={handleChange}
            />
            <button type= "submit">Create Recipe</button>
        </form>
    </div>
    )
};
// const handleIngredientChange =(event, idx) =>{
    //     const{value} = event.target;
    //     const ingredients= recipe.ingredients
        //    ingredients[idx]=value
    //     setRecipe({...recipe, ingredients})}
    
    // const handleInstructionChange =(event, idx) =>{
    //     const{value} = event.target;
    //     const instructions= recipe.instructions
    //     instructions[idx]=value
    //     setRecipe({...recipe, instructions})
    // }