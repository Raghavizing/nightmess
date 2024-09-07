/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client"

import axios from "axios";
import { useEffect, useState } from "react";
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
    const [user, setUser] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [userLoading, setUserLoading] = useState(true);
    async function getUser() {
        try {
            setUserLoading(true);
            const res = await axios.get("/api/user/getUser");
            if (res.data.success) {
                setUser(res.data.user);
                console.log(res.data.user);
            } else {
                toast.error(res.data.error);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
        finally{
            setUserLoading(false);
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
        } finally {
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
            denyButtonText: `Cancel`,
        });
        if (confirm.value) {
            const res = await axios.post("/api/snacks/deleteSnack", { id: event.target.id });
            if (res.data.success) {
                toast.success(res.data.message);
                getUserSnacks();
            } else {
                toast.error(res.data.error);
            }
        }
    }

    function Card({ listing_id, username, item_name, item_price, item_quantity, item_image, item_block,item_room }: any) {
        return (
            <div className="card col-md-4 col-sm-6 col-12 m-3 p-3 shadow-sm" data-aos="fade-up">
                <img src={item_image} className="card-img-top mx-auto" alt={item_name} style={{ maxHeight: '150px', objectFit: 'contain' }} />
                <div className="card-body">
                    <h5 className="card-title text-center">{item_name}</h5>
                    <p className="card-text text-center text-muted">Price: ${item_price}</p>
                    <p className="card-text text-center text-muted">Quantity: {item_quantity}</p>
                    <p className="card-text text-center text-muted">Seller: {username}</p>
                    <p className="card-text text-center text-muted">Room: {item_block}-{item_room}</p>
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
    }, []);

    return (
        <div className="container py-5" style={{ minHeight: "100vh" }}>
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center">Profile</h1>
                    <div className="user-details mt-4 d-flex justify-content-center">
                        <div className="card p-4 shadow-sm" style={{ maxWidth: '400px' }} hidden={userLoading}>
                            <img
                                src={user.imageUrl}
                                alt="User Profile"
                                className="rounded-circle mx-auto"
                                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                            />
                            <h3 className="mt-3 text-center">
                                {user.firstName} {user.lastName}
                            </h3>
                            <p className="text-center text-muted"> {user.emailAddresses && user.emailAddresses.length > 0 ? user.emailAddresses[0].emailAddress : 'Email not available'}</p>
                            <p className="text-center text-muted">
                                Joined on: {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div hidden={!userLoading}>
                            <Loading />
                        </div>
                    </div>
                    {/* Snack listing section */}
                    <div className="mt-5">
                        <h2 className="text-center">My Snacks</h2>
                        <div className="row justify-content-center">
                            {loading && <Loading />}
                            {!loading && userSnacks.length === 0 && (
                                <div className="text-center">
                                    <h4>It's so empty here</h4>
                                    <Link href="/addSnacks">
                                        <p>Add Some Snacks</p>
                                    </Link>
                                </div>
                            )}
                            {!loading && userSnacks.length > 0 && userSnacks.map((snack: any) => (
                                <Card key={snack._id} listing_id={snack._id} {...snack} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
