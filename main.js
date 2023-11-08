const URL = 'https://random-api-s49n.onrender.com'
const random_button = document.getElementById("random_button")
const box = document.querySelector(".box")
const generate = document.querySelector(".generate")
const animation = document.querySelector("#animation")
const myInput = document.querySelector("#count_users")
const countBtn = document.querySelector("#count-btn")
const firstModal = document.querySelector(".first-modal")
const secondModal = document.querySelector(".modal")
const modal_wrapper = document.querySelector(".modal_wrapper")
const overlay = document.querySelector(".overlay")
const generate_btn = document.querySelector(".generate_btn")

let users_data = []

myInput.oninput = function () {
    if (this.value.length > 1) {
        this.value = this.value.slice(0, 1);
    } else if (this.value == 0) {
        this.value = ''
    }
    this.select()
}

countBtn.addEventListener('click', () => {
    modal_wrapper.innerHTML = ''
    if (myInput.value != 0) {
        myInput.style.borderColor = 'black'
        document.querySelector(".error_count").style.display = 'none'
        overlay.addEventListener("click", () => {
            animate_remove(firstModal, secondModal)
        })
        animate_active(firstModal, secondModal)
        for (let i = 0; i < +myInput.value; i++) {
            const div = document.createElement("div")
            const number = document.createElement("div")
            const input = document.createElement('input')
            number.textContent = i + 1
            number.classList.add("number_sigh")
            input.classList.add("user_name")
            input.placeholder = "Username"
            input.style.border = "1px solid black"
            div.style.position = "relative"
            div.append(number, input)
            modal_wrapper.append(div)
            generate_btn.addEventListener("click", () => {
                if (input.value != '' || input.value.length > 1) {
                    input.style.borderColor = "black"
                    users_data.push({ name: input.value })
                    if (i === +myInput.value - 1) {
                        Generate_Users()
                    }
                } else {
                    input.style.borderColor = "red"
                }
            })
        }
    } else {
        myInput.style.borderColor = 'red'
        document.querySelector(".error_count").style.display = 'block'
    }
})

const animate_active = (first, second) => {
    first.style.display = 'none'
    second.style.display = 'grid'
}
const animate_remove = (first, second) => {
    first.style.display = 'flex'
    second.style.display = 'none'
}

random_button.addEventListener('click', () => {
    Generate_Users(users_data)
})
function Generate_Users() {
    overlay.remove()
    animate_active(secondModal, animation)
    animate_active(generate, animation)
    random_button.setAttribute("disabled", '')
    fetch(URL, {
        method: "POST",
        body: JSON.stringify(users_data),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            animate_remove(generate, animation)
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
                div.addEventListener('click', () => confirm("Are you sure to remove") && div.remove())
            })
        }).catch(e => {
            alert("Something went wrong! Try again")
            animate_remove()
        })
}