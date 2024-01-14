import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import axios from "axios";
import Animated, {
  Easing,
  SharedTransition,
  withTiming,
} from "react-native-reanimated";
import { useAtom } from "jotai";
import { countAtom, countFilteredAtom } from "../atoms/countryAtom";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;
export const topHeaderHeight = windowHeight * 0.3;
export const transition = SharedTransition.custom((values) => {
  "worklet";
  return {
    width: withTiming(values.targetWidth, {
      easing: Easing.quad,
    }),
    height: withTiming(values.targetHeight, {
      easing: Easing.quad,
    }),
    originX: withTiming(values.targetOriginX, {
      easing: Easing.quad,
    }),
    originY: withTiming(values.targetOriginY, {
      easing: Easing.quad,
    }),
  };
});

const CountryList = ({ navigation }) => {
  const [countries, setCountries] = useAtom(countAtom);
  const [filteredData, setFilteredData] = useAtom(countFilteredAtom);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        "https://restcountries.com/v3.1/region/africa?fields=name,flags,cca2,cca3,coatOfArms,capital,region,population"
      );
      setCountries(result.data);
      setFilteredData(result.data);
    }
    fetchData();
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);

    if (text === "" || text.lenght < 2) {
      setFilteredData(countries);
    } else {
      const filtered = countries.filter((item) =>
        item.name.common.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="relative text-gray-600 bg-white flex flex-row rounded-full  justify-center items-center px-4 mx-4 pb-2 mb-4">
        <TextInput
          type="search"
          name="serch"
          placeholder="Search"
          onChangeText={handleSearch}
          value={searchText}
          style={{ marginTop: 10, flex: 1 }}
        />
        <AntDesign
          name="search1"
          size={18}
          color="#333"
          style={{ marginTop: 10 }}
          onPress={() => {
            navigation.navigate("CountryList");
          }}
        />
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.cca2}
        contentContainerStyle={{ padding: 8 }}
        ListEmptyComponent={<ActivityIndicator animating={true} color="#333" />}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CountryDetails", { item: item });
              }}
              className={`h-32 w-full rounded-2xl`}
            >
              <View className="flex-1 p-3 flex-row items-center justify-between ">
                <Animated.Image
                  source={{ uri: item?.flags.png }}
                  className="absolute bottom-0 left-0 right-0 top-0 mb-2 rounded-2xl opacity-40"
                  sharedTransitionTag={`flags${item?.flags.png}`}
                />
                <Animated.View className=" flex p-2 px-4 relative flex-col mt-8 justify-start bg-white/80 max-w-md rounded-3xl">
                  <Text className="font-bold text-3xl">
                    {item?.name.common}
                  </Text>
                  <Text className=" font-thin text-xs">
                    {item?.name.official}
                  </Text>
                </Animated.View>
                <View className="flex flex-col items-center justify-around ">
                  <Text className="text-xs opacity-70 font-semibold mx-1">
                    {item?.cca2}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default CountryList;
