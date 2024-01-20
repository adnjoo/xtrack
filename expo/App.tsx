import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import axios from 'axios';
import React from 'react';

export default function App() {
  const [counter, setCounter] = React.useState(1);
  const [data, setData] = React.useState<any>('');
  React.useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${counter}`).then((res) => {
      setData(res.data);
    });
  }, [counter]);

  const handleClick = () => {
    setCounter(counter + 1);
  }

  return (
    <View style={styles.container}>
      <Text>{data.title}</Text>
      <Text>{data.body}</Text>
      <StatusBar style="auto" />
      <Button title="Click" onPress={handleClick} />
    </View>
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
