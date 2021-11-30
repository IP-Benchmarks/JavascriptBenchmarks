# Javascript Benchmarks

Performance comparison between different Javascript APIs and various code snippets.

The entire platform is automatically rebuilt using the latest results and code snippets.
All the benchmarks are automatically run on a weekly basis and on push.

If you would like to include your custom benchmark please refer to the [Contribution](#Contribution) section.

# Conventions

## Filenames and folders

-   Filenames and folders should not contain spaces in them and delimit each work with dashes (`-`). E.g. `object-keys-vs-for-in`.

# Automation

The entire website is created using `Gitbook` and `Github actions`.
The benchmark names are taken from the used file and function names.

# Contribution

-   Fork the repository
-   Open a terminal in the root folder and run `npm i`
-   Create a folder in `libs/benchmarks/src/lib` with a descriptive name of the benchmark. E.g. `json-stringify-array-vs-custom-stringify-array`.
-   Create a fully typed typescript file containing the same name as the folder. E.g. `json-stringify-array-vs-custom-stringify-array.ts`.
-   Add a `test` function that takes as parameter a callback and returns a function. The `test` function should contain the testing samples and return a function that runs the benchmark with the testing samples. The returned function will be used in automation from `apps/runner/main.ts`.
-   Create a test
-   Run the test to ensure the validity of the outputs(They should return the same values)
-   Lint and format the file. This step will be done automatically on commit. Please do not bypass this step.
-   Submit the PR.
