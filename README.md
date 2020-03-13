![homescreen banner](/screenshots/homepage.png)

### Submitted for UBC cmd-f Hackathon, Top 5 Finalist + Wolfram Alpha Award
##### stephaniejnc.github.io/covid-19-tracker
## Inspiration
Hello! We're a team of UBC students with the goal of making a self-reporting COVID-19 symptoms tracker for the everyday citizen. Not all people have access to on-demand healthcare, or might not have traveled (but still want to be aware of potential symptoms), anybody can log their symptoms onto a personal Google Calendar for both personal and professional records if needed. These record could help doctors provide a more accurate diagnosis. 

## What it does
Our web application features:
- Most recent news, specific to your location (data scraping with Python)
- Ability to add symptoms (duration, symptom, and severity) to Google Calendar (Google API and request handling)
- Real-time graph of recent symptoms (using JavaScript)
- Option to save graph and/calendar as PDF and send it to a medical professional

![newsfeed](/screenshots/news.png)
![form](/screenshots/form.png)
![graph](/screenshots/graph.png)
![calendar](/screenshots/calendar.png)


## How I built it
We used HTML5 and CSS for the basic website frame, then on the Symptoms Tracker page, we used Google Calendar API to pull and send event requests with Javascript. For the timeline/symptoms scatterplot, we used the Plot.ly library and using Javascript, every event submitted on the form would update the graph!

## Challenges I ran into
Connecting Google API is always a challenge, so that took a while. It was our first time using JavaScript, so there was a lot of learning! We also wanted to use Beautiful Soup and Python to customize the homepage news to the user's location but was unable to finish that in time. 

## Accomplishments that I'm proud of
Honestly, thinking of an idea and executing it, and then demoing the project as a fully functioning web application within a span of 24 hours! 

## What's next for COVID-19 Symtoms Tracker
Fetching all users' data and have a generic analysis of most common symptoms and their respective timelines, finding the nearest doctor/health clinic, and custom web scraping with Beautiful Soup for the newsfeed. Currently, if you try it out on stephaniejnc.github.io/covid-19-tracker, it's only configured to display my calendar (as everyone has a unique Google Calendar ID and embed code!)
