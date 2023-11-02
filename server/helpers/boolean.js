function isTrue(value) {
  return value?.toLocaleLowerCase() === 'true';
}

module.exports = {
  isTrue
};
