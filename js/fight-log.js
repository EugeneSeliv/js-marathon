import { random, renderDomElement, $getElByQuery } from './functions.js';

function generateLog(firstPerson, secondPerson, damage) {
  const { name: firstName, hp: { current, total } } = firstPerson;
  const { name: secondName } = secondPerson;
  const numberLengthNormalize = (number, length) => {
    let result = '';
    const prefixLength = length >= `${number}`.length ? length - `${number}`.length : 0;
    for (let i = 0; i < prefixLength; i++) result += '0';
    result += number;
    return result;
  }
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

function renderLog(listId, firstPerson, secondPerson, damage, allStrikeCount) {
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
  const oddFlag = allStrikeCount % 2 === 0 ? true : false;
  const $liDamageHp = $getElByQuery('.logs-list__list-item .logs-list__item-damageHp');
  const $liText = $getElByQuery('.logs-list__list-item .logs-list__item-text');
  if (oddFlag) {
    $liDamageHp.setAttribute('style', 'color: #fdf502; border-color: #fdf502');
    $liText.setAttribute('style', 'color: #fdf502; border-color: #fdf502');
  }
}

export default renderLog;