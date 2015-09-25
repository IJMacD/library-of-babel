var libraryOfBabel = (function () {
  var bigInt = require('big-integer')

  var a = bigInt(2).pow(15049).add(1),
      c = bigInt(15485863).pow(500),
      m = bigInt(2).pow(16275),
      a_inverse = invertA(a, c, m)

  var alphabet = "abcdefghijklmnopqrstuvwxyz ,.",
      base36 = "0123456789abcdefghijklmnopqrstuvwxyz"

  function findHexagon(text){
    var hexagon = getPrev(fromBase29(text)),
        fullHex = displayBase36(hexagon),
        pageBits = hexagon.mod(410*32*5*4),
        details = parsePageInfo(pageBits)
        used = pageInfoToNum(details.wall, details.shelf, details.volume, details.page)
    details.id = hexagon.minus(used)
    return details
  }

  function findText(hexagon, wall, shelf, volume, page){
    hexagon = bigInt(hexagon, 36)
    var full = hexagon.add(pageInfoToNum(wall, shelf, volume, page))
    return displayBase29(getNext(full))
  }

  function displayBase36(number) {
    return number.toString(36)
  }

  function fromBase29(string) {
    return bigInt(Array.prototype.map.call(string, function (char) {
      return base36[alphabet.indexOf(char)]
    }).join(''), 29)
  }

  function displayBase29(number) {
    var string = number.toString(29)
    return Array.prototype.map.call(string, function (char) {
      return alphabet[parseInt(char, 29)]
    }).join('')
  }

  function getNext(prev){
    var result = prev.multiply(a).add(c).mod(m)

    if(result.isNegative())
      result = result.add(m)

    return result
  }

  function getPrev(next) {
    var result = next.minus(c).multiply(a_inverse).mod(m)

    if(result.isNegative())
      result = result.add(m)

    return result
  }

  function invertA(a, c, m){
    var qarray = Array(12)

    qarray[0] = bigInt.zero
    qarray[1] = bigInt.one

    var i = 2
    var reset = m

    var remainder
    var quotient

    while (m.mod(a).isPositive()) {
        remainder = m.mod(a)
        quotient = m.divide(a)
        //console.log(m.toString() + " = " + quotient.toString() + "*" + a.toString() + " + " + remainder.toString())
        qarray[i] = qarray[i-2].minus(qarray[i-1].multiply(quotient))
        m = a
        a = remainder
        i++
    }
    if (qarray[i-1].isNegative())
      qarray[i-1] = qarray[i-1].add(reset)

    return qarray[i-1]
  }

  function parsePageInfo(num){
    var page = num.mod(410)
    var rem = num.minus(page).divide(410)
    var volume = rem.mod(32)
    rem = rem.minus(volume).divide(32)
    var shelf = rem.mod(5)
    rem = rem.minus(shelf).divide(5)
    var wall = rem.mod(4)
    return {
      wall: wall,
      shelf: shelf,
      volume: volume,
      page: page
    }
  }

  function pageInfoToNum(wall, shelf, volume, page) {
    wall = bigInt(wall)
    return wall.multiply(5).add(shelf).multiply(32).add(volume).multiply(410).add(page)
  }

  return {
    findText: findText,
    findHexagon: findHexagon
  }
}())

// Node.js check
if (typeof module !== "undefined" && module.hasOwnProperty("exports")) {
    module.exports = libraryOfBabel
}
