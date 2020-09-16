import { Pokemon } from './characters.js';
import { STRIKEBUTTON } from './buttons.js';
import AttackBtn from './attack-btn.js';
import Game from './game.js';
import { renderDomElement, random } from './functions.js';

function init() {
  // const player1Container = 'character-1';
  // const player2Container = 'character-2';
  // let player1 = new Pokemon(pokemons[random(pokemons.length) - 1]);
  // let player2 = new Pokemon(pokemons[random(pokemons.length) - 1]);
  // renderDomElement(player1.initDomData(), player1Container);
  // renderDomElement(player2.initDomData(), player2Container);
  // player1.initControls(player1Container);
  // player2.initControls(player2Container);
  // player1.attacks.forEach(attack => {
  //   const btn = new AttackBtn(attack, STRIKEBUTTON);
  //   btn.render('control');
  //   btn.addClickListener(player1, player2);
  // });

  const game = new Game();
  game.startGame();

}

init();

