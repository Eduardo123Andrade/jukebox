defmodule Backend.Server.Actions.PushVideo do
  alias Backend.Server.JukeboxData

  def call(%JukeboxData{} = jukebox_data, video_list) do
    %{video_list: video_list_state, current_video: current_video} = jukebox_data
    new_list = video_list_state ++ video_list
    IO.puts("aqui")

    new_data = %JukeboxData{
      current_video: current_video,
      video_list: new_list
    }

    {:ok, new_data}
  end
end
