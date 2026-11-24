package fantasy;

public class Sword implements Equipable {
    @Override
    public void equip(Character character) {
        if (character instanceof Warrior) {
            ((Warrior) character).increaseStrength(5);
            System.out.println(character.getName() + " équipe une épée : force +5.");
        } else {
            System.out.println("L'épée est réservée au guerrier.");
        }
    }
}
