let myLeads = []
const localStorageLeads = JSON.parse(localStorage.getItem("myLeads"))
// console.log(localStorageLeads)
let showLeads = document.getElementById("show-leads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const showEl = document.getElementById("show-btn")
const DeleteBtn = document.getElementById("delete-btn")
if(localStorageLeads) {
    myLeads = localStorageLeads
    render(myLeads)
}

tabBtn.addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a target="_blank" href="${leads[i]}">${leads[i]} </a>"
        </li>`
    }
    showLeads.innerHTML = listItems      
}

inputBtn.addEventListener("click", () => {
        myLeads.push(inputEl.value)
        inputEl.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
    })


showEl.addEventListener("click", () => render(myLeads))

DeleteBtn.addEventListener("dblclick", () => {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})