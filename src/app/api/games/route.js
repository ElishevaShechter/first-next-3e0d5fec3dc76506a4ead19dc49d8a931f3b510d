import { NextResponse } from "next/server";
import { gameService } from "@/app/gameService";

export async function GET() {
    try {
        const games = await gameService.getAll();
        return NextResponse.json(games);
    } catch (error) {
        console.error("Failed to get games:", error);
        return NextResponse.json({ error: "Failed to fetch games" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const created = await gameService.create(body);
        return NextResponse.json(created, { status: 201 });
    } catch (error) {
        console.error("Failed to create game:", error);
        return NextResponse.json({ error: "Failed to create game", details: error.message }, { status: 500 });
    }
}
