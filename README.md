## Road Generator
This is a simple script that generates a road for a 2d line.
The input should look like this:

```[[x, y], [xn, yx]]```

With as many additional arrays with sets of coordinates as necessary to fully map out the central line.
With this input, the generator will find the sets of coordinates corresponding to the left and right edges of the road.

##TODO:
- Generate a proper mesh with tris.
- Implement the ability to smooth the edges and center of the line n amount of times.
- Implement the ability to add n lanes to the road.
- Implement the ability to add a customisable central reservation to the road.
- Implement the ability to add a customisable footpath to the side of the road.
- Create a simple texture generator, that maps a set of noise patterns to the tris generated.
