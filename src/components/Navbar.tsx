import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import Image from 'next/image'
import NavItems from './NavItems'
import { ModeToggle } from './ThemeButton'
import { buttonVariants } from './ui/button'
import Cart from './Cart'
import { getServerSideUser } from '@/lib/payload-utils'
import { cookies } from 'next/headers'
import UserAccountNav from './UserAccountNav'

const Navbar = async() => {
    const nextCookies = cookies()
    const user = await getServerSideUser(nextCookies);
  return (
    <div className='bg-white sticky z-50  top-0 inset-x-0 h-16'>
        <header className='relative bg-white dark:bg-black'>
            <MaxWidthWrapper>
                <div className='border-b border-gray-200 dark:border-slate-800'>
                    <div className='flex h-16 items-center'>

                        <div className='ml-4 flex lg:ml-0'>
                            <Link href='/'>
                               <Image src={'/logo.png'} className='w-[150px] h-[100px] flex-shrink-0' alt='logo' width={300} height={300}/>
                            </Link>
                        </div>
                        <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
                            <NavItems/>
                        </div>
                        <div className='ml-auto flex items-center'>
                            <div className='hidden lg:flex l:flex-1 lg:items-center lg:justify-end lg:space-x-2 '>
                                <ModeToggle/>
                                {user? null : (<Link className={buttonVariants({
                                    variant:"ghost"
                                })} href='/sign-in'>SignIn</Link>)}

                                {/* {user?null:(<span className='h-6 w-px bg-gray-200 ' aria-hidden="true"/>)} */}

                                {user?(
                                    <UserAccountNav user={user}/>
                                ):<Link href="/sign-up" className={buttonVariants({
                                    variant:'ghost'
                                })}>Create Account</Link>}

                                {/* {user ? (<span className='h-6 w-px bg-gray-200 ' aria-hidden="true"/>):null} */}
                                
                                {/* {user?null :  (<div className='flex lg:ml-6'>
                                    <span className='h-6 w-px bg-gray-200 ' aria-hidden="true"/>
                                </div>)} */}

                                <div className='ml-4 flow-root lg-ml-6'>
                                    <Cart/>
                                </div>

                               
                            </div>
                            </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </header>
    </div>
  )
}

export default Navbar