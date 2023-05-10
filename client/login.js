const accessAccBtn = document.querySelector('#access-acc-btn');
const createAccBtn = document.querySelector('#create-acc-btn');

accessAccBtn.addEventListener('click', function() {
    setTimeout(function() {
        location.href = "account.html";
    }, 500);
});

createAccBtn.addEventListener('click', function() {
    location.href = "createAccount.html";
});

accessAccBtn.onclick = function(){
    const usernameInput = document.querySelector('#usernameInput');
    const passwordInput = document.querySelector('#passwordInput');

    if( (usernameInput.value == "") || (passwordInput.value == "") || (usernameInput.value == null) || (passwordInput.value == null) ) alert("Enter a username and a password");
    else fetch('http://localhost:5000/login', {
            headers:{
               'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                username : usernameInput.value,
                password : passwordInput.value
            })
        })
        .catch(err => console.log(err) );

    //go to account.html if true, "wrong username or password" if false
}