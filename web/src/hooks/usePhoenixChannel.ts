import { useMemo } from 'react'
import { Socket } from 'phoenix-channels'
import { Thumbnail, VideoDetail } from '@/interfaces'

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
}

type UsePhoenixChannelFunction = (
  props: UsePhoenixChannelProps
) => UsePhoenixChannelData

export const usePhoenixChannel: UsePhoenixChannelFunction = ({
  onUpdateVideoListAndCurrentVideo,
}) => {
  const channel = useMemo(() => {
    const socket = new Socket(
      'ws://difficult-clever-moray.gigalixirapp.com/socket',
      {
        // logger: (kind: string, message: string, data: unknown) =>
        // console.log(`${kind}: ${message}`, data),
      }
    )

    socket.connect()

    const channel = socket.channel('room:lobby')

    channel.join().receive('ok', () => {
      console.log('CONNECTED')
    })
    return channel
  }, [])

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

  channel.on('update_video_list', (response: Response) => {
    const { current_video, video_list } = response
    const currentVideo = formatResponse(current_video)
    const mappedList = video_list.map(formatResponse)

    onUpdateVideoListAndCurrentVideo(currentVideo, mappedList)
  })

  const onPlayVideo = () => {
    channel.push('play_video', {})
  }

  return {
    onPlayVideo,
  }
}
