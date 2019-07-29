# Mobile Flashcard

From Udacity React project 3. Inspired by flashcards, this is a mobile app giving you the same exprience from your old days or probably everyday life.

## Installation and lauch

Just `yarn install` and `yarn start`

## Features

To make the app more friendly to its users, carousal and flipping are implemented as operation gestures.

- Users can swipe left or right to the previous or next question respectly.

- Clicking card can flip it to the other side.

- Users can create diffrent decks to categorize question types.

## Existing issues

### No Android tested

The developing environment uses Expo and is only tested on iOS platform.

### Problems when using Snack

Sometimes the app will get stuck at the homepage just showing **loading**, or occurs an error almost covering the whole screen. Those never happen when I use my computer as the server to run the app. Try to refresh the webpage directly to solve those problems.

## Built With

- **[Ramda]**  A useful JS library with functional programming methodology.

- **[react-native-snap-carousel]** The carousal functionality

- **[uuid]** UUID generator for questions

[Ramda]: https://ramdajs.com/

[react-native-snap-carousel]: https://github.com/archriss/react-native-snap-carousel

[uuid]: https://www.npmjs.com/package/uuid
