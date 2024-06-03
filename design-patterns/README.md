# Design Patterns in Python
Design patterns are the building blocks of what is called "clean code".
I don't really like the term, but I understand the principles, and you should 
too.  The benefits of a base understanding of these patterns will be quite
significant as you take on new projects, or even review/onboard onto projects
or code that you are not overly familiar with.  Discussing code structures 
with colleagues will obviously be a little easier when they can reference a 
pattern, and you can immediately form a mental model of the general idea of 
their reference (or at least close to it).

## The Gang of Four
Published in 1994, `Design Patterns - Elements of Object-Oriented Software` by
Erich Gamma, Richard Helm, Ralph Johnson and John Vissides has made such a 
significant impact on the software world, that to this day this book is still
one of the most sold software related book each year (though the prices are
outrageous).  I will be borrowing heavily from this book, with a focus on some
of the more commonly used patterns that I find in the industry-at-large.

## Categories
Design Patterns are divided into three main categories:
- Creational
- Structural
- Behavioural

### Creational Patterns

#### Singleton
Initialization of a class that ensures only a single instance can ever be 
created.
#### Factory
Taking over the responsibility of instantiating an object from the class itself.
#### Abstract Factory
Creates a Factory for factory classes
#### Builder
Creating an object step by step and a method to get the object instance
#### Prototype
Creating a new object instance from another similar instance and then modify
according to our new requirements.

### Structural Patterns

#### Adapter
Provides an interface between two unrelated entities os that they can 
work together.
#### Composite
Used when we have to inmplement a part-whole heirarchy. For example, a diagram
made of other pieces such as circle, square, triangle, etc.
#### Proxy
Provide a surrogate or placeholder for another object to control access to it.
#### Flyweight
Caching and reusing object instances, used with immutable objects. For example,
string pool.
#### Facade
Creating a wrapper interfaces on top of existing interfaces to help client
applications.
#### Bridge
Decouple the interfaces from implementation and hiding implementation details 
from the client program.
#### Decorator
Modify the funcionality of an object at runtime (heavily used in Python)

### Behavioural Patterns

#### Template Method
Used to create template method stub and defer some of the steps of 
implementation to the subclasses.
#### Mediator 
Used to provide a centralized communication medium between different objects
in a system.
#### Chain of Responsibility
Used to achieve loose coupling in software, where a request from the client
is passed to a chain objects to process them.
#### Observer
Useful when you are interested in the state of an object and want to get 
notified whenever there is any change
#### Strategy
Have multiple algorithms for a specific task, that a client can choose from at
runtime.
#### Command
Implement loose coupling in a request-response model.
#### State
Used when an object changes it's behaviour based on its internal state.
#### Visitor
Used when we have to perform an operation on a group of similar kinds of
Objects.
#### Interpreter
Defines a grammatical representation for a language and provides an interpreter
to deal with this grammer.
#### Iterator
Provides a standard approach to traverse a group of Objects.
#### Memento
Save the state of an object so that we can restore it later on.


## Patterns Worth Knowing (well)
As you will probably gain a base understanding of all of these patterns over the
coming years, I think I will focus on the ones you should know in-depth early
in your career, and then specifically relating to Python.

I think that all that throughout your future career, you will come across 
variations of eaach of these patterns, there are a few patterns which lend 
themselves particularly well to web application architecture, and are therefore
worth getting a good grasp of early.

### Factory Pattern

### Decorator Pattern
Decorator Patterns are used in many ways.  Any time you wrap a class within 
another class, you have effectively implemented a decorator pattern.  Within
Python, decorators are used commonly to create extensible code, without 
accidental modification of the underlying code.


Example 2:
Functional Decorator in Python

```python
from datetime import time

def log_message(func):
    with open('tmp.log', 'a') as f:
        msg_str = f"{time.now()}\tLOG\t{func()}"
        f.write(msg_str)
        print(msg_str)

@log_message
def log_bad_request():
    return "400 - Bad Request"

@log_message
def log_good_requst():
    return '200 - Good Request'

```

