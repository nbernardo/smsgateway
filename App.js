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
          alert(`Recebeu um SMS: ${body}`)
          console.log(originatingAddress);




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
