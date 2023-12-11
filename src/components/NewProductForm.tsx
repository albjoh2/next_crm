"use client";
import React, { useState } from "react";

const NewProductForm: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, price }),
    });

    if (response.ok) {
      // Handle successful form submission
    } else {
      // Handle error
    }
    // Here you can handle the submission, e.g., send the data to your API or update your state
    console.log({ name, description, price });
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
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label className="flex justify-between m-1">
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <input
        type="submit"
        value="Submit"
        className="bg-slate-900 text-neutral-300 p-2 m-2 rounded w-24 self-center hover:bg-slate-800 hover:cursor-pointer"
      />
    </form>
  );
};

export default NewProductForm;
