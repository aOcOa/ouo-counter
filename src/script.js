import OuoCounter from "./OuoCounter";
import "./style.scss";
window.addEventListener("load", () => {
  new OuoCounter({
    handleMaxEvent:()=> alert('滿ㄌ'),
    counterDom: document.getElementById("ouoCounter"),
    maxValue: 4
  });
});