These examples are super contrived, but they give you an idea of how we can take
some functionality that we want to occur, and wrap it in some functionality 
that we would like to extend to this particular case, without manipulating its
function.  We will go over this far more with Flask's `@app` decorator later.

### Strategy Pattern
This is the most used Pattern (evreything is just a Strategy Pattern at it's 
core).

The Strategy pattern is a way to Abstract and Extend an Object's characteristics
while maintaining clean code principles.  This is not a complex pattern,
class inheritance is an example of a Strategy Pattern, where instead of writing
a giant if or switch statement for every type of parent class implementation,
you create a new class, which inherits some, or all of the parent's methods and
fields.  This makes implementing new Strategies a nice, clean pattern.

Example:
```python

class System:
    def __init__(self, name):
        self.name = name
        self.entities = []

class RenderSystem(System):
    def __init__(self, name):
        super().__init__(name)

    def update():
        for _, entity in enumerate(self.entities):
            entity.render()

class MovementSystem(System):
    def __init__(self, name):
        super().__init__(name)

    def update():
        for _, entity in enumerate(self.entities):
            entity.transform.x += entity.transform.mx
            entity.transform.y += entity.transform.my

```

### Facade Pattern
I know, another way to implement a Logger, boring.  But with the Facade Pattern,
we can create an interface for tedious code, to keep our code as DRY as possible
on highly-configurable components.

In the case of a Logger, we would need to pass a lot of configuration data each
time we call its log method.  What level are we logging at, what kind of context
should be printed, and then finally the message.

This could get tedious to implement every time we want to log something out as 
it would look something like this:
```python
from enum import Enum

class lvls(Enum):
    DEBUG = 0
    LOG = 1
    WARN = 2
    ERROR = 3

LOG_LEVEL = lvls.DEBUG.value

def log(level, msg, ctx):
    msg_str = f"{time.now()}\t{level}\t{msg}"
    if level == lvls.DEBUG.value:
        print(f"{msg_str}\n{ctx}")
    if level <= lvls.LOG.value:
        print(msg_str)
    if level <= lvls.ERROR.value:
        if (ctx.err != None):
            print(ctx.err)


# user data
user = {
    "id": 1,
    "first_name": "Josh",
    "last_name": "Upton",
    "phone": "778-548-6811",
    "email": "itsjoshupton@gmail.com",
    "github": "https://github.com/JoshUptons"
}

# lets say we want to log in this user, in dev, we might have our log level set
# to debug, as we want to see everything that is being attempted.
# But in our prod, we do not want our user data to just be all over our log
# files, to prevent personal information leaking.

def login_user(user):
    if LOG_LEVEL <= lvls.LOG.value:
        log(1, 'logging in user...', { "err": None })
    if LOG_LEVEL == lvls.DEBUG.value:
        log(0, 'data: ', { "user": user, "err": None })
    # some user login logic here
    if response_from_database.err != None:
        if LOG_LEVEL <= lvls.ERROR.value:
            log(3, 'error loggin in user', { "err": response_from_database.err })

# as you can see, this gets tedious really quickly
```

So instead, we create a Facade class, which will handle a lot of this tedious 
code, behind the facade of the same log method

Example 1:
```python
from enum import Enum

class lvls(Enum):
    DEBUG = 0
    LOG = 1
    WARN = 2
    ERROR = 3

class Logger:
    def __init__(self, log_level):
        self.log_level = log.level

    def log(self, msg):
        if self.log_level == lvls.LOG.value:
            print(f"{time.now()}\tLOG\t{msg}")

    def debug(self, msg, ctx):
        if self.log_level == lvls.DEBUG.value:
            print(f"{time.now()}\tDEBUG\t{msg}\n{ctx}")

    def warn(self, msg, ctx):
        if self.log_level <= lvs.WARN.value:
            print(f"{time.now()}\tWARN\t{msg}\n{ctx}")
        
    def error(self, err):
        if err != None and self.log_level <= lvls.ERROR.value:
            print(f"{time.now()}-ERROR\t{err}")


# this can now be implemented with a log level set to only show what you want
logger = Logger(lvls.LOG.value)
# logger is set to LOG, therefore, DEBUG messages will be ignored by default


def login_user(user):
    logger.log(f'logging in user: {user.id}') # will print as we are at log level LOG
    logger.debug(f'user data', user) # will not, because the log level excludes DEBUG
    # some user login logic here
    logger.error(response_from_database) # will print if there is an error present on any log level
```

