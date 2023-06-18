import { VideoDetail as VideoDetailInterface } from '@/interfaces'
import YouTubePlayer, { YouTubeProps } from 'react-youtube'
import { VideoDetail } from './VideoDetail'
import { useEffect, useState } from 'react'

interface PlayerProps {
  videos: VideoDetailInterface[]
  updateVideos: (data: VideoDetailInterface[]) => void
}

const renderVideoItem = (video: VideoDetailInterface) => {
  return <VideoDetail key={video.id} video={video} />
}

export const Player: React.FC<PlayerProps> = ({ videos, updateVideos }) => {
  const [currentVideo, setCurrentVideo] = useState<VideoDetailInterface>()

  useEffect(() => {
    if (!!videos.length && !currentVideo) {
      setCurrentVideo(videos[0])
    }
  }, [videos, currentVideo])

  const onNextVideo = () => {
    if (videos.length > 1) {
      const newVideoList = videos.filter((item) => item.id !== currentVideo.id)
      updateVideos(newVideoList)
      const [nextVideo] = newVideoList
      setCurrentVideo(nextVideo)
    }
  }

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 1,
    },
  }

  if (!videos.length) return <></>

  return (
    <div>
      {!!currentVideo && (
        <YouTubePlayer
          videoId={currentVideo.id}
          onEnd={onNextVideo}
          opts={opts}
        />
      )}
      {videos.map(renderVideoItem)}
    </div>
  )
}
