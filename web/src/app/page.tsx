'use client'

import { Header, Player } from '@/components'
import { PlayerProvider } from '@/providers'
import { useMemo } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

export default function Home() {
  const queryClient = useMemo(() => {
    return new QueryClient()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <PlayerProvider>
        <div className="h-screen pl-5 pt-10">
          <Header />

          <Player />
        </div>
      </PlayerProvider>
    </QueryClientProvider>
  )
}
