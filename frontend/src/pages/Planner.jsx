import { useState } from "react";

function Planner() {

const [subject,setSubject]=useState("");
const [hours,setHours]=useState("");
const [plan,setPlan]=useState([]);

const createPlan=()=>{

if(!subject||!hours){
return;
}

setPlan([
...plan,
{
subject,
hours
}
]);

setSubject("");
setHours("");

};

return(

<div className="bg-slate-900 text-white p-10">

<h1 className="text-3xl mb-6">

Study Planner

</h1>

<input

className="text-white p-3 rounded mr-4"

placeholder="Subject"

value={subject}

onChange={(e)=>
setSubject(
e.target.value
)
}

/>

<input

className="text-white p-3 rounded"

type="number"

placeholder="Hours"

value={hours}

onChange={(e)=>
setHours(
e.target.value
)
}

/>

<button

className="bg-blue-600 px-5 py-3 rounded ml-4"

onClick={createPlan}

>

Add

</button>

<div className="mt-8">

{

plan.map((item,index)=>(

<div
key={index}
className="bg-slate-800 p-4 rounded mb-4"
>

📘 {item.subject}

<br/>

⏱ {item.hours} hrs

</div>

))

}

</div>

</div>

);

}

export default Planner;