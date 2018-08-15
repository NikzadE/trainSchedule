$(document).ready(function(){

    var trainData = new Firebase ("https://train-database.firebaseio.com/");
    
    $("#addTrainButton").on("click", function(){

        var trainName = $("#trainNameInput").val().trim();
        var lineName = $("#lineInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
        var frequencyInput = $("#frequencyInput").val().trim();

        var newTrain = {
            name: trainName,
            line: lineName,
            destination: destination,
            trainTime: trainTimeInput,
            frequency: frequencyInput,
        }

        trainData.push(newTrain);

        $("#trainNameInput").val("");
        $("#lineInput").val("");
        $("#destinationInput").val("");
        $("#trainInput").val("");
        $("#frequencyInput").val("");

        return false;

    });

    trainData.on("child_added", function(childSupport, prevChildkey){

        var firebaseName = childSnapshot.val().name;
        var firebaseLine = childSnapshot.val().line;
        var firebaseDestination = childSnapshot.val().destination;
        var firebaseTrainTimeInput = childSnapshot.val().trainTime;
        var firebaseFrequency = childSnapshot.val().frequency;

        var diffTime = moment().diff(moment.unix(firebasetrainTimeInput), "minute");
        var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes")%firebaseFrequency;
        var minutes = firebaseFrequency - timeRemainder;

        var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");
        $("#trainTable > tbody").append("<tr><td>"+ firebaseName + "</td> <td>" + firebaseLine + "</td><td>" + firebaseDestination+ "</td><td>" + firebaseFrequency + "mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td> </tr>");

    });
});