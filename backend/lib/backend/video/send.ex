defmodule Backend.Video.Send do
  alias BackendWeb.Endpoint

  def call(current_state) do
    Endpoint.broadcast("room:lobby", "update_video_list", current_state)
  end
end
