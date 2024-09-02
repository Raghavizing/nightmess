"use client"
import axios from "axios";
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import Loading from "../components/loading/loading";

export default function SnackDetails() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [snack, setSnack] = useState({});
    const [loading, setLoading] = useState(false);
    async function getSnackDetails(item_id: any) {
        try {
            setLoading(true);
            const res = await axios.post("/api/snacks/getSnackById", { id: item_id });
            if (res.data.success) {
                setSnack(res.data.snack);
                console.log(res.data.snack);
            }
            else {
                toast.error(res.data.error);
                router.push("/");
            }
        }
        catch (error: any) {
            toast.error(error.message);
            router.push("/");
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        const item_id = searchParams.get("id");
        if (item_id && item_id.length > 0) {
            getSnackDetails(item_id);
        }
        else {
            toast.error("Inavlid Route")
            router.push("/");
        }
    }, [searchParams])
    return (
        <div className="h-100">
            <div className="" hidden={loading}>
                This is a snack!
            </div>
            <div className="mx-auto my-auto" hidden={!loading}>
                <Loading />
            </div>
        </div>
    )
}