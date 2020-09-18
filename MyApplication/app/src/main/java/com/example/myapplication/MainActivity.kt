package com.example.myapplication

import aga.android.luch.Beacon
import aga.android.luch.BeaconScanner
import aga.android.luch.rssi.ArmaFilter
import android.bluetooth.le.ScanResult
import android.os.Bundle
import android.util.DisplayMetrics
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.nexenio.bleindoorpositioning.ble.beacon.BeaconManager
import kotlinx.android.synthetic.main.activity_main.*


class MainActivity : AppCompatActivity() {

    private val signalRSpajanje = SignalRSpajanje.create()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        signalRSpajanje.SpojiSignalR()

        val beaconScanner = BeaconScanner.Builder(this)
            .setBeaconBatchListener { beacons: Collection<Beacon> ->
                beacons.forEach{
                    println(it.getIdentifierAsUuid(1))
                }
            }
            .setRangingEnabled(ArmaFilter.Builder())
            .build()

        beaconScanner.start()



        click.setOnClickListener{
            setPosition(getX(), getY(), getHeight(), getWidth())

        }
    }

    private fun setPosition(x: Float, y:Float, height: Float, width: Float){
        view_move.visibility = View.VISIBLE

        view_move.x = x
        view_move.y = y

        signalRSpajanje.Poslaji(x, y, height, width)
    }

    private fun processScanResult(scanResult: ScanResult) {
        val macAddress = scanResult.device.address
        val advertisingData = scanResult.scanRecord?.bytes
        val rssi = scanResult.rssi
        BeaconManager.processAdvertisingData(macAddress, advertisingData, rssi)
    }


    private fun getX() : Float{
        return (0..720).random().toFloat()
    }

    private fun getY() : Float{
        return (0..1400).random().toFloat()
    }

    private fun getWidth() : Float{
        val displayMetrics = DisplayMetrics()
        windowManager.defaultDisplay.getMetrics(displayMetrics)
        return displayMetrics.widthPixels.toFloat()
    }

    private fun getHeight(): Float{
        return third_beacon.y
    }



}


