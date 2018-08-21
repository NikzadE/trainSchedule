$(document).ready(function(){

    var config = {
        apiKey: "AIzaSyBJ-_F_fYAdV7GInyGoOJLw7fWCb1S3Tmc",
        authDomain: "trainschedule-22eed.firebaseapp.com",
        databaseURL: "https://trainschedule-22eed.firebaseio.com",
        projectId: "trainschedule-22eed",
        storageBucket: "trainschedule-22eed.appspot.com",
        messagingSenderId: "627171314372"
      };
      firebase.initializeApp(config);
      console.log(firebase);

    var database = firebase.database().ref();
    
    $("#addTrainButton").on("click", function(){
      
        var trainName = $("#trainNameInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
        var frequencyInput = $("#frequencyInput").val().trim();

        var newTrain = {
            name: trainName,
            destination: destination,
            trainTime: trainTimeInput,
            frequency: frequencyInput,
        }

        database.push(newTrain);

        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#trainInput").val("");
        $("#frequencyInput").val("");

       

    });
 //display firebase objects on page
    database.on("value", displayData);
    function displayData (data) {
        console.log(data.val());

    }
    

        var firebaseName = data.val();
        var keys = Object.keys(firebaseName);
        for (var i = 0; i<keys.length; i++);
        var k = keys [i];
        var firebaseDestination = firebaseName [k];
        var firebaseTrainTimeInput = data.val().trainTime;
        var firebaseFrequency = data.val().frequency;

      
        var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes")%firebaseFrequency;
        var minutes = firebaseFrequency - timeRemainder;

        var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");
        $("#trainTable > tbody").append("<tr><td>"+ firebaseName + "</td><td>" + firebaseDestination+ "</td><td>" + firebaseFrequency + "mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td> </tr>");

    ;
});