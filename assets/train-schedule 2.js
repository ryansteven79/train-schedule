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
        var firstTime = $("#first-train-time").val().trim();
        var frequency = $("#frequency").val().trim();

        var newTrain = {
            name: name,
            destination: destination,
            frequency: frequency,
            firstTime: firstTime
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
        var tFrequency = childSnap.val().frequency;
        var newFirstTime = childSnap.val().firstTime;

        //Console those variables
        console.log(newName);
        console.log(newDest);
        console.log(tFrequency);
        console.log(newFirstTime);

        // Assume the following situations.

        // (TEST 1)
        // First Train of the Day is 3:00 AM
        // Assume Train comes every 3 minutes.
        // Assume the current time is 3:16 AM....
        // What time would the next train be...? (Use your brain first)
        // It would be 3:18 -- 2 minutes away

        // (TEST 2)
        // First Train of the Day is 3:00 AM
        // Assume Train comes every 7 minutes.
        // Assume the current time is 3:16 AM....
        // What time would the next train be...? (Use your brain first)
        // It would be 3:21 -- 5 minutes away


        // ==========================================================

        // Solved Mathematically
        // Test case 1:
        // 16 - 00 = 16
        // 16 % 3 = 1 (Modulus is the remainder)
        // 3 - 1 = 2 minutes away
        // 2 + 3:16 = 3:18

        // Solved Mathematically
        // Test case 2:
        // 16 - 00 = 16
        // 16 % 7 = 2 (Modulus is the remainder)
        // 7 - 2 = 5 minutes away
        // 5 + 3:16 = 3:21

        // Assumptions
        // var tFrequency = 3;

        // Time is 3:30 AM
        // var firstTime = "03:30";

        // First Time (pushed back 1 year to make sure it comes before current time)
        // This is arbitrary to just make sure our first train time is in the past
        var firstTimeConverted = moment(newFirstTime, "HH:mm").subtract(1, "years");
        console.log('FIRST TIME CONVERTED ' + firstTimeConverted.format('hh:mm'));

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log('TIME APART REMAINDER ' + tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



        // Create new row
        var newRow = $("<tr>").append(
            $("<td>").text(newName),
            $("<td>").text(newDest),
            $("<td>").text(tFrequency),
            $("<td>").text(moment(nextTrain).format("LT")),
            $("<td>").text(tMinutesTillTrain)

        )
        //Append the new row to the table
        $("#landing").append(newRow);
    })



})