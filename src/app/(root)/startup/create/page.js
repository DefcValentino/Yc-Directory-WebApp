import React from 'react'
import StartupForm from '@/components/StartupForm'
import {auth} from '@/auth'
import { redirect } from 'next/navigation'


const page = async () => {
    const session = await auth();

    if (!session) {
    redirect('/');
  }



  return (
    <div className='bg-white'>
        
       <section className='pink_container bg-[#EE2B69] min-h-[230px]'>
           <h1 className='heading'>Submit Your Startup</h1>
       </section>

      <StartupForm />
    </div>

  )
}

export default page

