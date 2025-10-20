import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParams } from "../App";

type RouteNames = keyof StackParams;

const Labels: Record<RouteNames, string> = {
    "Starter Menu": "Starters",
    "Main Menu": "Mains",
    "Dessert Menu": "Dessert",
    "Splash Screen": ""
};

const Menu: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const route = useRoute<RouteProp<StackParams, RouteNames>>();

  const [activeMenu, setActiveMenu] = useState<RouteNames>(
    (route?.name as RouteNames) ?? "Starter Menu"
  );

  useEffect(() => {
    if (route?.name && route.name !== activeMenu) {
      setActiveMenu(route.name as RouteNames);
    }
  }, [route?.name]);

  const handleNavigation = (menuName: RouteNames) => {
    if (menuName !== route.name) {
      navigation.navigate(menuName);
    }
    setActiveMenu(menuName);
  };

  return (
    <View style={styles.container}>
      {(Object.keys(Labels) as RouteNames[]).map((key) => {
        const isActive = activeMenu === key;
        return (
          <TouchableOpacity
            key={key}
            onPress={() => handleNavigation(key)}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            style={styles.touchable}
            activeOpacity={0.7}
          >
            <View style={styles.labelWrap}>
              <Text style={[styles.text, isActive && styles.textActive]}>
                {Labels[key]}
              </Text>
              {isActive && <View style={styles.underline} />}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Menu;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "transparent",
  },
  touchable: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  labelWrap: {
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#222",
  },
  textActive: {
    fontWeight: "600",
  },
  underline: {
    marginTop: 6,
    height: 2,
    width: "60%",
    borderRadius: 2,
    backgroundColor: "#222",
    alignSelf: "center",
  },
});
