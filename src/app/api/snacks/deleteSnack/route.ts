import Connect from "@/app/dbConfig/dbConfig";
import Snack from "@/app/models/snack/snack";
import { NextRequest, NextResponse } from "next/server";
Connect();
export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        if (req.id) {
            const snack = await Snack.findByIdAndDelete(req.id);
            if (snack) {
                return NextResponse.json({ success: true, message: "Item deleted successfully" });
            }
            else {
                return NextResponse.json({ error: "Listing not found", status: 500 });
            }
        }
        else {
            return NextResponse.json({ error: "Some error has occured", status: 500 });
        }
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message, status: 500 });
    }
}