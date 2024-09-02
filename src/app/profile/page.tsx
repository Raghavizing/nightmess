/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client"

import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loading from "../components/loading/loading";
import Swal from "sweetalert2";
import Link from "next/link";
import AOS from 'aos';
import 'aos/dist/aos.css';
export default function Profile() {
    const router = useRouter();
    const [userSnacks, setUserSnacks] = useState([]);
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(false);
    async function getUser() {
        try {
            const res = await axios.get("/api/user/getUser");
            if (res.data.success) {
                setUser(res.data.user);
                console.log(res.data.user);
            }
            else {
                toast.error(res.data.error);

            }
        }
        catch (error: any) {
            toast.error(error.message)
        }
    }
    async function getUserSnacks() {
        try {
            setLoading(true);
            const res = await axios.get("/api/snacks/getUserSnacks");
            if (res.data.success) {
                setUserSnacks(res.data.snacks);
            } else {
                toast.error(res.data.error);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }
    function updateListing(event: any) {
        router.push(`/editSnack?id=${event.target.id}`);
    }
    async function deleteListing(event: any) {
        const confirm = await Swal.fire({
            icon: "warning",
            title: "Do you want to delete the listing?",
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Cancel`
        })
        if (confirm.value) {
            const res = await axios.post("/api/snacks/deleteSnack", { id: event.target.id });
            if (res.data.success) {
                toast.success(res.data.message);
                getUserSnacks();
            }
            else {
                toast.error(res.data.error);
            }
        }
    }
    function Card({ listing_id, username, item_name, item_price, item_quantity, item_image }: any) {
        return (
            <div className="card col-3 m-3 p-3 shadow-sm" data-aos="fade-up">
                <img src={item_image} className="card-img-top mx-auto" alt={item_name} style={{ maxHeight: '150px', objectFit: 'contain' }} />
                <div className="card-body">
                    <h5 className="card-title text-center">{item_name}</h5>
                    <p className="card-text text-center text-muted">Price: ${item_price}</p>
                    <p className="card-text text-center text-muted">Quantity: {item_quantity}</p>
                    <p className="card-text text-center text-muted">Seller: {username}</p>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-primary mx-2" id={listing_id} onClick={updateListing}>Edit</button>
                        <button className="btn btn-danger mx-2" id={listing_id} onClick={deleteListing}>Delete</button>
                    </div>
                </div>
            </div>
        );
    }
    useEffect(() => {
        AOS.init();
        getUser();
        getUserSnacks();
    }, [])
    return (<div className="d-flex justify-content-center align-items-center">
        <div>
            <h1 className="text-center">Profile</h1>
            <div hidden={loading}>
                <h1 className="text-center">My Snacks</h1>
                <div className="d-flex justify-content-center align-items-center row" hidden={(userSnacks.length===0)}>
                    {userSnacks.map((snack: any) => (
                        <Card key={snack._id} listing_id={snack._id} {...snack} />
                    ))}
                </div>
                <div className="text-center" hidden={!(userSnacks.length===0)}>
                    <h2>It's so empty here</h2>
                    <Link href="/addSnacks"><p>Add Some Snacks</p></Link>
                </div>
            </div>
            <div hidden={!loading}>
                <Loading />
            </div>
        </div>

    </div>)
}