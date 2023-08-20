import { usePlayer } from '@/hooks/usePlayer'
import { VideoDetail as VideoDetailInterface } from '@/interfaces'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import YouTubePlayer, { YouTubeProps } from 'react-youtube'
import { Checkbox } from './Checkbox'
import { NoVideo } from './NoVideo'
import { VideoDetail } from './VideoDetail'

interface PlayerProps {}

const renderVideoItem = (video: VideoDetailInterface, index: number) => {
  return <VideoDetail key={video.id} video={video} showPlaying={!index} />
}

export const Player: React.FC<PlayerProps> = ({}) => {
  const [{ videos, currentVideo }, { onNextVideo, onPlayVideo, onStopVideo }] =
    usePlayer()
  const [showVideo, setShowVideo] = useState(true)

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
  const notifyError = (message: string) => toast.error(message)

  const auxList = [currentVideo, ...videos]

  const onPlay = () => {
    onPlayVideo()
  }

  const onNext = () => {
    onStopVideo()
    onNextVideo()
  }

  const onError = () => {
    notifyError(`O video ${currentVideo.title} não pode ser exibido`)
    onNext()
  }

  if (!currentVideo)
    return (
      <Checkbox
        checked={showVideo}
        onChange={onToggleVideo}
        label="Exibir video"
      />
    )

  return (
    <div>
      <Checkbox
        className="pb-2"
        checked={showVideo}
        onChange={onToggleVideo}
        label="Exibir video"
      />
      {!!currentVideo && showVideo && (
        <YouTubePlayer
          ref={ref}
          videoId={currentVideo.videoId}
          onEnd={onNext}
          opts={opts}
          onPlay={onPlay}
          onError={onError}
        />
      )}
      {!currentVideo && videos.length && <NoVideo />}
      <div className="pt-5">{auxList.map(renderVideoItem)}</div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </div>
  )
}
