
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuceess } from "../store/autoslice/auto";

export default function Login() {
  const [login, setlogin] = useState(true);
  const [password, setpassword] = useState("");
  const [message, setmessage] = useState("");
  const [email, setemail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function FetchLogin() {
    try {
      setmessage("Logging in...");

      const res = await fetch(
        "https://shopping-app-4-3bid.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();
      console.log("Login response:", res.status, data);

      if (!res.ok) {
        setmessage(data.message || "Login failed");
        return;
      }

      setmessage(data.message || "Login successful");
      dispatch(loginSuceess(data.token));

      setemail("");
      setpassword("");

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setmessage("Unable to connect to the server");
    }
  }

  async function signup() {
    try {
      if (!email || !password || !confirmPassword) {
        setmessage("Please fill in all fields");
        return;
      }

      if (password !== confirmPassword) {
        setmessage("Passwords do not match");
        return;
      }

      setmessage("Signing up...");

      console.log("Signup clicked");

      const res = await fetch(
        "https://shopping-app-4-3bid.onrender.com/api/auth/singup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
            confirmPassword,
          }),
        }
      );

      const data = await res.json();
      console.log("Signup response:", res.status, data);

      if (!res.ok) {
        setmessage(data.message || "Signup failed");
        return;
      }

      setmessage(data.message || "Signup successful");

      if (data.token) {
        dispatch(loginSuceess(data.token));
      }

      setemail("");
      setpassword("");
      setConfirmPassword("");

      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      setmessage("Unable to connect to the server");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-purple-300 flex flex-col items-center">
      <div className="w-full flex flex-col items-center mt-4">
        <div className="flex flex-row items-center">
          <button
            type="button"
            className="w-32 lg:w-64 h-16 text-black text-2xl lg:text-4xl bg-white/40 border-2 lg:border-4 border-white/40 rounded-3xl shadow-lg mr-2"
            onClick={() => {
              setlogin(true);
              setmessage("");
            }}
          >
            login
          </button>

          <button
            type="button"
            className="w-32 lg:w-64 h-16 text-black text-2xl lg:text-4xl bg-white/40 border-2 lg:border-4 border-white/40 rounded-3xl shadow-lg"
            onClick={() => {
              setlogin(false);
              setmessage("");
            }}
          >
            signup
          </button>
        </div>

        {login ? (
          <div className="flex flex-col items-center p-2 mt-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="email"
              className="w-64 h-10 lg:w-96 lg:h-16 border-2 p-2 lg:text-3xl text-xl rounded-2xl"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="password"
              className="w-64 h-10 mt-2 lg:w-96 lg:h-16 border-2 p-2 lg:mt-4 lg:text-3xl text-xl rounded-2xl"
            />

            <Link
              to="/forgot-password"
              className="lg:text-3xl m-2 hover:text-3xl"
            >
              forgot password?
            </Link>

            <button
              type="button"
              className="w-32 lg:w-64 h-16 text-black text-2xl lg:text-4xl bg-white/40 border-2 border-white/40 rounded-2xl shadow-lg mt-2"
              onClick={FetchLogin}
            >
              login
            </button>

            <p className="mt-2">{message}</p>

            <p className="text-xl lg:text-3xl mt-4">
              not a member?{" "}
              <button
                type="button"
                onClick={() => {
                  setlogin(false);
                  setmessage("");
                }}
                className="bg-white/40 border-2 p-2 text-2xl rounded-xl"
              >
                signup now
              </button>
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center p-4 mt-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="email"
              className="w-64 h-10 lg:w-96 lg:h-16 border-2 p-2 lg:text-3xl text-xl rounded-2xl"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="password"
              className="w-64 h-10 mt-2 lg:w-96 lg:h-16 border-2 p-2 lg:text-3xl text-xl rounded-2xl"
            />

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="confirm password"
              className="w-64 h-10 mt-2 lg:w-96 lg:h-16 border-2 p-2 lg:text-3xl text-xl rounded-2xl"
            />

            <p className="mt-2">{message}</p>

            <button
              type="button"
              className="w-32 lg:w-64 h-16 text-black text-2xl lg:text-4xl bg-white/40 border-2 lg:border-4 border-white/40 rounded-2xl shadow-lg mt-4"
              onClick={signup}
            >
              signup
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
