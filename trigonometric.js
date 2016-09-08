const TWO_PI = 2 * Math.PI
const COLOR_Z1 = "#444444"
const COLOR_ZSIN = "#4444ee"
const COLOR_ZCOS = "#44ee44"
const COLOR_ZTAN = "#ee4444"
const COLOR_ZSINH = "#eeee44"
const COLOR_ZCOSH = "#ee44ee"
const COLOR_ZTANH = "#44eeee"

var isPlaying = true

var canvas = new Canvas(512, 512)
canvas.canvas.addEventListener("click", onClickCanvas, false)
canvas.canvas.addEventListener("wheel", onWheelkCanvas, false)

function onClickCanvas(event) {
  if (event.button === 1) {
    dtheta = -dtheta
  }
  else {
    isPlaying = !isPlaying
  }
}

function onWheelkCanvas(event) {
  var dz = new Z(0.04, 0)
  if (event.deltaY > 0) {
    dz.x = -dz.x
  }
  dz.x += z1.abs()
  z1 = dz.rotate(z1.arg())
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
var zSin = z1.clone().sin()
var zCos = z1.clone().cos()
var zTan = z1.clone().tan()
var zSinh = z1.clone().sinh()
var zCosh = z1.clone().cosh()
var zTanh = z1.clone().tanh()

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
  z1.rotate(dtheta)
  zSin = z1.clone().sin()
  zCos = z1.clone().cos()
  zTan = z1.clone().tan()
  zSinh = z1.clone().sinh()
  zCosh = z1.clone().cosh()
  zTanh = z1.clone().tanh()
}

function draw() {
  var context = canvas.context
  var center = canvas.center
  var scaleRatio = 3.2

  canvas.clearWhite()
  drawAxes()

  context.save()
  context.translate(center.x, center.y)
  context.scale(center.x / scaleRatio, center.y / scaleRatio)

  drawUnitCircle()
  drawVector(z1, COLOR_Z1)
  drawVector(zSin, COLOR_ZSIN)
  drawVector(zCos, COLOR_ZCOS)
  drawVector(zTan, COLOR_ZTAN)
  drawVector(zSinh, COLOR_ZSINH)
  drawVector(zCosh, COLOR_ZCOSH)
  drawVector(zTanh, COLOR_ZTANH)

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
  canvas.context.fillText(`z = (${z1.x}, ${z1.y})`, padding, height * 1)
  canvas.context.fillStyle = COLOR_ZSIN
  canvas.context.fillText(`sin(z) = (${zSin.x}, ${zSin.y})`, padding, height * 2)
  canvas.context.fillStyle = COLOR_ZCOS
  canvas.context.fillText(`cos(z) = (${zCos.x}, ${zCos.y})`, padding, height * 3)
  canvas.context.fillStyle = COLOR_ZTAN
  canvas.context.fillText(`tan(z) = (${zTan.x}, ${zTan.y})`, padding, height * 4)
  canvas.context.fillStyle = COLOR_ZSINH
  canvas.context.fillText(`sinh(z) = (${zSinh.x}, ${zSinh.y})`, padding, height * 5)
  canvas.context.fillStyle = COLOR_ZCOSH
  canvas.context.fillText(`cosh(z) = (${zCosh.x}, ${zCosh.y})`, padding, height * 6)
  canvas.context.fillStyle = COLOR_ZTANH
  canvas.context.fillText(`tanh(z) = (${zTanh.x}, ${zTanh.y})`, padding, height * 7)
}

function randomZ() {
  var z = new Z(Math.random() * 2, 0)
  return z.rotate(Math.random() * TWO_PI)
}
