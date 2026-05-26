import {
BrowserRouter,
Routes,
Route
}
from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";

import Dashboard from "./pages/Dashboard";

import Upload from "./pages/Upload";

import Quiz from "./pages/Quiz";

import Chat from "./pages/Chat";

import Planner from "./pages/Planner";

import Analytics from "./pages/Analytics";

import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App(){

return(

<BrowserRouter>

<Navbar/>

<Routes>

<Route
path="/"
element={<Home/>}
/>

<Route
path="/dashboard"
element={<Dashboard/>}
/>

<Route
path="/upload"
element={<Upload/>}
/>

<Route
path="/quiz"
element={<Quiz/>}
/>

<Route
path="/chat"
element={<Chat/>}
/>

<Route
path="/planner"
element={<Planner/>}
/>

<Route
path="/analytics"
element={<Analytics/>}
/>

<Route
path="/profile"
element={<Profile/>}
/>

<Route
path="/quiz"
element={<Quiz/>}
/>

<Route
path="/login"
element={<Login/>}
/>

<Route
path="/signup"
element={<Signup/>}
/>

</Routes>

</BrowserRouter>

);

}

export default App;