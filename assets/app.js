  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAA8RVjJhZHUGHKFycng0uCRBgmP_rnmds",
    authDomain: "train-scheduler-41ee3.firebaseapp.com",
    databaseURL: "https://train-scheduler-41ee3.firebaseio.com",
    projectId: "train-scheduler-41ee3",
    storageBucket: "",
    messagingSenderId: "435512281765"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
var database = firebase.database();


// Whenever a user clicks the submit Add Train button
$("#submit-sched-btn").on("click", function (event) {
  // Prevent form from submitting
  event.preventDefault();

  // Get the input values
  var trainName = $("#InputName").val().trim();
  var trainDest = $("#InputDest").val().trim();
  var trainStartTime = parseInt(moment($("#InputTime").val().trim(), "HH:mm").format("x"));
  var trainFreq = $("#InputFreq").val().trim();

  // Save the new Train in Firebase
  // Note how we are using the Firebase .push() method
  database.ref().push({
      trainName: trainName,
      trainDest: trainDest,
      trainFreq: trainFreq,
      trainStartTime: trainStartTime
      
  });

  // Clear text boxes
  $("#InputName").val("");
  $("#InputDest").val("");
  $("#InputTime").val("");
  $("#InputFreq").val("");
  $("#InputName").focus();
})

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("child_added", function(snapshot) {
  var trainSched = snapshot.val();
  var trainStartTime = moment(trainSched.trainStartTime).format("HH:mm");
  var trainMinAway = moment().diff(trainSched.trainStartTime, 'minutes');
  
  console.log(trainMinAway);
  
  // Table Columns: <id=pkey hidden>, Name, Role, Start, Months(computed), Rate, YTD(computed)

  $("#train-table-body").append(`<tr id="${snapshot.key}"><td>${trainSched.trainName}</td><td>${trainSched.trainDest}</td><td>${trainStartTime}</td><td>${trainSched.trainFreq}</td><td>${trainMinAway*-1}</td></tr>`)
})

