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
        var name = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        // var firstTime = $("#first-train-time").val().trim();
        var frequency = $("#frequency").val().trim();

        var newTrain = {
            name: name,
            destination: destination,
            frequency: frequency
        }
        database.ref().push(newTrain);

        clearFields();
    })

    function clearFields() {
        $("#train-name").val("");
        $("#destination").val("");
        $("#first-train-time").val("");
        $("#frequency").val("");
    }
    database.ref().on("child_added", function (childSnap) {
        // console.log(childSnap.val());

        //Store everything into a variable
        var newName = childSnap.val().name;
        var newDest = childSnap.val().destination;
        var newFreq = childSnap.val().frequency;
        var newFirstTrain = childSnap.val().frequency;

        //Console those variables
        console.log(newName);
        console.log(newDest);
        console.log(newFreq);

        // calculate the next arrival and Minutes away
        //first time (pushed back 1 year to make sure it comes before the current time)
        var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");

        //current time
        // var currentTime = moment();

        //difference between the times
        var diffTime = moment().diff(moment(startTimeConverted), "minutes");

        //time apart (remainder)
        var tRemainder = diffTime % newFreq;

        //minutes until train
        var tMinutesTillTrain = newFreq - tRemainder;

        //next train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var catchTrain = moment(nextTrain).format("HH:mm");


        // Create new row
        var newRow = $("<tr>").append(
            $("<td>").text(newName),
            $("<td>").text(newDest),
            $("<td>").text(newFreq),
            $("<td>").text(nextTrain),
            $("<td>").text(catchTrain)

        )
        //Append the new row to the table
        $("#landing").append(newRow);
    })



})