import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import excuteQuery from "@/lib/db";

export async function createProduct({
  name,
  description,
  price,
}: {
  name: string;
  description: string;
  price: string;
}) {
  const product = {
    id: uuidv4(),
    createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    name,
    description,
    price,
  };

  try {
    const result = await excuteQuery({
      query:
        "INSERT INTO products (id, createdAt, description, name, price) VALUES(?, ?, ?, ?, ?)",
      values: [
        product.id,
        product.createdAt.toString(),
        product.description,
        product.name,
        product.price,
      ],
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }

  return product;
}

export async function POST(request: Request) {
  const {
    name,
    description,
    price,
  }: { name: string; description: string; price: string } =
    await request.json();

  await createProduct({ name, description, price });

  return NextResponse.json(
    { message: `${name} ${description} & ${price}` },
    { status: 200 }
  );
}
