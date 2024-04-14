"use client"
import Link from "next/link";
import React from "react";
import userRouter from "next/navigation";
// import {axios} from "axios";
export default function LoginPage(){
    const [user, setUser] = React.useState({
        username: '',
        password: ''
    })

    const onLogin = async () => {
        
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Login</h1>
            <hr/>
            <label htmlFor="username">Username</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-blue-500" 
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="username"
                />
            <label htmlFor="password">Password</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-blue-500"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
            />
            <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onLogin}>Login</button>
            Don't have an account? 
            <Link href="/signup">SignUp</Link>
        </div>
    )
}