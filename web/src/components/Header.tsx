import { usePlayer } from '@/hooks/usePlayer'
import { usePostRequest } from '@/hooks/usePostRequest'
import React, { ChangeEvent, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

interface HeaderProps {}

type Input = ChangeEvent<HTMLInputElement>

interface Variables {
  name: string
  url: string
}
interface RequestError {
  message: string
}

const getUrlId = (url: string) => {
  const regex = /v=([^&]+)/
  const match = url.match(regex)

  if (match) {
    const [, videoId] = match
    return videoId
  }
}

const getUrl = (url: string) => {
  const regex = /^(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/

  const match = url.match(regex)
  if (match) {
    const [, videoId] = match
    return `https://www.youtube.com/watch?v=${videoId}`
  }
  return url
}

export const Header: React.FC<HeaderProps> = () => {
  const [url, setUrl] = useState<string>('')
  const [name, setName] = useState<string>()
  const notifyError = (message: string) => toast.error(message)
  const [{ currentVideo, videos }] = usePlayer()

  const { mutate, isLoading } = usePostRequest<
    unknown,
    Variables,
    RequestError
  >('/video/add-on-list', {
    onSuccess: () => {
      setUrl('')
    },
    onError: ({ response }) => {
      const {
        data: { message },
      } = response

      notifyError(message)
      setUrl('')
    },
  })

  const onChangeName = ({ target }: Input) => {
    const { value } = target
    setName(value)
  }

  const onGetUrl = ({ target }: Input) => {
    const { value } = target
    const url = getUrl(value)

    setUrl(url)
  }

  const addIdOnList = () => {
    const [firstName, lastName] = name.split(' ')
    const formattedName = `${firstName} ${lastName ?? ''}`.trim()

    if (validateUrl(url))
      return mutate({
        name: formattedName,
        url,
      })

    setUrl('')
    return notifyError('Esse video já é o ultimo da lista')
  }

  const validateUrl = (url: string) => {
    const id = getUrlId(url)
    if (!id) return false

    return !(
      videos[videos.length - 1]?.videoId === id ||
      (!videos.length && currentVideo?.videoId === id)
    )
  }

  const disabled = !name || !url || isLoading

  return (
    <div>
      <h1 className="pb-2 text-lg font-bold text-white">Jukebox do Pittalks</h1>

      <div className="mb-5 flex">
        <div className="flex w-[60%] flex-col gap-5">
          <input
            type="text"
            className=" w-[30%] rounded"
            placeholder="Nome"
            onChange={onChangeName}
          />

          <input
            type="text"
            className="rounded"
            placeholder="Cole o link de video do youtube"
            value={url}
            onChange={onGetUrl}
          />
        </div>

        <button
          disabled={disabled}
          className={`ml-5 w-24 self-end rounded
           ${disabled ? 'bg-gray-600' : 'bg-blue-900'}`}
          onClick={addIdOnList}
        >
          <label className="text-white">Adicionar</label>
        </button>
      </div>

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
