import ViewFactory from "../../shared/base/viewFactory.mjs";
import TableDesktopComponent from "./table.mjs";

export default class DesktopFactory extends ViewFactory {
  createTable() {
    return new TableDesktopComponent();
  }
}
