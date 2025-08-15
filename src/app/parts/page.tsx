import TableDemo from '@/components/PartsTable';
import { stackServerApp } from '@/stack';
import { SignIn } from '@stackframe/stack';
import React from 'react'

async function Parts() {

    const user = await stackServerApp.getUser();
    const app = stackServerApp.urls;

    return (
        <>
            {user ? (
                <div className='flex-1 items-center justify-center p-12'>
                    <TableDemo/>
                </div>
            ) : (
                <div className='flex flex-1 min-h-screen pb-24 items-center justify-center'>
                    <SignIn />
                </div>
            )}
        </>
    )
}

export default Parts
