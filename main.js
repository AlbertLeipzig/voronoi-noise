const width = 500;
const height = 500;

const points = d3
  .range(100)
  .map(() => [Math.random() * width, Math.random() * height]);

const delaunay = d3.Delaunay.from(points);
const voronoi = delaunay.voronoi();

const colorScale = d3
  .scaleSequential(d3.interpolateYlOrRd)
  .domain([0, points.length]);

const svg = d3
  .select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

svg
  .selectAll('.cell')
  .data(voronoi.cellPolygons())
  .join('path')
  .attr('class', 'cell')
  .attr('d', polygon)
  .style('fill', (_, i) => colorScale(i));

function polygon(d) {
  return 'M' + d.join('L') + 'Z';
}
