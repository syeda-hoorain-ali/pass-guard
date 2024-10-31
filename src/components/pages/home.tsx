"use client"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import Logo from "@/components/logo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CopyIcon, EditIcon, EyeIcon, EyeOffIcon, PlusIcon, Trash2Icon } from "lucide-react";
// import { v4 as uuidv4 } from "uuid"

interface Password {
  id: string;
  site: string;
  username: string;
  password: string;
}

const HomePage = () => {

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordArray, setPasswordArray] = useState<Password[]>([]);
  const [form, setForm] = useState<Password>({
    site: "",
    username: "",
    password: "",
    id: "",
  })

  useEffect(() => {
    const myPasswords = localStorage.getItem("myPasswords");
    if (myPasswords) {
      setPasswordArray(JSON.parse(myPasswords))
    }
  }, [])




  const savePassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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

    if (form.id !== "") {
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
    setForm({ site: "", username: "", password: "", id: "" })
  }

  const deletePassword = (id: string) => {
    const newPasswords = passwordArray.filter(item => item.id !== id);
    setPasswordArray(newPasswords)
    localStorage.setItem("myPasswords", JSON.stringify(newPasswords))
    toast.success("Password delete successfully!")
  }

  const editPassword = (item: Password) => {
    setForm(item)
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [name]: value })
  }

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text).then(() => toast.info("Copied to clipboard"))
  }


  return (<>
    <div className="md:myContainer px-2">

      <h1 className="py-2 text-4xl font-bold text-center"><Logo /></h1>
      <p className="py-2 text-green-900 text-lg text-center">Your own password manager</p>

      <form onSubmit={savePassword} className="text-black flex flex-col p-4 gap-8 items-center">
        <input
          value={form.site}
          onChange={handleInput}
          placeholder="Enter Website URL"
          className="input"
          type="url"
          name="site"
          id="site"
          required
        />

        <div className="flex w-full justify-between gap-8 flex-col md:flex-row">
          <input
            value={form.username}
            onChange={handleInput}
            placeholder="Enter Username"
            className="input"
            type="text"
            name="username"
            id="username"
            required
          />

          <div className="relative w-full">
            <input
              value={form.password}
              onChange={handleInput}
              placeholder="Enter Password"
              className="input"
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              required
            />

            <span className="absolute right-2 top-2.5 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ?
                <span className="icon relative after:-translate-x-2 after:content-['Hide']"><EyeOffIcon size={20} /> </span> :
                <span className="icon relative after:-translate-x-3 after:content-['Show']"><EyeIcon size={20} /> </span>}
            </span>
          </div>
        </div>

        <button type="submit"
          className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900">
          <PlusIcon /> Add Password
        </button>
      </form>
    </div>

    <div className="md:myContainer p-2 md:py-0 mb-3 passwords ">
      <h2 className="font-bold text-2xl py-4">Your passwords</h2>
      {passwordArray.length === 0 && <div>No Passwords to show</div>}

      {passwordArray.length !== 0 &&
        <div className="max-w-[90vw] mx-auto overflow-auto mb-10">
          <table className="table-auto w-full max-w-[110vw] rounded-2xl overflow-hidden">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="py-2">Site</th>
                <th className="py-2">Username</th>
                <th className="py-2">Password</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-green-100">

              {passwordArray.map((item, index) => {
                return (
                  <tr className="border border-white" key={index}>
                    <td className="py-2 text-center w-32">
                      <div className="flex items-center justify-center">
                        <a href={item.site} target="_blank">{item.site}</a>
                        <div onClick={() => copyText(item.site)}
                          className="mx-2 cursor-pointer icon relative after:content-['Copy'] text-green-800">
                          <CopyIcon size={15} />
                        </div>
                      </div>
                    </td>

                    <td className="py-2 text-center w-32">
                      <div className="flex items-center justify-center">
                        <span>{item.username}</span>
                        <div onClick={() => copyText(item.username)}
                          className="mx-2 cursor-pointer icon relative after:content-['Copy'] text-green-800">
                          <CopyIcon size={15} />
                        </div>
                      </div>
                    </td>

                    <td className="py-2 text-center w-32">
                      <div className="flex items-center justify-center">
                        <span>{item.password}</span>
                        <div onClick={() => copyText(item.password)}
                          className="mx-2 cursor-pointer icon relative after:content-['Copy'] text-green-800">
                          <CopyIcon size={15} />
                        </div>
                      </div>
                    </td>

                    <td className="py-2 text-center w-32">
                      <div className="flex gap-4 items-center justify-center">
                        <span
                          onClick={() => editPassword(item)}
                          className="icon relative after:content-['Edit'] cursor-pointer">
                          <EditIcon size={18} />
                        </span>

                        <span
                          onClick={() => deletePassword(item.id)}
                          className="icon relative after:content-['Delete'] cursor-pointer text-red-600">
                          <Trash2Icon size={18} />
                        </span>
                      </div>
                    </td>
                  </tr>)

              })}


            </tbody>
          </table>
        </div>
      }
    </div>

    {/* </div> */}
  </>)
}

export default HomePage