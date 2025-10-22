import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParams } from "../App";

import { starterArray } from "./StarterList";
import { mainArray } from "./MainList";
import { dessertArray } from "./DessertList";

type RouteNames = keyof StackParams;

const Labels: Record<RouteNames, string> = {
  "Starter Menu": "Starters",
  "Main Menu": "Mains",
  "Dessert Menu": "Dessert",
  "Splash Screen": "",
  Editer: "",
  Filter: "",
  Receipt: ""
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

  const counts: Record<string, number> = {
    "Starter Menu": starterArray.length,
    "Main Menu": mainArray.length,
    "Dessert Menu": dessertArray.length,
  };

  return (
    <View style={styles.container}>
      {(Object.keys(Labels) as RouteNames[]).map((key) => {
        const isActive = activeMenu === key;
        const label = Labels[key];
        const count = counts[key];

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
                {label}
              </Text>

              {/* show badge only for course labels */}
              {label ? (
                <View style={styles.badgeWrap}>
                  <Text style={styles.badgeText}>{typeof count === "number" ? count : ""}</Text>
                </View>
              ) : null}

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
    flexDirection: "row",
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
    position: "absolute",
    bottom: -8,
  },
  badgeWrap: {
    marginLeft: 8,
    minWidth: 26,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: "#3C231C",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#FFF6DB",
    fontSize: 12,
    fontWeight: "700",
  },
});
