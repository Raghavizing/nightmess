import Connect from "@/app/utils/dbConfig/dbConfig";
import Snack from "@/app/models/snack/snack";
import { NextRequest, NextResponse } from "next/server";
import CloudinaryUpload from "@/app/utils/cloudinary/cloudinary"
Connect();
export async function POST(request: NextRequest) {
    try {
        const req = await request.formData();
        if (req) {
            const snack = await Snack.findById(req.get("item_id"));
            if (snack) {
                snack.item_name = req.get("item_name");
                snack.item_price = req.get("item_price");
                snack.item_quantity = req.get("item_quantity");
                snack.item_category = req.get("item_category");
                snack.item_block = req.get("item_block");
                snack.item_room = req.get("item_room");
                const file = req.get("item_image") as File;
                if (file) {
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
                        snack.item_image = res.result.url;
                        console.log(res.result.url);
                    }
                    else {
                        return NextResponse.json({ error: "Some error occurred while uploading the image", status: 500 })
                    }
                }
                await snack.save();
                return NextResponse.json({ success: true, message: "Updated Successfully" });
            }
            else {
                return NextResponse.json({ error: "Snack not found", status: 500 });
            }
        }
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message, status: 500 });
    }
}


