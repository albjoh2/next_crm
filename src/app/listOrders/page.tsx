"use client";
import { FC, useEffect, useState } from "react";

interface pageProps {}

interface OrderRow {
  ID: string;
  createdAt: string;
  ProductID: string;
  Quantity: number;
  Delivery_date: string;
}

interface Order {
  ID: string;
  CustomerID: string;
  createdAt: string;
  orderRows: OrderRow[];
}

const page: FC<pageProps> = ({}) => {
  const [orders, setOrders] = useState<Order[]>([]);

  async function getOrders() {
    const response = await fetch("/api/order", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setOrders(data);
    } else {
      // Handle error
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <h1 className="text-3xl text-center">orders</h1>

      {orders.map((order) => (
        <table
          className="block bg-gray-300 m-5 min-w-fit p-10 rounded-md"
          key={order.ID}
        >
          <thead>
            <tr>
              <td>order</td>
              <td>{order.ID}</td>
            </tr>
            <tr>
              <td>customer</td>
              <td>{order.CustomerID}</td>
            </tr>
            <tr>
              <td>createdAt</td>
              <td>{order.createdAt}</td>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <th>Row</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Delivery</th>
            </tr>

            {order.orderRows.map((orderRow) => (
              <tr key={orderRow.ID}>
                <td>{orderRow.ID}</td>
                <td>{orderRow.ProductID}</td>
                <td>{orderRow.Quantity}</td>
                <td>
                  {new Date(orderRow.Delivery_date).toISOString().split("T")[0]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default page;
