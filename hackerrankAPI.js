const fetch = require("node-fetch");

const getSubmission = (cookie, submissionId, contestSlug) => {
  configs.headers.cookie = cookie;
  return fetch(
    `https://www.hackerrank.com/rest/contests/${contestSlug}/submissions/${submissionId}`,
    configs
  );
};

const getAllSubmissionsForContest = (cookie, contestSlug) => {
  configs.headers.cookie = cookie;
  return fetch(
    `https://www.hackerrank.com/rest/contests/${contestSlug}/judge_submissions?limit=2000`,
    configs
  );
};

const configs = {
  headers: {
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "ro-RO,ro;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "max-age=0",
    "if-none-match": 'W/"2f7d6cd78ee522f371a68bfa214a5ee4"',
    "sec-ch-ua":
      '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    cookie: undefined,
  },
  referrerPolicy: "strict-origin-when-cross-origin",
  body: null,
  method: "GET",
  mode: "cors",
};

exports.getSubmission = getSubmission;
exports.getAllSubmissionsForContest = getAllSubmissionsForContest;
