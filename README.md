# NOSTOS - The Concept

Nostos is a community based app focussed around visiting locations in the real world and then writing about your perceptions of the places you go to. The app is framed in a sci-fi theme, with the user taking on the role of an alien researcher visiting Earth.

On opening the map the user is presented with several points of interest to visit. After selecting one they will not be able to proceed until physically within a 100m radius of the point (using native GPS tracking). Once at said location, the user is able to write an entry log for this place, being prompted to look around and engage, writing some meaningful content.

Other users are then able to rate and comment on these entries and receive awards for interacting with the app.

# The Tech

Front-end  
[React Native](https://reactnative.dev/) in [Typescript](https://www.typescriptlang.org/)
[Google Places API](https://developers.google.com/maps) for map interactions and place generation  
[Dall-E](https://openai.com/dall-e-2) for some image generation.

Back-end:  
[Jest.js](https://jestjs.io/) with Supertest  
[Prisma](https://www.prisma.io/) for database interactions  
[AWS](https://aws.amazon.com/) for database hosting  

[Figma](https://www.figma.com/) and [Trello](https://trello.com/) for design and task management.  

# The Creators

This project was created in two-weeks by the following contributors:

[Andre Pangoni](https://github.com/andreeeeh),  
[Diego Saborido](https://github.com/diegoss-github),  
[Dana Yachini](https://github.com/DanaYachini),  
[Andrew MacShane](https://github.com/amacsha),  
[Dominic Stewart-Smith](https://github.com/dominicstewartsmith).  

# Demo Video

[Visit YouTube](https://youtu.be/tUzWbjgdQwU)

# Screenshots
![alt](/screenshots/ship-view.png)
![alt](/screenshots/world-map.png)
![alt](/screenshots/entry-list.png)
![alt](/screenshots/new-entry.png)
![alt](/screenshots/entry-view.png)
![alt](/screenshots/profile-page.png)

# Instructions for running

In ./server:
Create a .env file, following the example of .env.example.
You will need a Postgres database URI, and a secret key of your choice for encrypting user data.
Run the commands `npm i`, and once that is finished `npm run initDB` to populate your database with some location data.

In ./client you will also need an .env file containing your local IP address.
Then run `npm i`

Finally from ./server you can run `npm run dev` to create the server, and simultaneously from ./client run `npm run start` to build the app and open it on Expo.
# nostos