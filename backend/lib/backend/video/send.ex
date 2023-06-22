defmodule Backend.Video.Send do
  alias BackendWeb.Endpoint

  def call(video_list) do
    IO.inspect(video_list, label: "VIDEO_LIST")
    IO.inspect(Enum.count(video_list), label: "Count")
    Endpoint.broadcast("room:lobby", "update_video_list", video_list)
  end
end
