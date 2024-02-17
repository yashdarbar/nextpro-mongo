import { connect } from "@/app/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModels.js";

connect()

export async function POST(req:any) {
    try {
        const reqBody = await req.json();
        const { username, email, password } = reqBody;
        console.log(reqBody);
        //check if user already exists PS:it should be in await or else it'll give u a querry
        const user = await User.findOne({email})
        if (user) {
            return NextResponse.json({error: 'User already exists'},{ status: 500})
        }

        //hash the password
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({username, email, password: hashPassword})

        // const savedUser = newUser.saved()
        // console.log(savedUser);

        // return NextResponse.json({message:"user is successfully created!",
        // success: true,
        // savedUser})
        return NextResponse.json({
            message: "user is successfully created!",
            success: true,
        });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}
