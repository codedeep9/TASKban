let category = new Map();
category.set("Overview",0);
category.set("Not Started",1);
category.set("In Progress",2);
category.set("Testing",3);
category.set("Completed",4);



// Initilise the arrays to store the object for each category

let notStartedArr = [];
let inProgressArr = [];
let  testingArr= [];
let completedArr = [];

let arrayMap = new Map();
arrayMap.set(1,notStartedArr);
arrayMap.set(2,inProgressArr);
arrayMap.set(3,testingArr);
arrayMap.set(4,completedArr);

let arrayNameMap = new Map();
arrayNameMap.set(1,"notStartedArr");
arrayNameMap.set(2,"inProgressArr");
arrayNameMap.set(3,"testingArr");
arrayNameMap.set(4,"completedArr");

// Select the add card and card div for each category
let notStartedSection = document.querySelector(".add-cards[category='1']");
let notStartedCard = document.querySelector(".cards[category='1']");

let inProgressSection = document.querySelector(".add-cards[category='2']");
let inprogressCard = document.querySelector(".cards[category = '2']");

let testingSection = document.querySelector(".add-cards[category='3']");
let testingCard = document.querySelector(".cards[category = '3']");

let completedSection = document.querySelector(".add-cards[category='4']");
let completedCard = document.querySelector(".cards[category = '4']");


let currObj = {};

let editFlag = false;
let editFlagCategory = 1;
let editCode = null;
let editCard = null;


let saveButton = document.querySelector(".save");

let formTitle = document.querySelector(".form-title h1");
let closeForm = document.querySelector(".form-close");
let formInput = document.querySelector(".form input");
let textArea = document.querySelector(".form textArea");




// *************************************************************
// Save task button
saveButton.addEventListener("click",(e)=>{
    
    let title = formInput.value;
    let desc = textArea.value;
    currObj.title = title;
    currObj.desc = desc;
    currObj.code = Date.now();

    console.log("entered save button")
    // console.log(currObj)
    
    if(currObj.category == 1){
        notStartedArr.push(currObj);
       localStorage.setItem("notStartedArr",JSON.stringify(notStartedArr));
        currObj = {};
        console.log("entered not started section");
        // After pushing clone create a respective card using clone
        createCard(notStartedArr[notStartedArr.length-1].title,notStartedArr[notStartedArr.length-1].desc,notStartedArr[notStartedArr.length-1].category,notStartedArr[notStartedArr.length-1].code);

    } 
    else if(currObj.category == 2){
        console.log("entered progress section");
        inProgressArr.push(currObj);
        localStorage.setItem("inProgressArr",JSON.stringify(inProgressArr));
        currObj={};
        // After pushing clone create a respective card using clone
        createCard(inProgressArr[inProgressArr.length-1].title,inProgressArr[inProgressArr.length-1].desc,inProgressArr[inProgressArr.length-1].category,inProgressArr[inProgressArr.length-1].code);
    }

    else if(currObj.category == 3){
        console.log("entered testing section");
        testingArr.push(currObj);
        localStorage.setItem("testingArr",JSON.stringify(testingArr));
        currObj = {};
        // After pushing clone create a respective card using clone
        createCard(testingArr[testingArr.length-1].title,testingArr[testingArr.length-1].desc,testingArr[testingArr.length-1].category,testingArr[testingArr.length-1].code);
    }
    else if(currObj.category === 4){
        console.log("entered completed section");
        completedArr.push(currObj);
        localStorage.setItem("completedArr",JSON.stringify(completedArr));
        currObj={};
        // After pushing clone create a respective card using clone
        createCard(completedArr[completedArr.length-1].title,completedArr[completedArr.length-1].desc,completedArr[completedArr.length-1].category,completedArr[completedArr.length-1].code);
    }
    else if(editFlag){
        currObj ={} 
        let arr = arrayMap.get(editFlagCategory);
        arr.forEach(obj=>{
            if(obj.code === editCode){
                obj.title = title;
                obj.desc = desc;
                createCard(obj.title,obj.desc,obj.category,obj.code);
                console.log(obj.code);
            }
        })
        localStorage.setItem(`${arrayNameMap.get(editFlagCategory)}`,JSON.stringify(arr))
        
        formTitle.innerText = "Add Task"
        editFlag = false;
        editCard.remove();
        
    }

    // console.log(notStartedArr);
    // console.log(inProgressArr);
    // console.log(testingArr);
    // console.log(completedArr);

    //CLose form
    form.style.display = "none";
    formInput.value = "";
    textArea.value = "";
})


// *************************************************************
// Add Task button
let addTask = document.querySelector(".add-task-btn");
let form = document.querySelector(".task-form");

addTask.addEventListener("click",()=>{
    form.style.display = "block";
    currObj.category = 1
    // console.log(currObj);
})
// *************************************************************
// Progress Add button

let progressAdd = document.querySelector("#icon[category='2']");

