import { watch as fsWatch}  from 'fs'
import {Server as HttpServer } from 'http'
import WebSocket from "ws"

import { findForWatcher } from './build'
import settings from './settings'

const { srcDir, publicDir } = settings

export default (expressServer: HttpServer) => {
  const websocketServer = new WebSocket.Server({
    noServer: true,
    path: "/watch",
  });

  expressServer.on("upgrade", (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
      websocketServer.emit("connection", websocket, request);
    });
  });

  function wsSignal(message: string){
    websocketServer.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        console.log(message)
        client.send(message);
      }
    });
  }

  for(const dir of findForWatcher()){
    fsWatch(dir, (eventType, fileName) => {
      wsSignal(`${fileName} ${eventType}`)
    })
  } 
};
