import Connect from "@/app/dbConfig/dbConfig";
import mongoose, { Schema } from "mongoose";
Connect();
const snackSchema = new Schema({
    user_id: String,
    username: String,
    user_email: String,
    item_name: String,
    item_price: Number,
    item_image: String,
    item_category: String,
    item_block: String,
    item_quantity: Number

});
const Snack = mongoose.models.snacks || mongoose.model("snacks", snackSchema);
export default Snack