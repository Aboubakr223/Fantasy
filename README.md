# Fantasy — Gestion de personnages en POO

Système de gestion de héros pour un jeu vidéo fantasy, réalisé dans le cadre d'un exercice de **programmation orientée objet** .

Le projet met en œuvre les notions fondamentales de la POO : **classe abstraite**, **héritage**, **polymorphisme**, **interface**, **encapsulation** et **singleton**.

Il comprend deux parties :

- un **programme Java** (console) qui implémente le modèle objet et joue une simulation complète ;
- une **interface web HTML / CSS / JavaScript** qui reprend les mêmes classes et permet d'interagir avec elles dans le navigateur.

## Structure du dépôt

```text
fantasy-java/
├── README.md                  Documentation du projet
├── src/
│   └── fantasy/               Package Java du jeu
│       ├── Character.java     Classe abstraite de base des héros
│       ├── Warrior.java       Héros guerrier (force, charge)
│       ├── Mage.java          Héros mage (mana, sort)
│       ├── Archer.java        Héros archer (portée, flèche)
│       ├── Equipable.java     Interface des équipements
│       ├── Sword.java         Épée : +5 force (guerrier)
│       ├── Wand.java          Baguette : +10 mana (mage)
│       ├── Bow.java           Arc : +5 portée (archer)
│       ├── GameManager.java   Singleton : création des héros et combats
│       └── Main.java          Point d'entrée : simulation complète
├── interface/
│   ├── index.html             Structure de la page web
│   ├── style.css              Mise en forme de la page
│   └── app.js                 Classes POO en JavaScript + logique de la page
└── uml/
    └── fantasy.xmi            Diagramme de classes UML (format XMI)
```

---

## Sommaire

