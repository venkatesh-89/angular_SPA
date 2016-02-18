# angular_SPA
A single page app using angular js. Done with Coursera.

Download this repository and 
(The option --save-dev is to install all the libraries local to this repository)

1. npm install --save-dev 
2. bower install --save-dev 

Before running the app, setup a json-server using the following commands:
(Use a different terminal window/tab)

1. cd json-server
2. npm install json-server -g
3. <b>json-server --watch db.json -p 3333 </b><br>
(This will start the json server at port 3333, The app is configured to use this port which can be changed)

<h4>Now on the root dir of this project:</h4>

To run the app use: <b>"gulp watch"</b>


The app will be hosted on your default browser. You can access this application from any browser using the folloing URL:
<br><b>http://localhost:3000/</b>
