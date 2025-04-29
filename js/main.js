/**author : Abdallah Nabil 
 * date : 29/4/2025
*/

let input=document.querySelector('.input');
let submet=document.querySelector('.submit');
let tasks=document.querySelector('.tasks');
let del=document.querySelector('.del');
let arrayOfTasks=[];

// read data from local storage
arrayOfTasks=getFromLocalStorage() || [];
// create elements
creatElement(arrayOfTasks);

// event for add task in the array and the div element
submet.onclick=(event)=>{

    if(input.value!==''){
        const task={
            id:Date.now(),
            title:input.value,
            done:false
        }
        arrayOfTasks.push(task);
        input.value='';
        creatElement(arrayOfTasks);
        storeInLocalStorage(arrayOfTasks)
    }
    event.preventDefault();
};
// event for delete and done operations
document.addEventListener('click',(event)=>{
    if(event.target.className=='del'){
        let id=event.target.parentElement.getAttribute('data-id');
        deleteTask(id);
        creatElement(arrayOfTasks);
        storeInLocalStorage(arrayOfTasks);
    }
    if(event.target.className=='task-title'){
        let id=event.target.parentElement.getAttribute('data-id');
        doneTask(id);
        storeInLocalStorage(arrayOfTasks);
    }
})

// function to loop on array and create elements
function creatElement(arrayOfTasks){
    tasks.innerHTML='';
    if(arrayOfTasks.length>0){
        arrayOfTasks.forEach(
            (task)=>{
                let taskDiv=document.createElement('div');
                taskDiv.className='task';
                taskDiv.setAttribute('data-id',task.id);
                let taskTitle=document.createElement('span');
                taskTitle.className='task-title';
                taskTitle.innerHTML=task.title;
                let del=document.createElement('span');
                del.className='del';
                del.innerHTML='X';
                taskDiv.appendChild(taskTitle);
                taskDiv.appendChild(del);
                tasks.appendChild(taskDiv);
            }
        );
    }
}
// delete task from the div elemnts and from the array
function deleteTask(id){
    arrayOfTasks=arrayOfTasks.filter(
        (task)=>{
            return task.id!=id;
        }
    );
}
// toggle completed task operation on the div elements and the array
function doneTask(id){
    let taskDiv=document.querySelector(`[data-id="${id}"]`);
    arrayOfTasks.forEach(
        (task)=>{
            if(task.id==id){
                task.done=!task.done;
            }
        }
    )
    taskDiv.classList.toggle('done');
}
// function to store into local storage
function storeInLocalStorage(arrayOfTasks){
    localStorage.setItem('tasks',JSON.stringify(arrayOfTasks));
}
// function to get the data from local storage
function getFromLocalStorage(){
    if(JSON.parse(localStorage.getItem('tasks'))){
        return JSON.parse(localStorage.getItem('tasks'));
    }
    else{
        return [];
    }
}