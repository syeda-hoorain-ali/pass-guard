"use client"
import { ApiResponse } from '@/types'
import axios, { AxiosError } from 'axios'
import { MailIcon } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

const ContactPage = () => {
  const [form, setForm] = useState({ email: '', subject: '', message: '', })

  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value })
  }

  //* Email checker
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const send = async (e: FormEvent<HTMLFormElement>) => {
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
      const response = await axios.post<ApiResponse>('/api/contact', form)

      if (response.data.success) {
        setForm({ email: '', subject: '', message: '' });
        toast.success("Message send successfully");

      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      const message = axiosError.response?.data.message || axiosError.message
      toast.error(message);
    }
  }



  return (<>
    <div>
      <div className="md:myContainer px-2">

        <h1 className='py-2 text-4xl font-bold text-center'>Contact</h1>

        <form onSubmit={send} className="text-black w-[90vw] max-w-[40rem] mx-auto p-4 flex flex-col gap-8 items-center">
          <input
            value={form.email}
            onChange={handleInput}
            placeholder='Email'
            className='input'
            type="email"
            name="email"
            id="email"
          />

          <input
            value={form.subject}
            onChange={handleInput}
            placeholder='Subject'
            className='input'
            type="text"
            name="subject"
            id="subject"
          />

          <textarea
            value={form.message}
            onChange={handleInput}
            placeholder='Message'
            className='input h-36 rounded-xl'
            name="message"
            id="message">
          </textarea>

          <button type='submit' className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900'>
            <MailIcon /> Send Mail
          </button>
        </form>
      </div>
    </div>
  </>)
}

export default ContactPage
