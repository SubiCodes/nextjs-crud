import { getParts } from '@/actions/part.action';
import { getCurrentUserId } from '@/actions/user.actions';
import TableDemo from '@/components/PartsTable';
import { stackServerApp } from '@/stack';
import { SignIn } from '@stackframe/stack';
import React from 'react'

async function Parts() {

    const user = await getCurrentUserId();
    const app = stackServerApp.urls;

    if (!user) {
        return (
            <div className='flex flex-1 min-h-screen pb-24 items-center justify-center'>
                <SignIn />
            </div>
        )
    }   

    const parts = await getParts("");

    return (
        <>
            {user ? (
                <div className='flex-1 items-center justify-center p-12'>
                    <TableDemo parts={parts} user={user} />
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
