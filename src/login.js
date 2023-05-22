import React, {useState, useRef, useEffect} from 'react';
import {Link} from "react-router-dom";

function Login(){
    const usernameRef = React.useRef();
    const passwordRef = React.useRef();

//check if logged in on "login page" load

    function loginAccount(){
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        if( (username === "") || (password === "") || (username === null) || (password === null) ) alert("Enter a username and a password");
        else fetch('/login', {
            headers:{
               'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                username : username,
                password : password
            })
        })
        .catch(err => console.log(err) );
    }

    // if sess.userId exists in server, redirect to account page when loading login; else continue to login page
    return (
            <div>
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