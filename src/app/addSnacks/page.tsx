"use client"
import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import Swal from "sweetalert2";
export default function AddSnacks() {
    const [disableBtn, setDisableBtn] = useState(true);
    const [snack, setSnack] = useState({
        item_name: "",
        item_price: 0,
        item_category: "",
        item_image: "",
        item_quantity: 0,
        item_block: "",
        item_room:"",
    })
    function handleChange(event: any) {
        const { name, value } = event.target
        setSnack((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    useEffect(() => {
        if (snack.item_name.length === 0 || snack.item_price === 0 || snack.item_image.length === 0 || snack.item_block.length === 0) {
            setDisableBtn(true);
        }
        else {
            setDisableBtn(false);
        }
    }, [snack])
    async function uploadSnack(event: any) {
        event.preventDefault();
        const confirm = await Swal.fire({
            icon: "warning",
            title: "Do you want to add the listing?",
            showCancelButton: true,
            confirmButtonText: "Add",
            denyButtonText: `Cancel`
        })
        if (confirm.value) {
            try {
                const res = await axios.post("/api/snacks/uploadSnack", snack);
                if (res.data.success) {
                    toast.success(res.data.message);
                    setSnack({
                        item_name: "",
                        item_price: 0,
                        item_category: "",
                        item_image: "",
                        item_quantity: 0,
                        item_block: "",
                        item_room:"",
                    })
                }
                else {
                    toast.error(res.data.error);
                }
            }
            catch (error: any) {
                toast.error(error.message);
            }
        }
    }
    return (
        <div className="d-flex my-4 justify-content-center align-items-center">
            <div className="row mx-auto">
                <h1 className="text-center">Add Snack</h1>
                <form onSubmit={uploadSnack} className="form-group">
                    <div>
                        <label htmlFor="item_name">Item Name:</label>
                        <input type="text" className="form-control my-2" id="item_name" name="item_name" placeholder="Name" onChange={handleChange} required value={snack.item_name} />
                    </div>
                    <div>
                        <label htmlFor="item_price">Item Price:</label>
                        <input type="number" className="form-control my-2" id="item_price" name="item_price" placeholder="Price(INR)" onChange={handleChange} required value={snack.item_price} min={1} />
                    </div>
                    <div>
                        <label htmlFor="item_quantity">Item Quantity:</label>
                        <input type="number" className="form-control my-2" id="item_quantity" name="item_quantity" placeholder="Quantity" onChange={handleChange} required value={snack.item_quantity} min={1} />
                    </div>
                    <div className="my-2">
                        <label htmlFor="item_category" className="form-label">Item Category:</label>
                        <select name="item_category" id="item_category" className="form-control" onChange={handleChange} value={snack.item_category}>
                            <option value="" disabled>Select</option>
                            <option value="biscuits">Biscuits</option>
                            <option value="chips">Chips</option>
                            <option value="sweets">Sweets</option>
                            <option value="noodles">Noodles</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                    <div className="my-2">
                        <label htmlFor="item_block" className="form-label my-auto">Block:</label>
                        <select name="item_block" id="item_block" className="form-control" onChange={handleChange} value={snack.item_block}>
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
                    <div>
                        <label htmlFor="item_image" className="form-label my-auto">Item Image:</label>
                        <input type="url" name="item_image" id="item_image" className="form-control my-2" placeholder="Image URL" onChange={handleChange} value={snack.item_image} required />
                    </div>
                    <div className="my-2 text-center"><input type="submit" value="Submit" className="btn btn-dark" disabled={disableBtn} /></div>
                </form>
            </div>
        </div>
    )
}