import { useState } from "react";

function Quiz() {

const [quiz] = useState([
"Explain Shell Scripting",
"What is DBMS?",
"Define Operating System",
"What is Cloud Computing?",
"Explain React Components"
]);

const [answers,setAnswers]=useState([]);

const [score,setScore]=useState(null);

const submitQuiz=()=>{

let total=0;

answers.forEach((a)=>{

if(a && a.trim()){
total++;
}

});

setScore(total);

};

return(

<div className="bg-slate-900 text-white min-h-screen p-10">

<h1 className="text-5xl mb-10">

Quiz Center

</h1>

<div className="space-y-8">

{

quiz.map((q,index)=>(

<div
key={index}
className="bg-slate-800 rounded-xl p-8"
>

<h2 className="mb-4">

Q{index+1}. {q}

</h2>

<textarea

className="
w-full
p-4
rounded
bg-slate-700
text-white
placeholder-slate-400
border
border-slate-600
focus:border-blue-500
outline-none
"

rows="4"

placeholder="Type your answer..."

onChange={(e)=>{

const temp=[...answers];

temp[index]=e.target.value;

setAnswers(temp);

}}

/>

</div>

))

}

<button

onClick={submitQuiz}

className="
bg-green-600
px-8
py-4
rounded-xl
"

>

Submit Quiz

</button>

{

score!==null && (

<div
className="
mt-10
bg-blue-600
rounded-xl
p-8
"
>

<h1 className="text-4xl">

Score:
{score}
/
{quiz.length}

</h1>

</div>

)

}

</div>

</div>

);

}

export default Quiz;