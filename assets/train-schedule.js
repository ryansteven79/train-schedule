$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDgZQMF87NBh6U6GJonjx6JXLiwdKiAm0k",
        authDomain: "train-schedule-35219.firebaseapp.com",
        databaseURL: "https://train-schedule-35219.firebaseio.com",
        projectId: "train-schedule-35219",
        storageBucket: "train-schedule-35219.appspot.com",
        messagingSenderId: "905613043147"
    };
    firebase.initializeApp(config);

    database = firebase.database();

    $("#submit-btn").on("click", function () {
        event.preventDefault();
        var name = $("#train-name").val().trim()    ;
        var destination = $("#destination").val().trim()    ;
        var firstTime = $("#first-train-time").val().trim() ;
        var frequency = $("#frequency").val().trim()    ;
        addTrain(name, destination, firstTime, frequency);


        var newName = $("<td>");
        newName.attr("id", "new-name");
        newName.html(name);
        var newDest = $("<td>");
        newDest.attr("id", "new-destination");
        newDest.html(destination)
        var newFreq = $("<td>");
        newFreq.attr("id", "new-frequency");
        newFreq.html(frequency);
        var newNext = $("<td>");
        newNext.attr("id", "new-next-arrival");
        var newMinutes = $("<td>");
        newMinutes.attr("id", "new-minutes-away");
        $("#landing").append(newName, newDest, newFreq, newNext, newMinutes)

    })

    function clearFields() {
        $("input").empty();
    }

    function addToSchedule() {

    }

    function addTrain(name, destination, firstTime, frequency) {
        var newTrain = database.ref();
        newTrain.push({
            name: name,
            destination: destination,
            firstTime: firstTime,
            frequency: frequency
        })
    }
})