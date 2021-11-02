<h1 align="center">
  WorldWide-Millionaire
</h1>

## Description

This app is based on the famous TV game show known as [Who Wants To Be A Millionaire](https://en.wikipedia.org/wiki/Who_Wants_to_Be_a_Millionaire_(American_game_show)). A user is able to select a region/continent and will be provided with questions based on the option selected. Users will try to provide the correct answers to progress through the game. After each correct answer, you get more money and if you choose wrong, the game ends with the final amount being the last balance there was.

## The Team

- **[96sMicks](https://github.com/96sMicks)**
- **[WahabA110](https://github.com/WahabA110)**
- **[zakwarsame](https://github.com/zakwarsame)**

### Technologies Used

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [Webpack](https://webpack.js.org/), [Babel](https://babeljs.io/)
- [Axios](https://github.com/axios/axios), [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [Create React App](https://facebook.github.io/create-react-app/)
- [Wikidata Query Service](https://query.wikidata.org/)

### Screenshots

!["Home Page"](https://github.com/96sMicks/WorldWide-Millionaire/blob/main/screenshots/home.png)

!["Login"](https://github.com/96sMicks/WorldWide-Millionaire/blob/main/screenshots/login.png)

!["Game Play"](https://github.com/96sMicks/WorldWide-Millionaire/blob/main/screenshots/game_play.png)

!["Final"](https://github.com/96sMicks/WorldWide-Millionaire/blob/main/screenshots/final.png)

## Creating The DB

Create a database with the command `CREATE DATABASE scheduler_development;`.

Copy the `.env.example` file to `.env.development` and fill in the necessary PostgreSQL configuration. The `node-postgres` library uses these environment variables by default.

```
DB_HOST = localhost
DB_USER = labber
DB_PASS = labber
DB_NAME = World_Wide_Millionaire 
DB_PORT = 5432
```

## Seeding

- On the terminal, run `npm run db:reset`.

## Installation & Set Up For Both Frontend and Backend

1. Install and use the correct version of Node using [NVM](https://github.com/nvm-sh/nvm). This app was built using node v10.16.1 and it is highly recommended to use this in your environment

   ```sh
   nvm install
   ```

1. Install dependencies

   ```sh
   npm install
   ```

1. Start the development servers

   ```sh
   npm start
   ```

## Dependencies

- Backend:
    - bcryptjs
    - chalk
    - cookie-parser
    - debug
    - dotenv
    - express
    - morgan
    - pg
    - pg-native
    - nodemon

- Frontend:
    - react-router-dom
    - material-ui
    - @mui/icons-material
    - @mui/material
    - @testing-library/jest-dom
    - @testing-library/user-event
    - axios
    - use-sound
    - web-vitals