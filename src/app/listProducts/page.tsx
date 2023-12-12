"use client";
import { FC, useEffect, useState } from "react";

interface pageProps {}

interface Product {
  ID: number;
  createdAt: string;
  Name: string;
  Description: string;
  Price: number;
}

const page: FC<pageProps> = ({}) => {
  const [products, setProducts] = useState<Product[]>([]);

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

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl text-center">Products</h1>

      <ul>
        {products.map((product) => (
          <li key={product.ID}>
            {product.Name} {product.Description} {product.Price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
