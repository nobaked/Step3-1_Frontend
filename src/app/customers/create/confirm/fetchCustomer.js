// src/app/customers/create/confirm/fetchCustomer.js
export default async function fetchCustomer(id) {
  const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
  
  if (!apiEndpoint) {
    throw new Error("API endpoint is not configured");
  }
  
  const res = await fetch(`${apiEndpoint}/customers?customer_id=${id}`);
  
  if (!res.ok) {
    throw new Error(`Failed to fetch customer: ${res.status}`);
  }
  
  return res.json();
}
