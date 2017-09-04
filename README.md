# Rate Super People

Project Summary:

In the superhero community there are a great number of arguments which circulate around character power levels. Who is the smartest? Who is the stretchiest?

The unfortunate reality is that power levels are difficult to quantity because they vary so much from comic to comic for a specific character. Because there’s so much information for a character, it’s difficult to give a definitive answer to this question from one source. However, what if we took another approach and cumulated votes from multiple sources? This is exactly what I propose as a solution to this problem.

I've make an application where users vote on a set of attributes for each superhero. These results are averaged out across the community on the main page of each superhero, where everybody (regardless of signed in or not) will be able to see a superhero’s rated power levels.

Heroku Demo Link: https://rate-super-people.herokuapp.com/

How to Enjoy Application:

From the main page, there are a few options. You can register an account, login to an account, or search directly for super people in the search bar at the top.

Registering an account is quite easy. Simply navigate to the registration page and enter an unused email with a corresponding password. Afterwards, you'll be redirected to the login page, where you can login with the newly created account with the same credentials.

To search for super people, simply enter a super person, or part of a super person (partial entries will also work) into the search bar and hit the "Search" button. All results will be displayed to the user in table format. Clicking on the name of the super person will take the user to the page of the super person.

From a specific super person page, the average votes for each attribute of the super person are displayed, along with a picture of the super person and description (if they exist).

Furthermore, if the user is logged in, they have the option to vote on attributes for that particular super person. If the user has never voted before on that particular super person, all attributes will be set to the default of ranking 5. If the user has voted, the last set of voting results will be displayed, which the user can change to their liking.

Emphasized Technologies:
  1. Mongoose ORM (MongoDB)
  2. Local Passport (Authentication)
  3. Usage of Marvel API

Interesting Technical Components:

Seeding the database with marvel super people presented an interesting challenge. The marvel API only allows a limit of 100 results per query, so I had to implement an async do/while loop to keep querying until the results returning were less than 100. I also modified this seeding process so that the user could choose to seed the database with an X number of super people if they didn't need to seed the database with the entirety of the marvel database (which takes a while to go through).

I used handlebars as my view rendering engine which presented a few interesting challenges.

  1. I made a d3 bar graph on the super person page to display ratings, but needed a way to actually pass the ratings info to the front end javascript. To fix this, I passed the data as an encoded URI component, which I then decoded through an intermediary script and voila, I could use the data in my bar graph.

  2. For displaying rating types, I originally displayed this info through displaying a rating type, and copying and pasting the format for the other rating types. This quickly became unmanagable and obviously a problem if I wanted to increase scale of the project and add more attributes. To solve this, I put the ratings into an array and looped over this info in handlebars to display it.
