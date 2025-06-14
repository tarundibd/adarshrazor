import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZOR_PAY_API_KEY!,
  key_secret: process.env.NEXT_PUBLIC_RAZOR_PAY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    
    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: 'Error creating order' },
      { status: 500 }
    );
  }
}