import Connect from "@/app/dbConfig/dbConfig";
import Snack from "@/app/models/snack/snack";
import { NextRequest, NextResponse } from "next/server";
Connect();
export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        if (req.snack) {
            const updated = await Snack.findByIdAndUpdate(req.snack._id,{...req.snack});
            if (updated) {
                return NextResponse.json({ success: true, message: "Updated Successfully" });
            }
            else {
                return NextResponse.json({ error: "Some Error Has Occurred", status: 500 });
            }
        }
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message, status: 500 });
    }
}