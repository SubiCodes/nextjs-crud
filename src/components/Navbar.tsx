import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Gpu, Home, LogIn, LogOut } from 'lucide-react'
import { ModeToggle } from './ModeToggle'
import { stackServerApp } from '@/stack'
import { getUserDetails } from '@/actions/user.actions'
import { UserButton } from '@stackframe/stack'

async function Navbar() {

    const user = await stackServerApp.getUser();
    const app = stackServerApp.urls;
    const userProfile = await getUserDetails(user?.id);

    return (
        <nav className='sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50'>
            <div className='max-w-7xl mx-auto px-4'>

                <div className='flex items-center h-16 justify-between'>

                    {/* LOGO */}
                    <div className='flex items-center'>
                        <Link href={'/'} className='text-xl font-bold text-primary font-mono tracking-wider'>
                            🖲️PC Haven
                        </Link>
                    </div>

                    {/* Navbar Component */}
                    <div className='hidden md:flex items-center space-x-4'>

                        {userProfile?.name && <span className="text-[14px] text-gray-600 dark:text-gray-300">
                            {`Hello, ${userProfile?.name.split(' ')[0]}`}
                        </span>}


                        <Button variant={"ghost"} className='flex items-center gap-2' asChild>
                            <Link href={'/parts'}>
                                <Gpu className='w-4 h-4' />
                                <span className='hidden lg:inline'>{`PC Parts`}</span>
                            </Link>
                        </Button>

                        <Button variant={"ghost"} className='flex items-center gap-2' asChild>
                            <Link href={'/'}>
                                <Home className='w-4 h-4' />
                                <span className='hidden lg:inline'>{`Home`}</span>
                            </Link>
                        </Button>

                        <ModeToggle />

                        {/* Sign In / Sign Out Button from StackAuth and Neon */}
                        {!user ? (
                            <Button variant={"default"} className='flex items-center gap-2' asChild>
                                <Link href={app.signIn}>
                                    <LogIn className='w-4 h-4' />
                                    <span className='hidden lg:inline'>{`Sign In`}</span>
                                </Link>
                            </Button>
                        ) : (
                            <Button variant={"default"} className='flex items-center gap-2' asChild>
                                <Link href={app.signOut}>
                                    <LogOut className='w-4 h-4' />
                                    <span className='hidden lg:inline'>{`Sign Out`}</span>
                                </Link>
                            </Button>
                        )}

                        <UserButton/>

                    </div>

                </div>

            </div>
        </nav>
    )
}

export default Navbar
