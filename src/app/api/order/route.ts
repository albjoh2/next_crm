import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import excuteQuery from "@/lib/db";

export async function createOrderRow({
  index,
  OrderID,
  productId,
  quantity,
  Delivery_date,
}: {
  index: number;
  OrderID: string;
  productId: string;
  quantity: number;
  Delivery_date: string;
}) {
  const order = {
    id: index + 1,
    createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    OrderID,
    productId,
    quantity,
    Delivery_date,
  };

  console.log(JSON.stringify(order));

  try {
    const result = await excuteQuery({
      query:
        "INSERT INTO sales (id, createdAt, OrderID, productId, quantity, delivery_date) VALUES(?, ?, ?, ?, ?, ?)",
      values: [
        order.id,
        order.createdAt.toString(),
        order.OrderID,
        order.productId,
        order.quantity,
        order.Delivery_date,
      ],
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }

  return order;
}

export async function createOrder({
  index,
  OrderID,
  customerId,
}: {
  index: number;
  OrderID: string;
  customerId: string;
}) {
  const order = {
    id: index + 1,
    createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    OrderID,
    customerId,
  };

  try {
    const result = await excuteQuery({
      query: "INSERT INTO orders (id, createdAt, customerId) VALUES( ?, ?, ?)",
      values: [order.OrderID, order.createdAt.toString(), order.customerId],
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }

  return order;
}

export async function POST(request: Request) {
  const orders = await request.json();

  for (let i = 0; i < orders.orderRows.length; i++) {
    if (orders.orderRows[i].quantity === 0) {
      orders.orderRows.splice(i, 1);
    }
  }

  let OrderID = uuidv4();
  let customerId = orders.customerId;

  await createOrder({
    index: 0,
    OrderID,
    customerId,
  });

  for (let index = 0; index < orders.orderRows.length; index++) {
    let productId = orders.orderRows[index].productId;
    let quantity = orders.orderRows[index].quantity;
    let Delivery_date = orders.orderRows[index].Delivery_date;

    quantity = parseInt(quantity);

    if (quantity === 0) continue;

    await createOrderRow({
      index,
      OrderID,
      productId,
      quantity,
      Delivery_date,
    });
  }

  return NextResponse.json(
    { message: `${JSON.stringify(orders)}` },
    { status: 200 }
  );
}

interface Order {
  ID: string;
  createdAt: string;
  CustomerID: string;
  orderRows: OrderRow[];
}

interface OrderRow {
  ID: string;
  createdAt: string;
  ProductID: string;
  quantity: number;
  Delivery_date: string;
}

export async function GET() {
  let orders: Order[] = [];
  try {
    const result = await excuteQuery({
      query: "SELECT * FROM orders",
      values: [],
    });
    orders = JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }

  for (let order of orders) {
    order.orderRows = [];
    try {
      const result = await excuteQuery({
        query: "SELECT * FROM Sales WHERE OrderID = ?",
        values: [order.ID],
      });
      order.orderRows = JSON.parse(JSON.stringify(result));
    } catch (error) {
      console.log(error);
      return NextResponse.json(error, { status: 500 });
    }
  }

  console.log(JSON.stringify(orders));

  return NextResponse.json(orders, { status: 200 });
  //return the sales from the database to the client
}
