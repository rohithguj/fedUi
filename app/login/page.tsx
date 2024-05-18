"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { APIURL } from "../Constants";
import useAppStore from "../UseAppStore";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);

  const [setDataOnLogin] = useAppStore((s) => [s.setDataOnLogin]);

  const onLogin = async () => {
    try {
      setLoading(true);

      const { username, password } = user;
      const queryString = `username=${encodeURIComponent(
        username
      )}&password=${password}`;

      const response = await fetch(`${APIURL}/login?${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Signup success", responseData);
        setDataOnLogin(
          responseData.username,
          responseData.password,
          responseData.userid
        );
        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        console.log("Signup failed", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-blue-500 text-black"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-blue-500 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onLogin}
      >
        Login
      </button>
      Don&apos;t have an account?
      <Link href="/signup">SignUp</Link>
    </div>
  );
}
