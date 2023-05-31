import React, {useState, useRef} from 'react';
import {useNavigate} from "react-router-dom";

function CreateAccount() {
    const usernameRef = React.useRef();
    const passwordRef = React.useRef();
    const navigate = useNavigate();

    /**
    * Calls a fetch request to create a new account
    */
    function createNewAccount() {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        if( (username === "") || (password === "") || (username === null) || (password === null) ) alert("Enter a username and a password");
        else fetch('https://full-stack-blackjack-sim-production.up.railway.app/createAcc', {
            headers:{
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                username : username.value,
                password : password.value
            })
        })
        .then(navigate("/") )
        .catch(err => console.log(err) );

        //if username matches an existing account return "username taken", else return "account created" and go back to login.html
    }

    return (
        <div id="bouncer">
            <header> Create Account </header>
            <input type="text" ref={usernameRef} placeholder="Username"></input>
            <br></br>
            <input type="text" ref={passwordRef} placeholder="Password"></input>
            <br></br>
            <button onClick={ () => createNewAccount() }> Register </button>
        </div>
    );
}

export default CreateAccount;