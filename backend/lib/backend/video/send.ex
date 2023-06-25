defmodule Backend.Video.Send do
  alias BackendWeb.Endpoint

  def call(current_state) do
    %{video_list: video_list} = current_state
    Endpoint.broadcast("room:lobby", "update_video_list", current_state)
  end
end
