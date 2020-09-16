import { random, $getElByQuery, randomInRange } from './functions.js';
import renderLog from './fight-log.js';

class Character {
  constructor({ id, name, img, type, hp, attacks }) {
    this.id = id;
    this.name = name;
    this.avatar = img;
    this.type = type;
    this.hp = {
      current: hp,
      total: hp,
      strikeCount: random(2) - 1,
      healCount: random(2) - 1,
      totalDamage: 0,
    };
    this.score = 0;
    this.attacks = attacks;
    this.$attackBtns = [];
  }
  initControls = function (parentId) {
    this.elHP = $getElByQuery(`#${parentId} .text`);
    this.elProgressbar = $getElByQuery(`#${parentId} .health`);
    this.elAvatar = $getElByQuery(`#${parentId} .sprite`);
    this.container = $getElByQuery(`#${parentId}`);
  };
  changeHP = function (count) {
    if (count > 0 && count < this.hp.current) {
      this.hp.totalDamage += count;
    } else if (count > 0 && count > this.hp.current) {
      this.hp.totalDamage += this.hp.current;
    }
    this.hp.current -= count;
    const hpCurrentPercent = 100 * this.hp.current / this.hp.total;
    if (count >= 0) {
      this.hp.strikeCount += 1;
    } else {
      this.hp.healCount += 1;
    }
    if (this.hp.current < 0) {
      this.hp.current = 0;
    } else if (this.hp.current > this.hp.total) {
      this.hp.current = this.hp.total;
    }
    this.elHP.innerText = this.hp.current + ' / ' + this.hp.total;
    this.elProgressbar.style.width = hpCurrentPercent + '%';
    this.elProgressbar.classList.remove('low', 'critical');
    if (hpCurrentPercent <= 0) {
      this.kill();
    } else if (hpCurrentPercent >= 20 && hpCurrentPercent < 60) {
      this.elProgressbar.classList.add('low');
    } else if (hpCurrentPercent < 20) {
      this.elProgressbar.classList.add('critical');
    }
  };
  counterattack = function (character, characterDamage) {
    if (this.hp.current > 0) {
      if (characterDamage === undefined) {
        const attack = this.attacks[random(this.attacks.length - 1)];
        characterDamage = randomInRange(attack.minDamage, attack.maxDamage);
      }
      character.changeHP.call(character, characterDamage);
      renderLog('fight-logs', this, character, characterDamage, '#fff');
    }
  };
  kill = function () {
    this.container.style.opacity = 0;
    this.elAvatar.style.maxWidth = 'none';
    this.elAvatar.style.top = '-700px';
    this.elAvatar.setAttribute('src', '../assets/bang.gif');
    // const $buttons = $getElByQueryAll('.control .button');
    // $buttons.forEach(element => {
    //   element.setAttribute("disabled", "true");
    // });
    if (this.player) {
      this.gameOver();
    } else {
      this.newEnemy();
    }
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

