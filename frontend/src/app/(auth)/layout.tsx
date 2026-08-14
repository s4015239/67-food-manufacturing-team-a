import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F0BF1F]">
      <nav className="flex items-center justify-between px-8 py-4">
        <span className="font-['Roboto_Condensed'] text-xl font-extrabold text-[#472914]">
          Food Maturity
        </span>
        <div className="hidden gap-8 text-sm font-medium text-[#472914] md:flex">
          <span>Home</span>
          <span>Dashboard</span>
          <span>Clients</span>
          <span>Analytics</span>
        </div>
        <div className="flex gap-2">
          <button className="rounded-md bg-[#472914] px-4 py-1.5 text-sm font-medium text-white">
            Sign Up
          </button>
          <button className="rounded-md border border-[#472914] px-4 py-1.5 text-sm font-medium text-[#472914]">
            Login
          </button>
        </div>
      </nav>

      <div className="flex min-h-[calc(100vh-72px)] items-center justify-center px-4">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  )
}