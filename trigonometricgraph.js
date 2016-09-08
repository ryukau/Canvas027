const TWO_PI = 2 * Math.PI
const RESOLUTION = 512
const COLOR_Z1 = "#444444"
const COLOR_ZSIN = "#4444ee"
const COLOR_ZCOS = "#44ee44"
const COLOR_ZTAN = "#ee4444"
const COLOR_ZSINH = "#eeee44"
const COLOR_ZCOSH = "#ee44ee"
const COLOR_ZTANH = "#44eeee"

var isPlaying = true
var scaleRatio = 5

var timer = new Timer()
var canvas = new Canvas(window.innerWidth, window.innerHeight)
canvas.canvas.addEventListener("click", onClickCanvas, false)
canvas.canvas.addEventListener("wheel", onWheelkCanvas, false)

function onClickCanvas(event) {
  if (event.button === 1) {
    dtheta = -dtheta
  }
  else {
    isPlaying = !isPlaying
    timer.pause()
  }
}

function onWheelkCanvas(event) {
  if (event.deltaY > 0) {
    scaleRatio += 0.5
  }
  else {
    scaleRatio -= 0.5
  }

  if (!isPlaying) {
    draw()
  }
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
var z = []
var zSin = []
var zCos = []
var zTan = []
var zSinh = []
var zCosh = []
var zTanh = []

var dtheta = TWO_PI / RESOLUTION
console.log(dtheta)

animate()

function animate() {
  if (isPlaying) {
    move()
    draw()
    timer.tick()
  }
  requestAnimationFrame(animate)
}

function move() {
  z1re = Math.sin(timer.lap * 0.1) * 4
  z1.set(z1re, 0)
  z.length = 0
  zSin.length = 0
  zCos.length = 0
  zTan.length = 0
  zSinh.length = 0
  zCosh.length = 0
  zTanh.length = 0
  for (var t = 0; t < TWO_PI; t += dtheta) {
    z1.rotate(dtheta)
    z.push(z1.clone())
    zSin.push(z1.clone().sin())
    zCos.push(z1.clone().cos())
    zTan.push(z1.clone().tan())
    zSinh.push(z1.clone().sinh())
    zCosh.push(z1.clone().cosh())
    zTanh.push(z1.clone().tanh())
  }
}

function draw() {
  var context = canvas.context
  var center = canvas.center

  canvas.clearWhite()
  drawAxes()

  context.save()
  context.translate(center.x, center.y)
  context.scale(center.y / scaleRatio, center.y / scaleRatio)

  drawUnitCircle()
  canvas.context.fillStyle = "rgba(0, 0, 0, 0)"
  canvas.context.lineWidth = 0.05
  canvas.context.strokeStyle = COLOR_Z1
  canvas.drawPath(z)
  canvas.context.strokeStyle = COLOR_ZSIN
  canvas.drawPath(zSin)
  canvas.context.strokeStyle = COLOR_ZCOS
  canvas.drawPath(zCos)
  canvas.context.strokeStyle = COLOR_ZTAN
  canvas.drawPath(zTan)
  canvas.context.strokeStyle = COLOR_ZSINH
  canvas.drawPath(zSinh)
  canvas.context.strokeStyle = COLOR_ZCOSH
  canvas.drawPath(zCosh)
  canvas.context.strokeStyle = COLOR_ZTANH
  canvas.drawPath(zTanh)

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
  canvas.context.lineWidth = 0.008
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
  canvas.context.fillText(`z`, padding, height * 1)
  canvas.context.fillStyle = COLOR_ZSIN
  canvas.context.fillText(`sin(z)`, padding, height * 2)
  canvas.context.fillStyle = COLOR_ZCOS
  canvas.context.fillText(`cos(z)`, padding, height * 3)
  canvas.context.fillStyle = COLOR_ZTAN
  canvas.context.fillText(`tan(z)`, padding, height * 4)
  canvas.context.fillStyle = COLOR_ZSINH
  canvas.context.fillText(`sinh(z)`, padding, height * 5)
  canvas.context.fillStyle = COLOR_ZCOSH
  canvas.context.fillText(`cosh(z)`, padding, height * 6)
  canvas.context.fillStyle = COLOR_ZTANH
  canvas.context.fillText(`tanh(z)`, padding, height * 7)
}

function randomZ() {
  var z = new Z(Math.random() * 2, 0)
  return z.rotate(Math.random() * TWO_PI)
}
