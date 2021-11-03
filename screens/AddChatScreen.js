import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { Button, Input, } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../firebase';


const AddChat = ({navigation}) => {
  const [chatName, setChatName] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add Chat",
      headerBackTitle: "Chats",
    });
  }, [navigation])

  const addChat = async () => {
    try {
      await db.collection('chats').add({
      name: chatName
      })
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Chat</Text>
      <Input
        placeholder='Chat Name'
        value={chatName}
        onChangeText={(text) => setChatName(text)}
        onSubmitEditing={addChat}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />
      <Button onPress={addChat} title="Add Chat" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 30,
    height: '100%',
  }
});

export default AddChat
