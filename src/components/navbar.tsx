"use client"
import Link from 'next/link'
import { useState } from 'react'
import Logo from './logo'
import { GithubIcon, LinkedinIcon, MenuIcon, XIcon } from 'lucide-react'
import { motion } from 'framer-motion'

const Navbar = () => {

  const [active, setActive] = useState<boolean>(false)


  return (<>
    <nav className='bg-slate-800 text-white'>
      <div className="myContainer flex justify-between items-center px-4 py-5 h-14 relative">

        <div className="logo font-bold text-2xl">
          <Link href='/'><Logo /></Link>
        </div>

        <div className="mobile-icons md:hidden z-20 text-2xl cursor-pointer">
          <span onClick={() => setActive(!active)}> {active ? <XIcon /> : <MenuIcon />}</span>
        </div>



        <div className='hidden md:flex items-center justify-center gap-3 w-auto h-full'>

          <ul className='flex items-center md:flex-row gap-4 flex-col'>
            <li><Link href='/' className='hover:underline'>Home</Link></li>
            <li><Link href='/about' className='hover:underline'>About</Link></li>
            <li><Link href='/contact' className='hover:underline'>Contact</Link></li>
          </ul>


          <Link className='ml-5 text-center' href='https://github.com/syeda-hoorain-ali/pass-guard.git'>
            <button className='text-white bg-green-700 my-5 py-1 px-2 rounded-full flex justify-between items-center gap-1 ring-white ring-1 hover:scale-105 transition-all'>
              <GithubIcon size={20} />  GitHub
            </button>
          </Link>
        </div>


        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: active ? 0 : "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="flex md:hidden flex-col justify-between fixed top-0 right-0 h-screen w-1/2 min-w-96 max-w-full bg-slate-800 text-white py-16 px-8 z-10"
        >
          {/* <div className='flex md:hidden items-center bg-slate-800 z-10 fixed top-0 right-0 p-16 min-w-1/2 h-screen flex-col justify-between translate-x-full transition-all'> */}

          <ul className='flex gap-4 flex-col'>
            <li><Link href='/' className='hover:underline'>Home</Link></li>
            <li><Link href='/about' className='hover:underline'>About</Link></li>
            <li><Link href='/contact' className='hover:underline'>Contact</Link></li>
          </ul>

          <span>
            <Link href='https://github.com/syeda-hoorain-ali/pass-guard.git'>
              <button className='text-white bg-green-700 my-5 py-1 px-2 rounded-full flex justify-between items-center gap-1 ring-white ring-1 hover:scale-105 transition-all'>
                <GithubIcon size={20} />  GitHub
              </button>
            </Link>

            <Link href='https://www.linkedin.com/in/syedahoorainali/'>
              <button className='text-white bg-blue-800 my-5 py-1 px-2 rounded-full flex justify-between items-center gap-1 ring-white ring-1 hover:scale-105 transition-all'>
                <LinkedinIcon size={20} /> LinkedIn
              </button>
            </Link>

          </span>
        </motion.div>

      </div>
    </nav>
  </>)
}

export default Navbar