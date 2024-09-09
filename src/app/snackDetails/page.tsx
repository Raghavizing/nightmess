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
    <div className="page py-5">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center container">
          <Loading />
        </div>
      ) : (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {/* Snack Card */}
              <div className="card shadow-lg rounded-2 border-0 p-4">
                <div className="row">
                  {/* Snack Image */}
                  <div className="col-md-6 text-center">
                    <img
                      src={snack.item_image}
                      alt={snack.item_name}
                      className="img-fluid rounded shadow-sm mb-3"
                      style={{ maxHeight: "300px", objectFit: "cover", borderRadius: "10px" }}
                    />
                  </div>

                  {/* Snack Details */}
                  <div className="col-md-6 my-auto">
                    <h2 className="fw-bold mb-3">{snack.item_name}</h2>
                    <p className="text-muted mb-1">
                      <strong>Category:</strong> {snack.item_category}
                    </p>
                    <p className="text-muted mb-1">
                      <strong>Price:</strong> Rs {snack.item_price}
                    </p>
                    <p className="text-muted mb-1">
                      <strong>Quantity:</strong> {snack.item_quantity}
                    </p>
                    <p className="text-muted mb-3">
                      <strong>Location:</strong> Block {snack.item_block}, Room {snack.item_room}
                    </p>

                    {/* Seller Info */}
                    <div className="mt-4">
                      <h4 className="fw-bold">Seller Information</h4>
                      <p className="text-muted" hidden={!snack.username || snack.username.length === 0}>
                        <strong>Name:</strong> {snack.username}
                      </p>
                      <p className="text-muted">
                        <strong>Email:</strong> {snack.user_email}
                      </p>
                      <p className="text-muted">
                        <strong>Phone Number:</strong> {snack.user_phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  );
}
