# Python Flask application

## Overview
A basic Flask API, serving html templates.  
We will expand on this application and use it as a base folder structure for
future flask APIs.

## Structure
|____README.md
|______index__.py
|____static
| |____css
| | |____main.css
|____templates
| |____index.html
|____src
| |______index__.py
| |____main.py

The basics of the structure of a python 
[module](https://docs.python-guide.org/writing/structure/) Python Modules 
(similar to JS modules), require indexing of all directories that contain python
files, this helps the module loader figure out where code is routed from.  
The JS equivalent is the `main` entry in a package.json file.

## Flask

A minimalistic API that serves over HTTP.
The router utilizes the 
[decorator pattern](https://realpython.com/primer-on-python-decorators/)
which can be seen within the `src/main.py` file.  It passes the following
function to the decorator function, in flasks case, it is expecting a 
returned string value that will be sent to the browser.
