import React from 'react'
import PartCard from './PartCard'
import { getPart } from '@/actions/part.action'

export async function generateMetadata({
    params,
  }: {
    params: { slug: string };
  }) {
   
    // Extract the id from the slug by splitting on the delimiter
    const [id] = params.slug.split("--");
    const part = await getPart(id);
    return {
      title: part ? part.userPart?.name : "Part Details",
      description: part ? part.userPart?.description : "Part details page",
    };
}

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