const {Socket} = require("phoenix-channels") 


const socket = new Socket("ws://localhost:4000/socket", {
  logger: (kind, message, data) => console.log(`${kind}: ${message}`, data)
})

socket.connect()

const channel = socket.channel("room:lobby")


channel
  .join()
  .receive("ok", resp => {console.log("CONNECTED", resp)})