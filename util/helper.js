module.exports = {
  asyncForEach: async function (array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  },
  randomFromArray: function (array) {
    return array[Math.floor(Math.random() * array.length)];
  },
};
