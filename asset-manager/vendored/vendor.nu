print ".... Getting deno to download the npm package for us ..."
do --ignore-errors { deno run -A loads_dep.ts }
print ".... Errors above this are from deno run and should be expected and ignored"

let $version = "0.99.954"

let $vendored_path = $"@intuweb3+exp-node@($version)"
rm -rf $vendored_path
cp -r $"../node_modules/.deno/@intuweb3+exp-node@($version)/node_modules/@intuweb3/exp-node/" $vendored_path
