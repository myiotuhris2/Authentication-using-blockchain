import * as React from "react";
import { loadBlockchainData, loadWeb3 } from "../Web3helpers";
import { useNavigate } from "react-router-dom";

import "./Signin.css";

export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const [accounts, setAccounts] = React.useState(null);
  const [auth, setAuth] = React.useState(null);

  const loadAccounts = async () => {
    let { auth, accounts } = await loadBlockchainData();

    setAccounts(accounts);
    setAuth(auth);
  };

  const login = async () => {
    if (!email || !password) {
      alert("please fill all details");

      return;
    }

    try {
      const res = await auth.methods.usersList(email).call();

      if (res.password === password) {
        localStorage.setItem("email", email);
        localStorage.setItem("account", accounts);
        window.location.href = "http://localhost:3000/";
      } else {
        alert("wrong user credintinals or please signup");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const isAdmin = async () => {
    // Define the admin account address
    const adminAddress = "0x29aBB09801380cD7793613A75978cC1863F047a4";
    
    // Access the current MetaMask account address
    try {
      // Request access to user accounts
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
  
      // Get the current MetaMask account address
      const currentAddress = accounts[0].toLowerCase();
  
      // Compare with admin address
      if (currentAddress === adminAddress.toLowerCase()) {
        // Redirect to external URL if admin
        window.location.href = "http://localhost:3000/";
      } else {
        alert("You are not an admin");
      }
    } catch (error) {
      console.error("Error requesting accounts:", error);
      
    }
  };

  React.useEffect(() => {
    loadWeb3();
  }, []);

  React.useEffect(() => {
    loadAccounts();
    isAdmin(); // Check if admin on component mount
  }, []);

  return (
    
    <div className="start">
    <div className="wrapper">
    <form id="signinForm">
        <h1>Signin Page</h1>
      <div className="input-box">
      <input
       
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="text"
        
      />
      </div>
      <div className="input-box">
      <input
        
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      </div>
      
      <button  onClick={login} className="btn">
        {" "}
        Sign In
      </button>
      </form>
      <br></br>
      <span
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/Signup");
        }}
      >
        {" "}
        Create new account{" "}
      </span>
      
    </div>
    </div>
    
  );
}


