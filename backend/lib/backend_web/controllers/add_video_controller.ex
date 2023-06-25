defmodule BackendWeb.AddVideoController do
  alias Backend.Video.Add
  alias Youtube.VideoDetail
  use BackendWeb, :controller

  alias Plug.Conn
  alias Validate.ValidateUrl

  alias BackendWeb.FallbackController

  action_fallback(FallbackController)

  def add(%Conn{} = conn, params) do
    %{"name" => name, "url" => url} = params

    with {:ok, video_id} <- ValidateUrl.call(url),
         {:ok, video_detail} <- VideoDetail.get_youtube_video_details(video_id) do
      video_detail
      |> Map.put(:user_name, name)
      |> Map.put(:url, url)
      |> Map.put(:id, UUID.uuid4())
      |> Add.call()

      conn
      |> put_status(:ok)
      |> render("added.json")
    end
  end
end
