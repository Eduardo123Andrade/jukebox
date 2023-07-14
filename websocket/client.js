const {Socket} = require("phoenix-channels") 


const socket = new Socket("ws://localhost:4000/socket", {
  logger: (kind, message, data) => console.log(`${kind}: ${message}`, data)
})

socket.connect()

const channel = socket.channel("room:lobby")


channel
  .join()
  .receive("ok", resp => {
    console.log("CONNECTED")
    console.log(resp)

    channel.push("play_video", (res) =>{
      console.log(res, "play_video", {})
    })
  })
  
  channel.on("play_video", (response) => {
    console.log(JSON.stringify(response, null, 2))
    console.log({count: response.length})
    console.log("_____")
  })

