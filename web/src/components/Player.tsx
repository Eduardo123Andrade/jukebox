import { VideoDetail as VideoDetailInterface } from '@/interfaces'
import YouTubePlayer, { YouTubeProps } from 'react-youtube'
import { VideoDetail } from './VideoDetail'
import { useEffect, useRef, useState } from 'react'
import { MOCKED_VIDEO_DETAILS } from '@/utils/mocked'
import { usePlayer } from '@/hooks/usePlayer'

interface PlayerProps {
  videos: VideoDetailInterface[]
  updateVideos: (data: VideoDetailInterface[]) => void
}

const renderVideoItem = (video: VideoDetailInterface) => {
  return <VideoDetail key={video.id} video={video} />
}

export const Player: React.FC<PlayerProps> = ({}) => {
  const [{ videos, currentVideo }, { onNextVideo }] = usePlayer()

  const ref = useRef<YouTubePlayer>(null)

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 1,
      start: 120,
    },
  }

  if (!videos.length) return <></>

  return (
    <div>
      {!!currentVideo && (
        <YouTubePlayer
          ref={ref}
          videoId={currentVideo.id}
          onEnd={onNextVideo}
          opts={opts}
          onPlay={(event) => {
            event.data
            console.log({ event })
            console.log(event.data)
            // event.target.mute()
            // event.target
          }}
          // style={{
          //   width: 10,
          // }}
          // iframeClassName="w-50"
          // className="w-50"
        />
      )}
      {videos.map(renderVideoItem)}
    </div>
  )
}
