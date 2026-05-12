import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const token = cookies().get("auth_token")?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const extension = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${extension}`;
    
    const uploadDir = path.join(process.cwd(), "public/uploads");
    
    // Ensure directory exists
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch {
      // Ignore if directory already exists
    }

    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    const url = `/uploads/${fileName}`;

    return NextResponse.json({ url }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
