# IdleRpg
Idle Rpg Game to make a twist to your natural idle and Rpgs


Built with Yarn package manager, so you will need yarn installed

cd into repository, yarn install

You will need postgres installed

createdb idle_forest, probably dont want to change that. 

yarn start - to start the project

to run the project locally on port 3000 express proxy port 3001

Still needs a little bit of fixes, was a big project and havent gotten around to absolutely everything.
A list of future updates will be listed at the bottom.


Basic Structure -
The game has 3 main classes, logic, a draw component, and a UI class.
Most interaction and instantiation happens in the logic class.
Logic class is instatiated and updated in the draw Component.
the objects instantiated in logic are passed to the UI class via the draw component.

Players, enemies, NPC's, and Resources are all instances of the entity class.
Yes, it is a little overkill for the resources and npcs, but i wanted to keep the possibilities open
in case i wanted the npcs/animals to fight back, have enemies use range, or make resources explode and give damage.
It also make drawing and instantiating a new entity very easy because they are all the same.


Basic GamePlay-

You are a character that fights automatically as you progress through levels
you can toggle buttons to make him mine, woodcut, and hunt in which every resource and kill drops items 
and you get gold from every kill. hover over items with mouse to add them into your inventory.

You can toggle to walk to your farm and walk home no matter how high a level you are at.

You can buy things from the merchant, or craft things with your items at the crafting table.

You can bank your items so you dont drop them when you die.

you can collect water by clicking on the waterwell

When farming:
  click seeds from your inventory to plant them
   click water from your inventory to add to the plot
   when the seeds grow into plants, click the plant to harvest
   
when at home, you can hover over pretty much anything to get information about it.

It is a big project, and may take a second to load. It is mostly on the front end, which was a bad idea. Should have made 
the logic on the server side and drawing on the client side, in a future update I may change how that works. 
until then I wont deploy live because of the possibility to cheat if you figure out how to access the 
variables from the console, and save it on the server.

It has user login and registration built into the game.

saves and loads all data except for the farm so be sure to harvest before you close or refresh.



Future updates - 

Refactor Some of the bigger classes, some got pretty big.
Refactor the file structure, some things aren't as organized as I would like.
Refactor the Animations/Images file because it got huge, also create a standard 
(I used two-three different object-structures because of different spritesheet structures)

add armor legs and boots and weapon mace, as of now it is just text because i dont have the sprites.

Make difficulty level actually count from the main screen

Add credits, If you pull, please check that folder, I couldnt have done it without the people at openGameArt, 
the LPC Project helped me tremendously.

Add a logout button so that you dont refresh to logout, lol

Fix the stop button to open the settings, make it so you dont walk in place, and open the settings screen.

add sounds to all of the actions
add music to the game.

There is a bug that the info pane stays if you hold it over something while moving from home to farm or next level

make more visual cues when at home, ex: walk to water when you are collecting, walk around more instead of remain in 
middle of screen.


There are probably a few more, send a pull request if you would like to work on something, would love collaborators.
as I knock them off the list I will update this read-me.



Please check out the credits in the credits folder. They are the reasons that everything isn't just text with
non animated squares and circles.

directory for credits is src/assets/images/spriteSheets/credit

Big thanks to them!








