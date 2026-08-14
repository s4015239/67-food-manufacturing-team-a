import { redirect } from 'next/navigation'
import { getServerSession } from '@/actions/auth.actions'

export default async function TeamLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()
  if (!session) redirect('/auth/signin')

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
      </nav>
      <main className="px-8 py-8">{children}</main>
    </div>
  )
}