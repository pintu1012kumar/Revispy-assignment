import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const perPage = 6;
    const skip = (page - 1) * perPage;

    const categories = await prisma.category.findMany({
      skip,
      take: perPage,
      orderBy: { name: "asc" },
    });

    const totalCount = await prisma.category.count();
    const totalPages = Math.ceil(totalCount / perPage);

    return NextResponse.json({
      categories,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Error in /api/categories:", error);  
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
