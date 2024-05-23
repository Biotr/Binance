from binance.client import AsyncClient
import asyncio
async def funkcja():
    client_binance=await AsyncClient.create('811b4221aa7663cce851aac489a91cb5c60db42bf4f54a0f6d3e79a8d21b6f56','db66d5603899f15206896b2d1d99fb97f3a1c0c0fc6731d38fad917d2af6d84d',testnet=True)
    wynik= await client_binance.futures_symbol_ticker(symbol='BTCUSDT')
    print(float(wynik['price']))
    return 0


asyncio.run(funkcja())