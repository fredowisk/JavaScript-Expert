import { deepStrictEqual } from "assert";
import DateUtil from "./index.js";

{
  const format = "dd-M-Y";
  const expected = { error: `the format ${format} is not available yet :(` };
  const date = new Date(2022, 10, 3);
  const result = DateUtil.formatDate(date, format);
  deepStrictEqual(result, expected);
}

{
  const format = "dd-mm-yyyy";
  const expected = "03-11-2022";
  const date = new Date("2022,11,03");
  const result = DateUtil.formatDate(date, format);

  deepStrictEqual(result, expected);
}

{
  const format = "yyyy-mm-dd";
  const expected = "2022-11-03";
  const date = new Date("2022,11,03");
  const result = DateUtil.formatDate(date, format);

  deepStrictEqual(result, expected);
}

{
  const format = "dd/mm/yyyy";
  const expected = "03/11/2022";
  const date = new Date("2022,11,03");
  const result = DateUtil.formatDate(date, format);

  deepStrictEqual(result, expected);
}

{
  const expected = { error: "your text is empty!" };
  const date = "";
  const result = DateUtil.formatString(date);
  deepStrictEqual(result, expected);
}

{
  const data = {
    value: "1990-april-01",
    format: "yyy-M-dd",
  };
  const expected = {
    error: `the format ${data.format} is not available yet :(`,
  };

  const result = DateUtil.formatString(data.value, data.format);
  deepStrictEqual(result, expected);
}

{
  const data = {
    value: "2022-11-013",
    format: "yyyy-mm-dd",
  };

  const expectedFormat = "dd/M/yyyy";

  const expected = {
    error: `the format ${expectedFormat} is not available yet :(`,
  };

  const result = DateUtil.formatString(data.value, data.format, expectedFormat);
  deepStrictEqual(result, expected);
}

{
  const data = {
    value: " 2022-11-03",
    format: "yyyy-mm-dd",
  };

  const expectedFormat = "dd-mm-yyyy";

  const expected = "03-11-2022";

  const result = DateUtil.formatString(data.value, data.format, expectedFormat);
  deepStrictEqual(result, expected);
}

{
  const data = {
    value: " 2 0 2 2 / 1 1 / 0 3 ",
    format: "yyyy/mm/dd",
  };

  const expectedFormat = "dd/mm/yyyy";

  const expected = "03/11/2022";

  const result = DateUtil.formatString(data.value, data.format, expectedFormat);
  deepStrictEqual(result, expected);
}

{
  const data = {
    value: " 2 0 2 2 / 1 1 / 0 3 ",
    format: "yyyy/mm/dd",
  };

  const expectedFormat = "yyyy-mm-dd";

  const expected = "2022-11-03";

  const result = DateUtil.formatString(data.value, data.format, expectedFormat);
  deepStrictEqual(result, expected);
}
