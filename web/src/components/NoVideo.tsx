import React from 'react'
import NoVideoIllustration from '@/assets/svgs/no-video.svg'
import Image from 'next/image'

interface NoVideoProps {}

export const NoVideo: React.FC<NoVideoProps> = (props) => {
  return (
    <div className="flex justify-center">
      <Image
        height={450}
        className=""
        src={NoVideoIllustration}
        alt="No video"
      />
    </div>
  )
}
