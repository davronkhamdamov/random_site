const URL = "http://127.0.0.1:5000" || 'https://random-api-s49n.onrender.com'
const random_button = document.getElementById("random_button")
const box = document.querySelector(".box")
const generate = document.querySelector(".generate")
const animation = document.querySelector("#animation")

const animate_active = () => {
    generate.style.display = 'none'
    animation.style.display = 'block'
}
const animate_remove = () => {
    generate.style.display = 'flex'
    animation.style.display = 'none'
}

random_button.addEventListener('click', () => {
    animate_active()
    random_button.setAttribute("disabled", '')
    fetch(URL, {
        method: "POST",
        body: JSON.stringify([
            { 'id': 1, 'name': 'First' },
            { 'id': 2, 'name': 'Second' },
            { 'id': 3, 'name': 'Third' },
            { 'id': 4, 'name': 'Fourth' },
            { 'id': 5, 'name': 'Fifth' },
            { 'id': 6, 'name': 'Sixth' }
        ]),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            animate_remove()
            box.innerHTML = ''
            random_button.removeAttribute("disabled", '')
            data.forEach((e, i) => {
                const name = document.createElement("p")
                const div = document.createElement("div")
                div.classList.add("wrapper")
                name.classList.add("names")
                name.textContent = (i + 1) + " - " + e.name
                div.append(name)
                box.append(div)
                div.addEventListener('click', (e) => {
                    confirm("Are you sure to remove") && e.target.remove()
                })
            })
        })
})