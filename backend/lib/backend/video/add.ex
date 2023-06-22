defmodule Backend.Video.Add do
  alias Backend.Server.Client, as: GenServerClient

  def call(video) do
    GenServerClient.push(video)
  end
end
