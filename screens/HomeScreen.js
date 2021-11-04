import React, { useEffect, useLayoutEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import CustomList from '../components/CustomList';
import { auth, db } from '../firebase';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';

const HomeScreen = ({navigation}) => {

  const [chats, setChats] = useState([]);

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
      });
  };

  useEffect(() => {
    const unsubscribe = db.collection('chats').onSnapshot(snapshot =>
      setChats(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    )
    return unsubscribe;
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Beacon",
      headerStyle: { backgroundColor: '#fff' },
      headerTitleStyle: { fontWeight: 'bold', color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{marginLeft: 20}}>
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5} >
          <Avatar rounded source={ {uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
    ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black" style={{marginRight: 20}}/>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("AddChat")}
          >
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
          </View>
      ),
    })
  }, [])

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {id, chatName});
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
          {chats.map((chat) => (
            <CustomList
              key={chat.id}
              id={chat.id}
              chatName={chat.data.name}
              enterChat={enterChat}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  }
});
