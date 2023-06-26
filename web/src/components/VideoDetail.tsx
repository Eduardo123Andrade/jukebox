import { VideoDetail as VideoDetailInterface } from '@/interfaces'
import Image from 'next/image'
import React from 'react'

interface VideoDetailProps {
  video: VideoDetailInterface
  showPlaying?: boolean
}

export const VideoDetail: React.FC<VideoDetailProps> = ({
  video,
  showPlaying = false,
}) => {
  const { thumbnail, title, author, userName } = video
  const alt = `Thumbnail - ${title}`

  return (
    <div className="flex columns-2 gap-5 border-b border-b-gray-600 bg-gray-800">
      <div className="flex flex-col justify-center">
        <label className="text-sm text-gray-400">{userName}</label>
        <Image
          src={thumbnail.url}
          alt={alt}
          width={thumbnail.width}
          height={thumbnail.height}
        />
      </div>
      <div className="flex flex-col justify-center gap-2 text-white">
        <h3>{title}</h3>
        <h6>{author}</h6>
        {showPlaying && <h6 className="text-gray-400">Assistindo...</h6>}
      </div>
    </div>
  )
}
