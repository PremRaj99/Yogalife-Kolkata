import { Button } from 'flowbite-react'
import React from 'react'

export default function YogaClassCard({image, text}) {
  return (
    <div className='flex flex-col items-center'>
        <img src={image} className='rounded-xl shadow-md shadow-gray-500 w-[55ch]' alt="" />
        <p className='my-6 w-[50ch] text-center'>{text}</p>
        <Button gradientDuoTone="purpleToPink" pill>Know More</Button>
    </div>
  )
}
