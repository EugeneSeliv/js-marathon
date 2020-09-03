
import POKEMONS from './pokemons.js';
import { Pokemon } from './characters.js';
import renderLog from './fight-log.js';
import {
  random, $getElById,
  counterGenerator,
  renderDomElement,
  addButtonsClickLimit
} from './functions.js';

const BUTTONS = [20, 15];

function init() {
  const player1Container = 'character-1';
  const player2Container = 'character-2';
  const player1 = new Pokemon(POKEMONS[0]);
  const player2 = new Pokemon(POKEMONS[1]);
  renderDomElement(player1.initDomData(), player1Container);
  renderDomElement(player2.initDomData(), player2Container);
  player1.initControls(player1Container);
  player2.initControls(player2Container);

  const $btnDamage = $getElById('btn-damage');
  const $btnRecovery = $getElById('btn-recovery');
  const character = player1;
  const enemy = player2;
  addButtonsClickLimit('.button', BUTTONS);
  const allStrikeCounter = counterGenerator();

  $btnDamage.addEventListener('click', function () {
    if (character.hp.strikeCount <= enemy.hp.strikeCount) {
      const damage = random(20);
      character.changeHP(damage);
      renderLog('fight-logs', character, enemy, damage, allStrikeCounter());
    } else {
      const damage = random(20);
      enemy.changeHP(damage);
      renderLog('fight-logs', enemy, character, damage, allStrikeCounter());
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
}

init();

