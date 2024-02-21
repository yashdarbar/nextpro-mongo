import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getTheTokenData = (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || '';
        const decodedTokenData:any = jwt.verify(token, process.env.TOKEN_SECERT!)
        return decodedTokenData.id;
        
    } catch (error: any) {
        throw new Error(error.message);
    }
}
