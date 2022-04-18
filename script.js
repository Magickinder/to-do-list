let allLists = loadFromLocalStorage();
appendTasks(allLists);

// Add event listener to all loaded buttons
let checkboxes = document.querySelectorAll("input[type=checkbox]");
checkboxes.forEach(checkbox => {
    checkbox.addEventListener("click", function(){
        crossOutTask(this);
    })
});

checkCheckboxes(checkboxes);

let deleteBtns = document.querySelectorAll("button[class=delete-btn]");
deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener("click", function(){
        deleteTask(this);
    });
});

function addNewTask(){
    let taskDescription = document.getElementById("input-task");
    if(taskDescription.value !== ""){
        let spans = document.querySelector("ul").querySelectorAll("span");
        let isDuplicate = false;

        for(let i = 0; i < spans.length; i++){
            if(spans[i].innerHTML === taskDescription.value){
                isDuplicate = true;
            }
        }

        if(isDuplicate){
            alert("Task is already on the list!");
        } else{
            let newLi = document.createElement("li");

            let newCheckBox = document.createElement("input");
            newCheckBox.type = "checkbox";

            // Add event listener to newly created buttons
            newCheckBox.addEventListener("click", function(){
                crossOutTask(this);
            });
            newLi.appendChild(newCheckBox);

            let newSpan = document.createElement("span");
            newSpan.className = "task";
            newSpan.innerHTML = taskDescription.value;
            newLi.appendChild(newSpan);

            let newBtn = document.createElement("button");
            newBtn.className = "delete-btn";
            newBtn.addEventListener("click", function(){
                deleteTask(this);
            });
            newBtn.innerHTML = "<img src='delete_icon.png' alt='Delete icon' width='18' height='18'/>";

            newLi.appendChild(newBtn);

            document.querySelector("ul").appendChild(newLi);
            taskDescription.value = "";

            saveToLocalStorage();
        }
    }
}

function deleteTask(element){
    let buttonParent = element.parentNode;
    document.querySelector("ul").removeChild(buttonParent);

    removeFromLocalStorage(buttonParent);
}

function checkCheckboxes(){
    let spans = document.querySelector("ul").querySelectorAll("span");

    spans.forEach(span => {
        if(span.style.textDecoration === "line-through"){
            span.parentNode.childNodes[0].checked = true;
        }
    });
}

function crossOutTask(element){
    let siblingSpan = element.parentNode.querySelector("span");

    if(element.checked){
        siblingSpan.style.textDecoration = "line-through";
    } else{
        siblingSpan.style.textDecoration = "none";
    }

    removeFromLocalStorage();
    saveToLocalStorage();
}

function saveToLocalStorage(){
    let savedList = loadFromLocalStorage();
    let allLists = document.querySelectorAll("li");
    let toStore = [];

    if(savedList !== undefined){
        toStore = savedList;
    }

    for(let i = 0; i < allLists.length; i++){
        if(!toStore.includes(allLists[i].innerHTML)){
            toStore.push(allLists[i].innerHTML);
        }
    }

    localStorage.setItem("tasks", JSON.stringify(toStore));
}

function removeFromLocalStorage(){
    localStorage.clear();
    saveToLocalStorage();
}

function loadFromLocalStorage(){
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function appendTasks(list){
    for(let i = 0; i < list.length; i++){
        let li = document.createElement("li");
        li.innerHTML = list[i];
        document.querySelector("ul").appendChild(li);
    }
}