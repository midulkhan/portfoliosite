import React from 'react'

function Header() {
  return (
    <div className='w-full h-16 absolute'>
        <div className='max-w-7xl h-full m-auto flex justify-between items-center'>
            <div className='logo'>
                Midul Hossen
            </div>
            <div className='menu'>
                <ul className='flex gap-4 text-sm'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Project</li>
                    <li>Contact</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Header