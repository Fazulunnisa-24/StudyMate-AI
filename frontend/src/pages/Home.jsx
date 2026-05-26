import { Link } from "react-router-dom";

function Home(){

const features=[

"📄 Upload Notes",

"🤖 AI Summary",

"📝 Quiz Generation",

"💬 Study Chat",

"📅 Planner",

"📊 Analytics"

];

return(

<div className="bg-slate-950 text-white">

{/* HERO */}

<section
className="
min-h-screen
flex
flex-col
justify-center
items-center
text-center
p-10
"
>

<h1
className="
text-8xl
font-bold
mb-6
"
>

StudyMate AI

</h1>

<p
className="
text-2xl
text-slate-400
max-w-3xl
mb-10
"
>

Transform your study notes into summaries,
quizzes, planning, and analytics.

</p>

<div className="space-x-6">

{/* CHANGED */}

<Link to="/signup">

<button
className="
bg-blue-600
px-10
py-5
rounded-2xl
text-xl
"
>

Get Started

</button>

</Link>

{/* CHANGED */}

<Link to="/login">

<button
className="
bg-slate-800
px-10
py-5
rounded-2xl
text-xl
"
>

Login

</button>

</Link>

</div>

</section>

{/* FEATURES */}

<section
className="
p-20
"
>

<h1
className="
text-6xl
text-center
mb-16
"
>

Features

</h1>

<div
className="
grid
grid-cols-3
gap-10
"
>

{

features.map(

(item,index)=>(

<div

key={index}

className="
bg-slate-900
p-10
rounded-3xl
hover:scale-105
transition
"

>

<h2
className="
text-3xl
"
>

{item}

</h2>

</div>

)

)

}

</div>

</section>

{/* HOW */}

<section
className="
p-20
text-center
"
>

<h1
className="
text-5xl
mb-10
"
>

How It Works

</h1>

<div
className="
space-y-6
text-2xl
"
>

<p>1 Signup</p>

<p>2 Upload Notes</p>

<p>3 Generate Quiz</p>

<p>4 Track Progress</p>

</div>

</section>

{/* CTA */}

<section
className="
p-20
text-center
"
>

<div
className="
bg-blue-700
rounded-3xl
p-20
"
>

<h1
className="
text-6xl
mb-6
"
>

Start Learning Today

</h1>

{/* CHANGED */}

<Link to="/signup">

<button
className="
bg-white
text-black
px-10
py-5
rounded-xl
"
>

Create Account

</button>

</Link>

</div>

</section>

<footer
className="
text-center
p-10
text-slate-400
"
>

© StudyMate AI

</footer>

</div>

);

}

export default Home;