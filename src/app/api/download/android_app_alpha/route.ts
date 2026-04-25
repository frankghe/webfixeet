import { NextResponse } from "next/server";
import { readFile, stat } from "fs/promises";
import path from "path";

const APK_PATH = path.join(process.cwd(), "downloads", "android_app_alpha.apk");

export async function GET() {
  try {
    const fileStat = await stat(APK_PATH);
    const fileBuffer = await readFile(APK_PATH);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/vnd.android.package-archive",
        "Content-Disposition":
          'attachment; filename="fixeet-alpha.apk"',
        "Content-Length": fileStat.size.toString(),
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Download not available yet" },
      { status: 404 }
    );
  }
}
