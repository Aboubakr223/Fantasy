package fantasy;

/** Classe commune à tous les héros. */
public abstract class Character {
    private final String name;
    private int health;
    private int level;

    protected Character(String name, int health) {
        this.name = name;
        this.health = health;
        this.level = 1;
    }

    public String getName() {
        return name;
    }

    public int getHealth() {
        return health;
    }

    public int getLevel() {
        return level;
    }

    public boolean isAlive() {
        return health > 0;
    }

    /** Bonus de dégâts propre à chaque classe (force, mana ou portée). */
    protected abstract int getBonusDamage();

    public void attack(Character target) {
        int damage = 10 + level + getBonusDamage();
        System.out.println(name + " attaque " + target.getName() + " (" + damage + " dégâts).");
        target.takeDamage(damage);
    }

    public void takeDamage(int amount) {
        health = Math.max(0, health - amount);
        System.out.println(name + " a maintenant " + health + " points de vie.");
    }

    protected void increaseLevel() {
        level++;
    }
}
