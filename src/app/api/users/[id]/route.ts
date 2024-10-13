import bcrypt from "bcryptjs";
import { type NextRequest, NextResponse } from "next/server";

import { userSchema } from "@/schemas/user";

import prisma from "../../../../../prisma/db";

interface Props {
	params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
	const body = await request.json();
	const validation = userSchema.safeParse(body);

	if (!validation.success) {
		return NextResponse.json(validation.error.format(), { status: 400 });
	}

	const user = await prisma.user.findUnique({
		where: { id: Number.parseInt(params.id) },
	});

	if (!user) {
		return NextResponse.json({ error: "User not found" }, { status: 404 });
	}

	if (body?.password) {
		const hashPassword = await bcrypt.hash(body.password, 10);
		body.password = hashPassword;
	}

	if (user.username !== body.username) {
		const duplicateUsername = await prisma.user.findUnique({
			where: { username: body.username },
		});

		if (duplicateUsername) {
			return NextResponse.json(
				{ error: "Duplicate username" },
				{ status: 409 },
			);
		}
	}

	const { password: _password, ...updatedUser } = await prisma.user.update({
		where: { id: user.id },
		data: { ...body },
	});

	return NextResponse.json(updatedUser);
}
