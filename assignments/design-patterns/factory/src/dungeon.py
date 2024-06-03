from .character import CharacterFactory

class Room:
    def __init__(self, treasure=False):
        self.entities = {}
        self.treasure = treasure
        self.routes = {}

    def add_entity(self, entity):
        self.entities[entity.name] = entity

    # when an entity dies
    def remove_entity(self, entity):
        del self.entities[entity.name]

    def add_items(self, items):
        self.items = items

    '''
    create the routing for walking through rooms
    '''


class Dungeon:
    def __init__(self):
        self.treasure_found = False
        self.rooms = {
                "entry": Room().add_items([''' your weapons here '''])
            }
        self.current_room = "entry"
        '''
        prompt the user for their character name
        '''        
        name = ''
        self.player = CharacterFactory('PLAYER', name)

        '''
        further commands here
        '''

        '''
        for now just treat this as the script of the dungeon, you can abstract
        it once it is working
        '''

