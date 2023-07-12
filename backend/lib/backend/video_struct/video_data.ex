defmodule Backend.VideoStruct.VideoData do
  alias Backend.VideoStruct.Thumbnail

  defstruct author: "",
            thumbnail: %Thumbnail{},
            title: "",
            video_id: ""
end
