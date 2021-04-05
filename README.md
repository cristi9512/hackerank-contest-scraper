# Hackerrank Contest Scraper

###### Simple hackerrank scraper: based on a contest slug and a browser cookie it will fetch all submissions into a CSV file. The CSV file will contain:
  - hacker id
  - hacker user name
  - challenge name
  - score
  - code

### Requirements:
  - node
  - npm

### How to run:
  1. `npm install`
  2. Get your cookie using the developer tools (inside network tab). It can be obtained from any `XHR` request.
  3. `COOKIE="paste_your_cookie_here" CONTEST_SLUG="paste_your_contest_slug_here" npm start`

**Note:** you can set those variables in your current terminal using: `export VAR_NAME=value`. In this way you will only have to run: `npm start`

