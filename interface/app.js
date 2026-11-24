// Version JavaScript des classes POO du projet (mêmes règles que le code Java).

/* ---------- 1. Classe de base abstraite ---------- */
class Character {
  constructor(name, health) {
    if (new.target === Character) {
      throw new Error("Character est abstraite : utilise Warrior, Mage ou Archer.");
    }
    this.name = name;
    this.health = health;
    this.level = 1;
  }

  isAlive() {
    return this.health > 0;
  }

  // Bonus propre à chaque classe (à redéfinir dans les classes filles).
  getBonusDamage() {
    throw new Error("getBonusDamage() doit être redéfinie.");
  }

  attack(target) {
    const damage = 10 + this.level + this.getBonusDamage();
    const message = `${this.name} attaque ${target.name} (${damage} dégâts).`;
    return [message, target.takeDamage(damage)];
  }

  takeDamage(amount) {
    this.health = Math.max(0, this.health - amount);
    return `${this.name} a maintenant ${this.health} points de vie.`;
  }

  increaseLevel() {
    this.level++;
  }
}

/* ---------- 2. Classes de héros ---------- */
class Warrior extends Character {
  constructor(name) {
    super(name, 120);
    this.strength = 15;
  }

  getBonusDamage() {
    return Math.floor(this.strength / 2);
  }

  charge(target) {
    const damage = this.strength * 2;
    return [`${this.name} charge ${target.name} (${damage} dégâts).`, target.takeDamage(damage)];
  }
}

class Mage extends Character {
  constructor(name) {
    super(name, 80);
    this.mana = 30;
  }

  getBonusDamage() {
    return Math.floor(this.mana / 4);
  }

  castSpell(target) {
    if (this.mana < 10) {
      return [`${this.name} n'a pas assez de mana.`];
    }
    this.mana -= 10;
    return [`${this.name} lance un sort sur ${target.name} (25 dégâts).`, target.takeDamage(25)];
  }
}

class Archer extends Character {
  constructor(name) {
    super(name, 90);
    this.range = 20;
  }

  getBonusDamage() {
    return Math.floor(this.range / 2);
  }

  shootArrow(target) {
    return [`${this.name} tire une flèche sur ${target.name} (${this.range} dégâts).`, target.takeDamage(this.range)];
  }
}

/* ---------- 3. Équipements (interface Equipable) ---------- */
// JavaScript n'a pas de mot-clé "interface" : chaque équipement fournit equip(character).
class Sword {
  equip(character) {
    if (!(character instanceof Warrior)) return "L'épée est réservée au guerrier.";
    character.strength += 5;
    return `${character.name} équipe une épée : force +5.`;
  }
}

class Wand {
  equip(character) {
    if (!(character instanceof Mage)) return "La baguette est réservée au mage.";
    character.mana += 10;
    return `${character.name} équipe une baguette : mana +10.`;
  }
}

class Bow {
  equip(character) {
    if (!(character instanceof Archer)) return "L'arc est réservé à l'archer.";
    character.range += 5;
    return `${character.name} équipe un arc : portée +5.`;
  }
}

/* ---------- 4. GameManager (singleton) ---------- */
class GameManager {
  static #instance = null;

  static getInstance() {
    if (!GameManager.#instance) GameManager.#instance = new GameManager();
    return GameManager.#instance;
  }

  constructor() {
    if (GameManager.#instance) throw new Error("Utilise GameManager.getInstance().");
    this.characters = [];
  }

  createCharacter(type, name) {
    const classes = { warrior: Warrior, mage: Mage, archer: Archer };
    const HeroClass = classes[type.toLowerCase()];
    if (!HeroClass) throw new Error(`Type inconnu : ${type}`);
    const hero = new HeroClass(name);
    this.characters.push(hero);
    return hero;
  }

  startBattle(hero1, hero2) {
    if (hero1 === hero2) return ["Un héros ne peut pas se battre contre lui-même."];
    if (!hero1.isAlive() || !hero2.isAlive()) return ["Les deux héros doivent être en vie pour combattre."];

    const log = [`--- Combat : ${hero1.name} contre ${hero2.name} ---`];
    while (hero1.isAlive() && hero2.isAlive()) {
      log.push(...hero1.attack(hero2));
      if (hero2.isAlive()) log.push(...hero2.attack(hero1));
    }
    const winner = hero1.isAlive() ? hero1 : hero2;
    winner.increaseLevel();
    log.push(`Vainqueur : ${winner.name} ! Il passe au niveau ${winner.level}.`);
    return log;
  }
}

/* ---------- Interface HTML ---------- */
const game = GameManager.getInstance();
const equipments = { warrior: new Sword(), mage: new Wand(), archer: new Bow() };
const labels = { warrior: "Guerrier", mage: "Mage", archer: "Archer" };

const createForm = document.querySelector("#create-form");
const heroList = document.querySelector("#heroes");
const fighter1 = document.querySelector("#fighter-1");
const fighter2 = document.querySelector("#fighter-2");
const log = document.querySelector("#log");

function typeOf(hero) {
  if (hero instanceof Warrior) return "warrior";
  if (hero instanceof Mage) return "mage";
  return "archer";
}

function statOf(hero) {
  if (hero instanceof Warrior) return `Force : ${hero.strength}`;
  if (hero instanceof Mage) return `Mana : ${hero.mana}`;
  return `Portée : ${hero.range}`;
}

function showLog(lines) {
  log.textContent = lines.join("\n");
}

createForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#hero-name").value.trim();
  const type = document.querySelector("#hero-type").value;
  if (!name) return;
  const hero = game.createCharacter(type, name);
  showLog([`${hero.name} (${labels[type]}) a été créé.`]);
  createForm.reset();
  render();
});

heroList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-index]");
  if (!button) return;
  const hero = game.characters[Number(button.dataset.index)];
  showLog([equipments[typeOf(hero)].equip(hero)]);
  render();
});

document.querySelector("#battle-button").addEventListener("click", () => {
  if (game.characters.length < 2) {
    showLog(["Crée au moins deux héros pour lancer un combat."]);
    return;
  }
  const hero1 = game.characters[Number(fighter1.value)];
  const hero2 = game.characters[Number(fighter2.value)];
  showLog(game.startBattle(hero1, hero2));
  render();
});

function render() {
  const heroes = game.characters;
  if (heroes.length === 0) {
    heroList.innerHTML = '<p class="empty">Aucun héros pour le moment.</p>';
  } else {
    heroList.innerHTML = heroes.map((hero, index) => `
      <article class="hero${hero.isAlive() ? "" : " ko"}">
        <h3>${escapeText(hero.name)}</h3>
        <p>${labels[typeOf(hero)]} · niveau ${hero.level}</p>
        <p>Vie : ${hero.isAlive() ? hero.health : "K.O."}</p>
        <p>${statOf(hero)}</p>
        <button class="secondary" type="button" data-index="${index}">Équiper</button>
      </article>`).join("");
  }

  // Met à jour les listes de choix du combat en gardant la sélection actuelle.
  const options = heroes.map((hero, index) =>
    `<option value="${index}">${escapeText(hero.name)}</option>`).join("");
  const previous = [fighter1.value, fighter2.value];
  fighter1.innerHTML = options;
  fighter2.innerHTML = options;
  fighter1.value = previous[0] || "0";
  if (previous[1] && previous[1] !== fighter1.value) {
    fighter2.value = previous[1];
  } else {
    fighter2.value = heroes.length > 1 && fighter1.value === "0" ? "1" : "0";
  }
}

function escapeText(value) {
  const element = document.createElement("span");
  element.textContent = value;
  return element.innerHTML;
}
