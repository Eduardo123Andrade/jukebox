import { usePostRequest } from '@/hooks/usePostRequest'
import React, { ChangeEvent, useState } from 'react'

interface HeaderProps {}

type Input = ChangeEvent<HTMLInputElement>

interface Variables {
  name: string
  url: string
}
interface RequestError {
  message: string
}

export const Header: React.FC<HeaderProps> = (props) => {
  const [url, setUrl] = useState<string>('')
  const [name, setName] = useState<string>()

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

      alert(message)
    },
  })

  const onChangeName = ({ target }: Input) => {
    const { value } = target
    setName(value)
  }

  const onGetIdFromUrl = ({ target }: Input) => {
    const { value } = target
    setUrl(value)
  }

  const addIdOnList = () => {
    const [firstName, lastName] = name.split(' ')
    const formattedName = `${firstName} ${lastName ?? ''}`.trim()

    mutate({
      name: formattedName,
      url,
    })
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
            onChange={onGetIdFromUrl}
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
    </div>
  )
}
