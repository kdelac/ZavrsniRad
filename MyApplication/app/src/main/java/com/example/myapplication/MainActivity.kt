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
import kotlin.math.pow


class MainActivity : AppCompatActivity() {

    private val signalRSpajanje = SignalRSpajanje.create()
    val x1 = 0.0
    val y1 = 0.0
    val x2 = 3.0
    val y2 = 0.0
    val x3 = 5.0
    val y3 = 0.0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        signalRSpajanje.SpojiSignalR()

        val beaconScanner = BeaconScanner.Builder(this)
            .setBeaconBatchListener { beacons: Collection<Beacon> ->

            }
            .setRangingEnabled(ArmaFilter.Builder())
            .build()

        beaconScanner.start()



        click.setOnClickListener{
            setPosition(getX().toFloat(), getY().toFloat(), getHeight(), getWidth())
        }
    }

    private fun setPosition(x: Float, y:Float, height: Float, width: Float){
        view_move.visibility = View.VISIBLE

        view_move.x = x
        view_move.y = y

        signalRSpajanje.Poslaji(x, y, height, width)
    }


    private fun getX(r1: Float, r2: Float, r3: Float) : Double{
        val a = 2*x2 - 2*x1
        val b = 2*y2 - 2*y1
        val c = r1.pow(2) - r2.pow(2) - x1.pow(2) + x2.pow(2) - y1.pow(2) + y2.pow(2)
        val d = 2*x3 - 2*x2
        val e = 2*y3 - 2*y2
        val f = r2.pow(2) - r3.pow(2) - x2.pow(2) + x3.pow(2) - y2.pow(2) + y3.pow(2)
        val x = (c*e - f*b) / (e*a - b*d)
        return x;
    }

    private fun getY(r1: Float, r2: Float, r3: Float) : Float{
        val a = 2*x2 - 2*x1
        val b = 2*y2 - 2*y1
        val c = r1.pow(2) - r2.pow(2) - x1.pow(2) + x2.pow(2) - y1.pow(2) + y2.pow(2)
        val d = 2*x3 - 2*x2
        val e = 2*y3 - 2*y2
        val f = r2.pow(2) - r3.pow(2) - x2.pow(2) + x3.pow(2) - y2.pow(2) + y3.pow(2)
        val y = (c*d - a*f) / (b*d - a*e)
        return y;
    }

    private fun getWidth() : Float{
        val displayMetrics = DisplayMetrics()
        windowManager.defaultDisplay.getMetrics(displayMetrics)
        return displayMetrics.widthPixels.toFloat()
    }

    private fun getHeight(): Float{
        return third_beacon.y
    }


    private fun ge



}


