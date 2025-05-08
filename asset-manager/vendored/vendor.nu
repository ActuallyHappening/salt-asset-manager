do --ignore-errors { deno run -A loads_dep.ts }

let $version = "0.99.954"

let $vendored_path = $"@intuweb3+exp-node@($version)"
cp -r $"../node_modules/.deno/@intuweb3+exp-node@($version)/node_modules/@intuweb3/exp-node" $vendored_path


