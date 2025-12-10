import { ModelConfig } from "../types";

// Maybe this should return true for non-list relations only?
export function shouldFilterDeletedFromReadResult(
  params: { args: any },
  config: ModelConfig
): boolean {
  console.log("argh");
  return (
    !params.args.where ||
    typeof params.args.where[config.field] === "undefined" ||
    !params.args.where[config.field]
  );
}

export function filterSoftDeletedResults(result: any, config: ModelConfig) {
  // filter out deleted records from array results
  if (result && Array.isArray(result)) {
    console.log("sdfds");
    return result.filter(
      (item) => item[config.field] !== config.createValue(true)
    );
  }

  // if the result is deleted return null
  if (result && result[config.field]) {
    console.log("dasfafdsafsd");
    return null;
  }

  return result;
}
