export const getTotalPoints = (test:any) => {
  let maxPointfromEveryQuestion: number[] = [];
  test.questions.forEach((question: any) => {
    // one question 
    let pointsFromOneAnswer: number[] = [];
    for (let i = 0; i < question.answers.length; i++) {
      pointsFromOneAnswer.push(+question.answers[i].points);
    }
    pointsFromOneAnswer.sort();
    maxPointfromEveryQuestion.push(pointsFromOneAnswer[question.answers.length - 1]);
  });
  return maxPointfromEveryQuestion.reduce((totalPoints, maxPoints) => totalPoints + maxPoints);
};
