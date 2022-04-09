const urlSearchParams = new URLSearchParams(window.location.search);
const params = urlSearchParams.get('appointment');
let info;

// Get client notes
function getClientNotes(name){
// Look through client node
clientsRef.on('value', function (snapshot) {
    // Get snapshot value
    let result = snapshot.val();

    // Loop through clients
    for (const [key, value] of Object.entries(result)) {
        // Get keys
        let clientKey = `${key}`;

        if (clientKey == name){
                console.log('match');
                console.log(result[clientKey].client_notes);
                $( document ).ready(function() {
                // Push notes into page
                $('.editAppointmentsPage #clientNotes').val(result[clientKey].client_notes);
                $('.editAppointmentsPage #physicalProblems').val(result[clientKey].physical_problems);
            })
        }
    }
});
}

// // Look through appointments node
appointmentsRef.on('value', function (snapshot) {
    // Get snapshot value
    let result = snapshot.val();
    // console.log(result);

    let clientKey;
    let matchingEntry;
    // Loop through the keys
    for (const [key, value] of Object.entries(result)) {
        clientKey = `${key}`;
        info = clientKey.split('|');
        let exercises = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

        if (info[0] == params) {
            matchingEntryExercises = (result[clientKey]).exercises;
            matchingEntryInfo = (result[clientKey]).info;
            console.log(matchingEntryExercises)

            getClientNotes(matchingEntryInfo.client.replace(/[ ,-,/]/g, '_'));

            $('.editAppointmentsPage #clientName').val(matchingEntryInfo.client);
            $('.editAppointmentsPage #physicalProblems').val(matchingEntryInfo.physical_problems)
            $('.editAppointmentsPage #clientNotes').val(matchingEntryInfo.client_notes)
            $('.editAppointmentsPage #date').val(matchingEntryInfo.date);
            $('.editAppointmentsPage #locationName').val(matchingEntryInfo.location + ', ' + matchingEntryInfo.state);
            $('.editAppointmentsPage #trainerName').val(matchingEntryInfo.trainer);
            $('.editAppointmentsPage #appointmentNotes').val(matchingEntryInfo.notes);
            if (matchingEntryInfo.no_show == 'true') {
                $('#noShow').prop('checked', 'true');
            }

            exercises.forEach(function(res){
                $('#exercise-1 .exercises').val(matchingEntryExercises.round1.exercise1.exercise);
                $('#exercise-1 .u_l_c').val(matchingEntryExercises.round1.exercise1.ulc);
                $('#exercise-1 .muscleGroups').val(matchingEntryExercises.round1.exercise1.musclGroups);
                $('#exercise-1 .modality').val(matchingEntryExercises.round1.exercise1.modality);
                $('#exercise-1 .level').val(matchingEntryExercises.round1.exercise1.level);
                $('#exercise-1 .notes').val(matchingEntryExercises.round1.exercise1.notes);
                $('#exercise-1 #round1SelectReps').val(matchingEntryExercises.round1.exercise1.reps);
                $('#exercise-1 #round1SelectWeight').val(matchingEntryExercises.round1.exercise1.weight);

                $('#exercise-2 .exercises').val(matchingEntryExercises.round1.exercise2.exercise);
                $('#exercise-2 .u_l_c').val(matchingEntryExercises.round1.exercise2.ulc);
                $('#exercise-2 .muscleGroups').val(matchingEntryExercises.round1.exercise2.musclGroups);
                $('#exercise-2 .modality').val(matchingEntryExercises.round1.exercise2.modality);
                $('#exercise-2 .level').val(matchingEntryExercises.round1.exercise2.level);
                $('#exercise-2 .notes').val(matchingEntryExercises.round1.exercise2.notes);
                $('#exercise-2 #round1SelectReps').val(matchingEntryExercises.round1.exercise2.reps);
                $('#exercise-2 #round1SelectWeight').val(matchingEntryExercises.round1.exercise2.weight);

                $('#exercise-3 .exercises').val(matchingEntryExercises.round1.exercise3.exercise);
                $('#exercise-3 .u_l_c').val(matchingEntryExercises.round1.exercise3.ulc);
                $('#exercise-3 .muscleGroups').val(matchingEntryExercises.round1.exercise3.musclGroups);
                $('#exercise-3 .modality').val(matchingEntryExercises.round1.exercise3.modality);
                $('#exercise-3 .level').val(matchingEntryExercises.round1.exercise3.level);
                $('#exercise-3 .notes').val(matchingEntryExercises.round1.exercise3.notes);
                $('#exercise-3 #round1SelectReps').val(matchingEntryExercises.round1.exercise3.reps);
                $('#exercise-3 #round1SelectWeight').val(matchingEntryExercises.round1.exercise3.weight);

                $('#exercise-4 .exercises').val(matchingEntryExercises.round1.exercise4.exercise);
                $('#exercise-4 .u_l_c').val(matchingEntryExercises.round1.exercise4.ulc);
                $('#exercise-4 .muscleGroups').val(matchingEntryExercises.round1.exercise4.musclGroups);
                $('#exercise-4 .modality').val(matchingEntryExercises.round1.exercise4.modality);
                $('#exercise-4 .level').val(matchingEntryExercises.round1.exercise4.level);
                $('#exercise-4 .notes').val(matchingEntryExercises.round1.exercise4.notes);
                $('#exercise-4 #round1SelectReps').val(matchingEntryExercises.round1.exercise4.reps);
                $('#exercise-4 #round1SelectWeight').val(matchingEntryExercises.round1.exercise4.weight);

                $('#exercise-5 .exercises').val(matchingEntryExercises.round2.exercise1.exercise);
                $('#exercise-5 .u_l_c').val(matchingEntryExercises.round2.exercise1.ulc);
                $('#exercise-5 .muscleGroups').val(matchingEntryExercises.round2.exercise1.musclGroups);
                $('#exercise-5 .modality').val(matchingEntryExercises.round2.exercise1.modality);
                $('#exercise-5 .level').val(matchingEntryExercises.round2.exercise1.level);
                $('#exercise-5 .notes').val(matchingEntryExercises.round2.exercise1.notes);
                $('#exercise-5 #round1SelectReps').val(matchingEntryExercises.round2.exercise1.reps);
                $('#exercise-5 #round1SelectWeight').val(matchingEntryExercises.round2.exercise1.weight);

                $('#exercise-6 .exercises').val(matchingEntryExercises.round2.exercise2.exercise);
                $('#exercise-6 .u_l_c').val(matchingEntryExercises.round2.exercise2.ulc);
                $('#exercise-6 .muscleGroups').val(matchingEntryExercises.round2.exercise2.musclGroups);
                $('#exercise-6 .modality').val(matchingEntryExercises.round2.exercise2.modality);
                $('#exercise-6 .level').val(matchingEntryExercises.round2.exercise2.level);
                $('#exercise-6 .notes').val(matchingEntryExercises.round2.exercise2.notes);
                $('#exercise-6 #round1SelectReps').val(matchingEntryExercises.round2.exercise2.reps);
                $('#exercise-6 #round1SelectWeight').val(matchingEntryExercises.round2.exercise2.weight);

                $('#exercise-7 .exercises').val(matchingEntryExercises.round2.exercise3.exercise);
                $('#exercise-7 .u_l_c').val(matchingEntryExercises.round2.exercise3.ulc);
                $('#exercise-7 .muscleGroups').val(matchingEntryExercises.round2.exercise3.musclGroups);
                $('#exercise-7 .modality').val(matchingEntryExercises.round2.exercise3.modality);
                $('#exercise-7 .level').val(matchingEntryExercises.round2.exercise3.level);
                $('#exercise-7 .notes').val(matchingEntryExercises.round2.exercise3.notes);
                $('#exercise-7 #round1SelectReps').val(matchingEntryExercises.round2.exercise3.reps);
                $('#exercise-7 #round1SelectWeight').val(matchingEntryExercises.round2.exercise3.weight);

                $('#exercise-8 .exercises').val(matchingEntryExercises.round2.exercise4.exercise);
                $('#exercise-8 .u_l_c').val(matchingEntryExercises.round2.exercise4.ulc);
                $('#exercise-8 .muscleGroups').val(matchingEntryExercises.round2.exercise4.musclGroups);
                $('#exercise-8 .modality').val(matchingEntryExercises.round2.exercise4.modality);
                $('#exercise-8 .level').val(matchingEntryExercises.round2.exercise4.level);
                $('#exercise-8 .notes').val(matchingEntryExercises.round2.exercise4.notes);
                $('#exercise-8 #round1SelectReps').val(matchingEntryExercises.round2.exercise4.reps);
                $('#exercise-8 #round1SelectWeight').val(matchingEntryExercises.round2.exercise4.weight);

                $('#exercise-9 .exercises').val(matchingEntryExercises.round3.exercise1.exercise);
                $('#exercise-9 .u_l_c').val(matchingEntryExercises.round3.exercise1.ulc);
                $('#exercise-9 .muscleGroups').val(matchingEntryExercises.round3.exercise1.musclGroups);
                $('#exercise-9 .modality').val(matchingEntryExercises.round3.exercise1.modality);
                $('#exercise-9 .level').val(matchingEntryExercises.round3.exercise1.level);
                $('#exercise-9 .notes').val(matchingEntryExercises.round3.exercise1.notes);
                $('#exercise-9 #round1SelectReps').val(matchingEntryExercises.round3.exercise1.reps);
                $('#exercise-9 #round1SelectWeight').val(matchingEntryExercises.round3.exercise1.weight);

                $('#exercise-10 .exercises').val(matchingEntryExercises.round3.exercise2.exercise);
                $('#exercise-10 .u_l_c').val(matchingEntryExercises.round3.exercise2.ulc);
                $('#exercise-10 .muscleGroups').val(matchingEntryExercises.round3.exercise2.musclGroups);
                $('#exercise-10 .modality').val(matchingEntryExercises.round3.exercise2.modality);
                $('#exercise-10 .level').val(matchingEntryExercises.round3.exercise2.level);
                $('#exercise-10 .notes').val(matchingEntryExercises.round3.exercise2.notes);
                $('#exercise-10 #round1SelectReps').val(matchingEntryExercises.round3.exercise2.reps);
                $('#exercise-10 #round1SelectWeight').val(matchingEntryExercises.round3.exercise2.weight);

                $('#exercise-11 .exercises').val(matchingEntryExercises.round3.exercise3.exercise);
                $('#exercise-11 .u_l_c').val(matchingEntryExercises.round3.exercise3.ulc);
                $('#exercise-11 .muscleGroups').val(matchingEntryExercises.round3.exercise3.musclGroups);
                $('#exercise-11 .modality').val(matchingEntryExercises.round3.exercise3.modality);
                $('#exercise-11 .level').val(matchingEntryExercises.round3.exercise3.level);
                $('#exercise-11 .notes').val(matchingEntryExercises.round3.exercise3.notes);
                $('#exercise-11 #round1SelectReps').val(matchingEntryExercises.round3.exercise3.reps);
                $('#exercise-11 #round1SelectWeight').val(matchingEntryExercises.round3.exercise3.weight);

                $('#exercise-12 .exercises').val(matchingEntryExercises.round3.exercise4.exercise);
                $('#exercise-12 .u_l_c').val(matchingEntryExercises.round3.exercise4.ulc);
                $('#exercise-12 .muscleGroups').val(matchingEntryExercises.round3.exercise4.musclGroups);
                $('#exercise-12 .modality').val(matchingEntryExercises.round3.exercise4.modality);
                $('#exercise-12 .level').val(matchingEntryExercises.round3.exercise4.level);
                $('#exercise-12 .notes').val(matchingEntryExercises.round3.exercise4.notes);
                $('#exercise-12 #round1SelectReps').val(matchingEntryExercises.round3.exercise4.reps);
                $('#exercise-12 #round1SelectWeight').val(matchingEntryExercises.round3.exercise4.weight);

                $('#exercise-13 .exercises').val(matchingEntryExercises.round4.exercise1.exercise);
                $('#exercise-13 .u_l_c').val(matchingEntryExercises.round4.exercise1.ulc);
                $('#exercise-13 .muscleGroups').val(matchingEntryExercises.round4.exercise1.musclGroups);
                $('#exercise-13 .modality').val(matchingEntryExercises.round4.exercise1.modality);
                $('#exercise-13 .level').val(matchingEntryExercises.round4.exercise1.level);
                $('#exercise-13 .notes').val(matchingEntryExercises.round4.exercise1.notes);
                $('#exercise-13 #round1SelectReps').val(matchingEntryExercises.round4.exercise1.reps);
                $('#exercise-13 #round1SelectWeight').val(matchingEntryExercises.round4.exercise1.weight);

                $('#exercise-14 .exercises').val(matchingEntryExercises.round4.exercise2.exercise);
                $('#exercise-14 .u_l_c').val(matchingEntryExercises.round4.exercise2.ulc);
                $('#exercise-14 .muscleGroups').val(matchingEntryExercises.round4.exercise2.musclGroups);
                $('#exercise-14 .modality').val(matchingEntryExercises.round4.exercise2.modality);
                $('#exercise-14 .level').val(matchingEntryExercises.round4.exercise2.level);
                $('#exercise-14 .notes').val(matchingEntryExercises.round4.exercise2.notes);
                $('#exercise-14 #round1SelectReps').val(matchingEntryExercises.round4.exercise2.reps);
                $('#exercise-14 #round1SelectWeight').val(matchingEntryExercises.round4.exercise2.weight);

                $('#exercise-15 .exercises').val(matchingEntryExercises.round4.exercise3.exercise);
                $('#exercise-15 .u_l_c').val(matchingEntryExercises.round4.exercise3.ulc);
                $('#exercise-15 .muscleGroups').val(matchingEntryExercises.round4.exercise3.musclGroups);
                $('#exercise-15 .modality').val(matchingEntryExercises.round4.exercise3.modality);
                $('#exercise-15 .level').val(matchingEntryExercises.round4.exercise3.level);
                $('#exercise-15 .notes').val(matchingEntryExercises.round4.exercise3.notes);
                $('#exercise-15 #round1SelectReps').val(matchingEntryExercises.round4.exercise3.reps);
                $('#exercise-15 #round1SelectWeight').val(matchingEntryExercises.round4.exercise3.weight);

                $('#exercise-16 .exercises').val(matchingEntryExercises.round4.exercise4.exercise);
                $('#exercise-16 .u_l_c').val(matchingEntryExercises.round4.exercise4.ulc);
                $('#exercise-16 .muscleGroups').val(matchingEntryExercises.round4.exercise4.musclGroups);
                $('#exercise-16 .modality').val(matchingEntryExercises.round4.exercise4.modality);
                $('#exercise-16 .level').val(matchingEntryExercises.round4.exercise4.level);
                $('#exercise-16 .notes').val(matchingEntryExercises.round4.exercise4.notes);
                $('#exercise-16 #round1SelectReps').val(matchingEntryExercises.round4.exercise4.reps);
                $('#exercise-16 #round1SelectWeight').val(matchingEntryExercises.round4.exercise4.weight);
            });
        }
    }

    // Listen for submission
    $(".editAppointmentsPage .submit").click(function () {
        // Check if name, location or date are empty
        if ($('#clientName').val() == '' || $('#date').val() == '' || $('#locationName').val() == '') {
            alert('Name location and date are required.')
            return;
        }
        // Check if "No Show" has been selected
        if ($('.noShow').hasClass('checked')) {
            // Create object with "No Show" data
            let exerciseLog = {
                [clientKey]: {
                    info: {
                        client: $('#clientName').val(),
                        trainer: $('.trainerName').val(),
                        date: $('#date').val(),
                        last_updated: $('#date').val(),
                        location: $('#locationName').val().split(', ')[0],
                        state: $('#locationName').val().split(', ')[1],
                        no_show: "true"
                    },
                    exercises: {
                        round1: {
                            exercise1: {
                                exercise: 'NA',
                                ulc: 'NA',
                                musclGroups: 'NA',
                                modality: 'NA',
                                level: 'NA',
                                reps: 'NA',
                                weight: 'NA'
                            },
                            exercise2: {
                                exercise: 'NA',
                                ulc: 'NA',
                                musclGroups: 'NA',
                                modality: 'NA',
                                level: 'NA',
                                reps: 'NA',
                                weight: 'NA'
                            },
                            exercise3: {
                                exercise: 'NA',
                                ulc: 'NA',
                                musclGroups: 'NA',
                                modality: 'NA',
                                level: 'NA',
                                reps: 'NA',
                                weight: 'NA'
                            },
                            exercise4: {
                                exercise: 'NA',
                                ulc: 'NA',
                                musclGroups: 'NA',
                                modality: 'NA',
                                level: 'NA',
                                reps: 'NA',
                                weight: 'NA'
                            },
                        },
                        round2: {
                            exercise1: {
                                exercise: 'NA',
                                ulc: 'NA',
                                musclGroups: 'NA',
                                modality: 'NA',
                                level: 'NA',
                                reps: 'NA',
                                weight: 'NA'
                            },
                            exercise2: {
                                exercise: 'NA',
                                ulc: 'NA',
                                musclGroups: 'NA',
                                modality: 'NA',
                                level: 'NA',
                                reps: 'NA',
                                weight: 'NA'
                            },
                            exercise3: {
                                exercise: 'NA',
                                ulc: 'NA',
                                musclGroups: 'NA',
                                modality: 'NA',
                                level: 'NA',
                                reps: 'NA',
                                weight: 'NA'
                            },
                            exercise4: {
                                exercise: 'NA',
                                ulc: 'NA',
                                musclGroups: 'NA',
                                modality: 'NA',
                                level: 'NA',
                                reps: 'NA',
                                weight: 'NA'
                            },
                        },
                        round3: {
                            exercise1: {
                                exercise: 'NA',
                                ulc: 'NA',
                                musclGroups: 'NA',
                                modality: 'NA',
                                level: 'NA',
                                reps: 'NA',
                                weight: 'NA'
                            },
                            exercise2: {
                                exercise: 'NA',
                                ulc: 'NA',
                                musclGroups: 'NA',
                                modality: 'NA',
                                level: 'NA',
                                reps: 'NA',
                                weight: 'NA'
                            },
                            exercise3: {
                                exercise: 'NA',
                                ulc: 'NA',
                                musclGroups: 'NA',
                                modality: 'NA',
                                level: 'NA',
                                reps: 'NA',
                                weight: 'NA'
                            },
                            exercise4: {
                                exercise: 'NA',
                                ulc: 'NA',
                                musclGroups: 'NA',
                                modality: 'NA',
                                level: 'NA',
                                reps: 'NA',
                                weight: 'NA'
                            },
                        },
                        round4: {
                            exercise1: {
                                exercise: 'NA',
                                ulc: 'NA',
                                musclGroups: 'NA',
                                modality: 'NA',
                                level: 'NA',
                                reps: 'NA',
                                weight: 'NA'
                            },
                            exercise2: {
                                exercise: 'NA',
                                ulc: 'NA',
                                musclGroups: 'NA',
                                modality: 'NA',
                                level: 'NA',
                                reps: 'NA',
                                weight: 'NA'
                            },
                            exercise3: {
                                exercise: 'NA',
                                ulc: 'NA',
                                musclGroups: 'NA',
                                modality: 'NA',
                                level: 'NA',
                                reps: 'NA',
                                weight: 'NA'
                            },
                            exercise4: {
                                exercise: 'NA',
                                ulc: 'NA',
                                musclGroups: 'NA',
                                modality: 'NA',
                                level: 'NA',
                                reps: 'NA',
                                weight: 'NA'
                            },
                        },
                    }
                }
            }
            // Log results to the console for now
            console.log(exerciseLog);
            appointmentsRef.update(exerciseLog, (error) => {
                if (error) {
                    alert(error)
                } else {
                    alert('Data saved successfully!')
                }
            });
            return;
        } else {

            // Check if any important fields are empty
            if ($('.roundContainer .round-1.exercises').val() == '' || $('.roundContainer .round-1.exercises').val() == '') {
                alert('Log is incomplete.');
                return;
            }

            // Instantiate log results array
            let logResults = [];

            // Push input values into log results array
            $('.exerciseLog .form-control').each(function (i, obj) {
                logResults.push($(obj).val());
            });

            var d = new Date(),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            let lastUpdated = [year, month, day].join('-');

            // Create exercise log object
            let exerciseLog = {
                [clientKey]: {
                    info: {
                        client: $('#clientName').val(),
                        trainer: $('.trainerName').val(),
                        date: $('#date').val(),
                        last_updated: lastUpdated,
                        location: $('#locationName').val().split(', ')[0],
                        state: $('#locationName').val().split(', ')[1],
                        no_show: "false"
                    },
                    exercises: {
                        round1: {
                            exercise1: {
                                exercise: $('.exercises.exercise-1').val(),
                                ulc: $('.u_l_c.exercise-1').val(),
                                musclGroups: $('.muscleGroups.exercise-1').val(),
                                modality: $('.modality.exercise-1').val(),
                                reps: $('.reps.exercise-1').val(),
                                weight: $('.weight.exercise-1').val(),
                                notes: $('.notes.exercise-1').val()
                            },
                            exercise2: {
                                exercise: $('.exercises.exercise-2').val(),
                                ulc: $('.u_l_c.exercise-2').val(),
                                musclGroups: $('.muscleGroups.exercise-2').val(),
                                modality: $('.modality.exercise-2').val(),
                                reps: $('.reps.exercise-2').val(),
                                weight: $('.weight.exercise-2').val(),
                                notes: $('.notes.exercise-2').val()
                            },
                            exercise3: {
                                exercise: $('.exercises.exercise-3').val(),
                                ulc: $('.u_l_c.exercise-3').val(),
                                musclGroups: $('.muscleGroups.exercise-3').val(),
                                modality: $('.modality.exercise-3').val(),
                                reps: $('.reps.exercise-3').val(),
                                weight: $('.weight.exercise-3').val(),
                                notes: $('.notes.exercise-3').val()
                            },
                            exercise4: {
                                exercise: $('.exercises.exercise-4').val(),
                                ulc: $('.u_l_c.exercise-4').val(),
                                musclGroups: $('.muscleGroups.exercise-4').val(),
                                modality: $('.modality.exercise-4').val(),
                                reps: $('.reps.exercise-4').val(),
                                weight: $('.weight.exercise-4').val(),
                                notes: $('.notes.exercise-4').val()
                            },
                        },
                        round2: {
                            exercise1: {
                                exercise: $('.exercises.exercise-5').val(),
                                ulc: $('.u_l_c.exercise-5').val(),
                                musclGroups: $('.muscleGroups.exercise-5').val(),
                                modality: $('.modality.exercise-5').val(),
                                reps: $('.reps.exercise-5').val(),
                                weight: $('.weight.exercise-5').val(),
                                notes: $('.notes.exercise-5').val()
                            },
                            exercise2: {
                                exercise: $('.exercises.exercise-6').val(),
                                ulc: $('.u_l_c.exercise-6').val(),
                                musclGroups: $('.muscleGroups.exercise-6').val(),
                                modality: $('.modality.exercise-6').val(),
                                reps: $('.reps.exercise-6').val(),
                                weight: $('.weight.exercise-6').val(),
                                notes: $('.notes.exercise-6').val()
                            },
                            exercise3: {
                                exercise: $('.exercises.exercise-7').val(),
                                ulc: $('.u_l_c.exercise-7').val(),
                                musclGroups: $('.muscleGroups.exercise-7').val(),
                                modality: $('.modality.exercise-7').val(),
                                reps: $('.reps.exercise-7').val(),
                                weight: $('.weight.exercise-7').val(),
                                notes: $('.notes.exercise-7').val()
                            },
                            exercise4: {
                                exercise: $('.exercises.exercise-8').val(),
                                ulc: $('.u_l_c.exercise-8').val(),
                                musclGroups: $('.muscleGroups.exercise-8').val(),
                                modality: $('.modality.exercise-8').val(),
                                reps: $('.reps.exercise-8').val(),
                                weight: $('.weight.exercise-8').val(),
                                notes: $('.notes.exercise-8').val()
                            },
                        },
                        round3: {
                            exercise1: {
                                exercise: $('.exercises.exercise-9').val(),
                                ulc: $('.u_l_c.exercise-9').val(),
                                musclGroups: $('.muscleGroups.exercise-9').val(),
                                modality: $('.modality.exercise-9').val(),
                                reps: $('.reps.exercise-9').val(),
                                weight: $('.weight.exercise-9').val(),
                                notes: $('.notes.exercise-9').val()
                            },
                            exercise2: {
                                exercise: $('.exercises.exercise-10').val(),
                                ulc: $('.u_l_c.exercise-10').val(),
                                musclGroups: $('.muscleGroups.exercise-10').val(),
                                modality: $('.modality.exercise-10').val(),
                                reps: $('.reps.exercise-10').val(),
                                weight: $('.weight.exercise-10').val(),
                                notes: $('.notes.exercise-10').val()
                            },
                            exercise3: {
                                exercise: $('.exercises.exercise-11').val(),
                                ulc: $('.u_l_c.exercise-11').val(),
                                musclGroups: $('.muscleGroups.exercise-11').val(),
                                modality: $('.modality.exercise-11').val(),
                                reps: $('.reps.exercise-11').val(),
                                weight: $('.weight.exercise-11').val(),
                                notes: $('.notes.exercise-11').val()
                            },
                            exercise4: {
                                exercise: $('.exercises.exercise-12').val(),
                                ulc: $('.u_l_c.exercise-12').val(),
                                musclGroups: $('.muscleGroups.exercise-12').val(),
                                modality: $('.modality.exercise-12').val(),
                                reps: $('.reps.exercise-12').val(),
                                weight: $('.weight.exercise-12').val(),
                                notes: $('.notes.exercise-12').val()
                            },
                        },
                        round4: {
                            exercise1: {
                                exercise: $('.exercises.exercise-13').val(),
                                ulc: $('.u_l_c.exercise-13').val(),
                                musclGroups: $('.muscleGroups.exercise-13').val(),
                                modality: $('.modality.exercise-13').val(),
                                reps: $('.reps.exercise-13').val(),
                                weight: $('.weight.exercise-13').val(),
                                notes: $('.notes.exercise-13').val()
                            },
                            exercise2: {
                                exercise: $('.exercises.exercise-14').val(),
                                ulc: $('.u_l_c.exercise-14').val(),
                                musclGroups: $('.muscleGroups.exercise-14').val(),
                                modality: $('.modality.exercise-14').val(),
                                reps: $('.reps.exercise-14').val(),
                                weight: $('.weight.exercise-14').val(),
                                notes: $('.notes.exercise-14').val()
                            },
                            exercise3: {
                                exercise: $('.exercises.exercise-15').val(),
                                ulc: $('.u_l_c.exercise-15').val(),
                                musclGroups: $('.muscleGroups.exercise-15').val(),
                                modality: $('.modality.exercise-15').val(),
                                reps: $('.reps.exercise-15').val(),
                                weight: $('.weight.exercise-15').val(),
                                notes: $('.notes.exercise-15').val()
                            },
                            exercise4: {
                                exercise: $('.exercises.exercise-16').val(),
                                ulc: $('.u_l_c.exercise-16').val(),
                                musclGroups: $('.muscleGroups.exercise-16').val(),
                                modality: $('.modality.exercise-16').val(),
                                reps: $('.reps.exercise-16').val(),
                                weight: $('.weight.exercise-16').val(),
                                notes: $('.notes.exercise-16').val()
                            },
                        },
                    }
                    }
            }
            // Log results to the console for now
            console.log(exerciseLog);
            appointmentsRef.update(exerciseLog, (error) => {
                if (error) {
                    alert(error)
                } else {
                    alert('Data saved successfully!')
                }
            });
        }
    });
});
