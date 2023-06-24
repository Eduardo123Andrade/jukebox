import React, { ChangeEvent, useRef, useState } from 'react'

interface HeaderProps {}

type Input = ChangeEvent<HTMLInputElement>

export const Header: React.FC<HeaderProps> = (props) => {
  const [url, setUrl] = useState<string>()
  const [name, setName] = useState<string>()

  const inputRef = useRef<HTMLInputElement>(null)

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

    console.log({
      name: formattedName,
      url,
    })
  }

  const disabled = !name || !url

  return (
    <div>
      <h1 className="pb-2 text-lg font-bold text-white">Jukebox do Pittalks</h1>

      <div className="mb-5 flex">
        <div className="flex w-[60%] flex-col gap-5">
          <input
            ref={inputRef}
            type="text"
            className=" w-[30%] rounded"
            placeholder="Nome"
            onChange={onChangeName}
          />

          <input
            ref={inputRef}
            type="text"
            className="rounded"
            placeholder="Cole o link de video do youtube"
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
