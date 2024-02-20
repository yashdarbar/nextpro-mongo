"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";

const page = () => {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        username: "",
        password: "",
    });

    const [buttonIsDisabled, setButtonIsDisabled] = useState(false);

    useEffect(() => {
        if (
            user.username.length > 0 &&
            user.password.length > 0 &&
            user.email.length > 0
        ) {
            setButtonIsDisabled(false);
        } else {
            setButtonIsDisabled(true);
        }
    }, [user]);

    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup successfully", response.data);
            router.push("/login");
        } catch (error:any) {
            console.log("SignUp Failed!", error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col text-white justify-center items-center min-h-screen ">
            <h1 className="font-semibold text-2xl mb-3">
                {loading ? "processing" : "SignUp!"}
            </h1>
            <label htmlFor="username">username</label>
            <input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                className="rounded-md px-2 py-1 text-black"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
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
            <label htmlFor="password">password</label>
            <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                className="rounded-md px-2 py-1 text-black"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button
                type="submit"
                onClick={onSignup}
                className="mt-4  font-semibold px-2 py-1 border-2  border-white rounded-lg"
            >
                {buttonIsDisabled ? "No signup" : "Sign Up"}
            </button>
            <Link href="/login" className="text-sm mt-1 underline decoration ">
                Visit login page
            </Link>
        </div>
    );
};

export default page;
