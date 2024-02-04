"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { axios } from "axios";

const page = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const onLogin = async () => {};

    return (
        <div className="flex flex-col text-white justify-center items-center min-h-screen ">
            <h1 className="font-semibold">Login!</h1>
            <hr/>
            <label htmlFor="email">email</label>
            <input
                type="text"
                name="email"
                id="email"
                placeholder="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <label htmlFor="password">password</label>
            <input
                type="password"
                name="password"
                placeholder="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button type="submit" onClick={onLogin}>
                SignUp!
            </button>
            <Link href="/signup">Visit SignUp page</Link>
        </div>
    );
};

export default page;
