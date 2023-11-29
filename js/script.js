const form = document.querySelector('form')
const nameInput = document.querySelector('input.name')
const passInput = document.querySelector('input.password')
const body = document.querySelector('body')
const success = document.querySelector('.succes')
const logoutBTN = document.querySelector('.logout')

// Get cookies 
const getCookies = function() {
    const cookies = document.cookie.split('; ');
    const obj = {}
    cookies.forEach(element => {
        const splitArray = element.split('=')
        obj[splitArray[0]] = splitArray[1]
    });
    return obj
};

getCookies();

// render any message to window
const messageRender = function(msg, tag, className) {
    let message = `<${tag} class="${className}">${msg}<${tag}`
    body.insertAdjacentHTML('beforeend', message)
}

// login action
form.addEventListener('submit', function(e) {
    e.preventDefault();
    api('POST')('/auth/login')({
        username: nameInput.value,
        password: passInput.value
    })
    .then(data => {
        document.querySelector('.error')?.remove();
        document.querySelector('.succes')?.remove();
        if (nameInput.value == '' || passInput.value == '') {
            throw new Error('Please fill all of the blanks');
        } 
        else if(data.username !== nameInput.value)
            throw new Error('Username is not correct');
        messageRender(`Hello, ${data.firstName}`, 'h1', 'succes')
        form.style.display = 'none';
        logoutBTN.style.display = 'flex';
        document.cookie = `token = ${data.token};Max-age=80`;
        document.cookie = `firstName = ${data.firstName};Max-age=80`;
    })
    .catch(error => {
        messageRender(error.message, 'p', 'error');
        document.cookie = 'token=;;Max-age=-5555';
        document.cookie = 'firstName=;;Max-age=-5555';
    })
})

// logout
logoutBTN.addEventListener('click', function() {
    document.querySelector('.success').textContent = `Welcome, ${getCookies().firstName}, login.`
    form.style.display = 'flex';
    logoutBTN.style.display = 'none';
})

// API currying
const api = method => path => {
    return async function (body) {
        const res = await fetch(`https://dummyjson.com${path}`, {
            method,
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(body)  
        });
        return await res.json();
    }
};