- [Résumé de lobjectif]
- [Rôle de chaque fichier]
- [Installation et lancement]
- [Exemple d'exécution]
- [Règles du jeu]
- [Correspondance avec l'objectif]

---

## Résumé de l'objectif

Dans le cadre de la création d'un nouveau jeu vidéo, il faut concevoir un **système de gestion des héros** permettant :

- la création de personnages uniques avec leurs caractéristiques et pouvoirs ;
- la gestion d'objets que les héros peuvent équiper ;
- l'organisation de combats entre héros.

### 1. Classe de base `Character`

Classe **abstraite** servant de modèle commun à tous les héros. Elle ne peut pas être instanciée directement.

| Élément | Description |
|---|---|
| `name` | Nom du héros |
| `health` | Points de vie |
| `level` | Niveau du héros (1 par défaut) |
| `attack(target)` | Inflige des dégâts à un adversaire |
| `takeDamage(amount)` | Réduit les points de vie du héros |

### 2. Classes de héros

Trois classes héritent de `Character` :

| Classe | Propriété spécifique | Méthode spéciale |
|---|---|---|
| `Warrior` | `strength` (force) | `charge()` — attaque puissante |
| `Mage` | `mana` (points de magie) | `castSpell()` — lance un sort |
| `Archer` | `range` (portée) | `shootArrow()` — attaque à distance |

### 3. Équipements

Une interface `Equipable` représente les objets que les héros peuvent utiliser, avec la méthode `equip(character)` qui modifie les caractéristiques du héros.

| Équipement | Effet |
|---|---|
| Épée (`Sword`) | Augmente la force d'un guerrier |
| Baguette (`Wand`) | Augmente la mana d'un mage |
| Arc (`Bow`) | Augmente la portée d'un archer |

### 4. Gestionnaire central `GameManager`

Un **singleton** qui coordonne le jeu :

- `characters` : liste de tous les héros créés ;
- `createCharacter(type, name)` : crée un héros (`Warrior`, `Mage` ou `Archer`) ;
- `startBattle(hero1, hero2)` : simule un combat entre deux héros.

### Livrables 

1. Les classes `Character`, `Warrior`, `Mage` et `Archer`.
2. L'interface `Equipable` et plusieurs équipements.
3. Le singleton `GameManager`.
4. Une simulation finale : création de héros, équipement d'objets, combat.
5. Une interface HTML / CSS permettant d'interagir avec le code POO.

> **Note :** l'énoncé d'origine est rédigé pour JavaScript. Le modèle objet est ici implémenté en **Java**, et reproduit à l'identique en **JavaScript** pour l'interface web.




## Rôle de chaque fichier

### Programme Java — `src/fantasy/`

| Fichier | Rôle |
|---|---|
| `Character.java` | Classe **abstraite** commune à tous les héros. Contient `name`, `health` et `level` (encapsulés), les méthodes `attack()` et `takeDamage()`, ainsi que la méthode abstraite `getBonusDamage()` que chaque classe fille redéfinit. |
| `Warrior.java` | Hérite de `Character`. Ajoute la **force** (`strength`) et l'attaque spéciale `charge()`, qui inflige le double de la force. 120 PV au départ. |
| `Mage.java` | Hérite de `Character`. Ajoute la **mana** et la méthode `castSpell()`, qui consomme 10 de mana pour infliger 25 dégâts. 80 PV au départ. |
| `Archer.java` | Hérite de `Character`. Ajoute la **portée** (`range`) et la méthode `shootArrow()`, dont les dégâts dépendent de la portée. 90 PV au départ. |
| `Equipable.java` | **Interface** définissant le contrat `equip(Character character)` que tout équipement doit respecter. |
| `Sword.java` | Implémente `Equipable`. Augmente la force d'un guerrier de 5 ; refusée aux autres classes. |
| `Wand.java` | Implémente `Equipable`. Augmente la mana d'un mage de 10 ; refusée aux autres classes. |
| `Bow.java` | Implémente `Equipable`. Augmente la portée d'un archer de 5 ; refusé aux autres classes. |
| `GameManager.java` | **Singleton** (`getInstance()`) qui conserve la liste des héros, les crée via `createCharacter(type, name)` et organise les combats via `startBattle(hero1, hero2)`. Le vainqueur gagne un niveau. |
| `Main.java` | **Point d'entrée** du programme. Crée un guerrier, un mage et un archer, les équipe, utilise leurs attaques spéciales puis lance un combat. |

### Interface web — `interface/`

| Fichier | Rôle |
|---|---|
| `index.html` | Structure de la page : formulaire de création de héros, liste des héros avec bouton « Équiper », choix des deux combattants et journal du combat. |
| `style.css` | Mise en forme de la page (cartes, formulaires, boutons, affichage adapté aux petits écrans). |
| `app.js` | Reprend en JavaScript **les mêmes classes que le programme Java** (`Character`, `Warrior`, `Mage`, `Archer`, `Sword`, `Wand`, `Bow`, `GameManager`) et relie ces objets aux actions de la page. |

### Modélisation — `uml/`

| Fichier | Rôle |
|---|---|
| `fantasy.xmi` | Diagramme de classes UML au format XMI, importable dans un outil de modélisation (Modelio, StarUML, Eclipse Papyrus…). |



## Installation et lancement

### Prérequis

- **JDK 17 ou supérieur** (`java` et `javac` disponibles dans le terminal) ;
- un navigateur web récent pour l'interface.

### Programme Java

Depuis la racine du dépôt :

```bash
# Compilation
javac -encoding UTF-8 -d out src/fantasy/*.java

# Exécution
java -cp out fantasy.Main
```

> Sous Windows, si les accents s'affichent mal dans le terminal, lancez :
> `java -Dstdout.encoding=UTF-8 -cp out fantasy.Main`

### Interface web

Ouvrez simplement `interface/index.html` dans un navigateur.

Vous pouvez aussi la servir avec le serveur web inclus dans le JDK (Java 18+) :

```bash
java -m jdk.httpserver -p 8000 -d "$(pwd)/interface"
```

puis ouvrez <http://localhost:8000>.

---

## Exemple d'exécution

```text
Ragnar équipe une épée : force +5.
Luna équipe une baguette : mana +10.
Robin équipe un arc : portée +5.
Ragnar charge Luna (40 dégâts).
Luna a maintenant 40 points de vie.
Luna lance un sort sur Ragnar (25 dégâts).
Ragnar a maintenant 95 points de vie.
Robin tire une flèche sur Ragnar (25 dégâts).
Ragnar a maintenant 70 points de vie.

--- Combat : Ragnar contre Luna ---
Ragnar attaque Luna (21 dégâts).
Luna a maintenant 19 points de vie.
Luna attaque Ragnar (18 dégâts).
Ragnar a maintenant 52 points de vie.
Ragnar attaque Luna (21 dégâts).
Luna a maintenant 0 points de vie.
Vainqueur : Ragnar ! Il passe au niveau 2.
```

---

## Règles du jeu

| Héros | PV de départ | Statistique | Valeur de départ | Bonus d'attaque |
|---|---|---|---|---|
| Guerrier | 120 | Force | 15 | force / 2 |
| Mage | 80 | Mana | 30 | mana / 4 |
| Archer | 90 | Portée | 20 | portée / 2 |

- **Attaque de base :** `10 + niveau + bonus de la classe`.
- **Combat :** le premier héros attaque, le second riposte, jusqu'à ce que l'un des deux tombe à 0 PV.
- **Victoire :** le vainqueur gagne un niveau.
- Un héros ne peut pas se battre contre lui-même, et un héros K.O. ne peut plus combattre.

---

## Correspondance avec l'objectif

| Exigence | Implémentation |
|---|---|
| Classe abstraite `Character` | `Character.java` (`abstract`), `app.js` (erreur si instanciée directement) |
| `Warrior`, `Mage`, `Archer` | `Warrior.java`, `Mage.java`, `Archer.java` |
| Interface `Equipable` + équipements | `Equipable.java`, `Sword.java`, `Wand.java`, `Bow.java` |
| Singleton `GameManager` | `GameManager.java` (constructeur privé + `getInstance()`) |
| Simulation finale | `Main.java` |
| Interface HTML / CSS | `interface/index.html`, `style.css`, `app.js` |
