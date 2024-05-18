import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Script from "next/script";
import { ToastContainer } from "react-toastify";

const MainPage = ({ children }) => {
    return (<>
        <div>
            <Navbar />

            <div className="min-h-[80.2vh] relative pb-3">
                <div className='absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[size:14px_24px] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]'>
                    <div className='absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]'></div></div>


                <ToastContainer theme="colored" autoClose={2000} />
                {children}
            </div>

            <Footer />
        </div>
    </>)
}

export default MainPage