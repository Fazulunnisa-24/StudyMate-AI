import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Upload(){

const [file,setFile]=useState(null);

const [summary,setSummary]=useState("");

const [quiz,setQuiz]=useState([]);

const upload=async()=>{

if(!file){

alert("Choose PDF");

return;

}

const data=new FormData();

data.append(
"file",
file
);

const res=await axios.post(
"http://127.0.0.1:8000/upload",
data
);

setSummary(
res.data.summary
);

setQuiz(
res.data.quiz
);

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
font-bold
mb-4
"
>

Upload Notes

</h1>

<p
className="
text-slate-400
mb-10
"
>

Upload PDFs and generate study content.

</p>

<div
className="
border-2
border-dashed
border-slate-700
rounded-3xl
p-20
text-center
bg-slate-800
"
>

<h2
className="
text-3xl
mb-8
"
>

📄 Drop Your PDF

</h2>

<input

type="file"

accept=".pdf"

onChange={(e)=>

setFile(
e.target.files[0]
)

}

/>

<button

onClick={upload}

className="
bg-blue-600
mt-8
px-10
py-4
rounded-xl
"

>

Generate Study Material

</button>

</div>

{

summary && (

<div
className="
mt-10
bg-slate-800
rounded-2xl
p-8
"
>

<h2
className="
text-3xl
mb-6
"
>

AI Summary

</h2>

<p>

{summary}

</p>

</div>

)

}

{

quiz.length>0 && (

<div
className="
mt-10
bg-slate-800
rounded-2xl
p-8
"
>

<h2
className="
text-3xl
mb-6
"
>

Generated Quiz

</h2>

{

quiz.map(

(q,index)=>(

<div
key={index}
className="mb-4"
>

{q}

</div>

)

)

}

</div>

)

}

</div>

</div>

);

}

export default Upload;