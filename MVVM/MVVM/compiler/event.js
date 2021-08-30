import { checkType, randomNum } from "../shared/utils";

const reg_onClick = /onClick\=\"(.+?)\"/g;
const reg_fnName = /^(.+?)\(/;
const reg_arg = /\((.*?)\)/;

const eventPool = [];

export function eventFormat(template) {
  return template.replace(reg_onClick, function (node, key) {
    const _mark = randomNum();
    eventPool.push({
      mark: _mark,
      handler: key.trim(),
      type: "click",
    });

    return `data-mark="${_mark}"`;
  });
}

export function bindEvent(methods) {
  const allElements = document.querySelectorAll("*");
  let oItem = null;
  let _mark = 0;

  eventPool.forEach((event) => {
    for (let i = 0; i < allElements.length; i++) {
      oItem = allElements[i];
      _mark = parseInt(oItem.dataset.mark);

      if (event.mark === _mark) {
        oItem.addEventListener(
          event.type,
          function () {
            const fnName = event.handler.match(reg_fnName)[1];
            const arg = checkType(event.handler.match(reg_arg)[1]);
            methods[fnName](arg);
          },
          false
        );
      }
    }
  });
}
