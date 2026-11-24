package fantasy;

public class Main {
    public static void main(String[] args) {
        GameManager game = GameManager.getInstance();

        // 1. Création des héros
        Warrior warrior = (Warrior) game.createCharacter("warrior", "Ragnar");
        Mage mage = (Mage) game.createCharacter("mage", "Luna");
        Archer archer = (Archer) game.createCharacter("archer", "Robin");

        // 2. Équipement des objets
        new Sword().equip(warrior);
        new Wand().equip(mage);
        new Bow().equip(archer);

        // 3. Attaques spéciales
        warrior.charge(mage);
        mage.castSpell(warrior);
        archer.shootArrow(warrior);

        // 4. Combat entre deux héros
        game.startBattle(warrior, mage);
    }
}
