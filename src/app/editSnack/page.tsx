"use client"
import axios from "axios";
import Loading from "@/app/components/loading/loading"
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import Swal from "sweetalert2";
export default function EditSnack() {
    const [originalSnack, setOriginalSnack] = useState({
        item_name: "",
        item_price: 0,
        item_quantity: 0,
        item_category: "",
        item_block: "",
        item_image: "",
        item_room:""
    });
    const [disableBtn, setDisableBtn] = useState(true);
    const [loading, setLoading] = useState(false);
    const [snack, setSnack] = useState({
        item_name: "",
        item_price: 0,
        item_quantity: 0,
        item_category: "",
        item_block: "",
        item_image: "",
        item_room:""
    });
    const searchParams = useSearchParams();
    const router = useRouter();
    async function updateSnack(event: any) {
        event.preventDefault();
        setLoading(true);
        const confirm = await Swal.fire({
            icon: "warning",
            title: "Do you want to update the listing?",
            showCancelButton: true,
            confirmButtonText: "Update",
            denyButtonText: `Cancel`
        })
        if (confirm.value) {
            try {
                const res = await axios.post("/api/snacks/updateSnack", { snack: snack });
                if (res.data.success) {
                    toast.success(res.data.message);
                    router.push("/profile");
                }
                else {
                    toast.error(res.data.error);
                }
            }
            catch (error: any) {
                toast.error(error.message);
            }
            finally {
                setLoading(false);
            }
        }
        else {
            setLoading(false);
        }
    }
    function handleChange(event: any) {
        const { name, value } = event.target
        setSnack((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    async function getSnack(listing_id: any) {
        setLoading(true);
        try {
            const res = await axios.post("./api/snacks/verifyUserAndGetSnack", { id: listing_id });
            if (res.data.success) {
                setOriginalSnack(res.data.snack);
                setSnack(res.data.snack)
            }
            else {
                toast.error(res.data.error);
                router.push("/");
            }
        }
        catch (error: any) {
            toast.error(error.mesage);
            router.push("/");
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        const id = searchParams.get("id");
        if (id && id?.length > 0) {
            getSnack(id);
        }
        else {
            toast.error("Some Error Has Occurred");
            router.push("/");
        }
    }, [searchParams])
    useEffect(() => {
        const isEqual =
            snack.item_name === originalSnack?.item_name &&
            snack.item_price === originalSnack?.item_price &&
            snack.item_quantity === originalSnack?.item_quantity &&
            snack.item_category === originalSnack?.item_category &&
            snack.item_block === originalSnack?.item_block &&
            snack.item_image === originalSnack?.item_image &&
            snack.item_room === originalSnack?.item_room;
        if (isEqual || snack.item_name.length === 0 || snack.item_block.length === 0 || snack.item_category.length === 0 || snack.item_quantity === 0 || snack.item_price === 0 || snack.item_room.length===0) {
            setDisableBtn(true);
        }
        else {
            setDisableBtn(false);
        }
    }, [snack, originalSnack])
    return (<div className="d-flex align-items-center justify-content-center h-100">
        <div>
            <h1>Update Snack</h1>
            <form onSubmit={updateSnack} className="form-group" hidden={loading}>
                <input type="text" className="form-control my-2" id="name" name="item_name" placeholder="Name" onChange={handleChange} required value={snack.item_name} />
                <input type="number" className="form-control my-2" id="price" name="item_price" placeholder="Price(INR)" onChange={handleChange} required value={snack.item_price} min={1} />
                <input type="number" className="form-control my-2" id="quantity" name="item_quantity" placeholder="Quantity" onChange={handleChange} required value={snack.item_quantity} min={1} />
                <div className="my-2">
                    <label htmlFor="category" className="form-label">Category:</label>
                    <select name="item_category" id="category" className="form-control" onChange={handleChange} value={snack.item_category}>
                        <option value="" disabled>Select</option>
                        <option value="biscuits">Biscuits</option>
                        <option value="chips">Chips</option>
                        <option value="sweets">Sweets</option>
                        <option value="noodles">Noodles</option>
                        <option value="others">Others</option>
                    </select>
                </div>
                <div className="my-2">
                    <label htmlFor="block" className="form-label my-auto">Block:</label>
                    <select name="item_block" id="block" className="form-control" onChange={handleChange} value={snack.item_block}>
                        <option value="" disabled>Select</option>
                        <option value="R">R Block</option>
                        <option value="Q">Q Block</option>
                        <option value="K">K Block </option>
                        <option value="L">L Block</option>
                        <option value="N">N Block</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="item_room" className="form-label my-auto">Room Number:</label>
                    <input type="text" name="item_room" id="item_room" className="form-control my-2" placeholder="Room Number" onChange={handleChange} value={snack.item_room} required />
                </div>
                <input type="url" name="item_image" id="image" className="form-control my-2" placeholder="Image URL" onChange={handleChange} value={snack.item_image} required />
                <div className="my-2 text-center"><input type="submit" value="Submit" className="btn btn-dark" disabled={disableBtn} /></div>
            </form>
            <div hidden={!loading}>
                <Loading />
            </div>
        </div>
    </div>)
}