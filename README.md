# Quick summary
**Menu** is a mobile UI that shows three courses: *Starters, Mains, Desserts.*
*Users view dish lists, open a simple editor to add dishes, filter the menu, and view a receipt.*
The UI uses local image assets for packaged menu items and image URIs for images added at runtime.

## Contents

- screens — app screens (SplashScreen, StarterMenu, MainMenu, DessertMenu, MenuEditer, MenuFilter, MenuReceipt)
- components — shared pieces (Menu, Tab, OrderStore.tsx ,small utilities)
- components/StarterList.tsx, MainList.tsx, DessertList.tsx — arrays of initial menu items and TS interfaces
- components/OrderStore.tsx — manages order data (add, clear, get functions)
- assets — images and icons also include place-holder.png and all menu images used in lists
- App.tsx — main entry file and navigation setup

## Features

+ Course navigation: *Starters, Mains, Desserts.*
+ Menu display with <ins>name, price, description, and thumbnail.</ins>
+ Editor screen to add new dishes with image picker integration. New images are saved as URIs.
+ Filter screen to search and filter by course and price range.
+ Receipt screen that computes <ins>subtotal, tax, tip, and total.</ins>
+ Menu component shows counts of items per course.

## Tech stack

1. React Native with TypeScript.
    - React Navigation _(@react-navigation/native, native-stack and bottom-tabs where used)._
    - _react-native-image-picker_ for picking images in the editor.
    - Local Store Modules _(OrderStore for managing order data in memory)._
2. Plain _StyleSheet.create_ for styling.
3. Expo used for development, testing, and image management.

## Screens overview

### SplashScreen
+ Updated layout and styles. Hero image uses **assets/icon.png**.
+ Bottom call-to-action button moved up and container spacing adjusted.
+ File: <ins>**screens/SplashScreen.tsx**</ins>.

### StarterMenu / MainMenu / DessertMenu
+ Unified list layout across menus.
+ Each screen uses a **FlatList** with **keyExtractor** and **contentContainerStyle** to avoid overlap with the tab bar.
+ Tab moved closer to the menu list (position adjusted).
+ Image handling normalized via **getImageSource(...)** helper so local assets and remote URIs both work.
+ Files: <ins>**screens/StarterMenu.tsx, screens/MainMenu.tsx, screens/DessertMenu.tsx**</ins>.

### MenuEditer
+ Full editor form to add new dishes.
+ Image picker integration (react-native-image-picker) plugged in and uses **assets/place-holder.png** when no image selected.
+ Save logic builds a **MenuItem** and stores it into the appropriate array (**starterArray, mainArray, dessertArray**).
+ Removed persistent bottom bar per request. Added Clear and Save actions on the form. Back button is included on the screen header.
+ Files: <ins>**screens/MenuEditer.tsx**</ins>.

### MenuFilter
+ Filter form with course pills, search and price range.
+ Shows counts for each course (All, Starters, Mains, Desserts).
+ Removed floating bottom bar so the apply/reset buttons are in the form.
+ File: <ins>**screens/MenuFilter.tsx**</ins>.

### MenuReceipt
+ Reads order data from the app store and recalculates totals.
+ Subtotal, tax, tip and total computed and displayed.
+ Uses **FlatList** with proper **keyExtractor**.
+ No hardcoded sample order. The screen fetches the current order from the store and refreshes on focus.
+ File: <ins>**screens/MenuReceipt.tsx**</ins>.
