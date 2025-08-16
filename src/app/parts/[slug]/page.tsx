import React from 'react'
import PartCard from './PartCard'
import { getPart } from '@/actions/part.action'

async function page({params}: {params: {slug: string}}) {

    const [id] = params.slug.split("--");
    const part = await getPart(id);

    return (
        <div className='w-full flex justify-center border-1 py-12'>
            <PartCard part={part}/>
        </div>
    )
}

export default page