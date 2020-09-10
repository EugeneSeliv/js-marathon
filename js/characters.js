import { random, $getElByQuery } from './functions.js';
import renderLog from './fight-log.js';

class Character {
  constructor({ name, avatar, type, weakness, resistence, defaultHP, attacks }) {
    this.name = name;
    this.avatar = avatar;
    this.type = type;
    this.weakness = weakness;
    this.resistence = resistence;
    this.hp = {
      current: defaultHP,
      total: defaultHP,
      strikeCount: random(2) - 1,
      healCount: random(2) - 1,
    };
    this.attacks = attacks;
  }
  initControls = function (parentId) {
    this.elHP = $getElByQuery(`#${parentId} .text`);
    this.elProgressbar = $getElByQuery(`#${parentId} .health`);
    this.elAvatar = $getElByQuery(`#${parentId} .sprite`);
  };
  changeHP = function (count) {
    this.hp.current -= count;
    if (count >= 0) {
      this.hp.strikeCount += 1;
    } else {
      this.hp.healCount += 1;
    }
    if (this.hp.current < 0) this.hp.current = 0;
    if (this.hp.current > this.hp.total) this.hp.current = this.hp.total;
    this.elHP.innerText = this.hp.current + ' / ' + this.hp.total;
    this.elProgressbar.style.width = 100 * this.hp.current / this.hp.total + '%';
    if (this.hp.current <= 0) this.elAvatar.style.opacity = 0.1;
  };
  counterattack = function (enemy) {
    const attack = this.attacks[random(this.attacks.length - 1)];
    const damage = attack.minDamage - random(attack.maxDamage - attack.minDamage);
    enemy.changeHP.call(enemy, damage);
    renderLog('fight-logs', this, enemy, damage, '#fff');
  };
}

export class Pokemon extends Character {
  constructor(characterConfig) {
    super(characterConfig);
  }
  initDomData = function () {
    const { name: characterName, avatar, hp: { current: currentHp, total: totalHp } } = this;
    return [
      {
        id: 'lvl',
        tegName: 'span',
        innerText: 'Lv. 1',
        attributes: {
          class: 'lvl',
        },
        domTreeLevel: 0,
      }, {
        id: 'sprite',
        tegName: 'img',
        attributes: {
          class: 'sprite',
          src: avatar,
        },
        domTreeLevel: 0,
      }, {
        id: 'details',
        tegName: 'div',
        attributes: {
          class: 'details',
        },
        domTreeLevel: 0,
      }, {
        id: 'name',
        tegName: 'h2',
        innerText: characterName,
        attributes: {
          class: 'name',
        },
        domTreeLevel: 1,
        parent: 'details',
      }, {
        id: 'hp',
        tegName: 'div',
        attributes: {
          class: 'hp',
        },
        domTreeLevel: 1,
        parent: 'details',
      }, {
        id: 'bar',
        tegName: 'div',
        attributes: {
          class: 'bar',
        },
        domTreeLevel: 2,
        parent: 'hp',
      }, {
        id: 'health',
        tegName: 'div',
        attributes: {
          class: 'health',
          style: `width: ${100 * currentHp / totalHp}%;`,
        },
        domTreeLevel: 3,
        parent: 'bar',
      }, {
        id: 'text',
        tegName: 'span',
        innerText: `${currentHp} / ${totalHp}`,
        attributes: {
          class: 'text',
        },
        domTreeLevel: 2,
        parent: 'hp',
      }
    ];
  };
}

