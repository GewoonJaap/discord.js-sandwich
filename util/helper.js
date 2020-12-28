module.exports = {
  asyncForEach: async function (array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  },
  randomFromArray: function (array) {
    if (array.length == 0) return null;
    return array[Math.floor(Math.random() * array.length)];
  },
};
