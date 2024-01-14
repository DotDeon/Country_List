import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import Animated from "react-native-reanimated";
import { topHeaderHeight, transition } from "./CountryList";

const CountryDetails = ({ route, navigation }) => {
  const { item } = route?.params;
  const duration = 400;

  return (
    <SafeAreaView classname="flex flex-1 h-screen">
      <AntDesign
        name="arrowleft"
        size={28}
        color="#333"
        style={{ top: 4, left: 5, zIndex: 90 }}
        onPress={() => {
          navigation.push("/");
        }}
      />

      <Animated.Image
        key={item.flags.png}
        source={{ uri: item.flags.png }}
        className="absolute mb-2 opacity-40 h-[calc(100vh/3)] w-screen"
        sharedTransitionTag={`flags${item?.flags.png}`}
        sharedTransitionStyle={transition}
        resizeMethod="auto"
        resizeMode="cover"
      />

      <View className="flex flex-row justify-between items-end w-full px-4 mt-[calc(100vh/14)]">
        <Animated.View>
          <Text className="font-bold text-3xl">{item?.name.common}</Text>

          <Text className="text-base opacity-70 text-right">{item?.cca3}</Text>
        </Animated.View>
        <View className={`bg-white p-3 rounded-full`}>
          <Animated.Image
            key={item?.coatOfArms.png}
            source={{
              uri: item?.coatOfArms.png,
            }}
            className={`h-24 w-24 object-contain`}
            sharedTransitionTag={`coatOfArms${item?.coatOfArms.png}`}
            sharedTransitionStyle={transition}
          />
        </View>
      </View>
      <Animated.View
        className="absolute h-screen w-screen bg-white rounded-t-3xl p-10"
        style={{ transform: [{ translateY: topHeaderHeight }] }}
      >
        <ScrollView>
          <Animatable.View animation="fadeInUpBig" delay={duration + 200}>
            <View className="flex flex-row justify-between items-center w-full">
              <Text className=" font-bold text-lg text-center">
                {item.name.official}
              </Text>
            </View>
            <View className="flex flex-row justify-between items-center w-full mt-10">
              <Text className=" font-bold text-base">Capital:</Text>
              <Text className="text-base">{item.capital[0]}</Text>
            </View>
            <View className="flex flex-row justify-between items-center w-full">
              <Text className=" font-bold text-base">Region:</Text>
              <Text className="text-base">{item.region}</Text>
            </View>
            <View className="flex flex-row justify-between items-center w-full">
              <Text className=" font-bold text-base">Popilation:</Text>
              <Text className="text-base">{item.population}</Text>
            </View>
            <Text className="mt-4">{item.flags.alt}</Text>
          </Animatable.View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

export default CountryDetails;
