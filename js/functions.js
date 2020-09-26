import { POKEMONS } from './pokemons.js';

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
    } else {
      $btn.disabled = false;
      return true
    };
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

export async function getPokemonsData(url) {
  try {
    const responce = await fetch(url);
    if (responce.ok) {
      return await responce.json();
    } else {
      alert('Server error');
      return JSON.parse(POKEMONS);
    }
  } catch (err) {
    alert('Network error');
    return JSON.parse(POKEMONS);
  }
}

export function createPokemonWrapper(containerId, pokemonId, wrapClass) {
  const $container = $getElById(containerId);
  const $pokemonWrapper = document.createElement('div');
  $pokemonWrapper.setAttribute('id', `id${pokemonId}`);
  $pokemonWrapper.pokemonId = pokemonId;
  $pokemonWrapper.className = wrapClass;
  $container.appendChild($pokemonWrapper);
  return $pokemonWrapper;
}

export function removeChild(parentSelector) {
  const parent = document.querySelector(parentSelector);
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}

export async function getDamge(url, { payer1id, player2id, payer1AttackId }) {
  try {
    const responce = await fetch(`${url}player1id=${payer1id}&attackId=${payer1AttackId}&player2id=${player2id}`);
    if (responce.ok) {
      return await responce.json();
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}

export function randomInRange(min, max) {
  return min + random(max - min);
}

export function runningNumbers(node, duration, step = 1) {
  const value = node.innerText;
  const interval = Math.ceil(duration / (value / step));
  let accumulator = 0;
  node.innerText = '0';
  const timerId = setInterval(() => {
    if (accumulator < value) {
      accumulator += step;
      node.innerText = accumulator;
    } else {
      node.innerText = value;
      clearInterval(timerId);
    }
  }, interval);
}