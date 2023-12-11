import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, phone }: { name: string; email: string; phone: string } =
    await request.json();

  return NextResponse.json(
    { message: { message: `${name} ${email} & ${phone}` } },
    { status: 200 }
  );
}
