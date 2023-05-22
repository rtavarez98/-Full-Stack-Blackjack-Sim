import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';

import Login from './login.js';
import CreateAccount from './createAccount.js';
import Account from './account.js';
import Blackjack from './blackjack.js';

        //<Routes>
            //<Route path="/" element={<Login />} />
            //<Route path="/CreateAccount" element={<CreateAccount />} />
            //<Route path="/Account" element={<Account />} />
            //<Route path="/Blackjack" element={<Blackjack />} />
        //</Routes>

        //add * path for no page found

const root =  ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Blackjack />} />
            <Route path="/Account" element={<Account />} />
        </Routes>
    </BrowserRouter>,
    root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();