progressAdd.addEventListener("click",()=>{
    form.style.display = "block";
    currObj.category = 2
    // console.log(currObj);
    
    
})

// *************************************************************
// Testing Add button
let testingAdd = document.querySelector("#icon[category='3']");

testingAdd.addEventListener("click",()=>{
    form.style.display = "block";
    currObj.category = 3
    // console.log(currObj);
    
    
})


// *************************************************************
// Completed Add button
let completedAdd = document.querySelector("#icon[category='4']");

completedAdd.addEventListener("click",()=>{
    form.style.display = "block";
    currObj.category = 4
    // console.log(currObj);
    
    
})

// **************************************************************
// Close Task Form
    closeForm.addEventListener("click",()=>{
        if(editButton){
            formTitle.innerText = "Add Task";
            formTitle.style.justifySelf = "end"
        } 
        form.style.display = "none";
        // If we are closing we need to clear input fields
        formInput.value = "";
        textArea.value = "";
    })


// *************************************************************


// *************************************************************
// Adding filter capability
let links = document.querySelectorAll(".tasks-nav-link a");

// console.log(links);

links.forEach(link=>{
    link.addEventListener("click",(e)=>{
        let taskCategory = category.get(link.innerText);
        let taskSection = document.querySelectorAll(".task-section");
        
        if(taskCategory === 0){
            //do nothing ie show every section
            taskSection.forEach(section=>{
                section.style.display = "block"
            })
        }
        else if(category.has(link.innerText)){
            //   iterate over appropriate Array and display those elements
           //select the task section
            
            console.log(taskSection)
            taskSection.forEach(section=>{
                if(section.getAttribute("category") == taskCategory){
                    //do nothing
                    section.style.display = "block"
                }
                else{
                    section.style.display = "none"
                }
            })
        }

        // if(category.has(link.innerText)){
            
        // }
        // else{
        //     link.setAttribute("id","");
        // }

        // Whenever a filter is pressed the other filter should not have selected id
        links.forEach(link=>{
            if(link === e.target) link.setAttribute("id","selected");
            else link.setAttribute("id"," ");
        })
    })
})


// *******************************************************************
// Create Card
function createCard(title,desc,category,code){
    if(category === 1){
        cloneCards(notStartedCard,title,desc,category,code,notStartedSection);
    }
    else if(category === 2){
       cloneCards(inprogressCard,title,desc,category,code,inProgressSection);
    }
    else if(category == 3){
        cloneCards(testingCard,title,desc,category,code,testingSection);
    }
    else{
        cloneCards(completedCard,title,desc,category,code,completedSection);
    }  
}


// Clone Card Function

function cloneCards(card,title,desc,category,code,section){
        let newCard = card.cloneNode(true);
        let titleElement = newCard.querySelector("h1");
        let taskDesc = newCard.querySelector(".task-desc");
        let taskBtn = newCard.querySelector(".task-btns");
        let deleteBtn = newCard.querySelector(".delete-btn");
        let editBtn = newCard.querySelector(".edit-btn");
        
        titleElement.innerText = title;
        taskDesc.innerText = desc;
        newCard.setAttribute("id","show");
        taskBtn.setAttribute("code",`${code}`);
        section.appendChild(newCard);

        // Adding event listner for  delete button
        deleteBtn.addEventListener("click",()=>{
            newCard.remove();
            deleteCard(category,code,newCard);
        })

        editBtn.addEventListener("click",()=>{
            console.log(code);
            editButton(title,desc,code,category,newCard);
            
        })
}

// **************************************************
// Delete Button for respective cards function

function deleteCard(category,code){
   
   let arr =  arrayMap.get(category);
   console.log(arr);
   arr.forEach((obj,index)=>{
    if(obj.code === code){
        arr.splice(index,1);
        console.log("Deleted" + code);
    } 
   })
   console.log(`${arrayNameMap.get(category)}`,JSON.stringify(arr))
   localStorage.setItem(`${arrayNameMap.get(category)}`,JSON.stringify(arr));
}

// **************************************************
// edit Button for respective cards function

function editButton(title,desc,code,category,card){
    editFlag = true;
    editFlagCategory =category;
    editCode = code;
    editCard = card;

    if(editFlag){
        formTitle.innerText = "Edit";
        formTitle.style.justifySelf = "center"
    }
    form.style.display = "flex";
    formInput.value = title
    textArea.value = desc;

    console.log(editFlag);
    console.log(editFlagCategory);
    console.log(editCode);
}


//Main function to add all element when page restart

//Storing the values of each array from the local storage and display it
for(let i = 1; i<=4;i++){
    let arr = JSON.parse(localStorage.getItem(arrayNameMap.get(i)));
    // console.log(arr,arr.length)
    let arr1 = arrayMap.get(i);
    if(arr){
        for(let j = 0 ;j<arr.length;j++){
            arr1.push(arr[j]);
            createCard(arr[j].title,arr[j].desc,i,arr[j].code)
        }
    }
}

console.log(notStartedArr,inProgressArr,testingArr,completedArr)















