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

    function Card({ listing_id, username, item_name, item_price, item_quantity, item_image, item_block, item_room }: any) {
        return (
            <div 
                className="card col-md-4 col-sm-6 col-12 m-3 p-3 shadow-lg rounded-lg border-0" 
                data-aos="fade-up" 
                style={{ transition: "transform 0.3s", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
                <img 
                    src={item_image} 
                    className="card-img-top mx-auto rounded" 
                    alt={item_name} 
                    style={{ maxHeight: '150px', objectFit:"contain", borderRadius: "8px" }} 
                />
                <div className="card-body">
                    <h5 className="card-title text-center fw-bold">{item_name}</h5>
                    <p className="card-text text-center text-muted">Price: Rs {item_price}</p>
                    <p className="card-text text-center text-muted">Quantity: {item_quantity}</p>
                    <p className="card-text text-center text-muted">Seller: {username}</p>
                    <p className="card-text text-center text-muted">Room: {item_block}-{item_room}</p>
                    <div className="d-flex justify-content-center mt-3">
                        <button className="btn btn-outline-primary mx-2" id={listing_id} onClick={updateListing}>
                            Edit
                        </button>
                        <button className="btn btn-outline-danger mx-2" id={listing_id} onClick={deleteListing}>
                            Delete
                        </button>
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
        <div className="page py-5">
    <div className="container">
        <div className="col-12">
            <h1 className="text-center fw-bold mb-4">Profile</h1>

            {/* User Details */}
            <div className="user-details d-flex justify-content-center">
                <div className="card p-4 shadow-lg border-0 rounded-lg text-center" style={{ maxWidth: '400px' }} hidden={userLoading}>
                    <img
                        src={user.imageUrl}
                        alt="User Profile"
                        className="rounded-circle mx-auto shadow-sm"
                        style={{ width: '150px', height: '150px', objectFit: 'cover', border: '5px solid #fff' }}
                    />
                    <h3 className="mt-3 fw-bold" hidden={(!user.firstName || user.firstName.length === 0) && (!user.lastName || user.lastName.length === 0)}>
                        {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-center text-muted">Phone: {user.phoneNumbers && user.phoneNumbers.length > 0 ? user.phoneNumbers[0].phoneNumber : 'Not available'}</p>
                    <p className="text-center text-muted">Email: {user.emailAddresses && user.emailAddresses.length > 0 ? user.emailAddresses[0].emailAddress : 'Not available'}</p>
                    <p className="text-center text-muted">
                        Joined on: {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                </div>

                <div hidden={!userLoading}>
                    <Loading />
                </div>
            </div>

            {/* Snack Listing Section */}
            <div className="mt-5">
                <h2 className="text-center fw-bold mb-4">My Snacks</h2>

                <div className="row justify-content-center">
                    {loading && <Loading />}
                    {!loading && userSnacks.length === 0 && (
                        <div className="text-center">
                            <h4 className="text-muted">It's so empty here</h4>
                            <Link href="/addSnacks">
                                <p className="text-primary">Add Some Snacks</p>
                            </Link>
                        </div>
                    )}

                    {/* User's Snack Cards */}
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
