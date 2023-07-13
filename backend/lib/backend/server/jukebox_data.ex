defmodule Backend.Server.JukeboxData do
  alias Backend.VideoStruct.VideoData

  @keys [current_video: %VideoData{}, video_list: []]

  @derive {Jason.Encoder, @keys}
  defstruct @keys
end
