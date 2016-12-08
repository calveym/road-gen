function generate (points, lanes) {
  var road = {};
  road.points = points;
  road.segments = [];

  for(i = 0; i < points.length - 1; i++) {
    road.segments.push(generateEdges(road.points[i], road.points[i + 1]));
  }
  return road;
}
