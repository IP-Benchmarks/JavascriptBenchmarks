// import { IBenchmark } from '@javascript-benchmarks/shared';

// export async function generateBarChart(benchmarks: IBenchmark[], exportType: 'jpg' | 'png' | 'svg' | 'pdf' = 'svg') {
//     return benchmarksToChart(benchmarks, exportType);
// }

// async function benchmarksToChart(benchmarks: IBenchmark[], type: 'jpg' | 'png' | 'svg' | 'pdf' = 'svg') {
//     const JSDOM = require('jsdom').JSDOM;
//     const jsdom = new JSDOM('<body><div id="container"></div></body>', { runScripts: 'dangerously' });
//     const window = jsdom.window;

//     const anychart = require('anychart')(window);

//     const chart = anychart.bar();
//     const series = chart.bar(benchmarks.map((benchmark) => [benchmark.name, benchmark.opsPerSec.toFixed(2)]));
//     console.log(
//         series,
//         benchmarks.map((benchmark) => [benchmark.name, benchmark.opsPerSec.toFixed(2)])
//     );
//     series
//         .tooltip()
//         .position('right')

//         .anchor('left-center')
//         .offsetX(5)
//         .offsetY(0)
//         .titleFormat('{%X}')
//         .format('${%Value}');

//     chart.animation(false);
//     chart.padding([10, 40, 5, 20]);
//     chart.title('Top 10 Cosmetic Products by Revenue');
//     chart.yAxis().labels().format('{%Value}{groupsSeparator: }');
//     chart.xAxis().title('Operations per second');
//     chart.yAxis().title('Benchmarks');
//     chart.interactivity().hoverMode('by-x');
//     chart.tooltip().positionMode('point');
//     chart.yScale().minimum(0);
//     chart.container('container');
//     chart.draw();

//     const anychartExport = require('anychart-nodejs')(anychart);
//     return await anychartExport.exportTo(chart, type);
// }
