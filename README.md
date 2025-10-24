# Quick summary
**Menu** is a mobile UI that shows three courses: *Starters, Mains, Desserts.*
**Users view dish lists, open a simple _editor to add dishes, filter the menu, and view a receipt._**
The UI uses local image assets for packaged menu items and image URIs for images added at runtime.

## Contents

- screens/ — app screens (SplashScreen, StarterMenu, MainMenu, DessertMenu, MenuEditer, MenuFilter, MenuReceipt)
- components/ — shared pieces (Menu, Tab or TabBar, small utilities)
- components/StarterList.tsx, MainList.tsx, DessertList.tsx — arrays of initial menu items and TS interfaces
- assets/ — images. Must include place-holder.png and other menu images used by the lists
- App.tsx — navigation and app entry

## Features

+ Course navigation: *Starters, Mains, Desserts.*
+ Menu display with <ins>name, price, description, and thumbnail.</ins>
+ Editor screen to add new dishes with image picker integration. New images are saved as URIs.
+ Filter screen to search and filter by course and price range.
+ Receipt screen that computes <ins>subtotal, tax, tip, and total.</ins>
+ Menu component shows counts of items per course.

## Tech stack

1. React Native with TypeScript.
  - React Navigation (@react-navigation/native, native-stack and bottom-tabs where used).
  - react-native-image-picker for picking images in the editor.
2. Plain StyleSheet.create for styling.

## Screens overview

### SplashScreen
+ Static hero image, app title, and Get Started button.

### StarterMenu / MainMenu / DessertMenu
+ List screens that render corresponding arrays. Each item shows an image (safe source resolving), a pill style card, price and description.

### MenuEditer
+ Form for adding new dishes. Fields: name, price, description, course selector, image picker. Save validates name and pushes new item to the matching array.

### MenuFilter
+ Course selector, free text search, and price range controls. Apply returns the chosen filter object.

### MenuReceipt
+ Renders current order items with subtotal, tax, tip entry, and total. Confirms and alerts with totals.
