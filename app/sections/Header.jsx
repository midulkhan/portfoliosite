"use client"

import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { motion } from "motion/react"


function Header() {
  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 1.3,
        ease: [0.22, 1, 0.36, 1],
      }} className='w-full h-16 absolute'>
        <div className='max-w-7xl h-full m-auto flex justify-between items-center'>
            <div className='logo aghraham rounded-full p-2 bg-white text-neutral-900'>
                M
            </div>
            <div className='menu'>
                <ul className='flex gap-4 justify-center items-center text-sm'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Project</li>
                    <li>Contact</li>
                    
                </ul>
            </div>
            <div className='button '>
                <Link className='group flex gap-2  text-sm justify-center items-center py-1 pl-4 pr-1 bg-white text-neutral-800 rounded-full' href="https://www.fiverr.com/mdmidul/" target='_blank'>Freelance profile <ArrowUpRight className='glow rounded-full text-white p-2 transition-transform duration-300 group-hover:rotate-45' size={35} /></Link>
            </div>
        </div>
    </motion.div>
  )
}

export default Header