import { NextResponse } from "next/server";
import { gameService } from "@/app/gameService";

export async function PUT(request, { params }) {
    try {
        const body = await request.json();
        const result = await gameService.update(params.id, body);

        if (!result.value) {
            return NextResponse.json({ error: "Game not found" }, { status: 404 });
        }

        return NextResponse.json(result.value);
    } catch (error) {
        console.error("Failed to update game:", error);
        return NextResponse.json({ error: "Failed to update game" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const deleted = await gameService.delete(params.id);
        if (!deleted) {
            return NextResponse.json({ error: "Game not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete game:", error);
        return NextResponse.json({ error: "Failed to delete game" }, { status: 500 });
    }
}
