import { useState } from "react";
import axios from "axios";
import {useCookies} from "react-cookie"
import { useNavigate } from "react-router-dom";
{/* -this is how to comment in JSX , ALSO IMPORT STATEMENTS SHOULD ALWAYS COME FIRST IN JAVASCRIPT
    -Also remember to always check your server terminal as well because cors/axios problems might just be your issue
    -Another Issue: I used response.send in the server/routes/users.js instead of res.send and that caused a problem here, cannot remember
    what the problem was though

*/}
export const Auth = () => {

    return (<div className="auth">
        <Login/>
        <Register/>
    </div>
    );
}
const Login = () =>{
    const[username, setUsername]= useState("")
    const[password, setPassword]= useState("")

    const[_, setCookies] =useCookies(["access_token"])

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        //so whenever we submit the form does not refresh the page
        try{
            const response = await axios.post("http://localhost:3001/auth/login", {username, password})

            console.log(response)
            setCookies("access_token", response.data.token)//sets response that we get from the API to our cookie
            window.localStorage.setItem("USER_ID", response.data.USER_ID)
            navigate("/")
            //we are keeping track of the location using the react router dom library which is why we import the useNavigate hook at this point
        }
        catch(error){
            console.error(error)//".errror() makes it red in the console"
        }

    }
    return <Form 
            username= {username}
            setUsername= {setUsername} 
            password= {password} 
            setPassword={setPassword}
            label= "Login"
            onSubmit={onSubmit}
            />
}
const Register = () =>{
    const[username, setUsername]= useState("")
    const[password, setPassword]= useState("")

    const onSubmit = async (event) => {
        event.preventDefault()
        //so whenever we submit the form dos not refresh the page
        try{
            await axios.post("http://localhost:3001/auth/register", {username, password})
            alert("REGISTRATION SUCCESSFUL, YOU CAN NOW LOGIN")
        }
        catch(error){
            console.error(error)//".errror() makes it red in the console"
        }

    }
    return <Form 
            username= {username}
            setUsername= {setUsername} 
            password= {password} 
            setPassword={setPassword}
            label="Register"
            onSubmit={onSubmit}
            />
}
const Form = ({username, setUsername, password, setPassword, label, onSubmit}) =>{
    return(
        <div className="auth-container">
            {/* auth-container has been handled in the CSS file */}
            <form onSubmit={onSubmit}>
                {/* the onSubmit func will be called whenever you submit the form */}
                <h2>{label}</h2>
                <div className="form-group">
                    {/* form-group has been handled in the CSS file  */}
                    <label htmlFor = "username"> Username: </label>
                    <input type= "text" placeholder= "your username please" value={username} id = "username" onChange={(event) => setUsername(event.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor = "password"> Password: </label>
                    <input type= "password" placeholder="throw in your password" value={password} id = "password" onChange={(event) => setPassword(event.target.value)}/>
                </div>
                    <button type = "submit">{label}</button>
            </form>
        </div>
    )
}