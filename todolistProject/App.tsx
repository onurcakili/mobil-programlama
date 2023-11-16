import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Body, Button, Container, Content, Header, Text } from 'native-base';
import TodoList from './TodoList';
import AddTodo from './AddTodo';

export default function App() {

  const [isReady,setIsReady] = useState(false);
  const [showAddTodoScreen, setShowAddTodoScreen] = useState(false);
  const [counter, setCounter] = useState(4);
  const [todoList, setTodoList] = useState([
    {
      id:1,
      title: "Kitap Oku!",
      completed: false
    },
    {
      id:2,
      title: "Spor Yap!",
      completed: true
    },
    {
      id:3,
      title: "Su İç!",
      completed: true
    }
  ])

  useEffect(()=>{
    (
      async()=>{
        await Font.loadAsync({
          Roboto: require('native-base/Fonts/Roboto.ttf'),
          Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        });
        setIsReady(true);
      }
    )();
  },[]);

  const addTodoItem = (todoText:string)=>{
    console.log("Ekleme Yap");
    const todoItem = {
      id: counter,
      title: todoText,
      completed: false
    }
    setCounter(counter+1);
    setTodoList([...todoList,todoItem]);
    setShowAddTodoScreen(true);

  }

  if(!isReady) {
    return (
      <Text>Yükleniyor...</Text>
    )
  }

  if(showAddTodoScreen) {
    return <AddTodo addTodoItem={addTodoItem} />
  }

  return (
    <Container>
      <Header>
        <Body style={{alignItems:"center"}}>
          <Text style={{color:"white"}}>Ana Sayfa</Text>
        </Body>
      </Header>
      <Content>
          <Text>Sayfaya Hoşgeldin</Text>
          <Button full style={{backgroundColor:"green",marginHorizontal:30, marginBottom:10 }} 
            onPress={()=>{
              setShowAddTodoScreen(true);
            }}
          ><Text>Öge Ekle</Text></Button>
          <TodoList todoList={todoList} setTodoList={setTodoList} />
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
