//@refresh reset
import React,{useState,useEffect,useCallback,useRef} from 'react'
import { StyleSheet, Text, View, FlatList, Dimensions, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux'
import {GiftedChat} from 'react-native-gifted-chat'
import {incrementar} from '../reducers/autokeys'
import firebase from '../firebase'

//PUSH NOTIFICATIONS
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
/***************** */

const chat = ({navigation,sistema,user,autokeys,incrementar}) => {
    const [mensajesChat,setMensajesChat] = useState([])
    const [userChat,setUserChat] = useState(null)

    //PUSH NOTIFICATIONS
    const [expoPushToken, setExpoPushToken] = useState('');
    const notificationListener = useRef();
    const responseListener = useRef();  
    /******************** */

    let moment = require('moment');
    require('moment/locale/es-us');
    moment.locale('es-us');
    
    const getDateTimeMoment = () => {
        //return moment()
        //.utcOffset('-06:00')
        //.format('YYYY-MM-DD hh:mm:ss a');
        return new Date()
    }

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);
    /*************************** */      

    useEffect(() => {
        if(user != null){
            setUserChat({
                _id: 1,
                id: user.uid,
                name: user.email
            })

            //ACTUALIZAMOS LA LISTA DE MENSAJES
            firebase.database().ref('chat/'+sistema.uidStore).child(user.uid)
                .on('child_added', (snapshot) => {
                    const data = snapshot.val()
                    //console.log(data.user)
                    const msg = {
                        _id: data._id,
                        text: data.text,
                        createdAt: data.createdAt,
                        user: data.user
                    }
                    //console.log(data)
                    setMensajesChat(previousMessages => GiftedChat.append(previousMessages, msg))
                })
        }
    },[])

    useEffect(() => {
        console.log(expoPushToken)
    },[expoPushToken])

    const onSendMessage = useCallback((messages = [],token) => {
        messages.forEach(element => {
            firebase.database().ref('chat/'+sistema.uidStore).child(user.uid)
            .push({
                _id: element._id,
                text: element.text,
                createdAt: String(getDateTimeMoment()),
                user: element.user,
                expoPushToken: token
            })
            .then((snapshot) => {
                //setMensajesChat(previousMessages => GiftedChat.append(previousMessages, messages))   
                sendPushNotification(sistema.expoToken,element.user.email,element.text)
            })
        });
    }, [])
    
    const handleOnLongPress = (message) => {
        sendFirstMessage()
    }

    return (
        <GiftedChat 
            messages={mensajesChat} 
            user={userChat} 
            onSend={messages => onSendMessage(messages,expoPushToken)} />
        );
    }    

const mapStateToProps = state => {
  //console.log(state.autokeys)
  return state
}

const mapDispatchToProps = (dispatch) => ({
  incrementar: () => dispatch(incrementar()),

})

//PUSH NOTIFICATIONS
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    //console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
async function sendPushNotification(expoPushToken,title,body) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: title,
    body: body,
    data: { data: '' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}
/*************************** */

export default connect(mapStateToProps,mapDispatchToProps)(chat)

const styles = StyleSheet.create({
container: {
  padding:10,
  marginRight:10,
  marginLeft:10,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#fff',
  backgroundColor:'#fff',
  marginTop:8,
  marginBottom:8,
},
contentContainer: {
  paddingVertical: 10
},
itemStyle:{
    marginTop:2,
    marginBottom:2,
},
});