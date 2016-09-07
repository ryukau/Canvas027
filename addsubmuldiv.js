const TWO_PI = 2 * Math.PI
const COLOR_Z1 = "#ffdddd"
const COLOR_Z2 = "#ddddff"
const COLOR_ZADD = "#ee4444"
const COLOR_ZSUB = "#ffcc66"
const COLOR_ZMUL = "#44aaee"
const COLOR_ZDIV = "#44ee44"

var isPlaying = true

var canvas = new Canvas(512, 512)
canvas.canvas.addEventListener("click", onClickCanvas, false)
canvas.canvas.addEventListener("dblclick", onDoubleClickCanvas, false)

function onClickCanvas(event) {
  isPlaying = !isPlaying
}

function onDoubleClickCanvas(event) {
  z1theta = 0
  z1.set(z1re, 0)
  z2 = randomZ()
}

var zero = new Vec2(0, 0)
var axes = {
  x1: new Vec2(0, canvas.center.y),
  x2: new Vec2(canvas.width, canvas.center.y),
  y1: new Vec2(canvas.center.x, 0),
  y2: new Vec2(canvas.center.x, canvas.height),
}

var z1re = 1
var z1 = new Z(z1re, 0)
var z2 = randomZ()
var zAdd = Z.add(z1, z2)
var zSub = Z.sub(z1, z2)
var zMul = Z.mul(z1, z2)
var zDiv = Z.div(z1, z2)

var z1theta = 0
var dtheta = 0.01

animate()

function animate() {
  if (isPlaying) {
    move()
    draw()
  }
  requestAnimationFrame(animate)
}

function move() {
  z1theta += dtheta
  z1.rotate(dtheta)
  zAdd = Z.add(z1, z2)
  zSub = Z.sub(z1, z2)
  zMul = Z.mul(z1, z2)
  zDiv = Z.div(z1, z2)
}

function draw() {
  var context = canvas.context
  var center = canvas.center
  var scaleRatio = 3

  canvas.clearWhite()
  drawAxes()

  context.save()
  context.translate(center.x, center.y)
  context.scale(center.x / scaleRatio, center.y / scaleRatio)

  drawUnitCircle()
  drawVector(z1, COLOR_Z1)
  drawVector(z2, COLOR_Z2)
  drawVector(zAdd, COLOR_ZADD)
  drawVector(zSub, COLOR_ZSUB)
  drawVector(zMul, COLOR_ZMUL)
  drawVector(zDiv, COLOR_ZDIV)

  context.restore()

  drawTexts()
}

function drawAxes() {
  canvas.context.strokeStyle = "#999999"
  canvas.context.lineWidth = 0.5
  canvas.drawLine(axes.x1, axes.x2)
  canvas.drawLine(axes.y1, axes.y2)
}

function drawUnitCircle() {
  canvas.context.strokeStyle = "#777777"
  canvas.context.lineWidth = 0.005
  canvas.context.beginPath()
  canvas.context.arc(0, 0, 1, 0, Math.PI * 2, false)
  canvas.context.stroke()
}

function drawVector(z, color) {
  canvas.context.strokeStyle = color
  canvas.context.fillStyle = color
  canvas.context.lineWidth = 0.02
  canvas.drawLine(zero, z)
  canvas.drawPoint(z, 0.05)
}

function drawTexts() {
  var padding = 2
  var height = 12
  canvas.context.font = "12px monospace"
  canvas.context.fillStyle = COLOR_Z1
  canvas.context.fillText(`z1 = (${z1.x}, ${z1.y})`, padding, height * 1)
  canvas.context.fillStyle = COLOR_Z2
  canvas.context.fillText(`z2 = (${z2.x}, ${z2.y})`, padding, height * 2)
  canvas.context.fillStyle = COLOR_ZADD
  canvas.context.fillText(`z1 + z2 = (${zAdd.x}, ${zAdd.y})`, padding, height * 3)
  canvas.context.fillStyle = COLOR_ZSUB
  canvas.context.fillText(`z1 - z2 = (${zSub.x}, ${zSub.y})`, padding, height * 4)
  canvas.context.fillStyle = COLOR_ZMUL
  canvas.context.fillText(`z1 * z2 = (${zMul.x}, ${zMul.y})`, padding, height * 5)
  canvas.context.fillStyle = COLOR_ZDIV
  canvas.context.fillText(`z1 / z2 = (${zDiv.x}, ${zDiv.y})`, padding, height * 6)
}

function randomZ() {
  var z = new Z(Math.random() * 2, 0)
  return z.rotate(Math.random() * TWO_PI)
}
