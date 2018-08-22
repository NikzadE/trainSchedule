$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyCHoxpuAWtaW3Ai-TIj_r6amfUkNEiZq9g",
        authDomain: "trainschedule-bc4a2.firebaseapp.com",
        databaseURL: "https://trainschedule-bc4a2.firebaseio.com",
        projectId: "trainschedule-bc4a2",
        storageBucket: "trainschedule-bc4a2.appspot.com",
        messagingSenderId: "2191983531"
      };
      firebase.initializeApp(config);
    
    console.log(firebase);
  var database = firebase.database();
  
      $("#addTrainButton").on("click", function () {
  
          var trainName = $("#trainNameInput").val().trim();
          var destination = $("#destinationInput").val().trim();
          var trainTime = $("#trainTimeInput").val().trim();
          var frequency = $("#frequencyInput").val().trim();
  
          database.push({
              TrainName: trainName,
              destination: destination,
              trainTime: trainTime,
              frequency: frequency,
              timeAdded: firebase.datanase.serverValue.TIMESTAMP
  
          });
  
          $("input").val("");
          return false;
      });
  
      database.ref().on("child_added", function (childSnapshot) {
          var trainName = childSnapshot.val().trainName;
          var destination = childSnapshot.val().destination;
          var trainTime = childSnapshot.val().trainTime;
          var frequency = childSnapshot.val().frequency;
          console.log("Name:" + trainName);
  
          var frequency = parseInt(frequency);
  
  
  
          var dConverted = moment(childSnapshot.val().time, 'HH:mm').subtract(1, 'years');
          console.log("DATE CONVERTED" + dConverted);
  
          var time = moment(dConverted).format("HH:mm");
          console.log("TIME" + time);
  
          var tConverted = moment(time, 'HH:mm').subtract(1, 'years');
          var tDifference = moment().diff(moment(tConverted), 'minutes');
          console.log("DIFFERENCE IN TIME: " + tDifference);
  
          var tRemainder = tDifference % frequency;
          console.log("TIME REMAINING: " + tRemainder);
  
          var minsAway = frequency - tRemainder;
          console.log("MINUTES UNTIL NEXT TRAIN: " + minsAway);
  
          var nextTrain = moment().add(minsAway, 'minutes');
          console.log("ARRIVAL TIME: " + moment(nextTrain).format('HH:mm A'));
  
          $('#trainTable').append(
              "<tr><td id='nameDisplay'>" + childSnapshot.val().trainName +
              "</td><td id='destDisplay'>" + childSnapshot.val().destination +
              "</td><td id='freqDisplay'>" + childSnapshot.val().frequency +
              "</td><td id='nextDisplay'>" + moment(nextTrain).format("HH:mm") +
              "</td><td id='awayDisplay'>" + minsAway + ' minutes until arrival' + "</td></tr>");
          },
  
          function (errorObject){
              console.log("Read faild:" + errorObject.code)
      
  
      });
  });
  