import Connect from "@/app/dbConfig/dbConfig";
import Snack from "@/app/models/snack/snack";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
Connect();
export async function GET(request: NextRequest) {
    try {
        const user = await currentUser();
        const snacks = await Snack.find({ user_id: { $ne: user!.id } });
        if (snacks) {
            return NextResponse.json({ success: true, snacks: snacks });
        }
        else {
            return NextResponse.json({ error: "Some error has occured, please try again later", status: 500 });
        }
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message, status: 500 });
    }
}