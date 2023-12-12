"use client";
import { FC, useEffect, useState } from "react";

interface pageProps {}

interface Customer {
  ID: number;
  createdAt: string;
  Name: string;
  Email: string;
  Phone: number;
}

const page: FC<pageProps> = ({}) => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  async function getCustomers() {
    const response = await fetch("/api/customer", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Handle successful form submission
      let result = await response.json();
      setCustomers(result);
      console.log(result);
    } else {
      // Handle error
    }
  }

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl text-center">customers</h1>

      <ul>
        {customers.map((customer) => (
          <li key={customer.ID}>
            {customer.Name} {customer.Email} {customer.Phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
