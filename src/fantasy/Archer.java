package fantasy;

public class Archer extends Character {
    private int range;

    public Archer(String name) {
        super(name, 90);
        range = 20;
    }

    public int getRange() {
        return range;
    }

    @Override
    protected int getBonusDamage() {
        return range / 2;
    }

    public void increaseRange(int amount) {
        range += amount;
    }

    public void shootArrow(Character target) {
        System.out.println(getName() + " tire une flèche sur " + target.getName() + " (" + range + " dégâts).");
        target.takeDamage(range);
    }
}
