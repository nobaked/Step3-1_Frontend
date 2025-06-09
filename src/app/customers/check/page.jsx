"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";

async function fetchCustomer(id) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `/customers?customer_id=${id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch customer");
  }
  return res.json();
}

function ReadPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const customer_id = searchParams.get("customer_id"); // "customer_id"に変更
  const [customerInfo, setCustomerInfo] = useState(null);

  useEffect(() => {
    const loadCustomer = async () => {
      if (customer_id) {
        try {
          const data = await fetchCustomer(customer_id);
          setCustomerInfo(data);
        } catch (error) {
          console.error("Failed to fetch customer:", error);
        }
      }
    };
    loadCustomer();
  }, [customer_id]);

  if (!customerInfo) {
    return <div className="loading loading-spinner loading-lg"></div>;
  }

  return (
    <>
      <div className="alert alert-success">更新しました</div>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <OneCustomerInfoCard {...customerInfo[0]} />
      </div>
      <button className="btn btn-outline btn-accent" onClick={() => router.push("/customers")}>
        一覧に戻る
      </button>
    </>
  );
}

export default function ReadPage() {
  return (
    <Suspense fallback={<div className="loading loading-spinner loading-lg"></div>}>
      <ReadPageContent />
    </Suspense>
  );
}
