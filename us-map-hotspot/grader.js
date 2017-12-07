exports.gradeAnswer = function(graderConfig, sessionConfig, answer) {
  const isCorrect = graderConfig.stateId === answer.stateId;
  const feedback = isCorrect ? "Great job, you chose correctly!!" : "Nope, please try again.";

  return {
    isCorrect: isCorrect,
    feedback: feedback,
    feedbackConfiguration: {
      stateId: answer.stateId,
      feedback,
      isCorrect
    }
  };
};
