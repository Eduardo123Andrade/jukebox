import { useMemo } from 'react'
import { Socket } from 'phoenix-channels'
import { Thumbnail, VideoDetail } from '@/interfaces'
import { ENVIRONMENT_VARIABLES } from '@/config'

const { NEXT_PUBLIC_CHANNEL_URL } = ENVIRONMENT_VARIABLES

interface ChannelVideoList {
  id: string
  video_id: string
  title: string
  author: string
  thumbnail: Thumbnail
  user_name: string
  url: string
}

interface Response {
  current_video: ChannelVideoList
  video_list: ChannelVideoList[]
}

interface UsePhoenixChannelProps {
  onUpdateVideoListAndCurrentVideo: (
    currentVideo: VideoDetail,
    videoList: VideoDetail[]
  ) => void
}

interface UsePhoenixChannelData {
  onPlayVideo: () => void
  onStopVideo: (id: string) => void
}

type UsePhoenixChannelFunction = (
  props: UsePhoenixChannelProps
) => UsePhoenixChannelData

const formatResponse = (data: ChannelVideoList) => {
  if (!data) return null
  const { user_name, video_id, ...rest } = data
  const currentVideo: VideoDetail = {
    ...rest,
    userName: user_name,
    videoId: video_id,
  }
  return currentVideo
}

const test = (response: Response) => {
  const { current_video, video_list } = response
  const currentVideo = formatResponse(current_video)
  const mappedList = video_list.map(formatResponse)

  return { currentVideo, mappedList }
}

export const usePhoenixChannel: UsePhoenixChannelFunction = ({
  onUpdateVideoListAndCurrentVideo,
}) => {
  const channel = useMemo(() => {
    const socket = new Socket(NEXT_PUBLIC_CHANNEL_URL, {
      // logger: (kind: string, message: string, data: unknown) =>
      // console.log(`${kind}: ${message}`, data),
    })

    socket.connect()

    const channel = socket.channel('room:lobby')

    channel.join().receive('ok', () => {
      console.log('CONNECTED')
    })
    return channel
  }, [])

  channel.on('update_video_list', (response: Response) => {
    const { currentVideo, mappedList } = test(response)

    onUpdateVideoListAndCurrentVideo(currentVideo, mappedList)
  })

  channel.on('welcome', (response: Response) => {
    const { currentVideo, mappedList } = test(response)

    onUpdateVideoListAndCurrentVideo(currentVideo, mappedList)
  })

  const onPlayVideo = () => {
    channel.push('play_video', {})
  }

  const onStopVideo = (id: string) => {
    channel.push('stop_video', { id })
  }

  return {
    onPlayVideo,
    onStopVideo,
  }
}
