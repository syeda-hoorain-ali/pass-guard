"use client"
import { useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {
	const [form, setForm] = useState({ email: '', subject: '', message: '', })

	const handleInput = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		setForm({ ...form, [name]: value })
	}

	//* Email checker
	const isValidEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const send = async (e) => {
		e.preventDefault();

		if (form.email.trim().length < 3 || !isValidEmail(form.email)) {
			toast.error("Enter a valid email");
			return;
		}

		if (form.subject.trim().length < 3) {
			toast.error("Enter a subject");
			return;
		}

		if (form.message.trim().length < 3) {
			toast.error("Enter a message");
			return;
		}

		try {
			const URL = `/api/contact`;
			const response = await fetch(URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			})


			const resData = await response.json();
			if (response.ok) {
				setForm({ email: '', subject: '', message: '' });
				toast.success("Message send successfully");

			} else {
				toast.error(resData.message);
			}

		} catch (error) {
			console.log("error from contact.js", error.message);
			console.log(error);
		}
	}



	return (<>
		<div>
			<div className="md:myContainer px-2">

				<h1 className='py-2 text-4xl font-bold text-center'>
					Contact
				</h1>

				<div className="text-black w-[90vw] max-w-[40rem] mx-auto p-4 flex flex-col gap-8 items-center">
					<input value={form.email} onChange={handleInput} placeholder='Email' className='input' type="email" name="email" id="email" />

					<input value={form.subject} onChange={handleInput} placeholder='Subject' className='input' type="text" name="subject" id="subject" />

					<textarea value={form.message} onChange={handleInput} placeholder='Message' className='input h-36 rounded-lg' name="message" id="message" ></textarea>

					<button onClick={send} className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900'>
						<i class="fa-solid fa-envelope"></i>
						Send Mail
					</button>
				</div>
			</div>
		</div>
	</>)
}

export default page