import React, { useState } from 'react'
import ActiveLink from '../common/ActiveLink';
import Image from 'next/image';

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div>
        <header>
            <nav className='fixed w-full top-0 left-0 z-50'>
               <div className='flex justify-between bg-blue-200 items-center py-4 px-6'>
                    {/* desktop view */}
                    <ActiveLink href='/' className='hover:text-red-500 transition-colors'>
                    <Image src={'/assets/images/logo/logo.png'} className="object-contain" width={53}  height={20} alt="Excellent Properties - Premium Real Estate Company" />
                    </ActiveLink>
                    <ul className='hidden md:flex gap-4'>
                        <li><ActiveLink href='/properties' className='hover:text-red-500 transition-colors'>Properties</ActiveLink></li>
                        <li><ActiveLink href='/about' className='hover:text-red-500 transition-colors'>About Us</ActiveLink></li>
                        <li><ActiveLink href='/contact' className='hover:text-red-500 transition-colors'>Contact Us</ActiveLink></li>
                    </ul>

                    {/* Mobile View  toggle*/}
                    <button aria-label='toggle-menu' aria-expanded={isMobileMenuOpen} className='md:hidden' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <div className='flex flex-col gap-1'>
                            <span className={`bg-black w-8 h-0.5 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                            <span className={`bg-black w-8 h-0.5 transition-all ${isMobileMenuOpen ? 'opacity-0 ' : 'opacity-100'}`}></span>
                            <span className={`bg-black w-8 h-0.5 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                        </div>
                    </button>
               </div>
                {/* Mobile View links */}
                {
                    isMobileMenuOpen && (
                   <div className='fixed inset-0 bg-white z-50 md:hidden'>
                    <div>
                        <button className='ml-8 mt-8 mb-4  px-2 border-2 border-blue-400 rounded-sm text-2xl font-semibold hover:text-red-500 transition-colors hover:border-red-500 hover:bg-gray-300' aria-label='close menu' onClick={() => setIsMobileMenuOpen(false)}>x</button>
                    </div>
                     <ul className='md:hidden p-6 space-y-4'>
                        <li><ActiveLink href='/properties' className='hover:text-red-500 hover:bg-gray-300 py-2 px-3 block w-full transition-colors'>Properties</ActiveLink></li>
                        <li><ActiveLink href='/about' className='hover:text-red-500 hover:bg-gray-300 py-2 px-3 block w-full transition-colors'>About Us</ActiveLink></li>
                        <li><ActiveLink href='/contact' className='hover:text-red-500 hover:bg-gray-300 py-2 px-3 block w-full transition-colors'>Contact Us</ActiveLink></li>
                   </ul>
                   </div>
                    )
                }
            </nav>
        </header>
    </div>
  )
}

export default Header;