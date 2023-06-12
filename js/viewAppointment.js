const urlSearchParams = new URLSearchParams(window.location.search);
const params = urlSearchParams.get("appointment");
let info;

// Get client notes
function getClientNotes(name) {
  // Look through client node
  clientsRef.on("value", function (snapshot) {
    // Get snapshot value
    let result = snapshot.val();

    // Loop through clients
    for (const [key, value] of Object.entries(result)) {
      // Get keys
      let clientKey = `${key}`;

      if (clientKey == name) {
        $(document).ready(function () {
          // Push notes into page
          $(".editAppointmentsPage #clientNotes").val(result[clientKey].notes);
          $(".editAppointmentsPage #physicalProblems").val(
            result[clientKey].physical_problems
          );
          $(".viewAppointmentsPage #physicalProblems").val(
            result[clientKey].physical_problems
          );
        });
      }
    }
  });
}

// Build sets
const setTotal = 4;
const roundTotal = 4;
let roundNumSet = 1;
for (let i = 1; i <= setTotal; i++) {
  $(".exerciseLog").append('<div id="round-' + i + '"><h3>Round ' + i + '</h3><div class="row"><div class="roundContainer"></div></div></div>');
}

for (let i = 1; i <= setTotal; i++) {
  $(".roundContainer").append(
    '<div class="row exerciseContainer exercise' + i +'"><div class="form-group col-md-5 grid-margin full-width"><input placeholder="Exercise ' + i + ' Name" type="text" class="form-control exercises exercise' + i + 'Name" autocomplete="off"><div class="setContainer"></div></div>'
  )
}

for (let i = 1; i <= setTotal; i++) {
  $(".setContainer").append(
    '<div class="row"><div class="form-group col-md-4 grid-margin"><input placeholder="Set ' + i + ' Weight" type="text" class="form-control weight set' + i + 'Weight" ></div><div class="form-group col-md-4 grid-margin"><input placeholder="Set ' + i + ' Reps" type="text" class="form-control reps set' + i + 'Reps"></div><div class="form-group col-md-4 grid-margin"><input placeholder="Set ' + i + ' Notes" type="text" class="form-control notes set' + i + 'Notes"></div></div>'
  );
}

// // Look through appointments node
appointmentsRef.on("value", function (snapshot) {
  // Get snapshot value
  let result = snapshot.val();

  let clientKey;
  let matchingEntry;
  // Loop through the keys
  for (const [key, value] of Object.entries(result)) {
    clientKey = `${key}`;
    info = clientKey.split("|");
    const numExercises = 16;
    let exerciseInfo = [];

    if (info[0] == params) {
      matchingEntryExercises = result[clientKey].exercises;
      matchingEntryInfo = result[clientKey].info;

      getClientNotes(matchingEntryInfo.client.replace(/[ ,-,/]/g, "_"));

      $(".editAppointmentsPage #clientName").val(matchingEntryInfo.client);
      $(".editAppointmentsPage #physicalProblems").val(matchingEntryInfo.physical_problems);
      $(".editAppointmentsPage #clientNotes").val(matchingEntryInfo.client_notes);
      $(".editAppointmentsPage #date").val(matchingEntryInfo.date);
      $(".editAppointmentsPage #locationName").val(matchingEntryInfo.location);
      $(".editAppointmentsPage #trainerName").val(matchingEntryInfo.trainer);
      $(".editAppointmentsPage #appointmentNotes").val(matchingEntryInfo.notes);

      $(".viewAppointmentsPage #clientName").val(matchingEntryInfo.client);
      $(".viewAppointmentsPage #physicalProblems").val(matchingEntryInfo.physical_problems);
      $(".viewAppointmentsPage #clientNotes").val( matchingEntryInfo.client_notes);
      $(".viewAppointmentsPage #date").val(matchingEntryInfo.date);
      $(".viewAppointmentsPage #locationName").val(matchingEntryInfo.location);
      $(".viewAppointmentsPage #trainerName").val(matchingEntryInfo.trainer);
      $(".viewAppointmentsPage #appointmentNotes").val(matchingEntryInfo.notes);
      if (matchingEntryInfo.no_show == "true") {
        $("#noShow").prop("checked", "true");
      }

      for (i = 1; i <= numExercises; i++) {
        let exerciseNum;
        let roundNum;

        if (i <= 4) {
            roundNum = 1;
            exerciseNum = i;
        } else if (i > 4 && i <= 8) {
            roundNum = 2;
            exerciseNum = i - 4;
        } else if (i > 8 && i <= 12) {
            roundNum = 3;
            exerciseNum = i - 8;
        } else if (i > 12 && i <= 16) {
            roundNum = 4;
            exerciseNum = i - 12;
        }


      const setTotal = 4;
      for (let set = 1; set <= setTotal; set++) {
          let setNotation = "set" + set;
          let roundNumNotation = 'round'+ roundNum;
          let exerciseNotation = 'exercise' + exerciseNum;
          let exerciseName = matchingEntryExercises[roundNumNotation][exerciseNotation].exerciseName;
          let reps = matchingEntryExercises[roundNumNotation][exerciseNotation][setNotation].reps;
          let notes = matchingEntryExercises[roundNumNotation][exerciseNotation][setNotation].notes;
          let weight = matchingEntryExercises[roundNumNotation][exerciseNotation][setNotation].weight;

          $("#round-" + roundNum + " .exercise" + exerciseNum + "Name").val(exerciseName);
          $("#round-" + roundNum + " .exercise" + exerciseNum + " .set" + set + "Reps").val(reps);
          $("#round-" + roundNum + " .exercise" + exerciseNum + " .set" + set + "Weight").val(weight);
          $("#round-" + roundNum + " .exercise" + exerciseNum + " .set" + set + "Notes").val(notes);
        }
      }
    }
  }
});

// $(document).ready(function() {
//   if (window.location.href.indexOf("viewAppointment") > -1) {
//     $("input").attr("disabled", "true");
//     $("textarea").attr("disabled", "true");
//   }
// });
