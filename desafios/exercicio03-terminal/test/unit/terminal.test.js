import { describe, it } from "mocha";
import { expect } from "chai";
import readline from "readline";
import CustomTerminal from "../../src/terminal.js";

describe("Terminal Suite Tests", () => {
  it("should initialize the terminal when call initialize", () => {
    const customTerminal = new CustomTerminal();

    expect(customTerminal.terminal).to.be.deep.equal({});
    customTerminal.initialize();
    expect(customTerminal.terminal).to.be.instanceOf(readline.Interface);
  });

  it("should initialize the printer when call initializeTable", () => {
    const customTerminal = new CustomTerminal();

    expect(customTerminal.print).to.be.deep.equal({});
    customTerminal.initializeTable();
    expect(customTerminal.print).to.be.instanceOf(Function);
  });

  it("should update data when call update table", () => {
    const customTerminal = new CustomTerminal();
    const expected = "Senior Developer";

    expect(customTerminal.data).to.be.deep.equal([]);
    customTerminal.updateTable(expected);

    expect(customTerminal.data).to.have.length(1);
    expect(customTerminal.data[0]).to.be.deep.equal(expected);
  });
});
