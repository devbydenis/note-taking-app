'use client' // Wajib di Next.js App Router kalo kita perlu interactivity pakai useState/useRouter (client component)

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { IoEye } from 'react-icons/io5'
import { RegisterForm } from '@/types/auth'

const schema = z.object({
  username: z.string().min(5, 'username is required. min 5 characters'),
  email: z.email('email is required. valid email is required'),
  password: z.string().min(8, 'password is required. min 8 characters'),
})

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      console.log(response)
      if (response.ok) {
        router.push('/login')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <h1 className="text-3xl font-bold text-center">Register</h1>
        <div>
          <input
            {...register('username')}
            placeholder="Username"
            className="w-full border border-gray-200 p-2 rounded focus:outline-gray-600"
          />
          <div className="min-h-[25px]">
            {errors.username && <small className="text-red-500">{errors.username.message}</small>}
          </div>
        </div>

        <div>
          <input
            {...register('email')}
            placeholder="Email"
            className="w-full border border-gray-200 p-2 rounded focus:outline-gray-600"
          />
          <div className="min-h-[25px]">
            {errors.email && <small className="text-red-500">{errors.email.message}</small>}
          </div>
        </div>

        <div>
          <div className="flex w-full border border-gray-200 p-2 rounded focus:outline-gray-600">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder="Password"
              className="flex-1 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-700 p-2 cursor-pointer font-bold"
            >
              <IoEye />
            </button>
          </div>
          <div className="min-h-[25px]">
            {errors.password && <small className="text-red-500">{errors.password.message}</small>}
          </div>
        </div>

        <div className="w-full">
          <p className="text-gray-700 text-center text-xs">
            Have an account?{' '}
            <span>
              <Link href="/login" className="text-blue-700 hover:underline underline-offset-4">
                Login
              </Link>
            </span>
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gray-900 text-white p-2 cursor-pointer font-bold rounded hover:bg-gray-800"
        >
          Register
        </button>
      </form>
    </div>
  )
}
