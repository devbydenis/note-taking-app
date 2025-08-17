'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { IoEye } from 'react-icons/io5'
import { LoginForm } from '@/types/auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const loginSchema = z.object({
  username: z.string().nonempty('Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [errResponse, setErrResponse] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      })
      const result = await res.json()

      if (result.ok) {
        console.log(result)
        router.push('/dashboard') // sukses → redirect ke dashboard
      } else {
        console.log(result)
        setErrResponse(result.error)
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
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <div>
          <input
            {...register('username')}
            placeholder="Email"
            className="w-full border border-gray-200 p-2 rounded focus:outline-gray-600"
          />
          <div className="min-h-[25px]">
            {errResponse && <small className="text-red-500">{errResponse}</small>}
            {errors.username && <small className="text-red-500">{errors.username.message}</small>}
          </div>
        </div>

        <div>
          <div className="flex w-full border border-gray-200 p-2 rounded focus:outline-gray-600">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="flex-1 outline-none"
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-700 p-2 cursor-pointer font-bold"
            >
              <IoEye />
            </button>
          </div>
          {errors.password && <small className="text-red-500">{errors.password.message}</small>}
        </div>

        <div className="w-full">
          <p className="text-gray-700 text-center text-xs">
            Dont have an account?{' '}
            <span>
              <Link href="/register" className="text-blue-700 hover:underline underline-offset-4">
                Register
              </Link>
            </span>
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`${isSubmitting ? 'opacity-50' : 'bg-gray-900' } w-full text-white p-2 rounded hover:bg-gray-800 cursor-pointer font-bold`}
        >
          Login
        </button>
      </form>
    </div>
  )
}
