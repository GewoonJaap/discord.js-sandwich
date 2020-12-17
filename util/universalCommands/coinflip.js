module.exports = {
  execute: function () {
    const result = Math.random() < 0.5 ? 'Tails' : 'Heads';
    return `🪙 ${result}`;
  },
  description: '🪙Heads or Tails? Who knows.🪙',
};
