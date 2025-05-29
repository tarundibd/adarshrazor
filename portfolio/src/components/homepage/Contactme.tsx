import React, {useState} from 'react'
import { InteractiveGridPattern } from '../magicui/interactive-grid-pattern'
import { cn } from '@/lib/utils'
import { MorphingText } from "@/components/magicui/morphing-text";
import { AuthorCard } from './AuthorCard';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'


function Contactme() {  
  const resumeLink = process.env.NEXT_PUBLIC_RESUME_LINK
  const Google_Link = 'https://script.google.com/macros/s/AKfycbwVYncJJn5rZkYxwYlzTHdR8GEuJxcv3YKE18EXCXnEbNq-FPQu71Wxx3MlUVL3La0b/exec'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [dialogContent, setDialogContent] = useState({ title: '', description: '' })

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      setDialogContent({
        title: 'Missing Information',
        description: 'Please fill in all fields before sending.'
      })
      setShowDialog(true)
      return
    }

    setSending(true)
    try {
      const response = await fetch(Google_Link, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      })

      if (response.type === 'opaque') {
        setName('')
        setEmail('')
        setMessage('')
        setDialogContent({
          title: 'Success!',
          description: 'Your message has been sent successfully.'
        })
      } else {
        throw new Error('Metwork response was not successful')
      }
    } catch (error) {
      console.error('Error:', error)
      setDialogContent({
        title: 'Error',
        description: 'Failed to send message. Please try again.'
      })
      
    } finally {
      setShowDialog(true)
      setSending(false)
    }
  }

  return (    
    <div id="contact" className="relative flex flex-col min-h-[90vh] overflow-hidden bg-background mt-32">  
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
        )}
        width={30}
        height={30}
        squares={[80, 80]}
        squaresClassName="hover:fill-blue-500"
      />
      <h1 className="font-bold text-center py-8 relative z-10"><MorphingText texts={["About me", "Contact me", "Know me"]} /></h1>
        
      <div className="flex flex-col lg:flex-row flex-1 relative z-10 gap-8">
        <div className='flex-1 flex items-center justify-center p-4 lg:p-8'>
          <div className="w-full max-w-md space-y-6 relative">
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-neutral-500/20 to-neutral-400/20 transform scale-[0.80] bg-opacity-50 blur-3xl -z-10" />
            <div className="h-full w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-black/80 p-4 lg:p-8 shadow-xl backdrop-blur-xl lg:-mt-16">

            {/* Form starts here */}
              <form className="space-y-4">
                <div className="space-y-2">
                  <p className='mx-2'>name</p>
                  <Input type="text" placeholder="just first name will work 😁" className="bg-white/50 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800" 
                  value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="space-y-2">
                  <p className='mx-2'>email</p>
                  <Input type="email" placeholder="📧 the one to contact you" className="bg-white/50 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800" 
                  value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="space-y-2">
                  <p className='mx-2'>text</p>
                  <Textarea placeholder="Your message to me ✒" className="bg-white/50 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 min-h-[100px]" 
                  value={message} onChange={(e) => setMessage(e.target.value)}/>
                </div>
                <div className='flex flex-col sm:flex-row gap-4 mx-0 sm:-mx-2'>
                  <Button className="hover:shadow-lg transition-all duration-300" onClick={(e) => { e.preventDefault(); handleSubmit(); }} disabled={sending}>
                    {sending ? 'Sending...' : 'KNOW ME'}
                  </Button>
                  <Button className=" hover:shadow-lg transition-all duration-300" onClick={() => window.open(resumeLink, '_blank')}>
                    Resume
                  </Button>
                </div>
              </form>
              {/* Form ends here */}

            </div>
          </div>
        </div>
        <div className='flex-1 flex items-center justify-center p-4 lg:p-8'>
          <div className="w-full max-w-md text-center lg:-mt-16">
            <AuthorCard />
          </div>        
        </div>
      </div>
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogContent.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {dialogContent.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default Contactme