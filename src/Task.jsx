import { useEffect, useState } from "react";

function Task() {

    
    // state for tasks
    // tasks are stored in local storage
    const [tasks,settasks]=useState(()=>{
        return JSON.parse(localStorage.getItem("task")||"[]")
    });


    // state for input field
    const [task,setTask]=useState("");


    // state for loading
    // to show loading animation when adding a task
    const [loding,setLoading]=useState(false);


    // useEffect to update local storage when tasks change
    // this will save the tasks in local storage
    // so that they persist even after page refresh
     useEffect(()=>{
     localStorage.setItem("task",JSON.stringify(tasks));
     },[tasks])


    // function to handle input change
    // this will update the task state when input changes
    function inputHanlder(e){
        setTask(e.target.value);
    }


    // function to add a task
    // this will add a new task to the tasks state
    // and also show loading animation for 1 second
    function add(){
        if(task.trim()==""){
            alert("plaese fill the field");
        }
        else{
            setLoading(true);
            setTimeout(()=>{
                 settasks([
                ...tasks,
                {id:Date.now(),name:task.trim(),status:"pending",isEditing:false}
                
            ])
              setLoading(false)
            },1000);
            
           
            setTask("");
        }
        
    }

    // function to delete a task
    // this will filter out the task with the given id
    // and update the tasks state
    // it also shows a confirmation dialog before deleting
    function deleteitem(id){
        
        
        if(window.confirm("are you sure!"))
            {
                let filterd=tasks.filter((ele)=>ele.id!=id)
                settasks(filterd)
            }
            else{
                alert("item not deletd")
            }
    }



    // function to edit a task
    // this will set the isEditing property of the task with the given id to true
    // so that it can be edited
    // it will also update the tasks state
    function edit(id){
        let edittoogle=tasks.map((ele)=>{
            return id==ele.id?{...ele,isEditing:true}:ele;
        })
        settasks(edittoogle)

    }

    // function to save the edited task
    // this will update the name of the task with the given id
    // and set isEditing to false
    // it will also update the tasks state
    function saveedit(id ,editedname){
        let edited=tasks.map((ele,i)=>{
            return id==ele.id?{...ele,name:editedname.trim(),isEditing:false}:ele;
        })
        settasks(edited)
    }


    // function to toggle the status of a task
    // this will change the status of the task with the given id
    // from "pending" to "completed" or vice versa
    // and update the tasks state
    function statusSetter(i){
      
       let statusupdt=tasks.map((ele)=>{
          let updatedstaus=ele.status=="pending"?"completed":"pending";
        return ele.id==i?{...ele,status:updatedstaus}:ele;
       }
        )
        settasks(statusupdt)
    }

    // main return function
    return ( 
    <>
    <div className="div">
   <div className="inpt">
     <input type="text" placeholder="please enter a tasks..." value={task} onChange={inputHanlder} />
    <button onClick={add}>add</button>
   </div>
   {loding&& <div className="loder" ></div>}
    <ul>
        
        {
            tasks.length>0?
            
            tasks.map((ele)=>{
                return <li key={ele.id}>
                    {
                        ele.isEditing?(
                            <>
                            <input className="editinpt" type="text" defaultValue={ele.name} onBlur={(e)=>{e.target.value!==""?saveedit(ele.id,e.target.value):alert("plaese fill the field")}}  autoFocus/>
                            </>
                        ):
                        (
                            <>
                            <span style={ele.status=="completed"?{textDecoration:" line-through"}:{textDecoration:"none"}} >{ele.name}</span>
                            <button onClick={()=>{statusSetter(ele.id)}}>{ele.status}</button>
                            <button onClick={()=>{deleteitem(ele.id)}}>delete</button>
                            <button onClick={()=>{edit(ele.id)}}>edit</button>
                    </>
                        )
                    }
                    
                    </li>
            })
            :<h1>no elemets found</h1>
        }
    </ul>
    </div>
    </> );
}

export default Task;