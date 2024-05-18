import { NextResponse } from "next/server"
import { createTransport } from 'nodemailer';

export const POST = async (req) => {
    try {
        const body = await req.json();

        let transporter = createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NEXT_PUBLIC_EMAIL,
                pass: process.env.NEXT_PUBLIC_PASS
            }
        });

        let info = await transporter.sendMail({
            from: body.email,
            to: process.env.NEXT_PUBLIC_EMAIL,
            subject: body.subject,
            text: `from: ${body.email}\n${body.message}`
        })

        return NextResponse.json({
            status: 200,
            message: 'message send successfully',
            id: info.messageId
        });

    } catch (error) {
        console.log("error message: " + error.message);
        return NextResponse.json({
            status: 500,
            message: "message could not send",
            error: error.message
        })
    }
}