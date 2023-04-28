export default function ship(length) {
  let newShip = function (length) {
    return {
      length: length,
      hits: 0,
      hit: function () {
        this.hits += 1;
      },
      isSunk: function () {
        if (this.hits >= this.length) {
          return true;
        } else {
          return false;
        }
      },
    };
  };
  return newShip(length);
}
