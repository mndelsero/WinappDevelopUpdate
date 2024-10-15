import React, { memo } from 'react'; // Asegúrate de importar React y memo correctamente
import { TouchableOpacity, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import tw from '@/config/tw'; // Asegúrate de que esta importación sea correcta
import { Feather, FontAwesome5 } from '@expo/vector-icons';

interface CheckBoxCustomProps {
  taskId: string;
  isChecked: boolean;
  onCheckedChange: (taskId: string, isChecked: boolean) => void;
  check2?: boolean;
}

const CheckBoxCustom = memo(({ taskId, isChecked, onCheckedChange, check2 }: CheckBoxCustomProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    onCheckedChange(taskId, !isChecked);
    scale.value = withSpring(!isChecked ? 1.2 : 1, {
      damping: 3,
      stiffness: 300,
    }, () => {
      if (scale.value !== 1) scale.value = withSpring(1);
    });
  };
 if (check2) {
  return (
    <TouchableOpacity style={tw`flex-row items-center`} onPress={handlePress}>
      {isChecked ? (
        <Animated.View style={animatedStyle}>
<Feather name="check-square" size={24} color={tw.color("black")} />     
   </Animated.View>
      ) : (
        <View style={tw`w-6 h-6 border-2 rounded-sm border-gray-400`}></View>
      )}
    </TouchableOpacity>
  );
}

  return (
    <TouchableOpacity style={tw`flex-row items-center`} onPress={handlePress}>
      {isChecked ? (
        <Animated.View style={animatedStyle}>
<FontAwesome5 name="check-circle" size={24} color={tw.color("primary")} />     
   </Animated.View>
      ) : (
        <View style={tw`w-6 h-6 border-2 rounded-full border-gray-400`}></View>
      )}
    </TouchableOpacity>
  );
});

export default CheckBoxCustom;