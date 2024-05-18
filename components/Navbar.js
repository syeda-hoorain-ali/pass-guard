"use client"
import Link from 'next/link'
import React, { useRef } from 'react'
// import Logo from "@/components/Logo";
import Logo from './Logo'

const Navbar = () => {

   const nav = useRef();

   const showNavbar = (e) => {
      nav.current.classList.replace('translate-x-full', 'translate-x-0');
      // console.log(e);
      e.target.nextElementSibling.classList.remove('before:hidden')
      e.target.classList.add('before:hidden')
   }
   const hideNavbar = (e) => {
      nav.current.classList.replace('translate-x-0', 'translate-x-full');
      e.target.previousElementSibling.classList.remove('before:hidden')
      e.target.classList.add('before:hidden')
   }

   return (<>
      <nav className='bg-slate-800 text-white'>
         <div className="myContainer flex justify-between items-center px-4 py-5 h-14 relative">

            <div className="logo font-bold text-2xl">
               <Link href='/'><Logo /></Link>
            </div>

            <div className="mobile-icons md:hidden z-20 text-2xl cursor-pointer">
               <i className='fa-solid fa-bars' onClick={showNavbar}></i>
               <i className='fa-solid fa-xmark before:hidden' onClick={hideNavbar}></i>
            </div>

            <div ref={nav} className='flex items-center md:justify-center md:flex-row md:gap-3 md:relative md:w-auto md:h-full md:p-0 md:translate-x-0       bg-slate-800 z-10 fixed top-0 right-0 p-16 min-w-1/2 h-screen flex-col justify-between translate-x-full transition-all'>

               <ul className='flex items-center md:flex-row gap-4 flex-col'>
                  <li><Link href='/' className='hover:underline'>Home</Link></li>
                  <li><Link href='/about' className='hover:underline'>About</Link></li>
                  <li><Link href='/contact' className='hover:underline'>Contact</Link></li>
               </ul>

               <span className='ml-5 text-center'>
                  <button className='text-white bg-green-700 my-5 rounded-full flex justify-between items-center ring-white ring-1  hover:scale-110 transition-all'>
                     <i className="fa-brands fa-github p-1 text-2xl"></i>
                     <Link className='px-2' href='https://github.com/syeda-hoorain-ali/pass-guard.git'> GitHub</Link>
                  </button>

                  <button className='text-white bg-blue-800 my-5 rounded-full flex justify-between items-center ring-white ring-1 md:hidden hover:scale-110 transition-all'>
                     <i className="fa-brands fa-linkedin p-1 text-2xl"></i>
                     <Link className='px-2' href='https://www.linkedin.com/in/syedahoorainali/'> LinkedIn</Link>
                  </button>

               </span>
            </div>

         </div>
      </nav>
   </>)
}

export default Navbar