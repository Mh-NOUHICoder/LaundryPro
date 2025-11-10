'use client'

import Link from 'next/link'
import { TextAlignStart ,Bubbles, User } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet' 
import { Button } from '@/components/ui/button' 

export function MobileNav() {
  return (
    <>
    <Sheet> 
      
      {/* 1. The Menu Icon (Trigger) */}
      <SheetTrigger asChild>
        <Button 
        variant="secondary" size="icon" aria-label="Open Navigation"
        className=" md:hidden "
        >
          {/* Menu icon remains high contrast */}
          <TextAlignStart className="h-6 w-6 text-black dark:text-white " />
        </Button>
      </SheetTrigger>
      
      {/* 2. The Sliding Content Panel (Modern Dark Theme) */}
      <SheetContent side="left" 
      
      // Close button override remains for a clean look
      className="w-[300px] sm:w-[200px] ">
        <SheetHeader>
          {/* Logo/Title: High contrast on dark background */}
          <SheetTitle className="flex items-center text-xl text-primary">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 text-cyan-400 transition-opacity">
                <Bubbles className="h-6 w-6 text-cyan-400" />
                {/* Logo Text: White for contrast */}
                <span className="text-lg font-heading font-bold  tracking-tight">
                Milano Laundry
                </span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        
        {/* Navigation Links - White text, Cyan-400 hover */}
        <div className="pt-8 flex flex-col items-center py-4 w-full **space-y-2** text-xl font-bold font-heading">
          
          <Link
            href="/services"
            // Key Changes: White text, Cyan background on hover, subtle rounding
            className="block w-full py-3 px-4 **text-white** **hover:text-gray-900** **hover:bg-cyan-400** **rounded-md** transition-all duration-200 text-xl" 
          >
            Services
          </Link>
          <Link
            href="/prices"
            className="block w-full py-3 px-4 **text-white** **hover:text-gray-900** **hover:bg-cyan-400** **rounded-md** transition-all duration-200 text-xl" 
          >
            Prices
          </Link>
          <Link
            href="/about"
            className="block w-full py-3 px-4 **text-white** **hover:text-gray-900** **hover:bg-cyan-400** **rounded-md** transition-all duration-200 text-xl" 
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block w-full py-3 px-4 **text-white** **hover:text-gray-900** **hover:bg-cyan-400** **rounded-md** transition-all duration-200 text-xl" 
          >
            Contact
          </Link>
        
        </div>
        {/* 2. Secondary/Account CTA (Pinned to the bottom) */}
        <div className="mt-auto pb-30 **border-t border-cyan-400/50** flex items-center space-x-4">
            {/* Button: Primary color for maximum attention */}
            <Button asChild className="w-full mx-auto justify-center pl-6 **bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-bold**">
                <Link href="/login">
                <User className="mr-3 h-5 w-5" /> 
                Login / Register
                </Link>
            </Button>
        </div>
        
      </SheetContent>
    </Sheet>
    </>
  )
}