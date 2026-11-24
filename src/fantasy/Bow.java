package fantasy;

public class Bow implements Equipable {
    @Override
    public void equip(Character character) {
        if (character instanceof Archer) {
            ((Archer) character).increaseRange(5);
            System.out.println(character.getName() + " équipe un arc : portée +5.");
        } else {
            System.out.println("L'arc est réservé à l'archer.");
        }
    }
}
