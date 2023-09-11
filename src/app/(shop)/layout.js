'use client'
import { useEffect, useState } from 'react';
import '/src/app/globals.css'
import Link from 'next/link'
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

export default function RootLayout({ children }) {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      if (decodedToken && decodedToken.username) {
        setUsername(decodedToken.username);
        setIsLoggedIn(true);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    Cookies.remove('token', {path: '/'});
    setUsername('');
    setIsLoggedIn(false);
    window.location.href= "/";
  };
  
  return (
    <html lang="en">
      <head>
        <title>Flash Computer</title>
      </head>
      <body className='container font-noto'>
        <header className="my-8">
          <div className="flex justify-between items-center">
            <div className="">
              <Link href="/" className="font-noto text-3xl font-bold">Flash Computer</Link>
            </div>
            <div className="flex gap-4">
              <Link href="/store" className="font-noto text-xl font-medium">Store</Link>
              <Link href="/cart" className="font-noto text-xl font-medium">Cart</Link>
            </div>
            <div className="flex gap-4 justify-center items-center">
            {isLoggedIn ? (
        <>
          <p className="font-noto text-xl font-medium">Halo, {username}</p>
          <button className='text-xl font-medium' onClick={handleLogout} href="/">Logout</button>
        </>
      ) : (
        <>
          <Link href="/login" className="font-noto text-xl font-medium">Login</Link>
          <Link href="/register" className="font-noto text-xl font-medium">Register</Link>
        </>
      )} 
            </div>
          </div>
        </header>
        {children}
        <footer className='flex items-center justify-center mt-12'>
          <p className=''>© Flash Computer 2023</p>
        </footer>
      </body>
    </html>
  )
}
