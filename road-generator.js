var newRoad;
var canvas;
var frame = 0;
var roadDraw = [];
var previousPoint;
var roadLength = 25;

function generate (points) {
  var road = {};
  road.points = points;
  road.segments = generateSegments(points);
  road.vertices = generateVertices(road.segments);
  road.vertices = road.vertices.reduce(function(a, b) {
    return a.concat(b);
  }, []);
  road.triangles = generateTriangles(road.segments);
  printTriangles(road);
}

function printTriangles(road) {
  for(i = 0; i < (road.triangles.length); i+=3) {
    triangle((road.vertices[road.triangles[i]][0]),
             (road.vertices[road.triangles[i]][1]),
             (road.vertices[road.triangles[i + 1]][0]),
             (road.vertices[road.triangles[i + 1]][1]),
             (road.vertices[road.triangles[i + 2]][0]),
             (road.vertices[road.triangles[i + 2]][1]));
  }
}

function generateSegments(points) {
  var segments = [];
  for(i = 0; i < points.length - 1; i++) {
    segments.push(generateSegment(points, i));
  }
  return segments;
}

function generateSegment(points, i) {
  var segment = {};
  segment.center = [points[i], points[i+1]];
  var dx = points[i+1][0] - points[i][0];
  var dy = points[i+1][1] - points[i][1];
  segment.normalLeft = [-1 * dy, dx];
  segment.normalRight = [dy, -1 * dx];
  segment.left = [[points[i][0] + segment.normalLeft[0], points[i][1] + segment.normalLeft[1]], [points[i+1][0] + segment.normalLeft[0], points[i+1][1] + segment.normalLeft[1]]];
  segment.right = [[points[i][0] + segment.normalRight[0], points[i][1] + segment.normalRight[1]], [points[i+1][0] + segment.normalRight[0], points[i+1][1] + segment.normalRight[1]]];
  segment.vertices = segment.left.concat(segment.center.concat(segment.right));
  segment.triangles = [2, 0, 1,
                       2, 1, 3,
                       2, 3, 4,
                       4, 3, 5];
  segment.p5TrianglesStacked = segment.left.concat(segment.center.concat(segment.right));
  segment.p5Triangles = segment.p5TrianglesStacked.reduce(function(a, b) {
    return a.concat(b);
  }, []);
  return segment;
}

function generateVertices(segments) {
  var vertices = [];
  for(i = 0; i < segments.length; i++) {
    var newVertices = [];
    var oldVertices = segments[i].vertices;
    for(x = 1; x <= oldVertices.length; x++) {
      newVertices.push([oldVertices[x - 1][0],
                        oldVertices[x - 1][1]]);
    }
    vertices.push(newVertices);
  }
  return vertices;
}

function generateTriangles(segments) {
  var triangles = [];
  for(i = 0; i < segments.length; i++) {
    var newTriangles = [];
    var oldTriangles = segments[i].triangles;
    for(x = 0; x < oldTriangles.length; x++) {
      newTriangles.push(oldTriangles[x] + (i * 6));
    }
    triangles = triangles.concat(newTriangles);
  }
  return triangles;
}

function shortenLineDistance(previousPoint, newPoint, numberOfRoads){
  numberOfRoads = numberOfRoads || roadLength;
  var pxDistance = roadLength * numberOfRoads;
  var fromX = previousPoint[0];
  var fromY = previousPoint[1];
  var toX = newPoint[0];
  var toY = newPoint[1];
  if(fromX === toX)
    return {x: toX, y: toY > fromY ? fromY + pxDistance : fromY - pxDistance};
  if(fromY === toY)
    return {y: toY, x: toX > fromX ? fromX + pxDistance : fromX - pxDistance};
  var adjacent   = toY - fromY;
  var opposite   = toX - fromX;
  var hypotenuse = Math.sqrt(Math.pow(opposite, 2) + Math.pow(adjacent,2));
  var angle = Math.acos(adjacent/hypotenuse);
  var newOpposite = Math.sin(angle) * pxDistance;
  var newAdjacent = Math.cos(angle) * pxDistance;
  var y = fromY - newAdjacent;
  var x = fromX + newOpposite;
  return [x, y];
}


function setup() {
  canvas = createCanvas(1680, 900);
}

function draw() {
  frame++;
  if(mouseIsPressed) {
    previousPoint = previousPoint || [mouseX, mouseY];
    var distance = Math.sqrt( (previousPoint[0] - mouseX) * (previousPoint[0] - mouseX) + (previousPoint[1] - mouseY) * (previousPoint[1] - mouseY) );
    if(distance === roadLength) {
      roadDraw.push([mouseX, mouseY]);
    } else if(distance > roadLength) {
      var remainder = distance % roadLength;
      var numberOfRoads = distance / roadLength;
      for(i = 0; i < numberOfRoads; i++) {
        roadDraw.push([shortenLineDistance(previousPoint, [mouseX, mouseY])[0] + (i * roadLength), shortenLineDistance(previousPoint, [mouseX, mouseY])[1] + (i * roadLength)]);
      }
      console.log(roadDraw);
      previousPoint = ([(previousPoint[0] + (shortenLineDistance(previousPoint, [mouseX, mouseY], numberOfRoads))), (previousPoint[1] + (shortenLineDistance(previousPoint, [mouseX, mouseY], numberOfRoads)))]);
    }
  }
  canvas.clear();
  generate(roadDraw);
}
