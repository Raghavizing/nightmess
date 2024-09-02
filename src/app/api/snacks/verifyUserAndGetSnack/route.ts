import Connect from "@/app/dbConfig/dbConfig";
import Snack from "@/app/models/snack/snack";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
Connect();
export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        const user = await currentUser();
        const snack = await Snack.findById(req.id);
        if (snack) {
            if(snack.user_id===user?.id){
            return NextResponse.json({ success: true, snack: snack });
            }
            else{
                return NextResponse.json({ error: "Not authorized to modify", status: 403 });
            }
        }
        else {
            return NextResponse.json({ error: "Item not found", status: 500 });
        }
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message, status: 500 });
    }
}