<h1> READ "Explanation.pdf". There's no need to read all this</h1>

About the App:
The app is written in Node.js and it is a simple todo app where you can add items, select, and remove then after you are done that item. The source code was taken from: https://github.com/missating/nodejs-todo
To run the app, simple type “node index.js”
To see the tracing, type “node --require ./tracing.js index.js”
To see the metrics, type “node --require ./instrumentation.js index.js”

Instrumenting with OpenTelemetry: 
Tracing:
Each of the important functions have a tracer connected to them:
•	Page load has tracer connected to it.
•	Adding an item has a tracer with it.
•	Selecting an item has a tracer with it.
•	Removing an item has a tracer with it.
Now run the app with tracing which is 
node --require ./tracing.js index.js
The page loads at localhost:3000
Let’s load the page, add an item, then select and then remove it: 
Now go to localhost:16686 to see jaeger’s visualization
This is what you’ll see there: 
 
This clearly shows the traces of all the important functions of the app.
Metrics:
Now we use metrics to see the CPU utilization, counters, etc.
Run the app with this command:
node --require ./instrumentation.js index.js
Now, you need to have Prometheus installed in order to see this, 
We have three links now,
•	Localhost:3000 to run the app
•	Localhost: 9464/metrics to see the metrics
•	Localhost:9090 to see the Prometheus’s visualization for the metrics. 
•	Also run premetheus.exe inside the premetheus folder. Tou can run it by doing ./premetheus.exe  .... this file couldn't be uploaded here or to sakai so just download it throug hthe internet and change the prometheus.yml to the yml inside the premetheus folder posted here 

Now we use counters and cpu_util to see the visualization: 
We add, select and remove items to test: 
       
Item added “grocery”		            Item selected “practice with nodejs”               Remove button clicked

Now let’s go to Localhost: 9464/metrics to see the metrics:
 
These are the counters working just fine.

Let’s look at one of the counters on Prometheus (we added 4 items):
 
So, we see the counter is at 4.
Now let’s look at the CPU utilization:
 
We see that adding, and removing creates a little spike in the utilization.
We can see all the other metrics in the same way as well.


