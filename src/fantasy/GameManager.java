package fantasy;

import java.util.ArrayList;
import java.util.List;

/** Gestionnaire unique du jeu (singleton). */
public class GameManager {
    private static final GameManager INSTANCE = new GameManager();
    private final List<Character> characters = new ArrayList<>();

    private GameManager() {
    }

    public static GameManager getInstance() {
        return INSTANCE;
    }

    public Character createCharacter(String type, String name) {
        Character character;
        switch (type.toLowerCase()) {
            case "warrior":
                character = new Warrior(name);
                break;
            case "mage":
                character = new Mage(name);
                break;
            case "archer":
                character = new Archer(name);
                break;
            default:
                throw new IllegalArgumentException("Type inconnu : " + type);
        }
        characters.add(character);
        return character;
    }

    public List<Character> getCharacters() {
        return new ArrayList<>(characters);
    }

    public void startBattle(Character hero1, Character hero2) {
        if (hero1 == hero2) {
            System.out.println("Un héros ne peut pas se battre contre lui-même.");
            return;
        }
        if (!hero1.isAlive() || !hero2.isAlive()) {
            System.out.println("Les deux héros doivent être en vie pour combattre.");
            return;
        }
        System.out.println("\n--- Combat : " + hero1.getName() + " contre " + hero2.getName() + " ---");
        while (hero1.isAlive() && hero2.isAlive()) {
            hero1.attack(hero2);
            if (hero2.isAlive()) {
                hero2.attack(hero1);
            }
        }
        Character winner = hero1.isAlive() ? hero1 : hero2;
        winner.increaseLevel();
        System.out.println("Vainqueur : " + winner.getName() + " ! Il passe au niveau " + winner.getLevel() + ".");
    }
}
