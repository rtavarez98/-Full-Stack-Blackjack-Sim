const logoutAccBtn = document.querySelector('#logout-acc-btn');
const deleteAccBtn = document.querySelector('#delete-acc-btn');
const changeAccBtn = document.querySelector('#change-acc-btn');
const playBlackjackBtn = document.querySelector('#play-blackjack-btn');
const newPasswordBtn = document.querySelector('#new-password-btn');

document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5000/readAcc')
    .then(response => response.json() )
    .then(data => loadHTMLTable(data['data'] ) );
});

function loadHTMLTable(data){ //isn't working but i'm gonna change it anyway :|
    const table = document.querySelector('table tbody');
    let tableHTML = "";
    console.log(data);//test
    data => {
        tableHTML += "<tr>";
        tableHTML += `<td>${data.wins}</td>`;
        tableHTML += `<td>${data.losses}</td>`;
        tableHTML += `<td>${data.ties}</td>`;
        tableHTML += "</tr>";
    };

    table.innerHTML = tableHTML;
}

logoutAccBtn.addEventListener('click', function() {location.href = "login.html";} );

logoutAccBtn.onclick = function(){
    fetch('http://localhost:5000/logout', {
        headers:{
            'Content-type': 'application/json'
        },
        method: 'PATCH'
    })
}

deleteAccBtn.addEventListener('click', function() {location.href = "login.html";} );

deleteAccBtn.onclick = function(){
    fetch('http://localhost:5000/deleteAcc', {
        headers:{
            'Content-type': 'application/json'
        },
        method: 'DELETE'
    })
}

changeAccBtn.onclick = function(){
    changePassword.hidden = false;
}

newPasswordBtn.onclick = function(){
    const passwordInput = document.querySelector('#newPasswordInput');
    fetch('http://localhost:5000/updatePass', {
        headers:{
            'Content-type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({
            newPassword : passwordInput.value
        })
    })

    //location.reload();
}

playBlackjackBtn.onclick = function(){
    location.href = "blackjack.html";
}




