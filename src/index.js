var lob = require('./lob.js');

var hexagonInput = document.getElementById('input'),
    textOutput = document.getElementById('output'),
    wallInput = document.getElementById('wall'),
    shelfInput = document.getElementById('shelf'),
    volumeInput = document.getElementById('volume'),
    pageInput = document.getElementById('page')

function convertToText () {
  var hexagon = hexagonInput.value.toLowerCase().replace(/[^a-z0-9]/g, ""),
      wall = wallInput.value,
      shelf = shelfInput.value,
      volume = volumeInput.value,
      page = pageInput.value,
      text = lob.findText(hexagon, wall, shelf, volume, page)
  hexagonInput.value = hexagon
  textOutput.value = text
}

function convertToHexagon () {
  var text = textOutput.value.toLowerCase().replace(/[^a-z ,.]/g, ""),
      hexagon = lob.findHexagon(text)
  hexagonInput.value = hexagon.id.toString(36)
  wallInput.value = hexagon.wall
  shelfInput.value = hexagon.shelf
  volumeInput.value = hexagon.volume
  pageInput.value = hexagon.page
  textOutput.value = text
}

document.getElementById('hexagon-to-text').addEventListener('click', convertToText)
document.getElementById('text-to-hexagon').addEventListener('click', convertToHexagon)

wallInput.addEventListener('change', convertToText)
shelfInput.addEventListener('change', convertToText)
volumeInput.addEventListener('change', convertToText)
pageInput.addEventListener('change', convertToText)
hexagonInput.addEventListener('blur', convertToText)

textOutput.addEventListener('blur', convertToHexagon)
