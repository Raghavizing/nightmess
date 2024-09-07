/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../components/loading/loading";

export default function SnackDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [snack, setSnack] = useState<any>({});
  const [loading, setLoading] = useState(false);

  async function getSnackDetails(item_id: any) {
    try {
      setLoading(true);
      const res = await axios.post("/api/snacks/getSnackById", { id: item_id });
      if (res.data.success) {
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
    const item_id = searchParams.get("id");
    if (item_id && item_id.length > 0) {
      getSnackDetails(item_id);
    } else {
      toast.error("Invalid Route");
      router.push("/");
    }
  }, [searchParams]);

  return (
    <div className="container my-5">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Loading />
        </div>
      ) : (
        <div className="row">
          {/* Snack Image */}
          <div className="col-md-6 text-center my-auto">
            <img
              src={snack.item_image}
              alt={snack.item_name}
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
          </div>

          {/* Snack Details */}
          <div className="col-md-6">
            <h1>{snack.item_name}</h1>
            <p className="text-muted">
              <strong>Category:</strong> {snack.item_category}
            </p>
            <p className="text-muted">
              <strong>Price:</strong> Rs {snack.item_price}
            </p>
            <p className="text-muted">
              <strong>Quantity:</strong> {snack.item_quantity}
            </p>
            <p className="text-muted">
              <strong>Location:</strong> Block {snack.item_block}, Room {snack.item_room}
            </p>

            {/* Seller Info */}
            <div className="mt-4">
              <h4>Seller Information</h4>
              <p className="text-muted" hidden={!snack.username || snack.username.length===0}>
                <strong>Name:</strong> {snack.username}
              </p>
              <p className="text-muted">
                <strong>Email:</strong> {snack.user_email}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
