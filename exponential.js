const TWO_PI = 2 * Math.PI
const COLOR_Z1 = "#444444"
const COLOR_Z2 = "#999999"
const COLOR_ZEXP = "#4444ee"
const COLOR_ZLOG = "#44ee44"
const COLOR_ZSQRT = "#ee4444"
const COLOR_ZPOW = "#aaaa44"

var isPlaying = true

var canvas = new Canvas(512, 512)
canvas.canvas.addEventListener("click", onClickCanvas, false)
canvas.canvas.addEventListener("dblclick", onDoubleClickCanvas, false)
canvas.canvas.addEventListener("wheel", onWheelkCanvas, false)

function onClickCanvas(event) {
  if (event.button === 1) {
    dtheta = -dtheta
  }
  else {
    isPlaying = !isPlaying
  }
}

function onDoubleClickCanvas(event) {
  z1.set(z1re, 0)
  z2 = randomZ()
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
var z2 = randomZ()
var zExp = z1.clone().exp()
var zLog = z1.clone().log()
var zSqrt = z1.clone().sqrt()
var zPow = z1.clone().pow(z2)

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
  zExp = z1.clone().exp()
  zLog = z1.clone().log()
  zSqrt = z1.clone().sqrt()
  zPow = z1.clone().pow(z2)
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
  drawVector(z2, COLOR_Z2)
  drawVector(zExp, COLOR_ZEXP)
  drawVector(zLog, COLOR_ZLOG)
  drawVector(zSqrt, COLOR_ZSQRT)
  drawVector(zPow, COLOR_ZPOW)

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
  canvas.context.fillStyle = COLOR_ZEXP
  canvas.context.fillText(`exp(z1) = (${zExp.x}, ${zExp.y})`, padding, height * 3)
  canvas.context.fillStyle = COLOR_ZLOG
  canvas.context.fillText(`log(z1) = (${zLog.x}, ${zLog.y})`, padding, height * 4)
  canvas.context.fillStyle = COLOR_ZSQRT
  canvas.context.fillText(`sqrt(z1) = (${zSqrt.x}, ${zSqrt.y})`, padding, height * 5)
  canvas.context.fillStyle = COLOR_ZPOW
  canvas.context.fillText(`pow(z1, z2) = (${zPow.x}, ${zPow.y})`, padding, height * 6)
}

function randomZ() {
  var z = new Z(Math.random() * 2, 0)
  return z.rotate(Math.random() * TWO_PI)
}
