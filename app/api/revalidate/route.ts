import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get the secret from the request
    const secret = request.nextUrl.searchParams.get("secret");

    // Check for secret to confirm this is a valid request
    if (secret !== process.env.STORYBLOK_REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: "Invalid secret" },
        { status: 401 }
      );
    }

    // Get the body to check which story was updated
    const body = await request.json();
    
    console.log("Revalidation triggered for:", body);

    // Revalidate the homepage
    revalidatePath("/");
    
    return NextResponse.json(
      { 
        revalidated: true, 
        message: "Revalidation successful",
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { 
        message: "Error revalidating",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
