defmodule Backend.VideoStruct.VideoData do
  alias Backend.VideoStruct.Thumbnail

  @keys [author: "", thumbnail: %Thumbnail{}, title: "", video_id: ""]

  @derive {Jason.Encoder, @keys}
  defstruct @keys
end
