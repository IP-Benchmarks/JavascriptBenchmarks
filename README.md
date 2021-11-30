# Javascript Benchmarks

Performance comparison between different Javascript APIs and various code snippets.

The entire platform is automatically rebuilt using the latest results and code snippets.
All the benchmarks are automatically run on a weekly basis and on push.

If you would like to include your custom benchmark please refer to the [Contribution](#Contribution) section.

# Automation

The entire website is created using `Gitbook` and `Github actions`.
The benchmark names are taken from the used file and function names.

# Contribution

-   Fork the repository
-   Create a fully typed typescript file containing a descriptive benchmark title.
-   Add a `test` function that takes as parameter a callback and returns a function. The `test` function should contain the testing samples and return a function that runs the benckmark with the testing samples. The returned function will be used in `apps/runner/main.ts`.
-   Run `ts-node main.ts <path-to-benchmark>` to test your benchmark.
-   Lint and format the file.
-   Submit the PR.
