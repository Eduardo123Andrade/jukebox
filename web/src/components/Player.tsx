import { usePlayer } from '@/hooks/usePlayer'
import { VideoDetail as VideoDetailInterface } from '@/interfaces'
import { useRef, useState } from 'react'
import YouTubePlayer, { YouTubeEvent, YouTubeProps } from 'react-youtube'
import { NoVideo } from './NoVideo'
import { VideoDetail } from './VideoDetail'
import { Checkbox } from './Checkbox'

interface PlayerProps {}

const renderVideoItem = (video: VideoDetailInterface, index: number) => {
  return <VideoDetail key={video.id} video={video} showPlaying={!index} />
}

export const Player: React.FC<PlayerProps> = ({}) => {
  const [{ videos, currentVideo }, { onNextVideo, onPlayVideo }] = usePlayer()
  const [showVideo, setShowVideo] = useState(false)

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
  const onToggleVideo = () => setShowVideo((prevState) => !prevState)

  const auxList = [currentVideo, ...videos]

  const onPlay = (event: YouTubeEvent<number>) => {
    onPlayVideo()
  }

  // if (!currentVideo)
  //   return (
  //     <Checkbox
  //       checked={showVideo}
  //       onChange={onToggleVideo}
  //       label="Exibir video"
  //     />
  //   )

  return (
    <div>
      {/* <Checkbox
        className="pb-2"
        checked={showVideo}
        onChange={onToggleVideo}
        label="Exibir video"
      />
      {!!currentVideo && showVideo && (
        <YouTubePlayer
          ref={ref}
          videoId={currentVideo.videoId}
          onEnd={onNextVideo}
          opts={opts}
          onPlay={onPlay}
        />
      )}
      {!currentVideo && videos.length && <NoVideo />}
      <div className="pt-5">{auxList.map(renderVideoItem)}</div> */}
    </div>
  )
}
