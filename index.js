let myLeads = []
let oldLeads = []
const inputEl = document.getElementById("input-el")
const inputbtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const deletebtn = document.getElementById("delete")
let tabbtn = document.getElementById("save-tab")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


tabbtn.addEventListener("click", function() {

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            console.log(tabs)
            myLeads.push(tabs[0].url)
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            render(myLeads)
        })


  
    
})
function render(Leads) {
    let listItems = ""
    for (let i = 0; i < Leads.length; i++) {
    //    listItems += "<li><a target ='_blank' href ='" + myLeads[i] + "'>" + myLeads[i] + "</a></li> "
    listItems += `
    <li>
        <a target ='_blank' href = '${Leads[i]}'>
            ${Leads[i]}
        </a>
    </li>
    `
    }
    ulEl.innerHTML = listItems
}
deletebtn.addEventListener("dblclick", function() {
    localStorage.clear
    myLeads = []
    render(myLeads)
})
inputbtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
 
})


