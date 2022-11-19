

function on_input(){

let input_data=document.getElementById("input_task").value
let status=document.getElementById("status").checked
post_data(input_data,status)

}

let id=0

async function post_data(task,status){

    let obj={
        id,
        task,
        status
    }

    try{
        let raw=await fetch("http://localhost:3001/list",
        {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
       })
    
        let added=await raw.json()
        fetch_data()
        id++
    }
    catch(err){
        console.log(err)
    }
 
}

async function fetch_data(){

    try{
        let raw=await fetch("http://localhost:3001/list")
        let data=await raw.json()
        console.log(data)
        display_data(data)
    }
    catch(err){
        return err
    }
}

fetch_data()

function display_data(data){
    // document.getElementById("list").innerHTML=""
    // let data=JSON.parse(localStorage.getItem("data"))
    // console.log(data)
    // let box=document.createElement("div")
    // box.setAttribute("id","display")
    data.forEach(e => {    

         let row=document.createElement("tr")
         
        let p=document.createElement("td")
        p.innerText=e.id
        let p2=document.createElement("td")
        p2.innerText=e.task
        let p3=document.createElement("td")
        p3.innerText=e.status
        let edit=document.createElement("td")
        edit.innerHTML=`<button>Edit</button>`

        edit.addEventListener("click",()=>{
            
            localStorage.setItem("id",(e.id))
            window.location.href="edit.html"})

        let del=document.createElement("td")
        del.innerHTML=`<button>Delete</button>`
        del.addEventListener("click",async()=>{

            let id=e.id
            try{
                 let patch=await fetch(`http://localhost:3001/list/${id}`,{
                    method:"DELETE"
                 })

                 let data=await patch.json()

                 fetch_data(data)
            }
            catch(err){
               console.log(err)
            }
        })


        row.append(p,p2,p3,edit,del)
        document.querySelector("tbody").append(row)
    });


    let displayed_item=document.querySelectorAll("#display p")
    displayed_item.forEach(e=>{
    e.addEventListener("click",function(){
        
        e.style.color="red"
        e.style.textDecoration="line-through"
        
      
    })
})
}

let buttons=document.querySelectorAll("table tbody tr td button")
  console.log(buttons)
buttons.forEach((ele)=>{
    ele.addEventListener("click",(e)=>{
        console.log("hi")
        if(e.target.innerText="Edit"){
            console.log("edit")
            }
            else if(e.target.innerText==="Delete"){
                console.log("delete")
            }
        
        })
})

   



// let str=["walking","bathing","breakfast"]
// localStorage.setItem("data",JSON.stringify(str))


// function on_input(){


// let get_data=JSON.parse(localStorage.getItem("data"))

// let arr
// if(get_data==="null"){
//     arr=[]
// }
// else{
//     arr=get_data
// }

// let input_data=document.getElementById("input_task").value

// if(!arr.includes(input_data)){
//     arr.push(input_data)

// }



// localStorage.setItem("data",JSON.stringify(arr))
// displayData()


// }



