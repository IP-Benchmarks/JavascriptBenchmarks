// import { existsSync, promises } from 'fs';

// import { generateBarChart } from './generate-chart';

// describe('Chart generation tests', () => {
//     jest.setTimeout(500000);
//     const benchmarks = [
//         {
//             name: 'JSON stringify - primitives',
//             averageTime: 0.0007384411573410035,
//             opsPerSec: 1354204.041931823,
//             functionBody: 'function jsonStringify(value) {\r\n    return JSON.stringify(value);\r\n}',
//             functionName: 'jsonStringify',
//         },
//         {
//             name: 'Custom stringify - primitives',
//             averageTime: 0.0004705503225326538,
//             opsPerSec: 2125171.213607244,
//             functionBody:
//                 'function stringifyPrimitives(value) {\r\n' +
//                 "    if (typeof value === 'string') {\r\n" +
//                 '        return `"${value}"`;\r\n' +
//                 '    }\r\n' +
//                 "    if (typeof value === 'number' || typeof value === 'boolean' || value === null) {\r\n" +
//                 '        return `${value}`;\r\n' +
//                 '    }\r\n' +
//                 '}',
//             functionName: 'stringifyPrimitives',
//         },
//     ];
//     test('Chart Saving', async () => {
//         console.log('Chart Saving', __dirname);
//         console.log(await generateBarChart(benchmarks));
//         const chartData = await generateBarChart(benchmarks);
//         await promises.writeFile(`${__dirname}/test.jpg`, chartData);
//         expect(existsSync(`${__dirname}/test.jpg`)).toBe(true);
//     });
// });
