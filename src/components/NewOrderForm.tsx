"use client";
import React, { useState, useEffect, use } from "react";

interface Customer {
  ID: string;
  createdAt: string;
  Name: string;
  Email: string;
  Phone: number;
}

interface Product {
  ID: string;
  createdAt: string;
  Name: string;
  Description: string;
  Price: number;
}

const NewOrderForm: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customerId, setCustomerId] = useState("");
  const [orderRows, setOrderRows] = useState([
    {
      productId: "",
      quantity: 0,
      Delivery_date: "",
    },
    {
      productId: "",
      quantity: 0,
      Delivery_date: "",
    },
    {
      productId: "",
      quantity: 0,
      Delivery_date: "",
    },
    {
      productId: "",
      quantity: 0,
      Delivery_date: "",
    },
    {
      productId: "",
      quantity: 0,
      Delivery_date: "",
    },
    {
      productId: "",
      quantity: 0,
      Delivery_date: "",
    },
    {
      productId: "",
      quantity: 0,
      Delivery_date: "",
    },
    {
      productId: "",
      quantity: 0,
      Delivery_date: "",
    },
    {
      productId: "",
      quantity: 0,
      Delivery_date: "",
    },
  ]); // [ {rowNr, product, quantity}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (customerId === "") {
      alert("Välj en kund");
      return;
    }
    let correctOrderRow = false;
    for (let i = 0; i < orderRows.length; i++) {
      if (orderRows[i].productId !== "") {
        if (orderRows[i].quantity !== 0) {
          correctOrderRow = true;
        }
      }
    }
    if (!correctOrderRow) {
      alert("Fyll i produkt och antal på en rad");
      return;
    }
    const response = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customerId, orderRows }),
    });

    if (response.ok) {
      // Handle successful form submission
      console.log({ customerId, orderRows });
    } else {
      // Handle error
      console.log("error");
    }
    // Here you can handle the submission, e.g., send the data to your API or update your state
  };

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

  async function getProducts() {
    const response = await fetch("/api/product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Handle successful form submission
      let result = await response.json();
      setProducts(result);
      console.log(result);
    } else {
      // Handle error
    }
  }

  const changeDate = (date: string) => {
    const newOrderRows = [...orderRows];
    newOrderRows.forEach((orderRow) => {
      orderRow.Delivery_date = date;
    });
    setOrderRows(newOrderRows);
  };

  useEffect(() => {
    getCustomers();
    getProducts();
  }, []);

  useEffect(() => {
    if (customers.length === 0 || products.length === 0) return;
    //itterate through orderRows and set productId to products[0].Name
    const newOrderRows = [...orderRows];
    newOrderRows.forEach((orderRow) => {
      orderRow.productId = products[0].ID;
    });
    setOrderRows(newOrderRows);
    setCustomerId(customers[0].ID);
  }, [customers, products]);

  return (
    <form onSubmit={handleSubmit} className="flex justify-center flex-col">
      <label className="flex">
        Kund:
        <select
          name=""
          id=""
          onChange={(e) => {
            setCustomerId(e.target.value);
            console.log(e.target.value);
          }}
        >
          {customers.map((customerOption) => (
            <option key={customerOption.ID} value={customerOption.ID}>
              {customerOption.Name}
            </option>
          ))}
        </select>
        <input
          type="date"
          onChange={(e) => {
            changeDate(e.target.value);
          }}
        />
      </label>
      <ul className="mt-10 mb-10">
        {orderRows.map((orderRow, index) => (
          <li key={index} className="flex gap-5">
            <p>{index + 1}</p>
            <label className="flex justify-between">
              Produkt:
              <select
                name=""
                id=""
                onChange={(e) => {
                  const newOrderRows = [...orderRows];
                  newOrderRows[index].productId = e.target.value;
                  setOrderRows(newOrderRows);
                }}
              >
                {products.map((product, index) => (
                  <option key={product.ID} value={product.ID}>
                    {product.Name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex justify-between">
              Antal:
              <input
                type="number"
                value={orderRow.quantity}
                onChange={(e) => {
                  const newOrderRows = [...orderRows];
                  newOrderRows[index].quantity = parseInt(e.target.value);
                  setOrderRows(newOrderRows);
                }}
              />
            </label>
            <label className="flex justify-between">
              Leverans:
              <input
                type="date"
                value={orderRow.Delivery_date}
                onChange={(e) => {
                  const newOrderRows = [...orderRows];
                  newOrderRows[index].Delivery_date = e.target.value;
                  setOrderRows(newOrderRows);
                }}
              />
            </label>
          </li>
        ))}
      </ul>
      <input
        type="submit"
        value="Submit"
        className="bg-slate-900 text-neutral-300 p-2 m-2 rounded w-24 self-center  hover:bg-slate-800 hover:cursor-pointer"
      />
    </form>
  );
};

export default NewOrderForm;
