import { deepStrictEqual } from "assert";
import StringUtil from "./index.js";

{
  const expected = true;
  const data = "";
  const result = StringUtil.isEmpty(data);
  deepStrictEqual(result, expected);
}

{
  const expected = false;
  const data = "valid string";
  const result = StringUtil.isEmpty(data);
  deepStrictEqual(result, expected);
}

{
  const expected = "spacesRemoved";
  const data = "    spaces Removed   ";
  const result = StringUtil.removeEmptySpaces(data);
  deepStrictEqual(result, expected);
}
