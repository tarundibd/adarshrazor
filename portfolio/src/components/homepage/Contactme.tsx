'use client'

import React from 'react'
import { InteractiveGridPattern } from '../magicui/interactive-grid-pattern'
import { cn } from '@/lib/utils'

function Contactme() {  return (    
    <div className="relative flex flex-col min-h-screen overflow-hidden bg-background mt-32">  
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
          
        )}
        width={30}
        height={30}
        squares={[80, 80]}
        squaresClassName="hover:fill-blue-500"
      />
      <h1 className="text-7xl font-bold text-center py-8 relative z-10">About me</h1>
        
      <div className="flex flex-1 relative z-10">
        <div className='flex-1 flex items-center justify-center p-8'>
          <div className="w-full max-w-md text-center">
            Left
          </div>
        </div>
        <div className='flex-1 flex items-center justify-center p-8'>
          <div className="w-full max-w-md text-center">
            Right
          </div>        
        </div>
      </div>
    </div>
  )
}

export default Contactme