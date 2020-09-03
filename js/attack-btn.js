import renderLog from './fight-log.js';
import {
  numberLengthNormalize,
  clickCounterGenerator,
  renderDomElement,
  $getElById,
  random
} from './functions.js';

class attackBtn {
  constructor(props, domData) {
    this.domData = domData;
    this.domData[0].attributes.id = props.name.split(' ').join('-');
    this.domData[1].innerText = `${numberLengthNormalize(props.maxCount, 3)}`;
    this.domData[2].innerText = props.name;
    this.maxCount = props.maxCount;
    this.maxDamage = props.maxDamage;
    this.minDamage = props.minDamage;
  }
  render = function (parentId) {
    renderDomElement(this.domData, parentId);
    this.$dom = $getElById(this.domData[0].attributes.id);
  };
  addClickListener = function (character, enemy) {
    const maxDamage = this.maxDamage;
    const minDamage = this.minDamage;
    const clickCounter = clickCounterGenerator(this.maxCount, this.$dom);
    this.$dom.addEventListener('click', function () {
      const damage = minDamage - random(maxDamage - minDamage);
      clickCounter();
      enemy.changeHP.call(enemy, damage);
      renderLog('fight-logs', character, enemy, damage, '#fdf502');
      setTimeout(() => enemy.counterattack(character), 500);
    });
  }
}

export default attackBtn;