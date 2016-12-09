function generate (points) {
  var road = {};
  road.points = points;
  road.segments = generateSegments(points);
  return road;
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
  return segment;
}

console.log(generate([[0, 0], [0, 1], [1, 2], [2, 4]]).segments[1]);
