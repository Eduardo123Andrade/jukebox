defmodule Youtube.VideoDetail do
  use Tesla

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
    video_detail = extract_video_detail(items)

    {:ok, video_detail}
  end

  defp handle_get({:ok, %Env{status: 200, body: %{"items" => items}}})
       when length(items) == 0 do
    {:error, Error.video_not_found()}
  end

  defp handle_get(_) do
    {:error, Error.internal_server_error()}
  end

  defp extract_video_detail(items) do
    [details] = items
    %{"snippet" => snippet, "id" => id} = details
    %{"title" => title, "channelTitle" => author, "thumbnails" => thumbnails} = snippet
    %{"default" => default} = thumbnails

    %{
      "height" => height,
      "url" => url,
      "width" => width
    } = default

    thumbnail = %{
      height: height,
      url: url,
      width: width
    }

    %{title: title, author: author, thumbnail: thumbnail, id: id}
  end
end
