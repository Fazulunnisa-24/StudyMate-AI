import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (!storedUser) {
      alert("No account found. Please sign up first.");
      return;
    }

    if (
      storedUser.email === email &&
      storedUser.password === password
    ) {
      localStorage.setItem("isLoggedIn", "true");

      alert("Login Successful");

      navigate("/dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
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
        shadow-xl
        "
      >
        <h1
          className="
          text-5xl
          mb-8
          font-bold
          text-center
          "
        >
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
          w-full
          mb-6
          p-4
          rounded-xl
          bg-slate-800
          text-white
          outline-none
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
          w-full
          mb-6
          p-4
          rounded-xl
          bg-slate-800
          text-white
          outline-none
          "
        />

        <button
          onClick={handleLogin}
          className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          p-4
          rounded-xl
          font-semibold
          transition
          "
        >
          Login
        </button>

        <div
          className="
          mt-6
          text-center
          "
        >
          <Link
            to="/signup"
            className="text-blue-400"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;