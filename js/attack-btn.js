import renderLog from './fight-log.js';
import {
  numberLengthNormalize,
  clickCounterGenerator,
  renderDomElement,
  $getElById,
  getDamge,
  randomInRange
} from './functions.js';

class AttackBtn {
  constructor(props, domData) {
    this.domData = domData;
    this.domData[0].attributes.id = props.name.split(' ').join('-');
    this.domData[1].innerText = `${numberLengthNormalize(props.maxCount, 3)}`;
    this.domData[2].innerText = props.name;
    this.id = props.id;
    this.maxCount = props.maxCount;
    this.maxDamage = props.maxDamage;
    this.minDamage = props.minDamage;
    this.damageApiUrl = 'https://reactmarathon-api.netlify.app/api/fight?';
  }
  render = function (parentId) {
    renderDomElement(this.domData, parentId);
    this.$dom = $getElById(this.domData[0].attributes.id);
    this.clickCounter = clickCounterGenerator(this.maxCount, this.$dom);
  };
  addClickListener = function (character, enemy) {
    const attack = {
      payer1id: character.id,
      player2id: enemy.id,
      payer1AttackId: this.id,
    };
    const maxDamage = this.maxDamage;
    const minDamage = this.minDamage;
    const damageAction = async () => {
      const damage = await getDamge(this.damageApiUrl, attack);
      let characterDamage, enemyDamage;
      if (damage) {
        enemyDamage = damage.kick.player2;
        characterDamage = damage.kick.player1;
      } else {
        enemyDamage = randomInRange(minDamage, maxDamage);
      }
      enemy.changeHP.call(enemy, enemyDamage);
      setTimeout(() => enemy.counterattack(character, characterDamage), 500);
      this.clickCounter();
      renderLog('fight-logs', character, enemy, enemyDamage, '#fdf502');
    };
    this.$dom.addEventListener('click', damageAction);
    this.clickAction = damageAction;
  }
}

export default AttackBtn;