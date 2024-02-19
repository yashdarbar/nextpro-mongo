import { connect } from "@/app/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModels.js";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        //checking user exists or not
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }
        console.log("user exists", user);

        //check if password is correct
        const vaildPassword = await bcryptjs.compare(password, user.password);
        if (!vaildPassword) {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 400 }
            );
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECERT!, {
            expiresIn: "1d",
        });

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });
        response.cookies.set("token", token, { httpOnly: true });
        return response;
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
