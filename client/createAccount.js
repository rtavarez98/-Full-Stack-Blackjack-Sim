const createAccBtn = document.querySelector('#create-acc-btn');

createAccBtn.addEventListener('click', function() {location.href = "login.html";} );

createAccBtn.onclick = function(){
    const usernameInput = document.querySelector('#usernameInput');
    const passwordInput = document.querySelector('#passwordInput');
    fetch('http://localhost:5000/createAcc', {
        headers:{
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            username : usernameInput.value,
            password : passwordInput.value
        })
    })
    .then(response => response.json() )
    .catch(err => console.log(err) );

    //if username matches an existing account return "username taken", else return "account created" and go back to login.html
}