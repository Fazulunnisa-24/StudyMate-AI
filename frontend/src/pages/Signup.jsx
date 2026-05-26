import { Link } from "react-router-dom";

function Signup(){

return(

<div
className="
min-h-screen
bg-slate-950
text-white
flex
justify-center
items-center
"
>

<div
className="
bg-slate-900
p-10
rounded-3xl
w-[500px]
"
>

<h1
className="
text-5xl
mb-8
"
>

Signup

</h1>

<input

className="
w-full
mb-6
p-4
rounded
text-black
"

placeholder="Name"

/>

<input

className="
w-full
mb-6
p-4
rounded
text-white
"

placeholder="Email"

/>

<input

type="password"

className="
w-full
mb-6
p-4
rounded
text-white
"

placeholder="Password"

/>

<button

className="
w-full
bg-green-600
p-4
rounded
"

>

Create Account

</button>

<div
className="
mt-6
"
>

<Link
to="/login"
>

Already have account

</Link>

</div>

</div>

</div>

);

}

export default Signup;