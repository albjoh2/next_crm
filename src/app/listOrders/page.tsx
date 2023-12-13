"use client";
import { FC, useEffect, useState } from "react";

interface pageProps {}

interface Sales {
  ID: string;
  createdAt: string;
  ProductID: string;
  OrderNumber: string;
  CustomerID: string;
  Quantity: number;
}

interface Order {
  OrderNumber: string;
  customerID: string;
  createdAt: string;
  sales: Sales[];
}

const page: FC<pageProps> = ({}) => {
  const [sales, setSales] = useState<Sales[]>([]);
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

      setSales(data);

      setOrders(
        data.reduce((acc: Order[], cur: Sales) => {
          const order = acc.find(
            (order) => order.OrderNumber === cur.OrderNumber
          );

          if (order) {
            order.sales.push(cur);
          } else {
            acc.push({
              OrderNumber: cur.OrderNumber,
              customerID: cur.CustomerID,
              createdAt: cur.createdAt,
              sales: [cur],
            });
          }

          return acc;
        }, [])
      );
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
        <table className="bg-gray-300 m-5 min-w-full" key={order.OrderNumber}>
          <thead>
            <tr>
              <td>order</td>
              <td>{order.OrderNumber}</td>
            </tr>
            <tr>
              <td>customer</td>
              <td>{order.customerID}</td>
            </tr>
            <tr>
              <td>createdAt</td>
              <td>{order.createdAt}</td>
            </tr>
          </thead>
          <tbody className="text-center ">
            <tr>
              <th>rowId</th>
              <th>product</th>
              <th>quantity</th>
            </tr>

            {order.sales.map((sale) => (
              <tr key={sale.ID}>
                <td>{sale.ID}</td>
                <td>{sale.ProductID}</td>
                <td>{sale.Quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default page;
