'use client'
import '/src/app/globals.css'
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

const Dropdown = ({ title, links, isOpen, toggleDropdown, dropdownRef }) => (
  <div className="text-xl">
    <nav className="flex items-center justify-between">
      <div className="relative" ref={dropdownRef}>
        <button onClick={toggleDropdown} className="focus:outline-none">
          {title}
        </button>
        {isOpen && (
          <div className="absolute top-12 right-0 w-56 origin-top-left rounded-lg bg-web-black">
            <ul className="py-2">
              {links.map((link, index) => (
                <li className="block px-4 py-2 text-sm" key={index}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  </div>
);

export default function RootLayout({ children }) {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);
  const dropdownRef3 = useRef(null);

  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('tokenAdmin');

    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      if (decodedToken && decodedToken.username) {
        setUsername(decodedToken.username);
        setIsLoggedIn(true);
      }
    }

    const closeDropdowns = (e) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(e.target)) {
        setIsDropdownOpen1(false);
      }
      if (dropdownRef2.current && !dropdownRef2.current.contains(e.target)) {
        setIsDropdownOpen2(false);
      }
      if (dropdownRef3.current && !dropdownRef3.current.contains(e.target)) {
        setIsDropdownOpen3(false);
      }
    };

    if (isDropdownOpen1 || isDropdownOpen2 || isDropdownOpen3) {
      window.addEventListener('click', closeDropdowns);
    }

    return () => {
      window.removeEventListener('click', closeDropdowns);
    };
  }, [isDropdownOpen1, isDropdownOpen2, isDropdownOpen3]);

  const toggleDropdown = (setIsDropdownOpen) => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('tokenAdmin');
    Cookies.remove('tokenAdmin', { path: '/' });
    setUsername('');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  const dropdowns = [
    {
      title: 'Produk',
      links: [
        { label: 'Produk', href: '/admin/produk/produk' },
        { label: 'Tambah Data', href: '/admin/produk/tambahdata' },
        { label: 'Laporan Penjualan', href: '/admin/produk/penjualan' },
        { label: 'Hasil K-Means Produk', href: '/admin/produk/kmeansproduk' },
        { label: 'Diskon Produk', href: '/admin/produk/diskon' },
        // ... other menu items
      ],
      isOpen: isDropdownOpen1,
      toggleDropdown: () => toggleDropdown(setIsDropdownOpen1),
      dropdownRef: dropdownRef1,
    },
    {
      title: 'Data Mining',
      links: [
        { label: 'Lihat Centroid Produk', href: '/admin/centroidproduk' },
        { label: 'Lihat Centroid Pelanggan', href: '/admin/centroidpelanggan' },
      ],
      isOpen: isDropdownOpen2,
      toggleDropdown: () => toggleDropdown(setIsDropdownOpen2),
      dropdownRef: dropdownRef2,
    },
    {
      title: 'Pelanggan',
      links: [
        { label: 'Pelanggan', href: '/admin/pelanggan/pelanggan' },
        { label: 'Hasil K-Means Pelanggan', href: '/admin/pelanggan/kmeanspelanggan' },
        { label: 'Konfirmasi Pembayaran', href: '/admin/pelanggan/konfirmasi' },
        { label: 'Pelanggan yang Mendapatkan Diskon', href: '/admin/pelanggan/diskon' },
        // ... other menu items
      ],
      isOpen: isDropdownOpen3,
      toggleDropdown: () => toggleDropdown(setIsDropdownOpen3),
      dropdownRef: dropdownRef3,
    },
  ];

  return (
    <html lang="en">
      <head>
        <title>Flash Computer</title>
      </head>
      <body className="container font-noto">
        <header className="my-8">
          <div className="flex justify-between">
            <div className="flex justify-start gap-6 items-center">
              <div className="">
                <Link href="/" className="font-noto text-3xl font-bold">
                  Flash Computer
                </Link>
              </div>
              {dropdowns.map((dropdown, index) => (
                <Dropdown key={index} {...dropdown} />
              ))}
            </div>
            <div className="flex gap-4 items-center justify-center">
              {isLoggedIn ? (
                <>
                  <p className="font-noto text-xl font-medium">Halo, {username}</p>
                  <button className="text-xl font-medium" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="font-noto text-xl font-medium">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>
        {children}
        <footer className="flex items-center justify-center mt-12">
          <p className="">© Flash Computer 2023</p>
        </footer>
      </body>
    </html>
  );
}
