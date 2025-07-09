#! deno i; nu fix.nu; deno run --unstable-sloppy-imports -A src/index.ts
#! This file is only necessary if running this project with deno rather than npm

let $orig = "node_modules/.deno/@intuweb3+sdk@0.0.45/node_modules/@intuweb3/sdk/utils/json-imports.js";
let $new = open $orig | str replace --all '.json";' '.json" with { type: "json" }; // (changed by fix.nu)'

$new | save -f $orig