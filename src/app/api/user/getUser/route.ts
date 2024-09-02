import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const user = await currentUser();
        if (user) {
            return NextResponse.json({ success: true, user: user });
        }
        else {
            return NextResponse.json({ message: "Some error occurred", status: 500 });
        }
    }
    catch (error: any) {
        return NextResponse.json({ message: error.message, status: 500 });
    }

}