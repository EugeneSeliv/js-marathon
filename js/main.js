import POKEMONS from './pokemons.js';
import { Pokemon } from './characters.js';
import { STRIKEBUTTON } from './buttons.js';
import attackBtn from './attack-btn.js';
import { renderDomElement } from './functions.js';

function init() {
  const player1Container = 'character-1';
  const player2Container = 'character-2';
  const player1 = new Pokemon(POKEMONS[0]);
  const player2 = new Pokemon(POKEMONS[1]);
  renderDomElement(player1.initDomData(), player1Container);
  renderDomElement(player2.initDomData(), player2Container);
  player1.initControls(player1Container);
  player2.initControls(player2Container);
  player1.attacks.forEach(attack => {
    const btn = new attackBtn(attack, STRIKEBUTTON);
    btn.render('control');
    btn.addClickListener(player1, player2);
  });
}

init();

