defmodule BackendWeb.AddVideoView do
  use BackendWeb, :view

  # def render("added.json", %{video_data: video_data}) do
  def render("added.json", _params) do
    %{
      message: "Video added successfully"
    }
  end
end
