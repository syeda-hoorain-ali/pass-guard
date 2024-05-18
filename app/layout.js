import { Inter } from "next/font/google";
import "../styles/globals.css";
import "../styles/favicon.css";
import 'react-toastify/dist/ReactToastify.css';
import MainPage from "@/components/MainPage";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
   title: "PassGuard | Your own password manager",
   description: "Password Manager is a secure and easy-to-use password management tool built with Next.js.",
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <head>
            <link rel="icon" href="./favicon.png" type="image/png" />
         </head>
         <body className={inter.className}>
            <MainPage>
               {children}
            </MainPage>
         </body>
      </html>
   );
}

