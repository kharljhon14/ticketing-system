import { type NextRequest, NextResponse } from "next/server";

import { userSchema } from "@/schemas/user";

import prisma from "../../../../prisma/db";

export async function POST(request: NextRequest) {
	const body = await request.json();
	const validation = userSchema.safeParse(body);

	if (!validation.success) {
		return NextResponse.json(validation.error.format(), { status: 400 });
	}

	const duplicate = await prisma.user.findUnique({
		where: {
			username: body.username,
		},
	});

	if (duplicate) {
		return NextResponse.json(
			{ message: "Duplicate Username" },
			{ status: 409 },
		);
	}
}
