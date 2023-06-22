defmodule BackendWeb.AddVideoView do
  use BackendWeb, :view

  def render("added.json", %{video_data: video_data}) do
    %{
      message: "Video added successfully",
      video: video_data
    }
  end
end
