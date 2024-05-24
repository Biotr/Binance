import asyncio
import json,config
from websockets.server import serve
from binance.client import AsyncClient
from openai import OpenAI

client_ai=OpenAI(api_key=config.OPEN_AI_API_KEY)

async def echo(websocket):
    client_binance=await AsyncClient.create(config.BINANCE_API_KEY,config.BINANCE_API_SECRET,testnet=True)
    async for message in websocket:
        data=json.loads(message)
        completion=client_ai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role":"system","content":f'Give me nothing just abbreviation of crptocurrency coin that is used in following message`{data["key1"]}`'}
            ]
        )
        coin=completion.choices[0].message.content
        pair=coin.upper()+"USDT"
        
        account_balance = await client_binance.futures_account_balance()
        for checkCoin in account_balance:
            if checkCoin["asset"]=="USDT":
                usdt_balance=round(float(checkCoin["balance"]),0)
        
        coin_info= await client_binance.futures_symbol_ticker(symbol=pair)
        coin_price=float(coin_info['price'])
        entry_price=usdt_balance*(config.percent_of_account/100)
        entry_size=round((entry_price/coin_price)*config.leverage,2)
        print(f"Account balance:{usdt_balance}")
        print(f"Entry size:{entry_size}")
        try:
            await client_binance.futures_create_order(symbol=pair,quantity=entry_size,side='SELL',type='MARKET')
            print("Order successfully booked")
        except Exception as err:
            print(f"Error for symbol{ coin}: {err}")

async def main():
    async with serve(echo,"127.0.0.1",5000):
        await asyncio.Future()

asyncio.run(main())