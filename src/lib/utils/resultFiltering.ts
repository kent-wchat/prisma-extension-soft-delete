import { ModelConfig } from "../types";

// Maybe this should return true for non-list relations only?
export function shouldFilterDeletedFromReadResult(
  params: { args: any },
  config: ModelConfig
): boolean {
  return (
    // Filter if where not specified
    !params.args.where ||
    // Filter if where specified but delete marker col not included
    typeof params.args.where[config.field] === "undefined" ||
    // Filter if not specifying to include deleted documents
    (config.isDeletedValueUnique
      ? params.args.where[config.field] !== config.createValue(true)
      : !params.args.where[config.field])
  );
}

export function filterSoftDeletedResults(result: any, config: ModelConfig) {
  // filter out deleted records from array results
  if (result && Array.isArray(result)) {
    if (config.isDeletedValueUnique)
      return result.filter(
        (item) => item[config.field] !== config.createValue(true)
      );
    return result.filter((item) => !item[config.field]);
  }

  // if the result is deleted return null
  if (
    result &&
    (config.isDeletedValueUnique
      ? result[config.field] === config.createValue(true)
      : result[config.field])
  ) {
    return null;
  }

  return result;
}
