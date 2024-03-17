import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {Home} from "./pages/home.js" 
//the component names like home, auth, etc have to be uppercase
import {Auth} from "./pages/auth.js"
import {CreateRecipes} from "./pages/create-recipes.js"
import {SavedRecipes} from "./pages/saved-recipes.js"
import {Navbar} from "./components/navbar.js"

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
        <Route path = "/" element= {<Home/>}/>
        <Route path = "/auth" element= {<Auth/>}/>
        <Route path = "/create-recipes" element= {<CreateRecipes/>}/>
        <Route path = "/saved-recipes" element= {<SavedRecipes/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
