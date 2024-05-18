"use client"
import { useEffect, useRef, useState } from 'react'
import Logo from './Logo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { v4 as uuidv4 } from 'uuid'

const Manager = () => {

   const eye = useRef();
   const pass = useRef();
   const [passwordArray, setPasswordArray] = useState([]);
   const [form, setForm] = useState({
      site: '',
      username: '',
      password: '',
      id: '',
   })

   useEffect(() => {
      let myPasswords = localStorage.getItem("myPasswords");
      if (myPasswords) {
         setPasswordArray(JSON.parse(myPasswords))
      }
   }, [])


   const showPassword = () => {
      if (eye.current.classList.contains('fa-eye')) {
         pass.current.type = 'text'
         eye.current.classList.replace('fa-eye', 'fa-eye-slash');
         eye.current.classList.replace('after:content-["Show"]', 'after:content-["Hide"]')

      } else {
         pass.current.type = 'password'
         eye.current.classList.replace('fa-eye-slash', 'fa-eye')
         eye.current.classList.replace('after:content-["Hide"]', 'after:content-["Show"]')
      }
      console.log(eye.current.classList);
   }

   const savePassword = () => {
      let newPasswords = []
      // const newPasswords = [...passwordArray, { ...form, id: uuidv4() }]

      if (form.site.trim().length < 3) {
         toast.error("Enter a valid site");
         return;
      }

      if (form.username.trim().length < 3) {
         toast.error("Enter a valid username");
         return;
      }

      if (form.password.trim().length < 3) {
         toast.error("Enter a valid password");
         return;
      }

      if (form.id !== '') {
         newPasswords = passwordArray.map(item => {
            if (item.id === form.id) return form
            return item
         })
      } else {
         newPasswords = [...passwordArray, { ...form, id: String(Math.random() * 10) }]
      }

      setPasswordArray(newPasswords);
      localStorage.setItem("myPasswords", JSON.stringify(newPasswords));
      toast.success("Password save successfully")
      setForm({ site: '', username: '', password: '', id: '' })
   }

   const deletePassword = (id) => {
      const newPasswords = passwordArray.filter(item => item.id !== id);
      setPasswordArray(newPasswords)
      localStorage.setItem("myPasswords", JSON.stringify(newPasswords))
      toast.success("Password delete successfully!")
   }

   const editPassword = (item) => {
      setForm(item)
   }

   const handleInput = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      setForm({
         ...form,
         [name]: value,
      })
   }

   const copyText = (text) => {
      // alert("Copied to clipboard")
      toast.info('Copied to clipboard')
      navigator.clipboard.writeText(text)
   }


   return (<>
      <div>

         <div className="md:myContainer px-2">

            <h1 className='py-2 text-4xl font-bold text-center'>
               <Logo />
            </h1>
            <p className='py-2 text-green-900 text-lg text-center'>Your own password manager</p>

            <div className="text-black flex flex-col p-4 gap-8 items-center">
               <input value={form.site} onChange={handleInput} placeholder='Enter Website URL' className='input' type="url" name="site" id="site" />

               <div className="flex w-full justify-between gap-8 flex-col md:flex-row">
                  <input value={form.username} onChange={handleInput} placeholder='Enter Username' className='input' type="text" name="username" id="username" />

                  <div className="relative">
                     <input value={form.password} onChange={handleInput} ref={pass} placeholder='Enter Password' className='input' type="password" name="password" id="password" />

                     <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                        <span ref={eye} className='p-1 fa-solid fa-eye relative after:content-["Show"] after:-left-[30%]'></span>
                     </span>
                  </div>
               </div>

               <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900'>
                  <lord-icon
                     src="https://cdn.lordicon.com/jgnvfzqg.json"
                     trigger="hover">
                  </lord-icon>
                  Add Password
               </button>
            </div>
         </div>

         <div className="md:myContainer p-2 md:py-0 mb-3 passwords ">
            <h2 className='font-bold text-2xl py-4'>Your passwords</h2>
            {passwordArray.length === 0 && <div>No Passwords to show</div>}

            {passwordArray.length !== 0 &&
               <div className='max-w-[90vw] mx-auto overflow-auto mb-10'>
                  <table className='table-auto w-[110vw] rounded-2xl overflow-hidden'>
                     <thead className='bg-green-800 text-white'>
                        <tr>
                           <th className='py-2'>Site</th>
                           <th className='py-2'>Username</th>
                           <th className='py-2'>Password</th>
                           <th className='py-2 px-4'>Actions</th>
                        </tr>
                     </thead>

                     <tbody className='bg-green-100'>

                        {passwordArray.map((item, index) => {
                           return (
                              <tr className='border border-white' key={index}>
                                 <td className='py-2 text-center w-32'>
                                    <div className="flex items-center justify-center">
                                       <a href={item.site} target='_blank'>{item.site}</a>
                                       <div onClick={() => copyText(item.site)} className="lordicosize-7 mx-2 cursor-pointer">
                                          {/* <lord-icon class="w-6 h-6 pt-1 pl-1" src="https://lordicon.com/fs.json"></lord-icon> */}
                                          <span className='fa-solid fa-copy relative after:content-["Copy"] text-green-800 '></span>
                                       </div>
                                    </div>
                                 </td>

                                 <td className='py-2 text-center w-32'>
                                    <div className="flex items-center justify-center">
                                       <span>{item.username}</span>
                                       <div onClick={() => copyText(item.username)} className="lordicosize-7 mx-2 cursor-pointer">
                                          {/* <lord-icon class="w-6 h-6 pt-1 pl-1" src="https://lordicon.com/fs.json"></lord-icon> */}
                                          <span className='fa-solid fa-copy relative after:content-["Copy"] text-green-800 '></span>
                                       </div>
                                    </div>
                                 </td>

                                 <td className='py-2 text-center w-32'>
                                    <div className="flex items-center justify-center">
                                       <span>{item.password}</span>
                                       <div onClick={() => copyText(item.password)} className="lordicosize-7 mx-2 cursor-pointer">
                                          {/* <lord-icon class="w-6 h-6 pt-1 pl-1" src="https://lordicon.com/fs.json"></lord-icon> */}
                                          <span className='fa-solid fa-copy relative after:content-["Copy"] text-green-800 '></span>
                                       </div>
                                    </div>
                                 </td>

                                 <td className='py-2 text-center w-32'>
                                    <div className="flex items-center justify-center">
                                       <span onClick={() => editPassword(item)} className='action-icon fa-solid fa-edit after:content-["Edit"]'></span>
                                       <span onClick={() => deletePassword(item.id)} className='action-icon fa-solid fa-trash-can after:content-["Delete"] after:-left-[90%] text-red-600'></span>
                                    </div>
                                 </td>
                              </tr>)

                        })}


                     </tbody>
                  </table>
               </div>
            }
         </div>

      </div>
   </>)
}

export default Manager