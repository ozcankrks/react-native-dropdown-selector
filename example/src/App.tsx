import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import DropSelector from 'react-native-dropdown-selector';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <DropSelector
        isDisabled={false}
        headerText="Lütfen Seçiniz"
        list={[
          { text: 'v1', value: 'v2' },
          { text: 'v2', value: 'v2' },
        ]}
        placeholder="Lütfen Bir Seçim Yapın"
        onChange={(u) => console.log(JSON.stringify(u))}
        label="Konu Seçiniz"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding:10
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
