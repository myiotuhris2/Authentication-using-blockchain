import * as React from "react";
import { loadBlockchainData, loadWeb3 } from "../Web3helpers";

import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function SignUp() {
  const [aadhar, setAadhar] = React.useState("");
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

  const signUp = async () => {
    if (!aadhar || !email || !password) {
      alert("please fill all details");
      return;
    }
    var mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
      alert("please enter valid email address");
      return;
    }
    
    try {
      await auth.methods
        .createUser(aadhar, email, password)
        .send({ from: accounts });

      localStorage.setItem("aadhar", aadhar);
      localStorage.setItem("email", email);
      navigate("/");
      window.location.reload();
    } catch (e) {
      console.log(e.message);
    }
  };
  React.useEffect(() => {
    loadWeb3();
  }, []);

  React.useEffect(() => {
    loadAccounts();
  }, []);

  return (
    <>
    <div className="start">
    <div className="wrapper">
    <form id="signupForm">
        <h1>Signup Page</h1>
      <div className="input-box">
      <input
        
        value={aadhar}
        onChange={(e) => setAadhar(e.target.value)}
        placeholder="Aadhar"
        type="text"
      />
      </div>
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
      
      <button onClick={signUp} className="btn">
        {" "}
        Sign Up
      </button>
      
      </form>
      <br></br>
      <span
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/");
        }}
      >
        {" "}
        Sign In?{" "}
      </span>
    </div>
    </div>
    </>
  );
}


