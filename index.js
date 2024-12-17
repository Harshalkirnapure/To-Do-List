         //   part of practice of create element
// let mainContEl=document.getElementById("main-container");
// let secContEl=document.createElement("secCont");
// secContEl.textContent="Task List";
// secContEl.style.color="blue"
// secContEl.style.fontSize="30px"
// mainContEl.appendChild(secContEl)


let toDoListContEl=document.getElementById("toDoListCont");

let userInputEl= document.getElementById("userInput");

let errorMsgEl=document.getElementById("errorMsg");


// let todoList=[
//     {
//         title:"html",
//         id :1
//     },
//     {
//         title:"css",
//         id :2
//     },
//     {
//         title:"Java Script",
//         id :3
//     }

// ]
function onGetParseTodo(){

    let myTodoList=localStorage.getItem("myTodo");
    if(myTodoList===null){
        return []
    }
    else{
        let parseTodo=  JSON.parse(myTodoList);
        return parseTodo;
    }
}

let todoList= onGetParseTodo();


 function onChangeStatus(checkboxId,titleId,todoId){
     
    let checkBoxEl=document.getElementById(checkboxId);
    let titleEl=document.getElementById(titleId);
    

    if(checkBoxEl.checked ===true){
       titleEl.classList.add("checked")
    }
    else{
        titleEl.classList.remove("checked")
    }

    let newTodoId=todoId.slice(4);

    let index= todoList.findIndex((each)=>each.id == newTodoId);

    for (let i=0;i< todoList.length;i++){
        if(index===i){
            if(todoList[i].isChecked===false){
                todoList[i].isChecked =true
            }
            else{
                todoList[i].isChecked =false ;
            }
        }
    }
 }

 function onDeleteTodo(todoId){

   let myTodo= document.getElementById(todoId); /*cant acess directly so we create ID and using parameters and creating varibale and delete it */
     
   toDoListContEl.removeChild(myTodo);

   let newTodoId=todoId.slice(4);

   let index= todoList.findIndex((each)=>each.id == newTodoId);
   
   todoList.splice(index,1);
    
   
   console.log(todoList)
 }



 function createAndAppendTodo( todo){

    let checkboxId= "myCheckBox"+todo.id;
    let titleId="myTitle"+todo.id;
    let todoId= "toDo"+todo.id;

     let listCont=document.createElement("li");
     listCont.classList.add("list-cont");
     listCont.id=todoId;
     toDoListContEl.appendChild(listCont);

     let checkBoxEl=document.createElement("input")
     checkBoxEl.type="checkbox";
     checkBoxEl.id=checkboxId;
     if (todo.isChecked === true){
        checkBoxEl.checked =true ; /* for getting both line through and checked */
     }
     checkBoxEl.onclick=function(){
        onChangeStatus(checkboxId,titleId,todoId); /* checkBoxEl.id="myCheckBox"+todo.id;*/
     }
     listCont.appendChild(checkBoxEl);

     let labelEl=document.createElement("label")
     labelEl.classList.add("label-cont");
     labelEl.htmlFor=checkboxId;  /*labelEl.htmlFor="myCheckBox"+todo.id; */
     listCont.appendChild(labelEl);

     let titleEl=document.createElement("h4")
     titleEl.textContent=todo.title;
     titleEl.id= titleId ;
     if(todo.isChecked === true){
        titleEl.classList.add("checked");  /* for getting both line through and checked */
     }
     labelEl.appendChild(titleEl);

     let buttonEl=document.createElement("button")
     buttonEl.classList.add("delete-btn")
     buttonEl.onclick= function(){
        onDeleteTodo(todoId);
     }
     labelEl.appendChild(buttonEl)

     let trashEl=document.createElement("i")
     trashEl.classList.add("fa-solid", "fa-trash")
     buttonEl.appendChild(trashEl)
 }

 for (each of todoList){


     createAndAppendTodo(each);

    // practice of display item
    // let headingEl=document.createElement("h1");
    // headingEl.textContent=each.title;
    // toDoListContEl.appendChild(headingEl)
 }
 
  

 function onAddToDo(){
    
    // let eachId=todoList.length+1;       /*  priousely we use it for changing  and get id by using length +1 */

    let date = new Date();
    let UniqueId= Math.ceil(Math.random() * date.getTime() )

    let newTodo= {
        title:userInputEl.value,

        id :UniqueId,
        isChecked: false
    }

    if(userInputEl.value===""){
        errorMsgEl.textContent="please fill the value"
    }
    else{
        createAndAppendTodo(newTodo);
        todoList.push(newTodo)
        userInputEl.value="";
        errorMsgEl.textContent="";
    }
    
    console.log(todoList);
 }

 function onSaveTodo(){

    let strinFyTodo=JSON.stringify(todoList);     /*local storge cant store object. only store string value so we convert it */ 
    localStorage.setItem("myTodo",strinFyTodo);   /*key,key value */
 }