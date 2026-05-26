import Sidebar from "../components/Sidebar";

function Profile(){

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
mb-10
"
>

Profile

</h1>

<div
className="
bg-slate-800
rounded-3xl
p-10
max-w-3xl
"
>

<div
className="
flex
items-center
gap-8
"
>

<div
className="
w-32
h-32
rounded-full
bg-blue-600
flex
items-center
justify-center
text-5xl
"
>

👩‍💻

</div>

<div>

<h1
className="
text-4xl
font-bold
"
>

Student

</h1>

<p>

AI Learner

</p>

</div>

</div>

<div
className="
grid
grid-cols-3
gap-6
mt-10
"
>

<div
className="
bg-slate-700
p-6
rounded-xl
"
>

📄

<h2>

12 Notes

</h2>

</div>

<div
className="
bg-slate-700
p-6
rounded-xl
"
>

📝

<h2>

7 Quizzes

</h2>

</div>

<div
className="
bg-slate-700
p-6
rounded-xl
"
>

🔥

<h2>

5 Day Streak

</h2>

</div>

</div>

<div
className="
mt-10
"
>

<h2
className="
text-3xl
mb-4
"
>

Achievements

</h2>

<div
className="
space-y-4
"
>

<div className="bg-slate-700 p-4 rounded">

🏆 First Upload

</div>

<div className="bg-slate-700 p-4 rounded">

⭐ Quiz Master

</div>

<div className="bg-slate-700 p-4 rounded">

🚀 Study Streak

</div>

</div>

</div>

</div>

</div>

</div>

);

}

export default Profile;