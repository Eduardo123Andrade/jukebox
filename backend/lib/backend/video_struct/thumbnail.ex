defmodule Backend.VideoStruct.Thumbnail do
  @keys [height: 0, url: "", width: 0]

  @derive {Jason.Encoder, @keys}

  defstruct @keys
end
