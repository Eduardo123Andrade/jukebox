'use client'

import { Player } from '@/components'
import { VideoDetail } from '@/interfaces'
import { PlayerProvider } from '@/providers'
import { ChangeEvent, useRef, useState } from 'react'

export default function Home() {
  const [inputVideoId, setInputVideoId] = useState<string>()
  const inputRef = useRef<HTMLInputElement>(null)
  const [videos, setVideos] = useState<VideoDetail[]>([])

  const onGetIdFromUrl = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target
    setInputVideoId(value)
  }

  const addIdOnList = () => {
    console.log('Nothing to do')
  }

  return (
    <PlayerProvider>
      <div className="pl-5 pt-10">
        <h1 className="pb-2 text-lg font-bold">Jukebox do Pittalks</h1>

        <div>
          <input
            ref={inputRef}
            type="text"
            value={inputVideoId}
            className="mb-5 mt-2 w-[65%] rounded border border-black"
            placeholder="Url"
            onChange={onGetIdFromUrl}
          />

          <button
            className="ml-5 w-24 rounded bg-blue-700"
            onClick={addIdOnList}
          >
            <label className="text-white">teste</label>
          </button>
        </div>

        <Player videos={videos} updateVideos={setVideos} />
      </div>
    </PlayerProvider>
  )
}
