(function () {
  $btnDamage = document.getElementById('btn-damage');
  $btnRecovery = document.getElementById('btn-recovery');

  const character = {
    name: 'Pikachu',
    defaultHP: 200,
    demageHP: 100,
    strikeCount: 0,
    healCount: 0,
    addStrikeCount,
    addHealCount,
    changeHP,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    avatar: document.getElementById('pikachu'),
  }

  const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    demageHP: 100,
    strikeCount: 0,
    healCount: 0,
    addStrikeCount,
    addHealCount,
    changeHP,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    avatar: document.getElementById('charmander'),
  }

  function changeHP(count) {
    this.demageHP -= count;
    if (this.demageHP < 0) this.demageHP = 0;
    if (this.demageHP > this.defaultHP) this.demageHP = this.defaultHP;
    this.elHP.innerText = this.demageHP + ' / ' + this.defaultHP;
    this.elProgressbar.style.width = 100 * this.demageHP / this.defaultHP + '%';
    if (this.demageHP <= 0) this.avatar.style.opacity = 0.1;
  }

  function random(num) {
    return Math.ceil(Math.random() * num);
  }

  function addStrikeCount() {
    this.strikeCount += 1;
  }

  function addHealCount() {
    this.healCount += 1;
  }

  function init() {
    changeHP.call(character, 0);
    changeHP.call(enemy, 0);
    character.strikeCount = random(2) - 1;
    character.healCount = random(2) - 1;
    enemy.strikeCount = random(2) - 1;
    enemy.healCount = random(2) - 1;
    $btnDamage.addEventListener('click', function () {
      if (character.strikeCount <= enemy.strikeCount) {
        character.changeHP(random(20));
        character.addStrikeCount();
      } else {
        enemy.changeHP(random(20));
        enemy.addStrikeCount();
      }
      if (character.demageHP <= 0 || enemy.demageHP <= 0) {
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
      if (character.healCount <= enemy.healCount) {
        character.changeHP(- random(15));
        character.addHealCount();
      } else {
        enemy.changeHP(- random(15));
        enemy.addHealCount();
      }
    });
  }

  init();
})()