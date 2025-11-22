// components/common/ActiveLink.tsx
import Link from 'next/link'
import { useRouter } from 'next/router'

interface ActiveLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export default function ActiveLink({ href, children, className = '' }: ActiveLinkProps) {
  const router = useRouter()
  const isActive = router.pathname === href
  
  return (
    <Link 
      href={href} 
      className={`${className} ${isActive ? 'text-red-500 font-bold' : ''}`}
    >
      {children}
    </Link>
  )
}