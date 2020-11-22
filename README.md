# Big Bank

> An application to help customers manage their portfolio of shares traded at New York Stock Exchange (NYSE).

This is a week long project undertaken as part of an engineering challenge from a recruiter.

## Setup

how to run / build.

**`npm run dev`**

Runs the app in the development mode. Webpack will reload if you make edits.

**`npm run build`**

Builds the app for production to the `dist` folder. Used for best performance when deploying.

## Process

On approaching this challenge I wanted to do the following :

- Try something new(Hooks, Carbon, Express Sessions).
- Build UI quickly.
- Use this project as a portfolio piece.

### Steps

To begin, the project required a setup. This included standard [MERN](https://www.mongodb.com/mern-stack) stack dependecies using Node alongside a bundler([Webpack](https://webpack.js.org/)) & UI library([IBM Carbon](https://www.carbondesignsystem.com/)).

1. Setup development environment with Create-react-app & Webpack.
2. Connect to Mongodb.
3. Setup Express API & Axios to connect the client to the server.

Once completed, the next step in the project was authentication for users wishing to register/login/logout. This was achieved by first setting up API routes and testing them with [Postman](https://www.postman.com/), followed by building basic forms & handling route redirections in React using Axios & React Router. Finally, to achieve a persistent session for users who are already logged in, [Express Sessions](https://www.npmjs.com/package/express-session) was used. 

4. Setup UI component libraries.
5. Setup site map & routes.

With backend and setup mostly out of the way, a front end experience(MVP) could be started. Due to the time constraints of this challenge the project needed UI options that were quick and effective. [IBM Carbon](https://www.carbondesignsystem.com/) is an open source design component library with an array of built-in & ready to use styles.

See [basic mock-up](https://www.figma.com/file/zyedueHxLiuK2BFlSL2ZZ6/big-bank?node-id=0%3A1).

The challenge MVP includes an authentication landing page & dashboard page. Once logged in, users may browse their watchlist of stocks or search/watch stocks from the NYSE. Basic user research was also conducted; the inclusion of a broker plugin to the dashboard was motivated by the insight that both my users recieved monthly(also based on current events) reports from their brokers on the landscape of their portfolios and the market.

6. Manipulate Aplha Vantage API.
7. Build boilerplate UI(MVP).

Initially the search functionality aimed to be _reactive_. One AJAX request would be made to the Alpha Vantage API to query _ALL_ stocks. This data would then be mapped over and filtered in React so when a user begins to type, results will appear instantly. However, the Alpha Vantage API offers a _Search Endpoint_ URL which returns the best-matching symbols and market information based on queried keywords. This was chosen due to convenience and the fact that the Alpha Vantage API has no URL to query all stocks.

## Conclusion

If more time were allowed, the project would implement the following :

1. Interactive/live data chart.
2. Twitter news feed(bot?) & explore idea of broker plugin.
3. Indivdual symbol pages.
4. Hosted app for portfolio.
5. Add more charts/correct colours to individual stock value changes.

## Task

Choose **one** of the following components to implement:

- [x] Web frontend
- [x] API backend
- [ ] External data feed integration
- [ ] Persistent Storage
- [ ] Supporting Infrastructure

The app allows the user to do the following:

- [x] login to their portfolio
- [x] search for stocks
- [x] follow stocks they are interested in
- [x] unfollow stocks they are no longer interested in
