import Connect from "@/app/dbConfig/dbConfig";
import Snack from "@/app/models/snack/snack";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
Connect();
export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        const user = await currentUser();
        if (user) {
            if (req) {
                const snack = new Snack({
                    user_id: user.id,
                    username: user.fullName,
                    user_email: user.primaryEmailAddress?.emailAddress,
                    user_phone: user.primaryPhoneNumber?.phoneNumber,
                    item_name: req.item_name,
                    item_price: parseInt(req.item_price),
                    item_category: req.item_category,
                    item_image: req.item_image,
                    item_quantity: parseInt(req.item_quantity),
                    item_block: req.item_block,
                    item_room: req.item_room

                })
                console.log(snack);
                await snack.save();
                return NextResponse.json({ success: true, message: "Added Successfully" });
            }
            else {
                return NextResponse.json({ error: "Some error has occurrred", status: 500 });
            }
        }
        else {
            return NextResponse.json({ error: "Some error has occurrred", status: 500 });
        }
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message, status: 500 });
    }
}