import { NextResponse } from "next/server";

let products = [
  { id: 1, name: "Blue T-shirt", price: 5000, image: "/images/vision.jpg" },
  { id: 2, name: "Black Jeans", price: 15000, image: "/images/vision.jpg" },
];

// GET → return all products
export async function GET() {
  return NextResponse.json(products);
}

// POST → add new product
export async function POST(request: Request) {
  const body = await request.json();
  const newProduct = {
    id: Date.now(),
    name: body.name,
    price: body.price,
    image: body.image || "/images/placeholder.jpg",
  };
  products.push(newProduct);
  return NextResponse.json(newProduct, { status: 201 });
}
