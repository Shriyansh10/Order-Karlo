# Demo: [Order Karlo - Food Delivery App](https://drive.google.com/file/d/1lK9VEpyqgobe8aFt5W_h11nYoMlpNOkv/view?usp=sharing)

I have added eas build in Build folder. You can install the apk and test the app on your android device. Dont worry the data is stored locally and will not cause any harm to your device. So go ahead and test the app.

# Order Karlo - Food Delivery App

Order Karlo is a mobile food delivery app built with Expo, React Native, and TypeScript. It lets users sign up, browse restaurants, filter vegetarian restaurants, search menus, add dishes to a cart, place orders, and view saved order history.

## Tech Stack

- Expo SDK 55
- React Native 0.83
- React 19
- TypeScript
- React Navigation
- AsyncStorage for local persistence
- pnpm for dependency management

## Features

- Onboarding flow for first-time users
- Local signup and login using AsyncStorage
- Restaurant list with search and veg-only filtering
- Restaurant detail screen with searchable dishes
- Add, increment, and decrement cart items
- Cart summary with item total, delivery fee, and final total
- Local order history
- Profile and logout screens
- Bottom tab navigation and drawer navigation

## Project Structure

```text
.
├── App.tsx
├── app.json
├── index.ts
├── package.json
├── src
│   ├── components
│   ├── context
│   ├── data
│   ├── navigators
│   ├── screens
│   └── services
└── assets
```

## Getting Started

### Prerequisites

- Node.js 20.19.x or newer recommended for Expo SDK 55
- pnpm
- Expo Go on a physical device, or an Android/iOS simulator

### Install Dependencies

```bash
pnpm install
```

### Start the App

```bash
pnpm start
```

Then follow the Expo CLI instructions to open the app in Expo Go, Android, iOS, or web.

## Available Scripts

```bash
pnpm start      # Start the Expo development server
pnpm android    # Start Expo for Android
pnpm ios        # Start Expo for iOS
pnpm web        # Start Expo for web
```

## App Flow

1. `RootNavigator` checks local storage for onboarding and login state.
2. New users land on the onboarding screen.
3. Signup stores user data locally and opens the main app.
4. Returning logged-in users go directly to the tab navigator.
5. The `Menu` tab contains the home, restaurant, and cart stack.
6. The `Me` tab contains profile, orders, and logout screens in a drawer.

## Local Storage Keys

The app currently stores data locally with AsyncStorage:

- `isOnboarded`: whether the onboarding/signup flow has been completed
- `userData`: locally saved signup credentials
- `loggedInUser`: current logged-in user profile
- `orders`: saved order history

This project does not currently use a backend service, so data is device-local.

## Build Notes

For cloud builds, install and configure EAS CLI first:

```bash
npm install -g eas-cli
eas login
eas build:configure
```

After configuration, build Android with:

```bash
eas build -p android --profile preview
```

If `eas` is not found, the EAS CLI is not installed or is not available in your shell path.

## Development Notes

- The app uses strict TypeScript through Expo's base TypeScript config.
- Restaurant and dish data lives in `src/data/restaurantData.ts`.
- Profile state is provided globally from `App.tsx`.
- Cart state is scoped to `HomeNavigator`, which covers the home, restaurant, and cart screens.
- Orders are saved locally when the user places an order from the cart.
