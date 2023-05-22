import React, {useState, useRef, useEffect} from 'react';
import './App.css';// remove?
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import login from '.pages/login.js';
import createAccount from '.pages/createAccount.js';

const rootElement = document.getElementById("root");
ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={login} />
            <Route path="/createAccount" component={createAccount} />
        </Switch>
    </BrowserRouter>,
    rootElement
);