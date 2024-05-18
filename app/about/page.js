import Link from 'next/link';
import React from 'react';

const page = () => {
  return (<>
    <div className='p-4'>
      <h1 className='font-bold text-4xl my-5'>Welcome to Password Manager</h1>

      <p>Password Manager is a secure and easy-to-use password management tool built with Next.js and localStorage. Our goal is to help you protect your online identity and sensitive information by generating and storing unique, strong passwords for each of your online accounts.</p>

      <h2 className='font-bold text-2xl my-4'>Why Password Manager?</h2>

      <ul>
        <li><b className='text-lg'>Security:</b> We use advanced encryption and hashing algorithms to protect your passwords and keep them safe from prying eyes.</li>
        <li><b className='text-lg'>Convenience:</b> With Password Manager, you only need to remember one master password to access all of your other passwords.</li>
        <li><b className='text-lg'>Organization:</b> Our intuitive interface makes it easy to manage and organize your passwords, so you can quickly find the one you need.</li>

      </ul>

      <h2 className='font-bold text-2xl my-4'>Our Values</h2>

      <ul>
        <li><b className='text-lg'>Privacy:</b> We respect your privacy and never store your passwords on our servers. Your data is always stored locally on your device.</li>
        <li><b className='text-lg'>Security:</b> We're committed to keeping your passwords safe and secure, using the latest security best practices and technologies.</li>
        <li><b className='text-lg'>Transparency:</b> We're open and honest about how we store and manage your data, so you can trust us with your sensitive information.</li>
      </ul>

      <h2 className='font-bold text-2xl my-4'>Get in Touch</h2>

      <p>If you have any questions, feedback, or suggestions, please don't hesitate to contact us. We're always looking for ways to improve and make Password Manager even better for you.</p>

      <h3 className='font-bold text-xl my-4'>Thanks for Choosing Password Manager!</h3>

      <p>Remember, your security and privacy are our top priorities. We're glad you've chosen Password Manager to help protect your online identity.</p>

      <div className='flex gap-4 mt-3'>
        <button className='text-3xl'>
          <Link target='_blank' href="https://github.com/syeda-hoorain-ali/">
            <i className="fa-brands fa-github"></i>
          </Link>
        </button>

        <button className='text-3xl'>
          <Link target='_blank' href="https://www.linkedin.com/in/syedahoorainali/">
            <i className="fa-brands fa-linkedin text-blue-600"></i>
          </Link>
        </button>

        <button className='text-3xl'>
          <Link target='_blank' href="https://www.npmjs.com/~syedahoorainali">
            <i className="fa-brands fa-npm text-red-600"></i>
          </Link>
        </button>
      </div>

    </div>
  </>)
}

export default page