class Counter {
  constructor({
    context = document,
    counterDom,
    maxValue,
    handleMaxEvent = () => null
  }) {
    this.counterDom = counterDom;
    this.context = context;
    this.maxValue = maxValue;
    this.handleMaxEvent = handleMaxEvent;
    this.generateElements().then(() => {
      this.bindEvent();
    });
  }
  reset(maxValue) {
    this.maxValue = maxValue || this.maxValue;
    this.valueDom.textContent = 1;
  }
  generateElements() {
    return new Promise((resolve, reject) => {
      const fragment = this.context.createDocumentFragment();

      this.minusDom = this.context.createElement("span");
      this.addDom = this.context.createElement("span");
      this.valueDom = this.context.createElement("span");

      this.minusDom.setAttribute("class", "ouoCounter-minus");
      this.minusDom.setAttribute("data-function", "minus");
      this.minusDom.textContent = "-";

      this.addDom.setAttribute("class", "ouoCounter-add");
      this.addDom.setAttribute("data-function", "add");
      this.addDom.textContent = "+";

      this.valueDom.setAttribute("class", "ouoCounter-value");
      this.valueDom.textContent = 1;

      fragment.appendChild(this.minusDom);
      fragment.appendChild(this.valueDom);
      fragment.appendChild(this.addDom);

      this.counterDom.appendChild(fragment);
      resolve();
    });
  }
  bindEvent() {
    this.counterDom.addEventListener(
      "click",
      this._handleCounterEvent.bind(this)
    );
  }
  // setMax(max) {
  //   this.max = max;
  //   this.inputDom.value = this.min;
  // }
  // setTotalBase(total) {
  //   this.total = total;
  //   if (this.totalDom) {
  //     this.totalDom.innerText = `NT$${this.total}`;
  //   }
  // }
  _handleCounterEvent(evt) {
    const action = evt.target.getAttribute("data-function");
    const currentValue = parseInt(this.valueDom.textContent, 10);
    switch (action) {
      case "minus":
        if (currentValue - 1 < 1) {
          this.valueDom.textContent = 1;
          this.minusDom.className += this.minusDom.className.indexOf(" is-disabled") !== -1? "":" is-disabled";
        } else {
          this.addDom.className = this.addDom.className.replace(" is-disabled", "");
          this.valueDom.textContent = currentValue - 1;
        }

        break;
      case "add":
        if (currentValue + 1 <= this.maxValue) {
          this.minusDom.className = this.minusDom.className.replace(" is-disabled", "");
          this.valueDom.textContent = currentValue + 1;
        } else {
          this.addDom.className += this.addDom.className.indexOf(" is-disabled") !== -1 ? "" : " is-disabled";
          this.handleMaxEvent();
        }
        break;
      default:
        break;
    }
  }
}

export default Counter;
