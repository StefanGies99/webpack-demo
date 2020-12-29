const app = document.getElementById('app')

function component() {
    const title = document.createElement('h1')
    title.innerText = "This is a Webpack demo project! ✌️"
    return title
}

app.appendChild(component())