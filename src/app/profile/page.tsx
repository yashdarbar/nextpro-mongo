"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function Profile() {
    const router = useRouter();

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logged out successfully");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const [data, setData] = useState("nothing");

    const getUserDetails = async () => {
        const response = await axios.get("/api/users/me");
        console.log(response.data);
        setData(response.data.data._id);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1>Profile</h1>
            <p>profile page</p>
            <hr />
            <h2>
                {data === "nothing" ?
                    "nothing"
                 :
                    <Link href={`/profile/${data}`}>{data}</Link>
                }
            </h2>
            <button
                onClick={logout}
                className="bg-blue-500 px-2 py-1 rounded-sm"
            >
                Logout
            </button>
            <button
                onClick={getUserDetails}
                className="bg-green-500 px-2 mt-2 py-1 rounded-sm"
            >
                Get User Details
            </button>
        </div>
    );
}
