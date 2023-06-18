defmodule BackendWeb.AddVideoView do
  use BackendWeb, :view

  def render("added.json", _params) do
    %{
      message: "Video added successfully"
    }
  end
end
