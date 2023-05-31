import React, {useState, useRef, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";

function Login(){
    const usernameRef = React.useRef();
    const passwordRef = React.useRef();
    const navigate = useNavigate();

//check if logged in on "login page" load

    /**
    * Calls a fetch request to login to an account
    */
    function loginAccount(){
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        if( (username === "") || (password === "") || (username === null) || (password === null) ) alert("Enter a username and a password");
        else fetch('https://full-stack-blackjack-sim-production.up.railway.app/login', {
            headers:{
               'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                username : username,
                password : password
            })
        })
        .then(
            navigate("/Account"),
            document.body.style.backgroundColor = "#34456e"
        ) //if response success = true change current route else alert login failed
        .catch(err => console.log(err) );
    }

    // if sess.userId exists in server, redirect to account page when loading login; else continue to login page
    return (
            <div id="bouncer">
                <header> Login </header>
                <input type="text" ref={usernameRef} placeholder="Username"></input>
                <br></br>
                <input type="text" ref={passwordRef} placeholder="Password"></input>
                <br></br>
                <button onClick={ () => loginAccount() }> Login </button>
                <br></br>
                <Link to="/CreateAccount">
                    <button>
                        Create Account
                    </button>
                </Link>
            </div>
    );
}

export default Login;