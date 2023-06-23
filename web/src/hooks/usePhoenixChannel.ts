import { useMemo } from 'react'
import { Socket } from 'phoenix-channels'
import { channel } from 'diagnostics_channel'

export const usePhoenixChannel = () => {
  const channel = useMemo(() => {
    const socket = new Socket('ws://localhost:4000/socket', {
      logger: (kind: string, message: string, data: unknown) =>
        console.log(`${kind}: ${message}`, data),
    })

    socket.connect()

    const channel = socket.channel('room:lobby')

    channel.join().receive('ok', (resp) => {
      console.log('CONNECTED')
    })
    return channel
  }, [])

  channel.on('update_video_list', (response) => {
    console.log(JSON.stringify(response, null, 2))
    console.log({ count: response.length })
    console.log('_____')
  })

  return channel
}
