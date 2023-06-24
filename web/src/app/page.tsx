'use client'

import { Header, Player } from '@/components'
import { PlayerProvider } from '@/providers'

export default function Home() {
  return (
    <PlayerProvider>
      <div className="h-screen pl-5 pt-10">
        <Header />

        <Player />
      </div>
    </PlayerProvider>
  )
}
