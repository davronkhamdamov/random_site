const URL = 'https://random-api-s49n.onrender.com'
const random_button = document.getElementById("random_button")
const box = document.querySelector(".box")

random_button.addEventListener('click', () => {
    random_button.setAttribute("disabled", '')
    fetch(URL)
        .then(res => res.json())
        .then(data => {
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