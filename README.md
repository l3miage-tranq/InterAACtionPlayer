# ProjectMultimedia

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.1.

## YouTube Search API

To use the YouTube search API in this project, you'll need to register for an API token.
First, if you don't already have one, you'll need to sign up for a [Google account](https://accounts.google.com/signup/v2/webcreateaccount?continue=https%3A%2F%2Faccounts.google.com%2FManageAccount%3Fnc%3D1&flowName=GlifWebSignIn&flowEntry=SignUp).  
When that's done, head over to the [Google developer console](https://console.cloud.google.com/apis/dashboard?pli=1&project=projectyoutubesearch&folder=&organizationId=) page.  
Once the project is successfully created, follow the steps below to get an API token :  
1. Navigate to the credentials page by clicking on Credentials located on the sidebar menu;  
2. Click on the + CREATE CREDENTIALS button located at the top of the page and select API key. A new API key should be created. Copy that key and store it somewhere safe;  
3. Head over to the API and Services page by clicking on APIs & Services located at the top of the sidebar;  
4. Click on ENABLE APIs AND SERVICES at the top of the page. You’ll be redirected to a new page. Search for the YouTube Data API and click on the Youtube Data API v3 option. Once again, you’ll be redirected to another page. Click Enable to allow access to that API.  
   
With that done, just put the key you copy before in the variable API_TOKEN in ProjectMultimedia -> projects -> youtube -> src -> app -> shared -> services -> search.service.ts (line 17).

## Spotify API

To use the Spotify API in this project, you'll need to register for a Client ID key, and a Client Secret key.  
First, if you don't already have one, you'll need to sign up for a [Spotify account](https://www.spotify.com/fr/signup/).  
When that's done, head over to the [Spotify dashboard](https://developer.spotify.com/dashboard/applications) page.  
Once it's done, follow the steps below to set up the API :  
1. Create an app on the Spotify dashboard;  
2. Copy the Client ID key and Client Secret key and store their somewhere safe;  
3. Click on the Edit Settings button, then write on Website the url where your application run;  
4. In Edit Settings, create 2 Redirect URIs, your_application_url/home  and your_application_url/playlist (copy that 2 url somewhere);  

Now you can save the settings, and put your key and url in ProjectMultimedia -> projects -> spotify -> src -> app -> services -> global.service.ts (line 8 to 11).

## Deezer API

To use the Deezer API in this project, you'll need to register for use requests.  
First, if you don't already have one, you'll need to sign up for a [Deezer account](https://www.deezer.com/fr/register).  
When that's done, head over to the [Deezer developers](https://developers.deezer.com/) page.  
Once it's done, follow the steps below to set up the API :  
1. Click on the MyApp button, next to your login name;  
2. Then click on Create a new Application button and enter information like, Name (= ProjectMultimédia), Domain (= url of your application), etc ...  

Whit that done, you can use the Deezer API (The secret key and application ID can be use for some request or features).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
