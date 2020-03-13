
var Coughing = {
    x: [],
    y: [],
    type: 'scatter',
    name: 'Coughing'
};

var Sneezing = {
    x: [],
    y: [],
    type: 'scatter',
    name: 'Sneezing'
};

var Headache = {
    x: [],
    y: [],
    type: 'scatter',
    name: 'Headache'
};

var Fever = {
    x: [],
    y: [],
    type: 'scatter',
    name: 'Fever'
};

var data = [Coughing, Sneezing, Headache, Fever];

var layout = {
    title: 'Trends of Recent Symptoms',
    xaxis: {
        title: 'Time'
    },
    yaxis: {
        title: 'Severity'
    }
};

Plotly.newPlot('myDiv', data, layout);

// Start date, end date, and symptom 
var startDate;
var endDate;
var symptom;
var severity;

// Client ID and API key from the Developer Console
var CLIENT_ID = '421341829739-r9j6ks20gbgtb72i02hjlpmgc19ml144.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDcgBPK9G29Ir9d_xqrsW5ZsFb_Sy316jg';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

$("#submitButton").submit(function (event) {
    event.preventDefault();
});

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function (error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        // listUpcomingEvents();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then(function (response) {
        var events = response.result.items;
        appendPre('Upcoming events:');

        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime;
                if (!when) {
                    when = event.start.date;
                }
                appendPre(event.summary + ' (' + when + ')')
            }
        } else {
            appendPre('No upcoming events found.');
        }
    });
}

function insertCalendarEvent() {
    console.log('button clicked');
    var event = {
        'summary': 'Google I/O 2015',
        'location': '800 Howard St., San Francisco, CA 94103',
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
            'dateTime': '2020-03-8T09:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
        },
        'end': {
            'dateTime': '2020-03-09T17:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
        },
        'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=2'
        ],
        'attendees': [
            { 'email': 'lpage@example.com' },
            { 'email': 'sbrin@example.com' }
        ],
        'reminders': {
            'useDefault': false,
            'overrides': [
                { 'method': 'email', 'minutes': 24 * 60 },
                { 'method': 'popup', 'minutes': 10 }
            ]
        }
    };
    gapi.client.calendar.events.insert({
        'calendarId': '2lkk0ub515v8pj4uggrpedrvdc@group.calendar.google.com',
        'resource': event
    }).then(function (response) {
        appendPre('Event created: ' + response);
        console.log(response);
        document.getElementById('calendar').contentWindow.location.reload();

    }).catch(function (err) {
        console.log(err);
    });
}

function getFormValue() {
    startDate = document.getElementById("startDate").value;
    endDate = document.getElementById("endDate").value;
    symptom = document.getElementById("symptom").value;
    severity = document.getElementById("severity").value;

    if (symptom == 'coughing') {
        Coughing.x.push(startDate);
        Coughing.y.push(severity);
    } else if (symptom == 'sneezing') {
        Sneezing.x.push(startDate);
        Sneezing.y.push(severity);
    } else if (symptom == 'headache') {
        Headache.x.push(startDate);
        Headache.y.push(severity);
    } else if (symptom == 'feverish') {
        Fever.x.push(startDate);
        Fever.y.push(severity);
    }

    Plotly.update('myDiv', data, layout);

    // alert(startDate + " " + endDate + " " + symptom) + " " + severity;

    var event = {
        'summary': symptom,
        'location': '',
        'description': severity,
        'start': {
            'dateTime': '2020-' + startDate + 'T00:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
        },
        'end': {
            'dateTime': '2020-' + endDate + 'T23:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
        },
        'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=1'
        ],
        'attendees': [
            // { 'email': 'lpage@example.com' },
            // { 'email': 'sbrin@example.com' }
        ],
        'reminders': {
            'useDefault': false,
            'overrides': [
                { 'method': 'email', 'minutes': 24 * 60 },
                { 'method': 'popup', 'minutes': 10 }
            ]
        }

    };
    gapi.client.calendar.events.insert({
        'calendarId': '2lkk0ub515v8pj4uggrpedrvdc@group.calendar.google.com',
        'resource': event
    }).then(function (response) {
        // appendPre('Symptom and date: ' + response);
        console.log(response);
        // document.getElementById("calendarReload").contentWindow.location.reload(true);
        var iframe = document.getElementById("calendarReload");
        iframe.src = iframe.src;
    }).catch(function (err) {
        console.log(err);
    });
}
