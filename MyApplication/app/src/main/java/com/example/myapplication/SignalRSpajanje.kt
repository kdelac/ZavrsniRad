package com.example.myapplication

import com.microsoft.signalr.HubConnection
import com.microsoft.signalr.HubConnectionBuilder
import com.microsoft.signalr.HubConnectionState

class SignalRSpajanje {
    lateinit var hubConnection: HubConnection

    companion object Factory {
        fun create(): SignalRSpajanje = SignalRSpajanje()
    }

    fun SpojiSignalR(){
        hubConnection = HubConnectionBuilder.create("https://tracinglocationa.azurewebsites.net/position").build()
        hubConnection.start().blockingAwait()
    }

    fun Poslaji(x: Float, y:Float, height: Float, width: Float){
        if (hubConnection.connectionState == HubConnectionState.CONNECTED){
            hubConnection.send("PositionFromServer", x, y, height, width)
        }
    }
}