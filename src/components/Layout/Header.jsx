"use client";
import React from 'react'
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function Header() {
  const router = useRouter();
  const logoutUser = () => {
    toast.success("Logout successful");
    router.push("/");
  }
  return (
    <header className='header-alignment'>
        <h2 className='heading-2'>
            Dashboard
        </h2>
        <button className='logout-button' onClick={logoutUser}>
          Logout
        </button>
    </header>
  )
}
