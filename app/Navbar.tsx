"use client"

import Link from 'next/link'
import React from 'react'
import { BiBug } from "react-icons/bi";
import { usePathname } from 'next/navigation';
const Navbar = () => {

    const currentPath=usePathname()


    const links=[
        {
            label:'Dashboard',
            href:'/',
        },
        {
            label:'Issues',
            href:'/issues'
        }
    ]
  return (
    <nav className='flex space-x-8 items-center border-b mb-5 px-5 h-14 '>
        <Link href={'/'}>
            <BiBug className='w-5 h-5'/>
        </Link>

        <ul className='flex space-x-5'>
      {
          links.map((e)=>{
            return(
               <Link 
               className={`hover:text-black transition-colors ${e.href===currentPath ?'text-zinc-900':'text-zinc-400'}`}
               key={e.href} href={e.href}
              
               >{e.label}</Link>
            )
        })
      }
        </ul>
    </nav>
  )
}

export default Navbar