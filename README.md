## Road Generator
This is a simple script that generates a road for a 2d line.
The input should look like this:

`[[x, y], [nx, ny]]`

With as many additional arrays with sets of coordinates as necessary to fully map out the central line.
With this input, the generator will find the sets of coordinates corresponding to the left and right edges of the road.

##DONE:
- Calculate set of lines from points
- Calculate normals of lines
- Generate a set of coordinates for road edges
- Apply road edge coordinates to a triangle object


##TODO:
- Add mouse interpolation so correct distances are reported regardless of FPS.
- Implement the ability to smooth the edges and center of the line n amount of times.
- Implement the ability to add n lanes to the road.
- Implement the ability to add a customisable central reservation to the road.
- Implement the ability to add a customisable footpath to the side of the road.
- Create a simple texture generator, that maps a set of noise patterns to the tris generated.
