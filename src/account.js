import React, {useState, useRef, useEffect} from 'react';
import {Link} from "react-router-dom";

function Account() {
    const [records, setRecords] = useState([]);
    const [changePasswordForm, setChangePasswordForm] = useState(false);
    const newPasswordRef = React.useRef();

    const fetchData = () => {
        fetch('http://localhost:5000/readAcc', { // replace
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

    function logoutAccount() {
        fetch('http://localhost:5000/logout', { //replace
            headers:{
                'Content-type': 'application/json'
            },
            method: 'PATCH'
        })
    }

    function deleteAccount() {
        fetch('http://localhost:5000/deleteAcc', { //replace
            headers:{
                'Content-type': 'application/json'
            },
            method: 'DELETE'
        })
        //return to login page
    }

    function changePassword() {
        const password = newPasswordRef.current.value;
        fetch('http://localhost:5000/updatePass', { //replace
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

    //have to change the hidden section to only load in the dom when button is pressed
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