const R = require("ramda");
const converter = require("json-2-csv");

const groupStudentsSubmissionsById = R.groupBy((student) => student.hacker_id);

/*
  After the next method, the structure will be:
  {
    studentID:{
      challengeId: [submissionId]
    }
  }
*/
const groupSubmissionsByChallenge = R.groupBy(
  (submission) => submission.challenge_id
);

const writeJsonAsCsv = (jsonFile) => {
  converter.json2csv(responses, (err, csv) => {
    if (err) {
      throw err;
    }

    fs.writeFileSync("responses.csv", csv);
  });
};

const snooze = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

exports.groupStudentsSubmissionsById = groupStudentsSubmissionsById;
exports.groupSubmissionsByChallenge = groupSubmissionsByChallenge;
exports.snooze = snooze;
exports.writeJsonAsCsv = writeJsonAsCsv;
