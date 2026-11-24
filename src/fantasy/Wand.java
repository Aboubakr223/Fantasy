package fantasy;

public class Wand implements Equipable {
    @Override
    public void equip(Character character) {
        if (character instanceof Mage) {
            ((Mage) character).increaseMana(10);
            System.out.println(character.getName() + " équipe une baguette : mana +10.");
        } else {
            System.out.println("La baguette est réservée au mage.");
        }
    }
}
