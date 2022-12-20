
const form = document.querySelector('#form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = document.querySelector('#name').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    fetch('/user', {
        method: 'POST',
        body: JSON.stringify({name, email, password}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(`Error: ${err}`))

})