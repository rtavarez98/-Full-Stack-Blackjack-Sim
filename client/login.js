const accessAccBtn = document.querySelector('#access-acc-btn');

accessAccBtn.addEventListener('click', function() {
    setTimeout(function() {
        location.href = "account.html";
    }, 500);
});

accessAccBtn.onclick = function(){
    const usernameInput = document.querySelector('#usernameInput');
    const passwordInput = document.querySelector('#passwordInput');
    fetch('http://localhost:5000/login', {
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

    //go to blackjack.html if true, "wrong username or password" if false
}