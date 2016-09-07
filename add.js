const TWO_PI = 2 * Math.PI

var canvas = new Canvas(512, 512)
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
  move()
  draw()
  requestAnimationFrame(animate)
}

function move() {
  if (z1theta < TWO_PI) {
    z1theta += dtheta
    z1.rotate(dtheta)
  }
  else {
    z1theta = 0
    z1.set(z1re, 0)
    z2 = randomZ()
  }
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
  drawVector(z1, "#ffdddd")
  drawVector(z2, "#ddddff")
  drawVector(zAdd, "#ee4444")
  drawVector(zSub, "#ffcc66")
  drawVector(zMul, "#44aaee")
  drawVector(zDiv, "#44ee44")

  context.restore()
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

function randomZ() {
  var z = new Z(Math.random() * 2, 0)
  return z.rotate(Math.random() * TWO_PI)
}