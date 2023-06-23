defmodule Youtube.ExtractVideoDetail do
  def call(items) do
    extract_video_detail(items)
  end

  defp extract_video_detail(items) do
    [details] = items
    %{"snippet" => snippet, "id" => id} = details
    %{"title" => title, "channelTitle" => author, "thumbnails" => thumbnails} = snippet

    thumbnail = get_thumbnail_data(thumbnails)

    %{title: title, author: author, thumbnail: thumbnail, id: id}
  end

  defp get_thumbnail_data(thumbnails) do
    %{"default" => default} = thumbnails

    %{
      "height" => height,
      "url" => url,
      "width" => width
    } = default

    %{
      height: height,
      url: url,
      width: width
    }
  end
end
