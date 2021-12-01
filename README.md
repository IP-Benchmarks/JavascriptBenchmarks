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
-   Choose a folder in `libs/benchmarks/src/lib` that fits your benchmark or create one that can be a category of benchmarks. E.g. `json`, `object`, `array`, `string` etc. Inevitable some benchmarks will fit multiple categories. If that happens please add a comment on the first line with the exact phrase `Relates to: <category1>, <categoty2>, ...` so the benchmark can be automatically added to those categories as well.
-   Create a folder in `libs/benchmarks/src/lib/<category>` with a descriptive name for the benchmark. E.g. `json-stringify-array-vs-custom-stringify-array`.
-   Create a fully typed typescript file containing the same name as the folder. E.g. `json-stringify-array-vs-custom-stringify-array.ts`.
-   Add a `test` function that runs the benchmarks for the given code snippets. The `test` function should return an array of `IBenchmark` objects that contains all the tested functions and their results. For most random test samples you can use the generator functions from `libs/shared` library.
-   Create a test using the `folder name` and the extension `spec.ts`. E.g. `json-stringify-array-vs-custom-stringify-array.spec.ts`
-   Run the test to ensure the validity of the outputs as they should return the same values using the same samples.
-   Export the functions created in the file inside the `libs/benchmarks/src/index.ts` file as the `name of the file created` without `-` in `camelCase`. This will not be used anywhere and will only ensure that the tree shaking will not remove the created files on build.
-   Lint and format the file. This step will be done automatically on commit. Please do not bypass this step.
-   Submit the PR.
