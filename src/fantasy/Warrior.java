package fantasy;

public class Warrior extends Character {
    private int strength;

    public Warrior(String name) {
        super(name, 120);
        strength = 15;
    }

    public int getStrength() {
        return strength;
    }

    @Override
    protected int getBonusDamage() {
        return strength / 2;
    }

    public void increaseStrength(int amount) {
        strength += amount;
    }

    public void charge(Character target) {
        int damage = strength * 2;
        System.out.println(getName() + " charge " + target.getName() + " (" + damage + " dégâts).");
        target.takeDamage(damage);
    }
}
