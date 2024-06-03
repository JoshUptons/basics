from .weapon import WeaponFactory

class Character:
    def __init__(self, name, hp, weapon=None):
        self.name = name
        self.hp = hp
        self.weapon = weapon

def CharacterFactory(char_type, name):
    if char_type == 'PLAYER':
        return Character(name, 1000)
    elif char_type == 'GOBLIN':
        return Character('Goblin', 250, WeaponFactory('CLEAVER'))
    else:
        print('error, invalid character type')

