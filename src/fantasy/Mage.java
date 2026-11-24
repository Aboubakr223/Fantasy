package fantasy;

public class Mage extends Character {
    private int mana;

    public Mage(String name) {
        super(name, 80);
        mana = 30;
    }

    public int getMana() {
        return mana;
    }

    @Override
    protected int getBonusDamage() {
        return mana / 4;
    }

    public void increaseMana(int amount) {
        mana += amount;
    }

    public void castSpell(Character target) {
        if (mana < 10) {
            System.out.println(getName() + " n'a pas assez de mana.");
            return;
        }
        mana -= 10;
        System.out.println(getName() + " lance un sort sur " + target.getName() + " (25 dégâts).");
        target.takeDamage(25);
    }
}
