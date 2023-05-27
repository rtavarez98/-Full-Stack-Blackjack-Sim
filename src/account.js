import React, {useState, useRef, useEffect} from 'react';
import {Link} from "react-router-dom";

function Account() {
    const [records, setRecords] = useState([]);
    const [changePasswordForm, setChangePasswordForm] = useState(false);
    const newPasswordRef = React.useRef();

    const fetchData = () => {
        fetch('https://full-stack-blackjack-sim-production.up.railway.app/readAcc', {
            headers:{
                'Content-type': 'application/json'
            },
            method: 'GET',
        })
        .then(response => response.json() )
        .then(data => setRecords(data.data) );
    };

    useEffect(() => {
        fetchData();
    }, []);

    /**
    * Calls a fetch request to logout the active account
    */
    function logoutAccount() {
        fetch('https://full-stack-blackjack-sim-production.up.railway.app/logout', {
            headers:{
                'Content-type': 'application/json'
            },
            method: 'PATCH'
        })
        //return to login page
    }

    /**
    * Calls a fetch request to delete the active account
    */
    function deleteAccount() {
        fetch('https://full-stack-blackjack-sim-production.up.railway.app/deleteAcc', {
            headers:{
                'Content-type': 'application/json'
            },
            method: 'DELETE'
        })
        //return to login page
    }

    /**
    * Calls a fetch request to change the password of the active account
    */
    function changePassword() {
        const password = newPasswordRef.current.value;
        fetch('https://full-stack-blackjack-sim-production.up.railway.app/updatePass', {
            headers:{
                'Content-type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify({
                newPassword : newPasswordRef.value
            })
        })
        //location.reload();
    }

    return (
        <div>
            <table>
                <thead>
                    <th>Wins</th>
                    <th>Losses</th>
                    <th>Ties</th>
                </thead>
                <tbody>
                    {records.map((record, index) => (
                        <tr key={index}>
                            <td>{record.wins}</td>
                            <td>{record.losses}</td>
                            <td>{record.ties}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <br></br>

            <button onClick={ () => logoutAccount() }> Logout </button>
            <br></br>
            <button onClick={ () => deleteAccount() }> Delete Account </button>
            <br></br>
            <button onClick={ () => setChangePasswordForm(!changePasswordForm)}> Change Password </button>
            <br></br>
            <Link to="/Blackjack">
                <button>
                    Play Blackjack
                </button>
            </Link>
            <br></br>
            <br></br>

            {changePasswordForm && <section>
                <label>Please Enter The New Password:</label>
                <input type="text" ref={newPasswordRef}/>
                <button onClick={ () => changePassword() }> Submit </button>
            </section>}
        </div>
    );
}

export default Account;