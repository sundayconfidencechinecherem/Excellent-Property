import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaPhone, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className='bg-blue-200'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto'>
            <div className='container mx-auto px-4 py-6'>
            <figure>
                <Image src={'/assets/images/logo.png'} width={100} height={100} alt='logo' />
            </figure>
            <p>Excellence Property: Your property search buddy for excellent futures</p>
            <div className='flex space-x-3 mt-4'>
                <Link href='https://instagram.com' className='hover:text-gold transition-colors' aria-label='Instagram'><FaInstagram size={24}/></Link>
                <Link href='https://facebook.com' className='hover:text-gold transition-colors' aria-label='Facebook'><FaFacebook size={24}/></Link>
                <Link href='https://x.com' className='hover:text-gold transition-colors' aria-label='Twitter'><FaTwitter size={24}/></Link>
                <Link href='https://calendly.com' className='hover:text-gold transition-colors' aria-label='Schedule a Call'><FaPhone size={24}/></Link>
            </div>
        </div>
        <div className='px-4 py-6'>
            <h3 className=' font-bold'>Quick Links</h3>
            <ul className='space-y-2'>
                <li><Link href='/'>Home</Link></li>
                <li><Link href='/about'>About Us</Link></li>
                <li><Link href='/properties'>Properties</Link></li>
                <li><Link href='/contact'>Contact Us</Link></li>
            </ul>
        </div>
        <div className='bg-gray-200 p-6 my-6 mx-4 rounded-lg'>
            <h3 className='font-bold'>Newsletter Form</h3>
            <form method="post" className='space-y-3 '>
                <label className='block' htmlFor="name">Name: </label>
                <input className='w-full border px-3 py-2 border-gray-500 rounded' type="text" name="name" id="name" />
                <label className='block' htmlFor="email">Email: </label>
                <input className='w-full border px-3 py-2 border-gray-500 rounded' type="email" name="email" id="email" />
                <button className='bg-black text-white px-4 py-2 rounded-xl' type='submit'>Subscribe</button>
            </form>
        </div>
        </div>
        <div className='container mx-auto px-4 py-6 text-center'>
            <p>&copy; 2025 Excellent Property Allrights Resereved</p>
        </div>
        
    </footer>
  )
}

export default Footer;