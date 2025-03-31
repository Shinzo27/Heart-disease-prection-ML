'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from '@/hooks/use-toast'
import { Heart, Menu, EyeIcon, EyeOffIcon, Router } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation'

const page = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const router = useRouter()

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
        router.push('/')
      }

    return (
        <div className="flex flex-col min-h-screen">
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
        </div>
      )
}

export default page;