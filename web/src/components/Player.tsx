import { usePlayer } from '@/hooks/usePlayer'
import { VideoDetail as VideoDetailInterface } from '@/interfaces'
import { useRef } from 'react'
import YouTubePlayer, { YouTubeEvent, YouTubeProps } from 'react-youtube'
import { NoVideo } from './NoVideo'
import { VideoDetail } from './VideoDetail'

interface PlayerProps {}

const renderVideoItem = (video: VideoDetailInterface) => {
  return <VideoDetail key={video.id} video={video} />
}

export const Player: React.FC<PlayerProps> = ({}) => {
  const [{ videos, currentVideo }, { onNextVideo, onPlayVideo }] = usePlayer()

  const ref = useRef<YouTubePlayer>(null)

  const opts: YouTubeProps['opts'] = {
    height: 500,
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 1,
    },
  }

  const auxList = [currentVideo, ...videos]

  const onPlay = (event: YouTubeEvent<number>) => {
    // console.log(event.data)
    onPlayVideo()
  }

  if (!currentVideo) return <></>

  return (
    <div>
      {!!currentVideo && (
        <YouTubePlayer
          ref={ref}
          videoId={currentVideo.videoId}
          onEnd={onNextVideo}
          opts={opts}
          onPlay={onPlay}
        />
      )}
      {!currentVideo && videos.length && <NoVideo />}
      <div className="pt-5">{auxList.map(renderVideoItem)}</div>
    </div>
  )
}
