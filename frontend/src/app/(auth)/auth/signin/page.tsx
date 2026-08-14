'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'
import { Leaf } from 'lucide-react'

export default function SignInPage() {
  const router = useRouter()
  const { user, loading, signInWithEmail, signInWithGoogle } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (!loading && user) {
      router.replace('/team')
    }
  }, [loading, user, router])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('verification') === 'sent') {
      toast.success('Verification email sent. Verify your email, then sign in.')
    }
  }, [])

  if (loading) return <FullPageSpinner />

  const onSubmit = async (data: LoginInput) => {
    try {
      await signInWithEmail(data.email, data.password)
      toast.success('Signed in successfully')
      router.replace('/team')
      router.refresh()
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('email-not-verified')) {
        toast.error('Please verify your email before signing in.')
      } else {
        toast.error('Invalid email or password')
      }
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      router.replace('/dashboard')
    } catch {
      toast.error('Google sign-in failed. Please try again.')
    }
  }

  return (
    <div className="space-y-6 rounded-lg bg-[#472914] p-8 shadow-lg">
      <div className="space-y-1 text-center">
        <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#F0BF1F] bg-[#3a2110]">
          <Leaf className="h-8 w-8 text-[#F0BF1F]" />
        </div>
        <h1 className="font-['Roboto_Condensed'] text-3xl font-extrabold text-[#F0BF1F]">
          Sign in
        </h1>
        <p className="text-sm text-[#F0BF1F]/70">Enter your credentials to continue</p>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="flex w-full items-center justify-center gap-3 rounded-md border border-[#F0BF1F]/30 bg-white px-4 py-2.5 text-sm font-medium text-[#472914] shadow-sm transition-colors hover:bg-zinc-100"      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-[#F0BF1F]/30" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#472914] px-2 text-[#F0BF1F]/70">or</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-[#F0BF1F]">
            Username
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className="w-full rounded-md border border-[#F0BF1F]/30 bg-[#3a2110] px-3 py-2 text-sm text-white shadow-sm placeholder:text-[#F0BF1F]/40 focus:ring-2 focus:ring-[#F0BF1F] focus:outline-none aria-invalid:border-red-500"
            placeholder="you@example.com"
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-red-400" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-[#F0BF1F]">
              Password
            </label>
          </div>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            className="w-full rounded-md border border-[#F0BF1F]/30 bg-[#3a2110] px-3 py-2 text-sm text-white shadow-sm placeholder:text-[#F0BF1F]/40 focus:ring-2 focus:ring-[#F0BF1F] focus:outline-none aria-invalid:border-red-500"
            placeholder="••••••••"
            {...register('password')}
          />
          {errors.password && (
            <p id="password-error" className="text-xs text-red-400" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-[#F0BF1F]/70">
            <input type="checkbox" className="rounded border-[#F0BF1F]/30" />
            Remember me
          </label>
          <span className="text-[#F0BF1F]/70 hover:underline cursor-pointer">
            Forgot Password?
          </span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-[#F0BF1F] px-4 py-2.5 text-sm font-medium text-[#472914] transition-colors hover:bg-[#F0BF1F]/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Signing in…' : 'Log In'}
        </button>
      </form>

      <p className="text-center text-sm text-[#F0BF1F]/70">
        Don&apos;t have an account?{' '}
        <Link href="/auth/signup" className="font-medium text-[#F0BF1F] hover:underline">
          Create one
        </Link>
      </p>
    </div>
  )
}