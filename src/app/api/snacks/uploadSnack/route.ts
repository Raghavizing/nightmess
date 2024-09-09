import Connect from "@/app/utils/dbConfig/dbConfig";
import Snack from "@/app/models/snack/snack";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import CloudinaryUpload from "@/app/utils/cloudinary/cloudinary"
Connect();

export async function POST(request: NextRequest) {
    try {
        const req = await request.formData();
        const file = req.get("item_image") as File;
        if (!(file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png')) {
            return NextResponse.json({ error: "Invalid File Type", status: 422 })
        }
        const fileBuffer = await file.arrayBuffer();

        const mimeType = file.type;
        const encoding = "base64";
        const base64Data = Buffer.from(fileBuffer).toString("base64");

        // this will be used to upload the file
        const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

        const res = await CloudinaryUpload(fileUri, file.name);
        if (res.success && res.result) {
            const image_url = res.result.url;
            const user = await currentUser();
            if (user) {
                if (req) {
                    const snack = new Snack({
                        user_id: user.id,
                        username: user.fullName,
                        user_email: user.primaryEmailAddress?.emailAddress,
                        user_phone: user.primaryPhoneNumber?.phoneNumber,
                        item_name: req.get("item_name"),
                        item_price: req.get("item_price"),
                        item_category:req.get("item_category"),
                        item_image: image_url,
                        item_quantity: req.get("item_quantity"),
                        item_block: req.get("item_block"),
                        item_room: req.get("item_room")

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

        } else return NextResponse.json({ error: "File Upload Unsuccessful", status: 500 });

    }
    catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message, status: 500 });
    }
}