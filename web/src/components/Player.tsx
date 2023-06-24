import { usePlayer } from '@/hooks/usePlayer'
import { VideoDetail as VideoDetailInterface } from '@/interfaces'
import { useRef } from 'react'
import YouTubePlayer, { YouTubeProps } from 'react-youtube'
import { NoVideo } from './NoVideo'
import { VideoDetail } from './VideoDetail'

interface PlayerProps {}

const renderVideoItem = (video: VideoDetailInterface) => {
  return <VideoDetail key={video.id} video={video} />
}

export const Player: React.FC<PlayerProps> = ({}) => {
  const [{ videos, currentVideo }, { onNextVideo }] = usePlayer()

  const ref = useRef<YouTubePlayer>(null)

  const opts: YouTubeProps['opts'] = {
    height: 500,
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1,
      controls: 1,
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
          }}
        />
      )}
      {!currentVideo && videos.length && <NoVideo />}
      <div className="pt-5">{videos.map(renderVideoItem)}</div>
    </div>
  )
}
