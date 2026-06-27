import { NextResponse } from "next/server";

const MATON_API_KEY = process.env.MATON_API_KEY;
const KIT_FORM_ID = process.env.KIT_FORM_ID || "9211217";
const MATON_BASE = "https://gateway.maton.ai/kit/v4";

export async function POST(request: Request) {
  try {
    if (!MATON_API_KEY) {
      console.error("MATON_API_KEY not configured");
      return NextResponse.json(
        { success: false, error: "Service not configured. Please contact support." },
        { status: 500 }
      );
    }

    const { name, email, location } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const headers = {
      Authorization: "Bearer " + MATON_API_KEY,
      "Content-Type": "application/json",
    };

    const subData = {
      email_address: email.trim(),
      first_name: name.trim(),
    };

    const subRes = await fetch(MATON_BASE + "/subscribers", {
      method: "POST",
      headers,
      body: JSON.stringify(subData),
    });

    if (!subRes.ok) {
      const errorText = await subRes.text();
      console.error("Kit subscriber create error: " + subRes.status + " - " + errorText);
      return NextResponse.json(
        { success: false, error: "Unable to subscribe. Please try again later." },
        { status: 502 }
      );
    }

    const subscriber = await subRes.json();
    const subscriberId = subscriber?.subscriber?.id;

    if (!subscriberId) {
      console.error("No subscriber ID in response:", subscriber);
      return NextResponse.json(
        { success: false, error: "Unable to subscribe. Please try again later." },
        { status: 502 }
      );
    }

    const formRes = await fetch(
      MATON_BASE + "/forms/" + KIT_FORM_ID + "/subscribers",
      {
        method: "POST",
        headers,
        body: JSON.stringify({ id: subscriberId }),
      }
    );

    if (!formRes.ok) {
      const errorText = await formRes.text();
      console.error("Kit form add error: " + formRes.status + " - " + errorText);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
