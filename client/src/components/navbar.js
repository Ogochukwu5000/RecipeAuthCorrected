import {Link} from "react-router-dom"
import {useCookies} from "react-cookie";
import { useNavigate } from "react-router-dom";


export const Navbar = () => {
    const[cookies, setCookies] = useCookies(["access_token"])
    const navigate = useNavigate()

    const logout = () =>{
        setCookies("access_token", "");//reset the cookies(access_token) to be empty 
        window.localStorage.removeItem("USER_ID")//clear local storage from our USERID
        navigate("/auth");

    }

    return(
        /*inside of the links here, we want to make sure we hace access to our access token cookie because as long as we have a token, then we are logged in/authenticated
         which is why we impor useCookies from react-cookie*/
    <div className ="navbar">
        <Link to="/">Home</Link>
        <Link to="/create-recipes">Create Recipes</Link>
        {!cookies.access_token ? 
        (<Link to="/auth">Login/Register</Link>) :
        (<>
        <Link to="/saved-recipes">Saved Recipes</Link>
        <button onClick = {logout}>Logout</button>
        </>) 
        }   
    </div>
);
};