(function () {

  const CHARACTERS = [
    {
      name: 'Pikachu',
      type: 'electric',
      weakness: ['fighting', 'water', 'some'],
      resistence: ['steel'],
      defaultHP: 100,
      avatar: './assets/pikachu.png',
    }, {
      name: 'Charmander',
      type: 'electric',
      weakness: ['fighting', 'water', 'some'],
      resistence: ['steel'],
      defaultHP: 100,
      avatar: './assets/charmander.png',
    }
  ];

  function initCharacters(characters) {
    return characters.map(element => {
      const { name, type, weakness, resistence, defaultHP, avatar } = element;
      return {
        name: name,
        avatar,
        type,
        weakness,
        resistence,
        hp: {
          current: defaultHP,
          total: defaultHP,
          strikeCount: random(2) - 1,
          healCount: random(2) - 1,
        },
        initCharacterDomData,
        changeHP,
        createControlsLink: function (parentId) {
          this.elHP = $getElByQuery(`#${parentId} .text`);
          this.elProgressbar = $getElByQuery(`#${parentId} .health`);
          this.avatar = $getElByQuery(`#${parentId} .sprite`);
        },
      };
    });
  }

  function changeHP(count) {
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
    if (this.hp.current <= 0) this.avatar.style.opacity = 0.1;
  }

  function createDomElement(element) {
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

  function initCharacterDomData() {
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
  }

  function renderDomElement(domElementsData, parentId, direction = true) {
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

  function init() {
    const characters = initCharacters(CHARACTERS);
    renderDomElement(characters[0].initCharacterDomData(), 'character-1');
    renderDomElement(characters[1].initCharacterDomData(), 'character-2');
    characters[0].createControlsLink('character-1');
    characters[1].createControlsLink('character-2');
    $btnDamage = $getElById('btn-damage');
    $btnRecovery = $getElById('btn-recovery');
    const character = characters[0];
    const enemy = characters[1];
    const allStrikeCounter = counterGenerator();

    $btnDamage.addEventListener('click', function () {
      if (character.hp.strikeCount <= enemy.hp.strikeCount) {
        const damage = random(20);
        character.changeHP(damage);
        renderLog('fight-logs', generateLog(character, enemy, damage), allStrikeCounter());
      } else {
        const damage = random(20);
        enemy.changeHP(damage);
        renderLog('fight-logs', generateLog(enemy, character, damage), allStrikeCounter());
      }
      if (character.hp.current <= 0 || enemy.hp.current <= 0) {
        $btnDamage.disabled = true;
        $btnRecovery.disabled = true;
        $btnDamage.style.opacity = 0.2;
        $btnRecovery.style.opacity = 0.2;
        setTimeout(() => {
          alert('GAME OVER');
        }, 0);
      }
    });
    $btnRecovery.addEventListener('click', function () {
      if (character.hp.healCount <= enemy.hp.healCount) {
        character.changeHP(- random(15));
      } else {
        enemy.changeHP(- random(15));
      }
    });

    addButtonsClickLimit('.button', [5, 7]);

  }

  function eventListenerGenerator(eventName, nodeList, handler) {
    nodeList.forEach(($element) => {
      $element.addEventListener(eventName, () => handler($element));
    });
  }

  function addButtonsClickLimit(query, limitsArray) {
    const $buttons = $getElByQueryAll(query);
    $buttons.forEach(($btn, index) => {
      $btn.clickLimit = limitsArray[index];
      $btn.children[0].innerText = limitsArray[index];
    });
    eventListenerGenerator('click', $buttons, function ($element) {
      --$element.clickLimit;
      $element.children[0].innerText = $element.clickLimit;
      console.log($element.clickLimit);
      if ($element.clickLimit <= 0) $element.disabled = true;
    });
  }

  function random(num) {
    return Math.ceil(Math.random() * num);
  }

  function $getElById(id) {
    return document.getElementById(id);
  }

  function $getElByQuery(selector) {
    return document.querySelector(selector);
  }

  function $getElByQueryAll(selector) {
    return document.querySelectorAll(selector);
  }

  function counterGenerator() {
    let accumulator = 0;
    return (increment = 1) => accumulator += increment;
  }

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

  function renderLog(listId, logText, allStrikeCount) {
    const [damageHp, text] = logText;
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

  init();

})()