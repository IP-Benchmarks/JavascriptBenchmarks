# Javascript Benchmarks

Performance comparison between different Javascript APIs and various code snippets.

The entire platform is automatically rebuilt using the latest results and code snippets.
All the benchmarks are automatically run on a weekly basis and on push.

If you would like to include your custom benchmark please refer to the [Contribution](#Contribution) section.

# Contribution

- Fork the repository
- Create a fully typed typescript file containing the benchmark as title.
- Add a `test` function that takes as parameter a callback(the benchmarking functions). The `test` function should contain the testing samples and feed them to the benchmarking functions passed from the callback. The benchmarking functions will be passed from the `main.ts` on run.
- Run `ts-node main.ts <path-to-benchmark>` to test your benchmark.
- Lint and format the file.
- Submit the PR.
