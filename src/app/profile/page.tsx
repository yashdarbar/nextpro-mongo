"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

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
        }

        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1>Profile</h1>
                <p>profile page</p>
                <hr />
                <button
                    onClick={logout}
                    className="bg-blue-500 px-2 py-1 rounded-sm"
                >
                    Logout
                </button>
            </div>
        );
    };

