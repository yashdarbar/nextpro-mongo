import React from "react";

const userProfile = ({ params }: any) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1>Profile</h1>
            <p>profile page {params.id}</p>
        </div>
    );
};

export default userProfile;
