import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Chat(){

const [question,setQuestion]=useState("");

const [messages,setMessages]=useState([]);

const askQuestion=async()=>{

if(!question){

return;

}

try{

const res=await axios.get(
"http://127.0.0.1:8000/chat",
{
params:{
question
}
}
);

setMessages([

...messages,

{
user:question,

bot:res.data.answer

}

]);

setQuestion("");

}

catch{

alert(
"Upload notes first"
);

}

};

return(

<div className="flex">

<Sidebar/>

<div
className="
flex-1
bg-slate-900
text-white
min-h-screen
p-10
"
>

<h1
className="
text-5xl
mb-8
"
>

AI Study Chat

</h1>

<div
className="
bg-slate-800
rounded-3xl
p-8
h-[500px]
overflow-auto
"
>

{

messages.map(

(msg,index)=>(

<div
key={index}
className="mb-8"
>

<div
className="
bg-blue-600
p-4
rounded-xl
mb-3
"
>

👤 {msg.user}

</div>

<div
className="
bg-slate-700
p-4
rounded-xl
"
>

🤖 {msg.bot}

</div>

</div>

)

)

}

</div>

<div
className="
mt-6
flex
gap-4
"
>

<input

value={question}

onChange={(e)=>

setQuestion(
e.target.value
)

}

placeholder="Ask from uploaded notes..."

className="
flex-1
p-5
rounded-xl
bg-slate-800
text-white
"

/>

<button

onClick={askQuestion}

className="
bg-blue-600
px-10
rounded-xl
"

>

Send

</button>

</div>

</div>

</div>

);

}

export default Chat;