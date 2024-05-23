// ==UserScript==
// @name         New Userscript
// @namespace    <YOUR DISCORD SERVER LINK>
// @version      2024-05-20
// @description  try to take over the world!
// @author       You
// @match        <YOUR DISCORD SERVER LINK>
// @icon         https://www.google.com/s2/favicons?sz=64&domain=discord.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    setTimeout(timeout,5000)
    function timeout(){
        let isWorking=false
        const button =document.createElement("button")
        const toolbar=document.querySelector(".toolbar__62fb5") //Do zmiany
        button.innerHTML="Włącz"
        button.addEventListener("click",e=>{
            isWorking= !isWorking
            button.innerHTML= isWorking?"Wyłącz":"Włącz";
            messageHandler(isWorking)
        })
        toolbar.appendChild(button)
    }
    const messageHandler=(isWorking)=>{
        var mutationObserver = new MutationObserver(function(mutations) {
            let isNode=false
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.tagName === 'LI'&&isNode) {
                            let message=node.firstChild.firstChild.querySelector("div").firstChild.innerHTML
                             //Do zmiany + przycisk
                            searchCoin(message)
                        }
                    });
                }
                isNode=!isNode
            });
        });
        mutationObserver.observe(document.querySelector(".scrollerInner__37fee"), { // Do zmiany
            childList: true,
            subtree: false
        });
    }
    const searchCoin=(message)=>{
        console.log("proba")
        const socket = new WebSocket('ws://127.0.0.1:5000');
        socket.onopen=function(event){
            console.log('Websocket connection opened.')
            let dataToSend={
                key1:message
            };
            console.log("Wysłano:",dataToSend.key1)
            let jsonData=JSON.stringify(dataToSend)
            socket.send(jsonData)
        }
        socket.onmessage=function(event){
            console.log("Message received from server",event.data)
        }
        socket.onclose=function(){
            console.log("Websocket closed")
        }
        socket.onerror=function(error){
            console.error('Websocket error',error)
        }
    }

})();