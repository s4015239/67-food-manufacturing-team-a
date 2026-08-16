'use client'

import { useState } from 'react'

const members = [
  {
    name: 'Panagiotis Doumas',
    role: 'Project Manager',
    blurb:
      'Leads project coordination and planning for the team, keeping tasks on track and managing the Canvas submission.',
    photo: '/placeholder-profile.png',
  },
  {
    name: 'Kevin',
    role: 'Business Analyst',
    blurb:
      'Writes and validates requirements for each feature, making sure the team builds what the client actually needs.',
    photo: '/placeholder-profile.png',
  },
  {
    name: 'Matthew Le',
    role: 'UX Designer',
    blurb:
      'Designs the look and feel of the platform and creates mockups for new features, also supporting development tasks.',
    photo: '/placeholder-profile.png',
  },
  {
    name: 'Spencer Beresford',
    role: 'Developer',
    blurb:
      'Builds and styles front-end features for the platform, including authentication flows and page layouts.',
    photo: '/placeholder-profile.png',
  },
  {
    name: 'Linze Cai',
    role: 'Developer',
    blurb:
      'Builds and tests features for the platform, contributing to the shared codebase and infrastructure setup.',
    photo: '/placeholder-profile.png',
  },
]

function MemberCard({ member }: { member: (typeof members)[number] }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = member.blurb.length > 120

  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-3 flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#472914] bg-white">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <svg className="h-12 w-12 text-[#472914]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
          </svg>
        )}
      </div>
      <p className="break-words font-['Roboto_Condensed'] font-bold text-[#472914]">
        {member.name}
      </p>
      <p className="mb-2 text-sm font-medium text-[#472914]/80">{member.role}</p>
      <p
        className={`text-xs leading-relaxed break-words text-[#472914]/70 ${
          !expanded && isLong ? 'line-clamp-3' : ''
        }`}
      >
        {member.blurb}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 text-xs font-medium text-[#472914] underline"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  )
}

export default function TeamPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-center font-['Roboto_Condensed'] text-5xl font-extrabold text-[#472914]">
        67 - Food Manufacturing - Team A
      </h1>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {members.map((member, i) => (
          <MemberCard key={i} member={member} />
        ))}
      </div>
    </div>
  )
}