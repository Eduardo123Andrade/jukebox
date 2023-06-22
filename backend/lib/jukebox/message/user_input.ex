defmodule Jukebox.Message.UserInput do
  alias Jukebox.Message.UserInput
  @keys [:id, :name, :url]

  defstruct @keys

  def build(%UserInput{name: name, url: url}) do
    {:ok,
     %__MODULE__{
       name: name,
       url: url
     }}
  end
end
