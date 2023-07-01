defmodule Youtube.VideoDetail do
  use Tesla

  alias Youtube.ExtractVideoDetail
  alias Backend.Error
  alias Tesla.Env

  plug Tesla.Middleware.BaseUrl, "https://www.googleapis.com/youtube/v3/videos"
  plug Tesla.Middleware.JSON

  def get_youtube_video_details(video_id) do
    youtube_api_key = System.get_env("YOUTUBE_API_KEY") || ""

    "?part=snippet&id=#{video_id}&key=#{youtube_api_key}"
    |> get()
    |> handle_get()
  end

  defp handle_get({:ok, %Env{status: 200, body: %{"items" => items}}}) when length(items) > 0 do
    video_detail = ExtractVideoDetail.call(items)

    {:ok, video_detail}
  end

  defp handle_get({:ok, %Env{status: 200, body: %{"items" => items}}})
       when length(items) == 0 do
    {:error, Error.video_not_found()}
  end

  defp handle_get(_) do
    {:error, Error.internal_server_error()}
  end
end
