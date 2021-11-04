import React, { useLayoutEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback } from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { db, auth } from "../firebase"
import * as firebase from "firebase";

const ChatScreen = ({navigation, route}) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.name,
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View
          style={styles.headerTitle}
        >
          <Avatar
            rounded
            source={{
              uri:
              // messageList[messageList.length - 1]?.data.photoURL ||
              'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
            }}
          />
          <Text
            style={styles.title}
          >{route.params.chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={styles.headerLeft}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={styles.headerRight}
        >
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ios-call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messageList]);

  const sendMessage = () => {
    Keyboard.dismiss();

    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });

    setMessage('');
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot(snapshot => setMessageList(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }))
      ));

    return unsubscribe;
  }, [route])

  return (
    <SafeAreaView style = {{
      flex: 1,
      backgroundColor: "white"
    }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <ScrollView contentContainerStyle={{paddingTop: 15}}>
            {messageList.map(message => (
              message.data.email === auth.currentUser.email ? (
                <View key={message.id} style={styles.receiver}>
                  <Avatar
                    position="absolute"
                    rounded
                    containerStyle={{
                      position: "absolute",
                      bottom: -15,
                      right: -5,
                    }}
                    size={30}
                    bottom={-15}
                    right={-5}
                    source={{
                      uri: message.data.photoURL
                    }}
                  />
                  <Text style={styles.receiverText}>
                    {message.data.message}
                  </Text>
                </View>
              ) : (
                <View key={message.id} style={styles.sender}>
                  <Avatar
                    position="absolute"
                    rounded
                    containerStyle={{
                      position: "absolute",
                      bottom: -15,
                      left: -5,
                    }}
                    size={30}
                    bottom={-15}
                    left={-5}
                    source={{
                      uri: message.data.photoURL
                    }}
                  />
                  <Text style={styles.senderText}>{message.data.message}</Text>
                  <Text style={styles.senderName}>{message.data.displayName}</Text>
                </View>
              )
            ))
            }
          </ScrollView>
          <View styles={styles.footer}>
            <TextInput
              value={message}
              onChangeText={(text) => setMessage(text)}
              onSubmitEditing={sendMessage}
              placeholder='message'
              style={styles.textInput}
            />
            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}
              style={styles.sendButton}>
              <Ionicons name="send" size={24} color="#008E8C" />
            </TouchableOpacity>
          </View>
        </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerLeft: {
    marginLeft: 10
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
    marginRight: 20,
  },
  title: {
    color: "white",
    fontWeight:'700',
    marginLeft: 10
  },
  container: {
    flex: 1,

  },
  receiver: {
    padding: 15,
    backgroundColor: "#008E8C",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  receiverText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
  },

  sender: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  senderText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "black",
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    height: "4000%",
    width: "100%",
    padding: 15,
  },
  sendButton: {
    position: "absolute",
    top: -3,
    marginLeft: "88%",
  },
  textInput: {
    left: 10,
    bottom: 10,
    height: 40,
    width: "80%",
    marginRight: 15,
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
})

export default ChatScreen;
