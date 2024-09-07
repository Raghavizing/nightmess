/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./style.css";
import Loading from "../components/loading/loading";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Snacks() {
    const router = useRouter();
    const [snacks, setSnacks] = useState([]);
    const [filteredSnacks, setFilteredSnacks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setfilter] = useState({
        category: "",
        block: "",
    });


    async function getSnacks() {
        try {
            setLoading(true);
            const res = await axios.get("/api/snacks/getAllSnacks");
            if (res.data.success) {
                setSnacks(res.data.snacks);
                setFilteredSnacks(res.data.snacks);
            } else {
                toast.error(res.data.error);
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getSnacks();
    }, []);
    useEffect(()=>{
        AOS.init({once:true})
    },[filteredSnacks])

    function handleChange(event: any) {
        const { name, value } = event.target;
        setfilter((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function filterSnacks(event: any) {
        event.preventDefault();
        setLoading(true);
        const x = snacks.filter((item: any) => {
            if (filter.category && filter.block) {
                return item.item_category === filter.category && item.item_block === filter.block;
            } else if (filter.category) {
                return item.item_category === filter.category;
            }
            else if (filter.block) {
                return item.item_block === filter.block;
            }
            else {
                return true;
            }
        });
        setFilteredSnacks(x);
        setLoading(false);
    }

    function Card({ listing_id, username, item_name, item_price, item_quantity, item_image }: any) {
        return (
            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 d-flex align-items-stretch mb-4" data-aos="fade-up">
                <div className="card shadow-sm">
                    <img
                        src={item_image}
                        className="card-img-top mx-auto"
                        alt={item_name}
                        style={{ maxHeight: "150px", objectFit: "contain" }}
                    />
                    <div className="card-body text-center">
                        <h5 className="card-title">{item_name}</h5>
                        <p className="card-text text-muted">Price: Rs{item_price}</p>
                        <p className="card-text text-muted">Quantity: {item_quantity}</p>
                        <p className="card-text text-muted">Seller: {username}</p>
                        <button
                            className="btn btn-primary mt-3"
                            id={listing_id}
                            onClick={() => {
                                router.push(`/snackDetails?id=${listing_id}`);
                            }}
                        >
                            Buy
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="d-flex align-items-center justify-content-center h-100 py-4 snacks-page">
            <div className="container">
                <h1 className="text-center mb-4">Snacks</h1>

                {/* Filter Form */}
                <form onSubmit={filterSnacks} className="form-group col-lg-6 col-md-8 col-sm-12 mx-auto">
                    <div className="my-2">
                        <label htmlFor="category" className="form-label">
                            Category:
                        </label>
                        <select
                            name="category"
                            id="category"
                            className="form-control"
                            onChange={handleChange}
                            value={filter.category}
                        >
                            <option value="">All</option>
                            <option value="biscuits">Biscuits</option>
                            <option value="chips">Chips</option>
                            <option value="sweets">Sweets</option>
                            <option value="noodles">Noodles</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                    <div className="my-2">
                        <label htmlFor="block" className="form-label my-auto">
                            Block:
                        </label>
                        <select
                            name="block"
                            id="block"
                            className="form-control"
                            onChange={handleChange}
                            value={filter.block}
                        >
                            <option value="">
                                All
                            </option>
                            <option value="R">R Block</option>
                            <option value="Q">Q Block</option>
                            <option value="K">K Block</option>
                            <option value="L">L Block</option>
                            <option value="N">N Block</option>
                        </select>
                    </div>
                    <div className="text-center">
                        <input type="submit" value="Submit" className="btn btn-dark" />
                    </div>
                </form>

                {/* Snack Cards */}
                <div className="row mt-4 d-flex justify-content-center align-items-strech" hidden={loading}>
                    {filteredSnacks.map((snack: any) => (
                        <Card key={snack._id} listing_id={snack._id} {...snack} />
                    ))}
                </div>

                {/* Loading Spinner */}
                <div hidden={!loading}>
                    <Loading />
                </div>
            </div>
        </div>
    );
}
