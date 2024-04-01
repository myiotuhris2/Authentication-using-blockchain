import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import SignIn from "./Screens/Signin";
import SignUp from "./Screens/Signup";


function App() {
  
 
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/Signup" element={<SignUp />} />
          
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
