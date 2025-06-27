package com.smsreader

import android.Manifest
import android.content.pm.PackageManager
import android.database.Cursor
import android.provider.Telephony
import android.util.Log
import androidx.core.app.ActivityCompat
import com.facebook.react.bridge.Promise
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.turbomodule.core.interfaces.TurboModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import org.json.JSONArray
import org.json.JSONObject

@ReactModule(name = NativeSmsReaderModule.NAME)
class NativeSmsReaderModule(private val reactContext: ReactApplicationContext)
    : ReactContextBaseJavaModule(reactContext), TurboModule {

    companion object {
        const val NAME = "NativeSmsReader"
    }

    override fun getName() = NAME

    @ReactMethod
    fun readSms(promise: Promise) {
        if (ActivityCompat.checkSelfPermission(reactContext, Manifest.permission.READ_SMS)
            != PackageManager.PERMISSION_GRANTED) {
            promise.reject("NO_PERMISSION", "SMS read permission not granted")
            return
        }

        val smsList = JSONArray()
        val cursor: Cursor? = reactContext.contentResolver.query(
            Telephony.Sms.Inbox.CONTENT_URI,
            arrayOf(Telephony.Sms.ADDRESS, Telephony.Sms.BODY, Telephony.Sms.DATE),
            null,
            null,
            Telephony.Sms.DEFAULT_SORT_ORDER
        )

        cursor?.use {
            while (it.moveToNext()) {
                val address = it.getString(it.getColumnIndexOrThrow(Telephony.Sms.ADDRESS))
                val body = it.getString(it.getColumnIndexOrThrow(Telephony.Sms.BODY))
                val date = it.getLong(it.getColumnIndexOrThrow(Telephony.Sms.DATE))

                val smsJson = JSONObject().apply {
                    put("address", address)
                    put("body", body)
                    put("timestamp", date)
                }
                smsList.put(smsJson)
            }
        }

        promise.resolve(smsList.toString())
    }
}
