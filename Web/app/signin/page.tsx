'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from '@/hooks/use-toast'
import { Heart, Menu, EyeIcon, EyeOffIcon } from 'lucide-react'
import Link from "next/link"

const page = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
      }
    
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData)
        toast({
          title: "Sign In Successful",
          description: "Welcome back to HeartGuard AI!",
        })
      }

    return (
        <div className="flex flex-col min-h-screen">
          <header className="px-4 lg:px-6 h-14 flex items-center">
            <Link className="flex items-center justify-center" href="/">
              <Heart className="h-6 w-6 text-red-500" />
              <span className="sr-only">HeartGuard AI</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
              <Button
                className="md:hidden"
                variant="ghost"
                size="icon"
                aria-label="Toggle Menu"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
              <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-14 md:top-0 left-0 right-0 bg-white md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none gap-4`}>
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
                  Home
                </Link>
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="/assessment">
                  Assessment
                </Link>
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="/about">
                  About
                </Link>
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="/contact">
                  Contact
                </Link>
              </div>
            </nav>
          </header>
          <main className="flex-1">
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-md mx-auto">
                <h1 className="text-2xl font-bold text-center mb-6">Sign In to Your Account</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white">
                    Sign In
                  </Button>
                </form>
                <div className="flex items-center justify-between mt-4">
                  <Link href="/forgot-password" className="text-sm text-red-500 hover:underline">
                    Forgot Password?
                  </Link>
                  <Link href="/signup" className="text-sm text-red-500 hover:underline">
                    Create an Account
                  </Link>
                </div>
              </div>
            </div>
          </main>
          <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
            <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 HeartGuard AI. All rights reserved.</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
              <Link className="text-xs hover:underline underline-offset-4" href="#">
                Terms of Service
              </Link>
              <Link className="text-xs hover:underline underline-offset-4" href="#">
                Privacy
              </Link>
            </nav>
          </footer>
        </div>
      )
}

export default page;