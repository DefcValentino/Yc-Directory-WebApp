import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import { client } from "@/sanity/lib/client"; // Ensure you have a Sanity client setup
import { formatDate } from '@/lib/utils'; // Adjust the import path as necessary
import imageUrlBuilder from '@sanity/image-url';
import Link from 'next/link';
import Image from 'next/image';
import markdownIt from 'markdown-it';
import View from '@/components/View';
import {Skeleton} from '@/components/ui/skeleton';


const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}


const md = markdownIt(); // Initialize markdown-it


export default async function Page({params}) {
  const id = params?.id;

  if(!id) return <div>Invalid Id</div>

  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id } );

 if (!post){
  console.log("Post not found for ID:", id); // Debugging
  return notFound();
 } 


 const parsedContent = md.render(post?.pitch || ''); // Parse the markdown content


 console.log("Fetched post:", post); // Debugging

 const imageUrl = urlFor(post.image).url(); // ✅ build the URL beforehand

  return (
    <div className='bg-white'>
      <section className='pink_container min-h-[230px] bg-[#EE2B69]'>
        <p className='tag'>{formatDate(post?._createdAt)}</p>
        <h1 className='heading text-4xl mt-16 text-black'>
        {post.title}
      </h1>

      <p className='sub-heading max-w-5xl'>
        {post.pitch}
      </p>
      </section>
      
      <section className='section_container'>
        <img
          src={imageUrl}
          alt="thumbnail"
          className='w-full h-auto rounded-xl'
        />

        <div className='space-y-5 mt-10 max-w-7xl mx-auto'>
          <div className='flex-between gap-3'>
            <Link
              href={`/user/${post?.author?._id}`}
              className='flex items-center gap-2 mb-3'
            >
              <Image
                src={urlFor(post.author.image).url()}
                alt="avatar"
                width={64}
                height={64}
                className='rounded-full drop-shadow-black'
              />

              <div>
                <p className='text-20-medium'>{post.author.name}</p>
                <p className='text-16-medium text-black-300'>
                  @{post?.author?.username}
                </p>
              </div>
            </Link>     
          </div>
          <h3 className='text-30-bold'>Pitch Details</h3>
           
           {parsedContent ?(
              <article
                className="prose max-w-4xl font-work-sans  break-all"
                dangerouslySetInnerHTML={{__html: parsedContent }}
              />
           ): (
              <p className='no-result'>
                No Details Provided
              </p>
           )}
        </div>

        <hr className='divider'/>
        {/* TODO: EDITOR SELECTED STARTUP */}
         
         <Suspense fallback={<Skeleton className="view_skeleton"/>}>
           <View id={id}
           />
         </Suspense>
      </section>
      
    </div>
  )
}






