const { describe, it, before, after, done } = require("mocha");
const { expect } = require("chai");
const { JSDOM } = require("jsdom");
import Counter from "../src/OuoCounter.js";
import { doesNotReject } from "assert";
const dom = new JSDOM();
global.document = dom.document;

var chai = require("chai");
chai.use(require("chai-dom"));

const rootDom = new JSDOM(`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>TEST</title>
  </head>
  <body>
      <div class="counter" id="ouoCounter"></div>
  </body>
</html>`);

document = rootDom.window.document;

let counter;
describe("counter", () => {
  before(() => {
    counter = new Counter({
      counterDom: document.getElementById("ouoCounter"),
      context: document,
      maxValue: 11
    });
  });

  it("generate element: minus", () => {
    expect(document.getElementsByClassName("ouoCounter-minus").length).greaterThan(0);
  });
  it("generate element: add", () => {
    expect(document.getElementsByClassName("ouoCounter-add").length).greaterThan(0);
  });
  it("generate element: value", () => {
    expect(document.getElementsByClassName("ouoCounter-value").length).greaterThan(0);
  });
  it("render element value: minus", () => {
    expect(document.getElementsByClassName("ouoCounter-minus")[0].textContent).eqls('-');
  });
  it("render element value: add", () => {
    expect(document.getElementsByClassName("ouoCounter-add")[0].textContent).eqls('+');
  });
  it("render element value: value", () => {
    expect(document.getElementsByClassName("ouoCounter-value")[0].textContent).eqls('1');
  });
  it("handle reset event: reset max", () => {
    counter.valueDom.textContent = 2;
    counter.reset(3);
    expect(counter.maxValue).eqls(3);
  });

  it("handle reset event: reset value", () => {
    counter.valueDom.textContent = 2;
    counter.reset(3);
    expect(parseInt(counter.valueDom.textContent,10)).eqls(1);
  });
});
