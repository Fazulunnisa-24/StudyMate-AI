import { Link } from "react-router-dom";

function Sidebar(){

const items=[

["Dashboard","/dashboard"],

["Upload","/upload"],

["Quiz","/quiz"],

["Chat","/chat"],

["Planner","/planner"],

["Analytics","/analytics"],

["Profile","/profile"]

];

return(

<div
className="
w-72
min-h-screen
bg-slate-950
text-white
p-8
"
>

<h1
className="
text-3xl
font-bold
mb-10
"
>

StudyMate AI

</h1>

{

items.map(

(item,index)=>(

<Link

key={index}

to={item[1]}

>

<div

className="
mb-6
hover:bg-slate-800
p-4
rounded-xl
"

>

{item[0]}

</div>

</Link>

)

)

}

</div>

);

}

export default Sidebar;