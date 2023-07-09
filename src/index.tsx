import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import React, { useRef, useState } from 'react';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import { Pressable } from 'react-native';

interface DropSelectorProps {
  isDisabled?: boolean;
  headerText: string;
  list: ListProps[];
  placeholder: string;
  label?: string;
  onChange: (item: ListProps) => void;
}

interface ListProps {
  text: string;
  value: string | number;
}

const DropSelector: React.FC<DropSelectorProps> = ({
  isDisabled,
  headerText,
  list,
  placeholder,
  label,
  onChange,
}) => {
  const bottomsheet = useRef();
  const [openKey, setOpenKey] = useState(false);
  const [selected, setSelected] = useState<ListProps>();
  const [height, setHeight] = useState(
    (Dimensions.get('window').height * 40) / 100
  );
  const openModal = () => bottomsheet?.current.show();
  const onCloseFunc = () => {
    if (openKey == true) {
      setOpenKey(false);
    } else {
      setOpenKey(false);
      bottomsheet?.current.close();
    }
  };

  return (
    <>
      <SafeAreaView>
        {label && <Text>{label}</Text>}
        <Pressable
          disabled={isDisabled}
          style={{
            backgroundColor: 'white',
            borderRadius: 2,
            marginVertical: 2,
            paddingVertical: 13,
            paddingHorizontal: 12,
            flexDirection: 'row',
            borderColor: '#e8e8e8',
            borderWidth: 1,
            width: '100%',
          }}
          onPress={() => openModal()}
        >
          <Text style={{ flex: 1 }} numberOfLines={1}>
            {selected?.text || placeholder}
          </Text>
          <Image
            source={require('./img/right-arrow.png')}
            style={{ width: 16, height: 16 }}
          />
        </Pressable>
      </SafeAreaView>

      <BottomSheet
        ref={bottomsheet}
        backgroundColor="rgba(0,0,0,0.6)"
        height={(Dimensions.get('window').height * 70) / 100}
        draggable={true}
        sheetBackgroundColor="transparent"
      >
        <View
          style={{
            backgroundColor: 'transparent',
            width: '100%',
            height: '100%',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              width: 80,
              height: 4,
              borderRadius: 99,
            }}
          />
          <ScrollView
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: '100%',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              marginTop: 5,
              padding: 8,
            }}
          >
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 21,
                marginBottom: 10,
              }}
            >
              {headerText}
            </Text>

            {list.map((item, key) => (
              <TouchableOpacity
                key={key}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 2,
                  marginVertical: 2,
                  paddingVertical: 13,
                  paddingHorizontal: 12,
                  flexDirection: 'row',
                  borderColor: '#e8e8e8',
                  borderWidth: 1,
                }}
                onPress={() => {
                  setSelected(item);
                  onChange(item);
                  onCloseFunc();
                }}
              >
                <Text style={{ flex: 1 }} numberOfLines={1}>
                  {item.text}
                </Text>
                <Image
                  source={require('./img/right-arrow.png')}
                  style={{ width: 16, height: 16 }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </BottomSheet>
    </>
  );
};

export default DropSelector;
