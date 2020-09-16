import {
  getPokemonsData,
  renderDomElement,
  createPokemonWrapper,
  removeChild,
  $getElByQuery,
  random,
  randomInRange,
  runningNumbers
} from './functions.js';
import AttackBtn from './attack-btn.js';
import { Pokemon } from './characters.js';
import { STRIKEBUTTON } from './buttons.js';

class Game {
  constructor() {
    this.serverApiUrl = 'https://reactmarathon-api.netlify.app/api/';
    this.pokemonById = 'https://reactmarathon-api.netlify.app/api/pokemons?id=';
    this.randomPokemon = 'https://reactmarathon-api.netlify.app/api/pokemons?random=true';
  }
  startGame = async () => {
    document.body.removeEventListener('click', this.startGame);
    this.clearDom();
    this.pokemons = await getPokemonsData(`${this.serverApiUrl}pokemons`);
    this.createBattlefield('Choose pokemon for start!!!');
    this.pokemons.forEach(element => {
      const pokemon = this.createPokemon('', element.id, 'control');
      pokemon.$wrapper.style.cursor = 'pointer';
      pokemon.$wrapper.addEventListener('click', () => {
        this.resetGame(pokemon.$wrapper.pokemonId);
      });
    });
  }
  resetGame = function (characterId) {
    this.clearDom();
    this.character = this.createPokemon('character', characterId);
    this.character.player = true;
    this.createBattlefield('Fight!!!');
    this.enemy = this.createPokemon('enemy', this.randomEnemyId());
    this.enemy.player = false;
    this.character.attackBtns = [];
    this.character.attacks.forEach(attack => {
      const btn = new AttackBtn(attack, STRIKEBUTTON);
      btn.render('control');
      btn.addClickListener(this.character, this.enemy);
      this.character.attackBtns.push(btn);
    });
  }
  clearDom = function () {
    removeChild('.playground');
    removeChild('.control');
    removeChild('.logs-list');
  }
  createBattlefield = function (message) {
    const $playground = $getElByQuery('.playground');
    const $battlefield = document.createElement('div');
    $battlefield.setAttribute('id', `battlefield`);
    $battlefield.setAttribute('class', `battlefield`);
    $playground.appendChild($battlefield);
    $battlefield.innerText = message;
  }
  createPokemon = function (wrapperClass, pokemonId, container = 'playground') {
    const pokemonData = this.pokemons.find(item => item.id === pokemonId);
    const pokemon = new Pokemon(pokemonData);
    pokemon.gameOver = this.gameOver;
    pokemon.newEnemy = this.newEnemy;
    const $pokemonWrapper = createPokemonWrapper(container, pokemonData.id, `pokemon ${wrapperClass}`);
    const [{ value: pokemonWrapperId }] = $pokemonWrapper.attributes;
    renderDomElement(pokemon.initDomData(), pokemonWrapperId);
    pokemon.initControls(pokemonWrapperId);
    pokemon.$wrapper = $pokemonWrapper;
    return pokemon;
  }
  gameOver = () => {
    const battlefield = $getElByQuery('#battlefield');
    battlefield.innerHTML = `Your score:&nbsp;
      <b class = "score red">${this.character.score}</b>
      <b class="red">&#36;</b><br>
      <span class="fight">GAME OVER!!!</span><br>
      <span class="try-again">Click and try again!</span>`;
    runningNumbers($getElByQuery('#battlefield .score'), 2000);
    document.body.addEventListener('click', this.startGame);
  }
  newEnemy = () => {
    this.characterScore();
    setTimeout(() => {
      this.enemy.$wrapper.remove();
      this.enemy = this.createPokemon('enemy', this.randomEnemyId());
      this.enemy.player = false;
      this.enemy.$wrapper.style.opacity = 0;
      this.character.attackBtns.forEach(btn => {
        btn.$dom.removeEventListener('click', btn.clickAction);
        btn.addClickListener(this.character, this.enemy);
        btn.$dom.clickLimit = randomInRange(btn.$dom.clickLimit, btn.maxCount) + 1;
        btn.clickCounter();
        removeChild('.logs-list');
      });
    }, 1500);
    setTimeout(() => {
      this.enemy.$wrapper.style.opacity = 1;
    }, 1700);
    this.character.changeHP(random(this.character.hp.current - this.character.hp.total));
  }
  randomEnemyId = () => {
    let enemyId;
    do {
      enemyId = this.pokemons[random(this.pokemons.length) - 1].id;
    } while (this.character.id === enemyId);
    return enemyId;
  };
  characterScore = () => {
    this.character.score += this.enemy.hp.totalDamage - this.character.hp.totalDamage;
    this.character.hp.totalDamage = 0;
    const battlefield = $getElByQuery('#battlefield');
    battlefield.innerHTML = `Score:&nbsp;
      <b class = "score red">${this.character.score}</b>
      <b class="red">&#36;</b>
      <br><span class="fight">Fight!!!</span>`;
    runningNumbers($getElByQuery('#battlefield .score'), 2000);
  }
}

function init() {
  const game = new Game();
  game.startGame();
}

init();





