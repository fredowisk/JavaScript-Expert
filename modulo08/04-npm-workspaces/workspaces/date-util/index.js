import StringUtil from "@fredowisk/string-util";

export default class DateUtil {
  static #dateRegex = /(?<year>\d{4}).(?<month>\d{2}).(?<day>\d{2})/g;
  static #stringRegex = /(?<day>\d{2}).(?<month>\d{2}).(?<year>\d{4})/g;

  static #availableDateFormats = {
    "dd-mm-yyyy": "$<day>-$<month>-$<year>",
    "dd/mm/yyyy": "$<day>/$<month>/$<year>",
    "yyyy-mm-dd": "$<year>-$<month>-$<day>",
    "yyyy/mm/dd": "$<year>-$<month>-$<day>",
  };

  static #availableStringFormats = {
    "dd-mm-yyyy": this.#stringRegex,
    "dd/mm/yyyy": this.#stringRegex,
    "yyyy-mm-dd": this.#dateRegex,
    "yyyy/mm/dd": this.#dateRegex,
  };

  static formatDate(date, format) {
    if (!this.#availableDateFormats[format]) {
      return { error: `the format ${format} is not available yet :(` };
    }

    const result = date.toISOString().slice(0, 10);
    const exp = this.#availableDateFormats[format];

    return result.replace(this.#dateRegex, exp);
  }

  static formatString(date, currentFormat, expectedFormat) {
    if (StringUtil.isEmpty(date)) {
      return { error: "your text is empty!" };
    }

    if (!this.#availableStringFormats[currentFormat]) {
      return { error: `the format ${currentFormat} is not available yet :(` };
    }

    if (!this.#availableStringFormats[expectedFormat]) {
      return { error: `the format ${expectedFormat} is not available yet :(` };
    }

    const exp = this.#availableDateFormats[currentFormat];
    const dateString = StringUtil.removeEmptySpaces(date).replace(
      exp,
      this.#availableDateFormats[currentFormat]
    );

    const newDate = new Date(dateString);

    return this.formatDate(newDate, expectedFormat);
  }
}
