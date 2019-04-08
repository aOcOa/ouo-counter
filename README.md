## Intro

This is a basic js counter written in vanilla js

## Usage
- Initialize a counter:
- 
  `counterDom`: the element to wrap counter

  `maxValue`: the maximum value of counter

  `handleMaxEvent`: custom event to trigger when counter reach  `maxValue`


  ```
   new OuoCounter({
    handleMaxEvent:()=> alert('it too much'),
    counterDom: document.getElementById("ouoCounter"),
    maxValue: 4
  });
  ```
## Methods
- reset(maxValue): reset the counter and `maxValue`