defmodule Backend.Jukebox.Message.UserInput do
  alias Backend.Jukebox.Message.UserInput
  @keys [:name, :url]

  defstruct @keys

  def build(%UserInput{name: name, url: url}) do
    {:ok,
     %__MODULE__{
       name: name,
       url: url
     }}
  end
end
