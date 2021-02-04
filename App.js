/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  PermissionsAndroid,
} from 'react-native';


import SMSListener from 'react-native-android-sms-listener';
import SmsSend from 'react-native-sms';
//import SendSMS from 'react-native-send-sms';


const App: () => React$Node = () => {


  useEffect(() => {

    (async function () {

      try {

        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_SMS,
          {
            title: "Permission requesting",
            message: "Grant permission"
          }
        );

        let subscription = SMSListener.addListener(msg => {

          const { originatingAddress, body, timestamp } = msg;
          console.log(`Recebeu um SMS: ${body}`)
          console.log(originatingAddress);

          SmsSend.send({
            body: 'Aqui vai o feedback',
            recipients: [`${originatingAddress}`.replace("+244", "")],
            successTypes: ['sent', 'queued'],
            allowAndroidSendWithoutReadPermission: true
          }, (comlpeted, cancelled, error) => {

            console.log(`
            
              SMS Callback: completed ${comlpeted},
              cancelled: ${cancelled},
              error: ${error}
            
            `);

          })




        });


      } catch (e) { }


    })()

  }, [])


  return (
    <>
      <View>
        <Text>Aguardando SMS</Text>
      </View>
    </>
  );
};



export default App;
