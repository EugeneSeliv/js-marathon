$btnDamage = document.getElementById('btn-damage');
$btnRecovery = document.getElementById('btn-recovery');

const character = {
  name: 'Pikachu',
  defaultHP: 100,
  demageHP: 100,
  strikeCount: 0,
  healCount: 0,
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
  elHP: document.getElementById('health-enemy'),
  elProgressbar: document.getElementById('progressbar-enemy'),
  avatar: document.getElementById('charmander'),
}

function renderHPLife(person) {
  person.elHP.innerText = person.demageHP + ' / ' + person.defaultHP;
}

function renderProgressburHP(person) {
  person.elProgressbar.style.width = person.demageHP + '%';
}

function renderHP(person) {
  renderHPLife(person);
  renderProgressburHP(person);
  if (person.demageHP <= 0) person.avatar.style.opacity = 0.2;
}

function changeHP(count, person) {
  person.demageHP -= count;
  if (person.demageHP < 0) person.demageHP = 0;
  if (person.demageHP > 100) person.demageHP = 100;
  renderHP(person);
}

function random(num) {
  return Math.ceil(Math.random() * num);
}

function strikeCount(person) {
  person.strikeCount += 1;
}

function healCount(person) {
  person.healCount += 1;
}

function init() {
  renderHP(character);
  renderHP(enemy);
  character.strikeCount = random(2) - 1;
  character.healCount = random(2) - 1;
  enemy.strikeCount = random(2) - 1;
  enemy.healCount = random(2) - 1;
  $btnDamage.addEventListener('click', function () {
    if (character.strikeCount <= enemy.strikeCount) {
      changeHP(random(20), character);
      strikeCount(character);
    } else {
      changeHP(random(20), enemy);
      strikeCount(enemy);
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
      changeHP(- random(15), character);
      healCount(character);
    } else {
      changeHP(- random(15), enemy);
      healCount(enemy);
    }
  });
}

init();