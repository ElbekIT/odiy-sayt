const riddles = require('../../data/riddles.json');

exports.handler = async (event, context) => {
  const { riddleId, userAnswer } = JSON.parse(event.body);
  const riddle = riddles.find(r => r.id === riddleId);

  const correct = riddle.answer.toLowerCase() === userAnswer.toLowerCase();

  return {
    statusCode: 200,
    body: JSON.stringify({
      correct,
      correctAnswer: riddle.answer
    })
  };
};
