import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import { connect } from "@/app/dbconfig/dbconfig";
import { getTheTokenData } from "@/helpers/getTheTokenData";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getTheTokenData(request);
        const user = await User.findOne({ _id: userId }).select("-password");
        return NextResponse.json({ message: "User found", data: user });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 404 });
    }
}
