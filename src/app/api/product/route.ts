import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {
    name,
    description,
    price,
  }: { name: string; description: string; price: string } =
    await request.json();
  // Do whatever you want
  return NextResponse.json(
    { message: `${name} ${description} & ${price}` },
    { status: 200 }
  );
}
