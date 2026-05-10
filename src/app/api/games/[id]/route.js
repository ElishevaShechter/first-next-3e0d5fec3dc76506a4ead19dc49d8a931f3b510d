import { NextResponse } from "next/server";
import { gameService } from "@/app/gameService";

export async function PUT(request, { params }) {
    const body = await request.json();
    const result = await gameService.update(params.id, body);

    if (!result.value) {
        return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    return NextResponse.json(result.value);
}

export async function DELETE(request, { params }) {
    const deleted = await gameService.delete(params.id);
    if (!deleted) {
        return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
}
