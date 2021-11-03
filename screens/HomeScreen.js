import React, { useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import CustomList from '../components/CustomList';
import { auth, db } from '../firebase';

const HomeScreen = ({navigation}) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Beacon",
      headerStyle: { backgroundColor: '#fff' },
      headerTitleStyle: { fontWeight: 'bold', color: "black" },
      headerTintColor: "black",
      headerLeft: () => {
        <View style={{marginLeft: 20}}>
          <TouchableOpacity>
          <Avatar rounded source={ {uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      }
    })
  }, [navigation])

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
