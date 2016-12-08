function generate (points) {
  var road = {};
  road.points = points;
  road.segments = [];

  for(i = 0; i < points.length - 1; i++) {
    road.segments.push(generateSegment(road.points, i));
  }
  return road;
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
  segment.tris = [];
  return segment;
}

console.log(generate([[0, 0], [0, 1], [0, 3], [0, 7]]));
