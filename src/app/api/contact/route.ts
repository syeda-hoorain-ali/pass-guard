import { NextResponse } from "next/server"
import { createTransport } from 'nodemailer';

export const POST = async (req: Request) => {
    try {
        const body = await req.json();

        const transporter = createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NEXT_PUBLIC_EMAIL,
                pass: process.env.NEXT_PUBLIC_PASS
            }
        });

        const info = await transporter.sendMail({
            from: body.email,
            to: process.env.NEXT_PUBLIC_EMAIL,
            subject: body.subject,
            text: `from: ${body.email}\n${body.message}`
        })

        return NextResponse.json({
            success: true,
            message: 'Message send successfully',
            id: info.messageId
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}