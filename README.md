# Mobile Flashcard

This app is built on the requirements in the rubric but has its own features when implementing some functionalities. Details will be discussed later.

## Installation and lauch

Just `yarn install` and `yarn start`

## Features

- To make the app more friendly to its users, carousal and flipping are implemented as operation gestures.

  Users can swipe left or right to the previous or next question respectly.

  If the question has been answered, the choosing buttons will be disabled only if users reset the deck.

- When the score is displayed, an alert with two buttons **OK** and **Restart** will appear. **Restart** works the way by following the rubric. **OK** will just dismiss the alert. **No returning to the individual deck**. Users probably need to review their answers again before they quit. They can simply go back just by clicking the **back** button.

- On the individual deck screen, if no questions have been answered, the button will show **START QUIZ**; any answer has been answered, show **RESUME QUIZ** with another button **RESET QUIZ** displaying along; all the questions answered, show **CHECK RESULTS** along with **RESET QUIZ**.

- The new deck view will check duplicate names. If any duplicate detected, it will give an alert and cancel the operation.

- There are two stores working for this app.

  One is **decks** for all the data communicating between app and the database. Data in this store should be always identical with the database.
  
  Another is **deckStatus** for individual deck information, such as flipping status, counts of correct answer, the user choice for a question, etc. This is just a status tracker for decks. No commmunication with the database.

## Existing issues

### Notifications

There will be a warning when the app deals with notifications. The code follows the tutorial strictly but a warning occurs like this:

> Ability to schedule an automatically repeated notification is deprecated on iOS and will be removed in the next SDK release.

Any advice is appreciated.

### No Android tested

The developing environment uses Expo and is only tested on iOS platform. No Andriod simulator (not installed) or Android devices involved (no available Android devices can be used).

## Built With

- **[Ramda]**  A useful JS library with functional programming methodology.

- **[react-native-snap-carousel]** The carousal functionality

- **[uuid]** UUID generator for questions

[Ramda]: https://ramdajs.com/

[react-native-snap-carousel]: https://github.com/archriss/react-native-snap-carousel

[uuid]: https://www.npmjs.com/package/uuid
