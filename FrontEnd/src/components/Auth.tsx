import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard.tsx";

const firebaseUrl = "https://fleetmanagement-12-default-rtdb.firebaseio.com/Auth.json";

interface User {
  username: string;
  email?: string;
  password: string;
}

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState<User>({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      await axios.post(firebaseUrl, formData);
      localStorage.setItem("username", formData.username);
      setIsSignUp(false);
    } else {
      const { data } = await axios.get(firebaseUrl);
      const users: User[] = Object.values(data || {});
      const validUser = users.find(
        (user) => user.username === formData.username && user.password === formData.password
      );
      if (validUser) {
        alert("Login successful!");
        navigate("/Dashboard");
      } else {
        alert("Invalid credentials");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center mb-4">{isSignUp ? "Sign Up" : "Login"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          {isSignUp && (
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
        <button onClick={() => setIsSignUp(!isSignUp)} className="text-blue-500 mt-4">
          {isSignUp ? "Already have an account? Login" : "Create an account"}
        </button>
      </div>
    </div>
  );
}