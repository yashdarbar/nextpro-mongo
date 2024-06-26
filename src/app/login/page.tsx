"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import  axios  from "axios";
import { NextResponse } from "next/server";

const page = () => {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
    } else {setButtonDisabled(true)}})


    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user)
            console.log("Login success",response.data);
            router.push("/profile")
        } catch (error: any) {
            console.log(error);
            console.log("Login is failed", {error:error.message});
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col text-white justify-center items-center min-h-screen ">
            <h1 className="font-semibold text-2xl mb-3">
                {loading ? "processing" : "Login!"}
            </h1>
            <hr />
            <label htmlFor="email">email</label>
            <input
                type="text"
                name="email"
                id="email"
                placeholder="email"
                className="rounded-md px-2 py-1 text-black"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <label htmlFor="password" className="mt-2">
                password
            </label>
            <input
                type="password"
                name="password"
                placeholder="password"
                className="rounded-md px-2 py-1 text-black"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button
                type="submit"
                onClick={onLogin}
                className="mt-4  font-semibold px-2 py-1 border-2  border-white rounded-lg"
            >
                {buttonDisabled ? "No loginup" : "Login "}
            </button>
            <Link href="/signup" className="text-sm mt-1 underline decoration ">
                Visit SignUp page
            </Link>
        </div>
    );
};

export default page;
