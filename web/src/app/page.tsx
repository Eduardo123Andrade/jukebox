'use client'

import { Player } from '@/components'
import { ENVIRONMENT_VARIABLES } from '@/config'
import { VideoDetail } from '@/interfaces'
import { API } from '@/lib/api'
import { ChangeEvent, useRef, useState } from 'react'

const regex = /v=(.*?)&/

const YOUTUBE_API_KEY = ENVIRONMENT_VARIABLES.NEXT_PUBLIC_YOUTUBE_API_KEY

export default function Home() {
  const [inputVideoId, setInputVideoId] = useState<string>()
  const inputRef = useRef<HTMLInputElement>(null)
  const [videos, setVideos] = useState<VideoDetail[]>([])

  const requestVideoInfo = async (videoId: string) => {
    const response = await API.get(
      `?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`
    )
    if (response) {
      const { items } = response.data
      const [firstElement] = items
      const {
        title,
        thumbnails: { default: thumbnail },
        channelTitle: author,
      } = firstElement.snippet
      const details: VideoDetail = {
        title,
        thumbnail,
        author,
        id: videoId,
      }

      setVideos((prevState) => [...prevState, details])
      setInputVideoId('')
    }
  }

  const onGetIdFromUrl = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target
    setInputVideoId(value)
  }

  const addIdOnList = () => {
    const [, videoId] = inputVideoId.match(regex) ?? []

    if (videoId) {
      console.log(videoId)
      requestVideoInfo(videoId)
    } else {
      console.log('Não foi possível encontrar o ID do vídeo.')
    }
  }

  return (
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

        <button className="ml-5 w-24 rounded bg-blue-700" onClick={addIdOnList}>
          <label className="text-white">teste</label>
        </button>
      </div>

      <Player videos={videos} updateVideos={setVideos} />
    </div>
  )
}
