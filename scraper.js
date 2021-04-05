const R = require("ramda");
const util = require("util");

const {
  getAllSubmissionsForContest,
  getSubmission,
} = require("./hackerrankAPI");

const {
  groupStudentsSubmissionsById,
  groupSubmissionsByChallenge,
  snooze,
  writeJsonAsCsv,
} = require("./utils");

const main = () => {
  const contestSlug = process.env.CONTEST_SLUG;
  const cookie = process.env.COOKIE;

  if (!contestSlug || !cookie) {
    console.error("Process failed: Missing contest slug or cookie param");
    process.exit(-1);
  }

  getAllSubmissionsForContest(cookie, contestSlug)
    .then((res) => res.clone().json())
    .then(async (jsonResponse) => {
      const grouped = groupStudentsSubmissionsById(jsonResponse.models);
      const aux = R.map(groupSubmissionsByChallenge, grouped);

      const studentIds = [];
      const responses = [];

      Object.keys(aux).forEach((studentId) => {
        studentIds.push(studentId);
      });

      for (let j = 0; j < studentIds.length; j++) {
        const studentSubmitedChallenges = aux[studentIds[j]];
        const submissionsIds = [];

        Object.keys(studentSubmitedChallenges).forEach((challengeId) => {
          submissionsIds.push({
            submissionId: studentSubmitedChallenges[challengeId][0].id,
            challengeName:
              studentSubmitedChallenges[challengeId][0].challenge.name,
            score: studentSubmitedChallenges[challengeId][0].score,
            studentUserName:
              studentSubmitedChallenges[challengeId][0].hacker_username,
          });
        });

        const totalSubmissions = studentIds.length;
        console.log(
          "Getting submissions ... ",
          `${Math.round(((j + 1) / totalSubmissions * 100) * 100) / 100}%`
        );

        for (let i = 0; i < submissionsIds.length; i++) {
          getSubmission(cookie, submissionsIds[i].submissionId, contestSlug)
            .then((submissionReposne) => submissionReposne.clone().json())
            .then((submissionJson) => {
              responses.push({
                studentId: studentIds[j],
                studentUserName: submissionsIds[i].studentUserName,
                challenge: submissionsIds[i].challengeName,
                score: submissionsIds[i].score,
                code: submissionJson.model.code,
              });
            });
          await snooze(6000);
        }

        //console.log(util.inspect(responses, false, null, true));
      }
      writeJsonAsCsv(responses);
    })
    .catch((error) => {
      console.log(error);
    });
};

main();
