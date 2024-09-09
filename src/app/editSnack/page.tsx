"use client"
import axios from "axios";
import Loading from "@/app/components/loading/loading";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function EditSnack() {
    const [originalSnack, setOriginalSnack] = useState({
        item_name: "",
        item_price: 0,
        item_quantity: 0,
        item_category: "",
        item_block: "",
        item_image: null,
        item_room: ""
    });
    const [id, setId] = useState('');
    const [disableBtn, setDisableBtn] = useState(true);
    const [loading, setLoading] = useState(false);
    const [snack, setSnack] = useState({
        item_name: "",
        item_price: 0,
        item_quantity: 0,
        item_category: "",
        item_block: "",
        item_image: null,
        item_room: ""
    });
    const searchParams = useSearchParams();
    const router = useRouter();
    const blocks = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T"];
    
    function generateBlockOptions(block: any) {
        return (
            <option key={block} value={block}>{block} Block</option>
        );
    }

    async function updateSnack(event: any) {
        event.preventDefault();
        setLoading(true);
        const confirm = await Swal.fire({
            icon: "warning",
            title: "Do you want to update the listing?",
            showCancelButton: true,
            confirmButtonText: "Update",
            denyButtonText: `Cancel`
        });
        if (confirm.value) {
            try {
                const formData = new FormData();
                formData.append("item_id", id);
                formData.append("item_name", snack.item_name);
                formData.append("item_price", snack.item_price.toString());
                formData.append("item_category", snack.item_category);
                formData.append("item_image", snack.item_image || '');
                formData.append("item_quantity", snack.item_quantity.toString());
                formData.append("item_block", snack.item_block);
                formData.append("item_room", snack.item_room);
                const res = await axios.post("/api/snacks/updateSnack", formData);
                if (res.data.success) {
                    toast.success(res.data.message);
                    router.push("/profile");
                } else {
                    toast.error(res.data.error);
                }
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }

    function handleChange(event: any) {
        const { name, value } = event.target;
        if (name === "item_image") {
            const file = event.target.files[0];
            setSnack((prev) => ({
                ...prev,
                [name]: file
            }));
        } else {
            setSnack((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    }

    async function getSnack(listing_id: any) {
        setLoading(true);
        try {
            const res = await axios.post("./api/snacks/verifyUserAndGetSnack", { id: listing_id });
            if (res.data.success) {
                res.data.snack.item_image = null;
                setOriginalSnack(res.data.snack);
                setSnack(res.data.snack);
            } else {
                toast.error(res.data.error);
                router.push("/");
            }
        } catch (error: any) {
            toast.error(error.message);
            router.push("/");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const id = searchParams.get("id");
        if (id && id.length > 0) {
            setId(id);
            getSnack(id);
        } else {
            toast.error("Some Error Has Occurred");
            router.push("/");
        }
    }, [searchParams]);

    useEffect(() => {
        const isEqual =
            snack.item_name === originalSnack.item_name &&
            snack.item_price === originalSnack.item_price &&
            snack.item_quantity === originalSnack.item_quantity &&
            snack.item_category === originalSnack.item_category &&
            snack.item_block === originalSnack.item_block &&
            !snack.item_image &&
            snack.item_room === originalSnack.item_room;

        if (isEqual || !snack.item_name || !snack.item_block || !snack.item_category || !snack.item_quantity || !snack.item_room) {
            setDisableBtn(true);
        } else {
            setDisableBtn(false);
        }
    }, [snack, originalSnack]);

    return (
        <div className="page py-5">
    <div className="container">
        <div className="row justify-content-center align-items-center mx-auto">
            <div className="col-12 col-md-8 col-lg-6">
                <h1 className="text-center fw-bold mb-4">Update Snack</h1>

                {/* Snack Update Form */}
                <form onSubmit={updateSnack} className="form-group p-4 shadow-lg bg-white rounded-2" hidden={loading} encType="multipart/form-data">
                    <input 
                        type="text" 
                        className="form-control my-3 p-2 rounded-pill shadow-sm" 
                        id="name" 
                        name="item_name" 
                        placeholder="Snack Name" 
                        onChange={handleChange} 
                        required 
                        value={snack.item_name} 
                    />

                    <input 
                        type="number" 
                        className="form-control my-3 p-2 rounded-pill shadow-sm" 
                        id="price" 
                        name="item_price" 
                        placeholder="Price (INR)" 
                        onChange={handleChange} 
                        required 
                        value={snack.item_price} 
                        min={1} 
                    />

                    <input 
                        type="number" 
                        className="form-control my-3 p-2 rounded-pill shadow-sm" 
                        id="quantity" 
                        name="item_quantity" 
                        placeholder="Quantity" 
                        onChange={handleChange} 
                        required 
                        value={snack.item_quantity} 
                        min={1} 
                    />

                    <div className="my-3">
                        <label htmlFor="category" className="form-label fw-bold">Category:</label>
                        <select 
                            name="item_category" 
                            id="category" 
                            className="form-control form-select shadow-sm rounded-pill p-2" 
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

                    <div className="my-3">
                        <label htmlFor="block" className="form-label fw-bold">Block:</label>
                        <select 
                            name="item_block" 
                            id="block" 
                            className="form-control form-select shadow-sm rounded-pill p-2" 
                            onChange={handleChange} 
                            value={snack.item_block}
                        >
                            <option value="" disabled>Select</option>
                            {blocks.map(generateBlockOptions)}
                        </select>
                    </div>

                    <div className="my-3">
                        <label htmlFor="item_room" className="form-label fw-bold">Room Number:</label>
                        <input 
                            type="text" 
                            name="item_room" 
                            id="item_room" 
                            className="form-control my-3 p-2 rounded-pill shadow-sm" 
                            placeholder="Room Number" 
                            onChange={handleChange} 
                            value={snack.item_room} 
                            required 
                        />
                    </div>

                    <input 
                        type="file" 
                        name="item_image" 
                        id="item_image" 
                        className="form-control my-3 p-2 rounded-pill shadow-sm" 
                        onChange={handleChange} 
                    />

                    <div className="my-3 text-center">
                        <input 
                            type="submit" 
                            value="Submit" 
                            className="btn btn-dark rounded-pill px-4 py-2 shadow-sm" 
                            disabled={disableBtn} 
                        />
                    </div>
                </form>

                {/* Loading Spinner */}
                <div hidden={!loading}>
                    <Loading />
                </div>
            </div>
        </div>
    </div>
</div>

    );
}
