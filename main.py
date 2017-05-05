import asyncio
import datetime
import random
import websockets
import json

async def handler(websocket, path):
    while True:
        msg = await websocket.recv()
        print(msg)
        if msg == 'typing':
            await websocket.send(json.dumps({'data':'typing'}))

start_server = websockets.serve(handler, '127.0.0.1', 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
