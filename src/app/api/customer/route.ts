import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import excuteQuery from "@/lib/db";

export async function createCustomer({
  name,
  email,
  phone,
}: {
  name: string;
  email: string;
  phone: string;
}) {
  const customer = {
    id: uuidv4(),
    createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    name,
    email,
    phone,
  };

  try {
    const result = await excuteQuery({
      query:
        "INSERT INTO customers (id, createdAt, email, name, phone) VALUES(?, ?, ?, ?, ?)",
      values: [
        customer.id,
        customer.createdAt.toString(),
        customer.email,
        customer.name,
        customer.phone,
      ],
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }

  return customer;
}

export async function POST(request: Request) {
  const { name, email, phone }: { name: string; email: string; phone: string } =
    await request.json();

  await createCustomer({ name, email, phone });

  return NextResponse.json(
    { message: { message: `${name} ${email} & ${phone}` } },
    { status: 200 }
  );
}
