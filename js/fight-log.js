import {
  random,
  renderDomElement,
  $getElByQuery,
  numberLengthNormalize
} from './functions.js';

function generateLog(firstPerson, secondPerson, damage) {
  const { name: firstName, hp: { current, total } } = firstPerson;
  const { name: secondName } = secondPerson;
  const damageHp = `[${numberLengthNormalize(damage, 2)}, ${numberLengthNormalize(current, 3)} / ${numberLengthNormalize(total, 3)}]`;
  const logs = [
    [damageHp, `${firstName} вспомнил что-то важное, но неожиданно ${secondName}, не помня себя от испуга, ударил в предплечье врага.`],
    [damageHp, `${firstName} поперхнулся, и за это ${secondName} с испугу приложил прямой удар коленом в лоб врага.`],
    [damageHp, `${firstName} забылся, но в это время наглый ${secondName}, приняв волевое решение, неслышно подойдя сзади, ударил.`],
    [damageHp, `${firstName} пришел в себя, но неожиданно ${secondName} случайно нанес мощнейший удар.`],
    [damageHp, `${firstName} поперхнулся, но в это время ${secondName} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`],
    [damageHp, `${firstName} удивился, а ${secondName} пошатнувшись влепил подлый удар.`],
    [damageHp, `${firstName} высморкался, но неожиданно ${secondName} провел дробящий удар.`],
    [damageHp, `${firstName} пошатнулся, и внезапно наглый ${secondName} беспричинно ударил в ногу противника.`],
    [damageHp, `${firstName} расстроился, как вдруг, неожиданно ${secondName} случайно влепил стопой в живот соперника.`],
    [damageHp, `${firstName} пытался что-то сказать, но вдруг, неожиданно ${secondName} со скуки, разбил бровь сопернику.`]
  ];
  return logs[random(logs.length - 1)];
}

function renderLog(listId, firstPerson, secondPerson, damage, color) {
  const [damageHp, text] = generateLog(firstPerson, secondPerson, damage);
  const listItemData = [{
    id: 'li',
    tegName: 'li',
    attributes: {
      class: 'logs-list__list-item',
    },
    domTreeLevel: 0,
  }, {
    id: 'damageHp',
    tegName: 'span',
    innerText: `${damageHp}`,
    attributes: {
      class: 'logs-list__item-damageHp',
    },
    domTreeLevel: 1,
    parent: 'li',
  }, {
    id: 'text',
    tegName: 'p',
    innerText: `${text}`,
    attributes: {
      class: 'logs-list__item-text',
    },
    domTreeLevel: 1,
    parent: 'li',
  }];
  renderDomElement(listItemData, listId, false);
  const $liDamageHp = $getElByQuery('.logs-list__list-item .logs-list__item-damageHp');
  const $liText = $getElByQuery('.logs-list__list-item .logs-list__item-text');
  $liDamageHp.setAttribute('style', `color: ${color}; border-color: ${color}`);
  $liText.setAttribute('style', `color: ${color}; border-color: ${color}`);
}

export default renderLog;