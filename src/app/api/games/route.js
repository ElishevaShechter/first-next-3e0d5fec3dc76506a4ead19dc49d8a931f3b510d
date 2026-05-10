import { NextResponse } from "next/server";
import { gameService } from "@/app/gameService";

export async function GET() {
    const games = await gameService.getAll();
    return NextResponse.json(games);
}

export async function POST(request) {
    const body = await request.json();
    const created = await gameService.create(body);
    return NextResponse.json(created, { status: 201 });
}
