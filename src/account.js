import React, {useState, useRef, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";

function Account() {
    const [records, setRecords] = useState([]);
    const [changePasswordForm, setChangePasswordForm] = useState(false);
    const newPasswordRef = React.useRef();
    const navigate = useNavigate();

    const fetchData = () => {
        fetch('https://full-stack-blackjack-sim-production.up.railway.app/readAcc', {
            headers:{
                'Content-type': 'application/json'
            },
            method: 'GET',
        })
        .then(response => response.json() )
        //.then(response => console.log(response));//test
        .then(data => setRecords(data) );

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
        .then(response => response.json() )
        .then(
            navigate("/"),
            document.body.style.backgroundColor = "#ffffff";
        );
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
        .then(
            navigate("/"),
            document.body.style.backgroundColor = "#ffffff";
        );
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
        <div id="frontDoor">
            <table>
                <thead>
                    <th>Wins</th>
                    <th>Losses</th>
                    <th>Ties</th>
                </thead>
                <tbody>
                    {Object.keys(records).map(index => (
                        <tr>
                            <td>{records[index].wins}</td>
                            <td>{records[index].losses}</td>
                            <td>{records[index].ties}</td>
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
                <button onClick={ () => document.body.style.backgroundColor = "#3a854c"}>
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