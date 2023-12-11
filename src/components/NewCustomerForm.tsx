"use client";
import React, { useState } from "react";

const NewCustomerForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone }),
    });

    if (response.ok) {
      // Handle successful form submission
      console.log({ name, email, phone });
    } else {
      // Handle error
    }
    // Here you can handle the submission, e.g., send the data to your API or update your state
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center flex-col w-72">
      <label className="flex justify-between m-1">
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className="flex justify-between m-1">
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="flex justify-between m-1">
        Phone:
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <input
        type="submit"
        value="Submit"
        className="bg-slate-900 text-neutral-300 p-2 m-2 rounded w-24 self-center  hover:bg-slate-800 hover:cursor-pointer"
      />
    </form>
  );
};

export default NewCustomerForm;
