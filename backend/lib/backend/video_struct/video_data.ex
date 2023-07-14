defmodule Backend.VideoStruct.VideoData do
  alias Backend.VideoStruct.Thumbnail

  @keys [
    id: "",
    author: "",
    thumbnail: %Thumbnail{},
    title: "",
    video_id: "",
    status: :stopped,
    user_name: ""
  ]

  @derive {Jason.Encoder, @keys}
  defstruct @keys
end
