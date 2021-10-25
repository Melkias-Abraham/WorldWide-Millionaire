const express = require("express");
const router = express.Router();
const { getPostsByUsers } = require("../helpers/dataHelpers");

module.exports = ({ getContinentBasedQuestions, getQuestionBasedAnswers }) => {

  /* GET questions and answers listing.
        1. When a continent is clicked, getContinentBasedQuestions returns all the questions related to the region
        2. map through each question and fetch answers related to each question
        3. on the next .then, create a new object with an 'answers' array for each question
    */

  router.get("/:id", (req, res) => {
    const { id } = req.params;

    const promises = [];
    getContinentBasedQuestions(id)
      .then((questions) => {
        promises.push(Promise.resolve(questions));
        // console.log("questions is:",questions);

        questions.map((question) => {
          let answerPromise = getQuestionBasedAnswers(question.id).then(
            (answers) => answers
          );
          promises.push(answerPromise);
        });

        return Promise.all(promises);

      })
      .then((data) => {
        const newData = [...data[0]];
        console.log(newData);
        console.log("DATA:", data);
        newData.map((questionObj, i) => {
          if (!questionObj["answers"]) {
            questionObj["answers"] = [];
            questionObj["answers"].push(data[i+1]);
          }
        });
        res.send(newData);
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
