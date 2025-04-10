import React from 'react'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

function ContactMe() {
  return (
    <div className="flex flex-col md:flex-row h-[80vh] w-full md:bg-[url('/poster/house.png')] bg-fit bg-no-repeat bg-right">
      <div className="flex-1 flex items-center justify-center bg-orange-200">
        <div className=''>
            <Label className='text-3xl'>name</Label>
            <Input placeholder="just name will work 😁" className="sm:w-60 md:w-80"/>
            <Label className='text-3xl pt-4'>email</Label>
            <Input placeholder="📧 the one to contact you." className="sm:w-60 md:w-80"/>
            <Label className='text-3xl pt-4'>text</Label>
            <Textarea placeholder="Write your message here.."/>
            <Button className='m-6'>KNOW ME</Button>
        </div>
      </div>
      <div className="hidden md:block md:flex-1">
      </div>
    </div>
  )
}

export default ContactMe


{/* <Textarea placeholder="Write your message here..." className="min-h-[120px] sm:w-60 md:w-80"/> */}