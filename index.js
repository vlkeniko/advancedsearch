
const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []
// There needs to be something else instead of .toUpperCase(), 
// because it wouldnt work with all languages: 
// http://www.i18nguy.com/unicode/turkish-i18n.html


// Replace: valueCase.replace(/[^a-zA-Z0-9 ]/g, '');
// Escape caracters instead of skipping them

searchInput.addEventListener("input", (e) => {
    const valueCase = e.target.value.toUpperCase()
    const value = valueCase.replace(/[^a-zA-Z ]/g, "");
    users.forEach(user => {
        const isVisible = user.name.toUpperCase().replace(/[^a-zA-Z ]/g, "").includes(value) || 
        user.email.toUpperCase().includes(value)
        user.element.classList.toggle("hide", !isVisible)
    })
})

fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => {
        users = data.map(user => {
            const card = userCardTemplate.content.cloneNode(true).children[0]
            const header = card.querySelector("[data-header]")
            const body = card.querySelector("[data-body]")

            header.textContent = user.name
            body.textContent = user.email
            userCardContainer.append(card)

            return { name: user.name, email: user.email, element: card }
        })
    })