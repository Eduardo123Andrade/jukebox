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

interface UsePhoenixChannelProps {
  onUpdateVideoList: (videoList: VideoDetail[]) => void
}

interface UsePhoenixChannelData {
  onPlayVideo: () => void
}

type UsePhoenixChannelFunction = (
  props: UsePhoenixChannelProps
) => UsePhoenixChannelData

export const usePhoenixChannel: UsePhoenixChannelFunction = ({
  onUpdateVideoList,
}) => {
  const channel = useMemo(() => {
    const socket = new Socket('ws://localhost:4000/socket', {
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

  channel.on('update_video_list', (response: ChannelVideoList[]) => {
    const mappedList: VideoDetail[] = response.map(
      ({ user_name, video_id, ...rest }) => ({
        ...rest,
        videoId: video_id,
        userName: user_name,
      })
    )
    onUpdateVideoList(mappedList)
  })

  const onPlayVideo = () => {
    channel.push('play_video', {})
  }

  return {
    onPlayVideo,
  }
}
