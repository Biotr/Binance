# Project Title

Simple bot that allows to gather calls from Discord to create an order in Binance

## Description

Bot uses javascrpit code in Tampermonkey which allows you to turn on/turn off by button, when is turned on MutationObserver allows you to listen for changes and to collect data from messages typed in Discord server, then data is provided by websocket to python scrpit where openAI proccess message to take the symbol of coin and python-binance libary is used for creating an order.
Config file allows you to change api key, api secret (for binance and openai), leverage, percent of your account balance.


https://github.com/Biotr/discord-binance-bot/assets/51881112/657d8bf0-f557-49b7-bce7-ec0f62ad9893


## Getting Started

### Dependencies

* Tampermonkey
* OpenAI
* python-binance
* Websocket

### Installing

* Add Tampermonkey to your browser then paste js code.
* Create venv and install following dependencies.
  

### Executing program

* Turn on by clicking button on top-right side.
* Change config file as you wish.
* Run app.py


## Version History

* 0.1
    * Initial Release

## License

This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details
