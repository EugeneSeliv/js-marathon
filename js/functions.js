export function random(num) {
  return Math.ceil(Math.random() * num);
}

export function $getElById(id) {
  return document.getElementById(id);
}

export function $getElByQuery(selector) {
  return document.querySelector(selector);
}

export function $getElByQueryAll(selector) {
  return document.querySelectorAll(selector);
}

export function counterGenerator() {
  let accumulator = 0;
  return (increment = 1) => accumulator += increment;
}

export function clickCounterGenerator(clickLimit, $btn) {
  $btn.clickLimit = clickLimit;
  $btn.children[0].innerText = clickLimit;
  return () => {
    --$btn.clickLimit;
    $btn.children[0].innerText = $btn.clickLimit;
    if ($btn.clickLimit <= 0) {
      $btn.disabled = true;
      return false;
    } else return true;
  };
}

export const numberLengthNormalize = (number, length) => {
  let result = '';
  const prefixLength = length >= `${number}`.length ? length - `${number}`.length : 0;
  for (let i = 0; i < prefixLength; i++) result += '0';
  result += number;
  return result;
}

export function addButtonsClickLimit(query, limitsArray) {
  const $buttons = $getElByQueryAll(query);
  $buttons.forEach(($btn, index) => {
    $btn.addEventListener('click', clickCounterGenerator(limitsArray[index], $btn));

  });
}

export function createDomElement(element) {
  const { tegName, innerText = null, attributes = null } = element;
  const $element = document.createElement(tegName);
  if (innerText) $element.innerText = innerText;
  if (attributes) {
    for (const attrName in attributes) {
      $element.setAttribute(attrName, attributes[attrName]);
    }
  }
  return $element;
}

export function renderDomElement(domElementsData, parentId, direction = true) {
  const $parentId = $getElById(parentId);
  const domTreeDepth = Math.max(...domElementsData.map(item => item.domTreeLevel));
  domElementsData.forEach(element => {
    element.$dom = createDomElement(element);
  });
  for (let i = 0; i <= domTreeDepth; i++) {
    domElementsData.forEach(element => {
      if (element.domTreeLevel === 0 && i === 0) {
        if (direction) $parentId.appendChild(element.$dom);
        if (!direction) $parentId.insertBefore(element.$dom, $parentId.children[0]);
      } else if (element.domTreeLevel === i) {
        domElementsData.forEach(item => {
          if (element.parent === item.id) {
            item.$dom.appendChild(element.$dom);
          }
        });
      }
    });
  }
}
