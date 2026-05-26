import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip
} from "chart.js";

import {
Bar
} from "react-chartjs-2";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip
);

function Analytics(){

const data={

labels:[
"Quiz",
"Study",
"Notes"
],

datasets:[

{

label:"Progress",

data:[
5,
8,
4
]

}

]

};

return(

<div className="bg-slate-900 text-white p-10">

<h1 className="text-4xl mb-8">

Analytics

</h1>

<div className="bg-white rounded-xl p-8">

<Bar
data={data}
/>

</div>

</div>

);

}

export default Analytics;