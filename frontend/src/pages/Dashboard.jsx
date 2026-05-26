import Sidebar from "../components/Sidebar";
import Streak from "../components/Streak";

function Dashboard(){

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
mb-10
"
>

Welcome Back 👋

</h1>

<div
className="
grid
grid-cols-3
gap-8
"
>

<div
className="
bg-slate-800
p-8
rounded-xl
"
>

📄

<h2 className="text-2xl">

Notes

</h2>

<p>

12 Uploaded

</p>

</div>

<div
className="
bg-slate-800
p-8
rounded-xl
"
>

📝

<h2>

Quiz

</h2>

<p>

7 Completed

</p>

</div>

<div
className="
bg-slate-800
p-8
rounded-xl
"
>

⏱

<h2>

Study

</h2>

<p>

15 Hours

</p>

</div>

</div>

<div
className="
mt-10
"
>

<Streak/>

</div>

</div>

</div>

);

}

export default Dashboard;