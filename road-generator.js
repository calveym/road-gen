var newRoad;
var canvas;
var frame = 0;
var roadDraw = [];

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
  return road;
}

function printTriangles(road) {
  for(i = 0; i < (road.triangles.length); i+=3) {
    console.log(road.vertices[road.triangles[i]][0] * 20);
    triangle((road.vertices[road.triangles[i]][0]) * 20,
             (road.vertices[road.triangles[i]][1]) * 20,
             (road.vertices[road.triangles[i + 1]][0]) * 20,
             (road.vertices[road.triangles[i + 1]][1]) * 20,
             (road.vertices[road.triangles[i + 2]][0]) * 20,
             (road.vertices[road.triangles[i + 2]][1]) * 20);
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
  console.log(segment.vertices);
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



function setup() {
  canvas = createCanvas(1680, 900);
}

function draw() {
  canvas.clear();
  frame++;
  roadDraw.push([frame * 2 - 1.9, Math.sin(Math.cos(frame * 0.125)) * 5 + 20]);
  newRoad = generate(roadDraw);
}
