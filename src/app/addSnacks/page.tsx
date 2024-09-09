"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function AddSnacks() {
    const [disableBtn, setDisableBtn] = useState(true);
    const [snack, setSnack] = useState({
        item_name: "",
        item_price: 0,
        item_category: "",
        item_image: null,
        item_quantity: 0,
        item_block: "",
        item_room: "",
    });

    function handleChange(event: any) {
        const { name, value } = event.target;
        if (name === "item_image") {
            const file = event.target.files[0];
            setSnack((prev) => {
                return {
                    ...prev,
                    [name]: file,
                };
            });
        } else {
            setSnack((prev) => {
                return {
                    ...prev,
                    [name]: value,
                };
            });
        }
    }

    useEffect(() => {
        if (
            snack.item_name.length === 0 ||
            snack.item_price === 0 ||
            !snack.item_image ||
            snack.item_block.length === 0
        ) {
            setDisableBtn(true);
        } else {
            setDisableBtn(false);
        }
    }, [snack]);

    async function uploadSnack(event: any) {
        event.preventDefault();
        const confirm = await Swal.fire({
            icon: "warning",
            title: "Do you want to add the listing?",
            showCancelButton: true,
            confirmButtonText: "Add",
            denyButtonText: `Cancel`,
        });
        if (confirm.value) {
            try {
                const formData = new FormData();
                formData.append("item_name", snack.item_name);
                formData.append("item_price", snack.item_price.toString());
                formData.append("item_category", snack.item_category);
                formData.append("item_image", snack.item_image!);
                formData.append("item_quantity", snack.item_quantity.toString());
                formData.append("item_block", snack.item_block);
                formData.append("item_room", snack.item_room);
                const res = await axios.post("/api/snacks/uploadSnack", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                if (res.data.success) {
                    toast.success(res.data.message);
                    setSnack({
                        item_name: "",
                        item_price: 0,
                        item_category: "",
                        item_image: null,
                        item_quantity: 0,
                        item_block: "",
                        item_room: "",
                    });
                } else {
                    toast.error(res.data.error);
                }
            } catch (error: any) {
                toast.error(error.message);
            }
        }
    }

    const blocks = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T",
    ];

    function generateBlockOptions(block: any) {
        return <option value={block}>{block} Block</option>;
    }

    return (
        <div className="page py-5">
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
                <h1 className="text-center fw-bold mb-4" style={{ color: "#333" }}>Add Snack</h1>

                {/* Snack Form */}
                <form 
                    onSubmit={uploadSnack} 
                    className="form-group p-4 shadow-lg bg-white rounded-lg" 
                    encType="multipart/form-data" 
                    style={{ borderRadius: "15px" }}
                >
                    <div className="mb-3">
                        <label htmlFor="item_name" className="form-label fw-bold">Item Name:</label>
                        <input
                            type="text"
                            className="form-control p-2 rounded-pill shadow-sm"
                            id="item_name"
                            name="item_name"
                            placeholder="Name"
                            onChange={handleChange}
                            required
                            value={snack.item_name}
                            style={{ transition: "box-shadow 0.3s ease-in-out" }}
                            onFocus={(e) => e.target.style.boxShadow = '0 0 10px rgba(0, 123, 255, 0.5)'}
                            onBlur={(e) => e.target.style.boxShadow = 'none'}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="item_price" className="form-label fw-bold">Item Price:</label>
                        <input
                            type="number"
                            className="form-control p-2 rounded-pill shadow-sm"
                            id="item_price"
                            name="item_price"
                            placeholder="Price (INR)"
                            onChange={handleChange}
                            required
                            value={snack.item_price}
                            min={1}
                            style={{ transition: "box-shadow 0.3s ease-in-out" }}
                            onFocus={(e) => e.target.style.boxShadow = '0 0 10px rgba(0, 123, 255, 0.5)'}
                            onBlur={(e) => e.target.style.boxShadow = 'none'}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="item_quantity" className="form-label fw-bold">Item Quantity:</label>
                        <input
                            type="number"
                            className="form-control p-2 rounded-pill shadow-sm"
                            id="item_quantity"
                            name="item_quantity"
                            placeholder="Quantity"
                            onChange={handleChange}
                            required
                            value={snack.item_quantity}
                            min={1}
                            style={{ transition: "box-shadow 0.3s ease-in-out" }}
                            onFocus={(e) => e.target.style.boxShadow = '0 0 10px rgba(0, 123, 255, 0.5)'}
                            onBlur={(e) => e.target.style.boxShadow = 'none'}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="item_category" className="form-label fw-bold">Item Category:</label>
                        <select
                            name="item_category"
                            id="item_category"
                            className="form-control p-2 rounded-pill shadow-sm"
                            onChange={handleChange}
                            value={snack.item_category}
                        >
                            <option value="" disabled>Select</option>
                            <option value="biscuits">Biscuits</option>
                            <option value="chips">Chips</option>
                            <option value="sweets">Sweets</option>
                            <option value="noodles">Noodles</option>
                            <option value="others">Others</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="item_block" className="form-label fw-bold">Block:</label>
                        <select
                            name="item_block"
                            id="item_block"
                            className="form-control p-2 rounded-pill shadow-sm"
                            onChange={handleChange}
                            value={snack.item_block}
                        >
                            <option value="" disabled>Select</option>
                            {blocks.map(generateBlockOptions)}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="item_room" className="form-label fw-bold">Room Number:</label>
                        <input
                            type="text"
                            className="form-control p-2 rounded-pill shadow-sm"
                            name="item_room"
                            id="item_room"
                            placeholder="Room Number"
                            onChange={handleChange}
                            value={snack.item_room}
                            required
                            style={{ transition: "box-shadow 0.3s ease-in-out" }}
                            onFocus={(e) => e.target.style.boxShadow = '0 0 10px rgba(0, 123, 255, 0.5)'}
                            onBlur={(e) => e.target.style.boxShadow = 'none'}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="item_image" className="form-label fw-bold">Item Image:</label>
                        <input
                            type="file"
                            className="form-control p-2 rounded-pill shadow-sm"
                            name="item_image"
                            id="item_image"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="text-center">
                        <input
                            type="submit"
                            value="Submit"
                            className="btn btn-dark rounded-pill px-4 py-2 shadow-sm"
                            disabled={disableBtn}
                        />
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

    );
}
