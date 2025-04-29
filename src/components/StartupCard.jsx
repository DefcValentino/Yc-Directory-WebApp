import React from 'react'
import { formatDate } from '@/lib/utils'
import { EyeIcon} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import button from './ui/button'


const StartupCard = ({post}) => {
    const {_createdAt, 
        views,
        author: {id:authorId, name}, 
        title,
        category, 
        description,
        id,
        image 
    } = post;

  return (
    <li className='startup-card group'>
       <div className='flex justify-between'>
           <p className='startup_card_date'>
             { formatDate(_createdAt)}
           </p>
           <div className='flex gap-1.5'>
                <EyeIcon className='size=6 text-primary'/>
                <span>{views}</span>
           </div>
       </div>

       <div className='flex justify-between mt-5 gap-5'>
            <div className='flex-1'>
                <Link href={`/user/${authorId}`}>
                    <p className='text-xl line-clamp-1'>
                        {name}
                    </p>
                </Link>

                <Link href={`/startup/${post._id}`}>
                    <h3 className='text-26 font-semibold'>
                        {title}
                    </h3>
                </Link>
            </div>

            <Link href={`/user/${authorId}`}>
                
            <Image
                src={image}
                alt={name}
                width={35}
                height={35}
                className="rounded-full"
            />
            </Link>
        </div>   
        
        <Link href={`/startup/${post._id}`}>
            <p className='startup-card_desc'>
                {description}
            </p>

            <img src='/image1.jpg' alt='placeholder' 
            className='startup-card_img'></img>
        </Link>

        {/* Card Footer */}
        <div className='flex justify-between mt-5'>
        <Link href={`/?query=${category?.toLowerCase() || ''}`}>
           <p className='text-lg'>{category || 'Uncategorized'}</p>
        </Link>

            <button className="startup-card_btn">
                <Link href={`/startup/${post._id}`}>
                    Details
                </Link>
            </button>
        </div>
    </li>
  )
}

export default StartupCard
