class Weapon:
    def __init__(self, name, damage, speed):
        self.name = name
        self.damage = damage
        self.speed = speed

def WeaponFactory(weapon_type):
    '''
    insert your weapons here
    '''
    if weapon_type == 'CLEAVER':
        return Weapon('Rusty Cleaver', 25, 1.0)
    else:
        print('error invalid weapon type')
