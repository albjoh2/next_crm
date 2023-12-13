import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import excuteQuery from "@/lib/db";

export async function createOrder({
  orderNumber,
  customerId,
  productId,
  quantity,
}: {
  orderNumber: string;
  customerId: string;
  productId: string;
  quantity: string;
}) {
  const order = {
    id: uuidv4(),
    createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    orderNumber,
    customerId,
    productId,
    quantity,
  };

  try {
    const result = await excuteQuery({
      query:
        "INSERT INTO sales (id, createdAt, orderNumber, productId, customerId, quantity) VALUES(?, ?, ?, ?, ?, ?)",
      values: [
        order.id,
        order.createdAt.toString(),
        order.orderNumber,
        order.productId,
        order.customerId,
        order.quantity,
      ],
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }

  return order;
}

export async function POST(request: Request) {
  const orders = await request.json();

  let orderNumber = uuidv4();
  let customerId = orders.customerId;

  for (let i = 0; i < orders.orderRows.length; i++) {
    let productId = orders.orderRows[i].productId;
    let quantity = orders.orderRows[i].quantity;

    if (quantity === 0) continue;

    await createOrder({ orderNumber, customerId, productId, quantity });
  }

  return NextResponse.json({ message: `${orders}` }, { status: 200 });
}

export async function GET() {
  let sales = [];
  try {
    const result = await excuteQuery({
      query: "SELECT * FROM sales",
      values: [],
    });
    sales = JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.log(error);
  }

  //return the sales from the database to the client
  return NextResponse.json(sales, { status: 200 });
}
