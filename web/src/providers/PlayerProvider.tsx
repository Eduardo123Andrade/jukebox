import { VideoDetail } from '@/interfaces'
import { MOCKED_VIDEO_DETAILS } from '@/utils/mocked'
import React, { createContext, useEffect, useState } from 'react'

interface PlayerProviderState {
  currentVideo: VideoDetail
  videos: VideoDetail[]
}

interface PlayerProviderActions {
  onNextVideo: () => void
}

type PlayerProviderData = [
  state: PlayerProviderState,
  actions: PlayerProviderActions
]

export const PlayerContext = createContext<PlayerProviderData>(
  {} as PlayerProviderData
)

interface PlayerProviderProps {
  children: React.ReactNode
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [currentVideo, setCurrentVideo] = useState<VideoDetail>()

  const [videos, setVideos] = useState<VideoDetail[]>(MOCKED_VIDEO_DETAILS)

  useEffect(() => {
    if (!!videos.length && !currentVideo) {
      setCurrentVideo(videos[0])
    }
  }, [videos, currentVideo])

  const onNextVideo = () => {
    if (videos.length > 1) {
      const [, nextCurrentVideo] = videos
      setCurrentVideo(nextCurrentVideo)
      setVideos((prevState) => {
        const newVideos = prevState.filter(
          (item) => item.id !== currentVideo.id
        )
        return newVideos
      })
    }
  }

  return (
    <PlayerContext.Provider
      children={children}
      value={[
        { currentVideo, videos },
        {
          onNextVideo,
        },
      ]}
    />
  )
}