This cleans up our code immensely, and gives us a single interface to change 
should we want to change how our logger configuration in the future.



## Assignments
This week I have 2 assignments/projects for you to get some familiarity with 

### Decorator Pattern
Because this is a the most common use case in python, I think it is important to
get proficient at it.  As described above, this pattern consists of a parent 
function, which will take child functions, to execute some logic alongside the
child functions logic.

```python
def func1(func):
    init()
    # call the function
    func()
    cleanup()

@func1
def do_a_thing():
    return { "thing_i_did": 1 }
```

This pattern can be very powerul when trying to keep maintainable code, as it 
creates an easy interfacing pattern for you to implement side effects without
manipulating existing functions.

The assignment for the Decorator Pattern can be found [here](https//github.com/JoshUptons/basics/assignments/design-patterns/decorator)

## Factory Pattern
The other commonly used pattern I would like you to get a good understanding of
is the Factory Pattern.  It is very commonly used, and is used in all types of
applications, large and small.

The pattern is exactly as you are intuiting from its name, simply implemented
as a sort of switch statement for creating types of child objects.

You could write each class out with its own constructor, and this would be a
valid strategy pattern, however this is a lot of typing, creating a constructor
for each new class, and unnecessary repetition of core fields and methods.  
Instead, we create a Factory, which knows how to create these types of objects, 
which fields and methods are common, and which are configured per specific 
object type.

Instead of this:
```python

class Sword:
    def __init__(self, range, speed, damage, armour_pen, poison):
        self.range = range
        self.speed = speed
        self.damage = damage
        self.armour_pen = armour_pen
        self.poison = poison

class Dagger(Sword):
    def __init__(self, speed, damage, armour_pen, poison):
        super().__init__(1, speed, damage, armour_pen, poison)

class LongSword(Sword):
    def __init__(self, damage):
        super().__init__(2.5, 1.5, damage, 0.35, False)

# creating a new sword
longsword = LongSword(25)
dagger = Dagger(2.5, 12.5, 0.5, False)

```
Let's say we are creating a new sword, we would need to create our new class,
with it's super constructor (this is fairly simple for our swords, but you 
can imagine as things get more complex this could get out of hand)

Instead we use a Factory to handle a lot of the boilerplate for us, so that we
can limit the amount of necessary inputs, and trust the Factory to generate the 
correct object.

```python
# Using the same Sword class as above, we can do:

class SwordFactory:
    def __init__(self):
        self.LONGSWORD = 0
        self.SHORTSWORD = 1
        self.DAGGER = 2

    @static_method
    def sword(type, damage, poisoned=False)
        # note you must be running a fairly modern version of python to get the 
        # match - case structure
        match type:
            case self.LONGSWORD:
                return Sword(2.5, 1.5, damage, 0.35, poisoned)

            case self.SHORTSWORD:
                return Sword(1.5, 2.0, damage, 0.45, poisoned)

            case self.DAGGER:
                return Sword(1.0, 2.5, damage, 0.5, poisoned)


# creating a new sword becomes
sf = SwordFactory()
longsword = sf.sword(sf.LONGSWORD, 25)
shortsword = sf.sword(sf.SHORTSWORD, 18)
dagger = sf.sword(sf.DAGGER, 12.5, False)
dagger_p = sf.sword(sf.DAGGER, 12.5, True)

```
As you can see, this cleans up our code significantly, while still providing a 
clear interface for us to use it.

The assignment can be found [here](https://github.com/JoshUptons/basics/assignments/design-patterns/factory)
