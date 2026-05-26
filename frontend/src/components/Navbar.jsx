import { Link } from "react-router-dom";

function Navbar(){

return(

<nav
className="bg-slate-950 text-white p-6 flex justify-between"
>

<h1 className="text-3xl font-bold">

StudyMate AI

</h1>

<div className="space-x-8">

<Link to="/">Home</Link>

<Link to="/dashboard">
Dashboard
</Link>

<Link to="/upload">
Upload
</Link>

<Link to="/quiz">
Quiz
</Link>

<Link to="/chat">
Chat
</Link>

<Link to="/planner">
Planner
</Link>

<Link to="/analytics">
Analytics
</Link>

<Link to="/profile">
Profile
</Link>

</div>

</nav>

);

}

export default Navbar;