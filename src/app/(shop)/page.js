'use client'
import React from "react";
import Link from "next/link";
import Image from "next/image";
import heroPic from "/public/img/heroimg.jpg";

export default function Page() {
    
    return (
    <div>
        <section className="flex flex-row w-full my-40 text">
            <div className="flex w-1/2 flex-start flex-col">
                <h1 className="text-5xl leading-[3.6rem] pb-8">Flash Computer<br/>Tempatnya Teknologi Terdepan!</h1>
                <p className="text-xl font-normal pb-16">Selamat datang di Flash Computer, destinasi terbaik untuk memenuhi segala kebutuhan teknologi Anda. 
                Siapkan diri Anda untuk mengalami perbedaan luar biasa dalam berbelanja perangkat komputer dan elektronik.</p>
                <Link href="/store"><button className="px-8 py-4 rounded-3xl bg-web-lightyellow text-web-black font-bold">Belanja Sekarang</button></Link>
            </div>
            <div className="flex w-1/2 justify-end">
                <Image src={heroPic} width={600} alt="Hero Section Image" className="object-cover h-[400px] rounded-3xl"/>
            </div>
        </section>
    </div>
    );
};