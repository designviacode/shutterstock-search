import React from 'react';
import { View, Text } from 'react-native';
// LIBRARIES
import { Root as NativeBaseRoot } from 'native-base';
// REDUX
import { Provider } from 'react-redux';
import store from '@/redux/store';

const App = props => (
  <View style={{ flex: 1 }}>
    <Text>App</Text>
  </View>
);

const Root = () => (
  <Provider store={store}>
    <NativeBaseRoot>
      <App />
    </NativeBaseRoot>
  </Provider>
)

export default Root;
