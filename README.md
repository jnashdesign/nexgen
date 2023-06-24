# NexGen Fitness
## Project Description
NexGen Fitness was tracking appointment data in spreadsheets and were in need of a web application to manage client appointments.
<br /><br />

## Build/Compilation Technology Used
This project is built using ```Gulp``` and ```Node``` to compile and package all the HTML, CSS and Javascript files.
<br /><br />

## Database and Authentication
All data storage and authentication is managed through Google Firebase using their Authentication and Realtime Database products.
<br /><br />

## How to Set Up and Edit the Project
1. Clone the project from this repository using:
```
https://github.com/jnashdesign/nexgen.git
```
2. Run ```npm install``` to install all dependencies (node modules).
3. Run the ```gulp``` command in the command line to build the app.
4. Once the ```gulp``` command is done running, it should launch your default web browser and display the app locally, at ```http://localhost:3000/```.
5. Log in and view the app.
6. Make whatever changes you need to make.
7. Upload all the files (excluding node_modules, paackage-lock.js, package.json and this README.md file) to your hosted directory.
<br /><br />

## Google Firebase Info
### Getting Familiar with Firebase
You will need to create your own Firebase account (the free tier should be fine) [Firebase account](https://firebase.google.com/). Once you have an account, you'll need to create a project.<br><br>

To identify which google firebase project the app uses, it needs you have to provide the config data. Below is the config data currently being used to run the project. You just replace these values (apiKey,authDomain, and databaseURL) with your own.<br><br>
### Current Firebase Config
***LINE 4 of ```js/custom.js```***
```
var config = {
    apiKey: "AIzaSyA9GzcyqiMtv4iinJRJ4EdvlNN7ry4IRR8",
    authDomain: "nexgenfitness-2021.firebaseapp.com",
    databaseURL: "https://nexgenfitness-2021-default-rtdb.firebaseio.com",
    projectId: "nexgenfitness-2021",
};
firebase.initializeApp(config);
```
This information can be found at the top of ```js/custom.js```.

*Don't worry, the firebase apiKey is safe to expose. It's only used to identify your project. [Click For More Info](https://medium.com/@paulbreslin/is-it-safe-to-expose-your-firebase-api-key-to-the-public-7e5bd01e637b#:~:text=So%20to%20recapitulate%2C%20yes%20it's,to%20mitigate%20the%20damage%20done.)
 

In your project, these config values can be found in the "Project Settings" page of your Firebase account.
<br>
![Project Settings link](/images/readme/projectSettings.png)
<br><br>
Once the page is loaded you should see this.
![Top of Project Settings page](/images/readme/projectSettingsTop.png)<br><br>
Scroll to the bottom of the page and click the "Config" button and the information will be right there.
![Config Info](/images/readme/projectSettingsConfig.png)


### Backups Highly Recommended
The data for all appointments and user information is stored in the Realtime Database. This is a NoSQL database and in essance is just a large ```JSON``` object. I highly recommend you create backups. The current Google Firebase project is set up to make backups (copies of the database) daily.
<br><br>
I highly recommend this just a precautionary measure. If someone was to edit portions of the code that are related to writing to the database (changing data), once it's been edited, there's no "undo".
<br><br>
Luckily, the Realtime database has an option for backups in the account pages. You just set the interval that you want it to make backups and it will store them for you.
<br><br>![Easily make backups of the database and rules](/images/readme/backups.png)

### Security Rules

The security rules for this project are configured so that access the database (red and write) requires a login.
      
```JSON
{
  "rules": {
    ".read": "auth.uid != null",
    ".write": "auth.uid != null"
  }
}
``` 
<br />

## Adding a New User to Firebase Authentation
Firebase makes authenitication and user management really easy. When you first create your project, use the step-by-step guidance Firebase provides and choose "Email/Password" as your sign-in method. There are other methods available but this is the easiest for users and the one I have set up for the project currently.

Just navigate to the Authentication page and there's a button that says "Add User"
<br /><br />

## Changing "baseURL"
***LINE 1-2 of ```js/custom.js```***
```
// const baseURL = 'https://bleedblue.fitness';
const baseURL = '';
```

Before you publish the files, make sure you update the baseURL.
Just comment out the line that says ```const baseURL = '';``` and uncomment the line above with the URL you're publishing to.
<br/><br/>
## Changing "baseURL"
The baseURL is set at the very top of the ```js/custom.js```. If you look there you'll find these lines:
```
// const baseURL = 'https://bleedblue.fitness';
const baseURL = '';
```

Before you publish the files, make sure you update the baseURL.
Just comment out the line that says ```const baseURL = '';``` and uncomment the line above with the URL you're publishing to.
<br/><br/>

## Styling and Making Updates
Any page changes you need to make in the future will likely be in the ```pages``` directory. Each page is named in a way that makes it's use obvious, for example (Addlocation.html, is the page you use to add a new location).

The majority of JavaScript functions appear in ```js/custom.js``` or ```js/login.js```. There are a few functions that are specific to pages. Those functions either appear at the bottom of those pages or they have their own JS files, for example: ```plan_appointment.js```, ```view_appointment.js```.

Most styling changes will be made in the ```scss/vertical-layout-light``` directory.
<br /><br />
## Migration of the latest data to database
Let me know when you are ready to migrate the data recorded so far and I will export the database and provide it. 
Let me know when you are ready to migrate the data recorded so far and I will export the database and provide it. 

1. Save the exported JSON somewhere you can find it. 
2. Log into your Firebase account.
3. Navigate to the Realtime Database data tab.
4. Click the 3 dots in the top right of the tab.
5. Select import from the list.
6. Navigate to the JSON file you saved.
7. Click the import button.
<br /><br />

## Migrating Users and Authentication Info
I've created a function to create user accounts for your convenience.

There is a function at the bottom of the login.js file (currently commented out) that has an array of the locations and names. If that function is uncommented and you load the login page, it will automatically create all the authentication accounts listed. If you would like to add more accounts, just add another array where the first element is the email address and the second is the display name.
<br /><br />
***Example Location***
```JavaScript
['buffalo@nexgenfitness.com', 'Buffalo']
```
<br />

***User Creation Snippet Example***
```Javascript
let userList = [
  ['buffalo@nexgenfitness.com', 'Buffalo'], ['frisco@nexgenfitness.com', 'Frisco']
];

 ...

userList.forEach(element => {
         let email = element[0];
         let displayName = element[1];
         let password = 'PASSWORD'; 
         //Add your password as string value here.
         firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(result) {
            return result.user.updateProfile({
                displayName: displayName
            })
        })
     });
```

The way the function is written, each of these accounts will be given the same (hard coded) password. Once the accounts have been created, the user can always go in and change the password.
<br /><br />

## Managing Access
Each user's data is managed inside the Realtime Database under ```people```. Staff user data is found in "you guessed it" ```people/staff```. Each staff member has an attribute called "access". By default, when a staff member is added, they are greated "Trainer" access. If you would like to upgrade their access to administrator, just change this value in the database to "Admin".

***Example Staff Member***
```JSON
{
  "access": "Admin",
  "location": "Edmond, OK",
  "notes": "",
  "personal": {
    "dob": "1999-12-06",
    "email": "test@gmail.com",
    "gender": "Male",
    "name": "test",
    "phone": "5555555555"
  },
  "specialties": "",
  "start_date": "2023-01-29",
  "status": "Active"
}
```
<br />
***IMPORTANT NOTE***

The data for the user and their login email address are tied together. When a user logs in, the app looks for a user data matching the authentication email. So if you were to change their email address, in the "edit staff" page for example, their login would no longer work. 

As an option, you could add the "disabled" attribute to the email input field on that page to avoid someone doing this in the future.

***LINE 167 of ```pages/editStaff.html```***
```HTML
<label for="email">Email</label>
<input id="email" type="email" class="form-control" name="email" placeholder="john.doe@nexgenfitness.com">

```
<br />
You would just add the attribute to the end of the input like this.

***LINE 167 of ```pages/editStaff.html``` with disabled attribute***
```HTML
<label for="email">Email</label>
<input id="email" type="email" class="form-control" name="email" placeholder="john.doe@nexgenfitness.com" disabled>

```
