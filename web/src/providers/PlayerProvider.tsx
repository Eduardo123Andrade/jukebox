import { usePhoenixChannel } from '@/hooks'
import { VideoDetail } from '@/interfaces'
import { PlayerStatus } from '@/types'
import React, { createContext, useEffect, useState } from 'react'

interface PlayerProviderState {
  currentVideo: VideoDetail
  videos: VideoDetail[]
}

interface PlayerProviderActions {
  onNextVideo: () => void
  onPlayVideo: () => void
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
  const [playerStatus, setPlayerStatus] = useState<PlayerStatus>('IDLE')
  const [videos, setVideos] = useState<VideoDetail[]>([])

  const { onPlayVideo } = usePhoenixChannel({
    onUpdateVideoList,
  })

  useEffect(() => {
    if (!!videos.length && !currentVideo) {
      const [firstVideo, ...rest] = videos
      setCurrentVideo(firstVideo)
      setVideos(rest)
    }
  }, [videos, currentVideo])

  const onNextVideo = () => {
    if (videos.length) {
      onPlayVideo()
      const [nextCurrentVideo] = videos
      setCurrentVideo(nextCurrentVideo)
      setVideos((prevState) => {
        const newVideos = prevState.filter(
          (item) => item.id !== currentVideo.id
        )
        return newVideos
      })
    }
  }

  const _onPlayVideo = () => {
    if (playerStatus !== 'PLAYING') onPlayVideo()
    setPlayerStatus('PLAYING')
  }

  function onUpdateVideoList(videoList: VideoDetail[]) {
    setVideos(videoList)
  }

  return (
    <PlayerContext.Provider
      children={children}
      value={[
        { currentVideo, videos },
        {
          onNextVideo,
          onPlayVideo: _onPlayVideo,
        },
      ]}
    />
  )
}
