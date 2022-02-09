// const baseURL = 'https://jnashconsulting.com/nexgenfitness';
const baseURL = '';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA9GzcyqiMtv4iinJRJ4EdvlNN7ry4IRR8",
    authDomain: "nexgenfitness-2021.firebaseapp.com",
    databaseURL: "https://nexgenfitness-2021-default-rtdb.firebaseio.com",
    projectId: "nexgenfitness-2021",
};
firebase.initializeApp(config);

const clientsRef = firebase.database().ref('/people/clients');
const exerciseRef = firebase.database().ref('/exercises');
const trainerRef = firebase.database().ref('/people/staff');
const locationRef = firebase.database().ref('/locations');
const appointmentsRef = firebase.database().ref('/appointments');

// Look through client node
clientsRef.on('value', function (snapshot) {
    // Get snapshot value
    let result = snapshot.val();

    // Instantiate arrays
    let clientNames = [];
    let clientDetails = [];
    let appointmentDetails = [];
    let appointmentArray = [];

    // Loop through clients
    for (const [key, value] of Object.entries(result)) {
        // Get keys
        let clientKey = `${key}`;

        // Get age
        let clientAge = getAge(result[clientKey].personal.dob)

        // Push names into array in preparation for autocomplete
        clientNames.push(result[clientKey].personal.name);

        // Create new object with details for table
        clientDetails.push({
            name: result[clientKey].personal.name,
            age: clientAge,
            dob: result[clientKey].personal.dob,
            gender: result[clientKey].personal.gender,
            notes: result[clientKey].client_notes.general,
            status: result[clientKey].status
        });
    }

    // Add client names to autocomplete
    $("#clientName").autocomplete({
        source: clientNames
    });

    // Loop through client details
    clientDetails.forEach(function (res) {
        // Create badge colors
        let statusColor;
        if (res.status == 'Active') {
            statusColor = 'success';
        } else {
            statusColor = 'danger';
        }

        // Clear all data in table
        $('.clientTable tbody').html('');
        // Fill in table
        setTimeout(() => {
            $('.clientTable tbody').append('<tr> <td class="clientDetailLink">' + res.name + '</td> <td>' + res.gender + '</td> <td>' + res.age + '</td>  <td>' + res.dob + '</td> <td><label class="badge badge-' + statusColor + '">' + res.status + '</label></td> </tr>');
        }, 100);
    });
});

// Function to get years from today
function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Look through exercise node
exerciseRef.on('value', function (snapshot) {
    // Get snapshot value
    let result = snapshot.val();

    // Instantiate arrays
    let exerciseArray = [];
    let exerciseNames = [];

    // Loop through exercises
    for (const prop in result) {
        exerciseArray.push(result[prop]);
        exerciseNames.push(result[prop].Exercise);
    }
    // console.log(exerciseArray);

    if (window.location.href.indexOf("editExercise.html") > -1) {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const eid = urlSearchParams.get('exercise');
        $('#name').val(exerciseArray[eid].Exercise);
        $('#ulc').val(exerciseArray[eid].U_L_C);
        $('#muscleGroup').val(exerciseArray[eid].Muscle_Group);
        $('#modality').val(exerciseArray[eid].Modality);
        $('#video').val(exerciseArray[eid].video);
        $('#difficulty').val(exerciseArray[eid].Difficulty);
    }

    // Add autocomplete to each exercise input
    $('.exercises').each(function (i, obj) {
        // Add exercise names to autocomplete
        $(obj).autocomplete({
            source: exerciseNames,
            select: function (e, ui) {
                // Get which exercise number
                let exerciseNum = e.target.classList[2];

                // Update exercise array for each round
                exerciseArray.forEach(function (res) {
                    if (res.Exercise == ui.item.label) {
                        $('.muscleGroups.' + exerciseNum).val(res.Muscle_Group);
                        $('.u_l_c.' + exerciseNum).val(res.U_L_C)
                        $('.modality.' + exerciseNum).val(res.Modality);
                        $('.level.' + exerciseNum).val(res.Difficulty);
                    }
                })
            }
        });
    });

    exerciseArray.forEach(function (res, index) {
        let video;
        // Create badge colors
        let levelColor;
        if (res.Difficulty == 'Beginner') {
            levelColor = 'success';
        } else if (res.Difficulty == 'Intermediate') {
            levelColor = 'warning';
        } else {
            levelColor = 'danger'
        };

        if (res.video) {
            video = '<a target="_blank" href="' + res.video + '"><span style="font-size:1.5em" class="mdi mdi-video"></span></a>'
        } else {
            video = '<span style="font-size:1.5em; opacity:0.25" class="mdi mdi-video-off"></span>'
        }

        // Fill in table
        $('.exerciseTable tbody').append('<tr> <td class="exerciseName" id="exercise_' + index + '">' + res.Exercise + '</td> <td>' + res.Muscle_Group + '</td> <td>' + res.U_L_C + '</td> <td>' + res.Modality + '</td> <td><label class="badge badge-' + levelColor + '">' + res.Difficulty + '</label></td><td>' + video + '</td></tr>')
    });
});

// Look through trainer node
trainerRef.on('value', function (snapshot) {
    // Get snapshot value
    let result = snapshot.val();

    // Instantiate arrays
    let trainerDetails = []
    let appointmentTotal = [];

    // Loop through trainer keys
    for (const [key, value] of Object.entries(result)) {
        // Get key
        let trainerName = `${key}`;

        // Get age and tenure
        let trainerTenure = getAge(result[trainerName].start_date);
        let age = getAge(result[trainerName].personal.dob);

        // Get appointment total
        if (result[trainerName].appointments) {
            appointmentTotal = Object.keys(result[trainerName].appointments).length;
        } else {
            appointmentTotal = 0;
        }

        // Create new object with details for table
        trainerDetails.push({
            age: age,
            name: result[trainerName].personal.name,
            tenure: trainerTenure,
            location: result[trainerName].location,
            gender: result[trainerName].personal.gender,
            notes: result[trainerName].notes.general,
            status: result[trainerName].status,
            appointments: appointmentTotal
        });
    }

    // Loop through trainer details
    trainerDetails.forEach(function (res) {
        // Create badge colors
        let statusColor;
        if (res.status == 'Active') {
            statusColor = 'success';
        } else {
            statusColor = 'danger';
        }

        // Clear all data in table
        $('.staffTable tbody').html('');

        // Fill in data after 100ms
        setTimeout(() => {
            $('.staffTable tbody').append('<tr> <td class="trainerDetailLink">' + res.name + '</td> <td>' + res.gender + '</td> <td>' + res.age + '</td> <td>' + res.tenure + '</td>  <td>' + res.location + '</td> <td><label class="badge badge-' + statusColor + '">' + res.status + '</label></td> </tr>')
        }, 100);
    });
});

// ******* Location ******* //
// Look through location node
locationRef.on('value', function (snapshot) {
    // Get snapshot value
    let result = snapshot.val();

    // Instantiate arrays
    let stateNames = [];
    let locationsByState = [];
    let individualLocations = [];

    // Loop through the keys
    for (const [key, value] of Object.entries(result)) {
        let location = `${key}`;
        individualLocations.push(location.split('_')[1].replace('-', ' ') + ', ' + location.split('_')[0]);
        stateNames.push(location.split('_')[0]);

        locationsByState.push({
            state: location.split('_')[0],
            location: location.split('_')[1],
            appointments: result[location].appointments,
            clients: result[location].clients,
            trainers: result[location].trainers
        });
    }

    // Remove duplicates
    stateNames = [...new Set(stateNames)];

    // Loop through states
    stateNames.forEach(function (res) {
        $('.locationPage .card-body').append('<h5 style="margin-top: 30px;">' + res.replace('-', ' ') + '</h5><div class="table-responsive" style="border-bottom: 1px solid #ddd"><table class="table locationsTable ' + res.replace(/\s/g, '') + '"><thead><tr class="headers"><td>Location</td><td>Trainers</td><td>Clients</td><td>Appointments</td></tr></thead><tbody></tbody></table></div><br>')
    });

    locationsByState.forEach(function (res) {
        setTimeout(() => {
            $('.locationsTable.' + res.state.replace(/\s/g, '') + ' tbody').append('<tr><td>' + res.location.replace('-', ' ') + '</td><td>' + res.trainers + '</td><td>' + res.clients + '</td><td>' + res.appointments + '</td></tr>')
        }, 300);
    });


    // Add names to the autocomplete
    $('#locationName').autocomplete({
        source: individualLocations
    });
});

// Get today's date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;
$('#date').val(today);

// Submit new client info
$('.addClientPage .submit').click(function () {
    if ($('.name').val() == '' || $('#email').val() == '' || $('.gender').val() == '' || $('#date').val() == '' || $('.height').val() == '') {
        alert('Name, email, gender, dob are required.');
        return;
    } else {
        let key = $('.name').val().replace(/ /g, "_");
        let name = $('.name').val();
        let email = $('#email').val();
        let gender = $('.gender').val();
        let dob = $('#date').val();
        let height = $('.height').val();
        let physical_problems = $('.physicalProblems').val();
        let notes = $('.notes').val();
        let weight = $('.weight').val();
        let clientInfo = {
            [key]: {
                personal: {
                    age: getAge(dob),
                    dob: dob,
                    email: email,
                    gender: gender,
                    height: height,
                    weight: weight,
                    name: name
                },
                status: 'Active',
                physical_problems: null ?? physical_problems,
                client_notes: null ?? notes
            }
        }

        clientsRef.update(clientInfo, (error) => {
            if (error) {
                alert(error)
            } else {
                alert('Client successfully updated!')
            }
        });
    }
});

// Edit client info
$('.editClientPage .submit').click(function () {
    if ($('.name').val() == '' || $('#email').val() == '' || $('.gender').val() == '' || $('#date').val() == '' || $('.height').val() == '') {
        alert('Name, email, gender, dob are required.');
        return;
    } else {
        let key = $('.name').val().replace(/ /g, "_");
        let name = $('.name').val();
        let email = $('#email').val();
        let gender = $('.gender').val();
        let fullDate = $('#date').val().split('-');
        let yr = fullDate[0];
        let mo = fullDate[1];
        let dy = fullDate[2];
        let dob = mo + '-' + dy + '-' + yr;
        let height = $('.height').val();
        let physical_problems = $('.physicalProblems').val();
        let notes = $('.notes').val();
        let weight = $('.weight').val();
        let clientInfo = {
            [key]: {
                personal: {
                    age: getAge(dob),
                    dob: dob,
                    email: email,
                    gender: gender,
                    height: height,
                    weight: weight,
                    name: name
                },
                status: 'Active',
                physical_problems: null ?? physical_problems,
                client_notes: null ?? notes
            }
        }
        // console.log(clientInfo);
        clientsRef.update(clientInfo, (error) => {
            if (error) {
                alert(error)
            } else {
                alert('Client successfully updated!')
            }
        });
    }
});

$('.clientDetailPage .submit').click(function () {
    location.replace(baseURL + '/pages/editClient.html?client=' + $('.name').html().replace(/\s/g, '_'))
});

// Add new exercise
$('.addExercisePage .submit').click(function () {
    $('#name').val();
    $('#ulc').val();
    $('#muscleGroup').val();
    $('#modality').val();
    $('#video').val();
    $('#difficulty').val();
});

// Collect appointment log info on submit
$(".planAppointmentsPage .submit").click(function () {
    // Check if name, location or date are empty
    if ($('#clientName').val() == '' || $('#date').val() == '' || $('#locationName').val() == '') {
        alert('Name location and date are required.')
        return;
    }
    // Check if "No Show" has been selected
    if ($('.noShow').hasClass('checked')) {
        // Create object with "No Show" data
        let exerciseLog = {
            [Date.now() + '|' + $('#locationName').val().split(', ')[0].replace(/ /g, "_") + '|' + $('#locationName').val().split(', ')[1] + '|' + $('#clientName').val().replace(/ /g, "_") + '|' + $('.trainerName').val().replace(/ /g, "_")]: {
                info: {
                    client: $('#clientName').val(),
                    trainer: $('.trainerName').val(),
                    date: $('#date').val(),
                    last_updated: $('#date').val(),
                    location: $('#locationName').val(),
                    no_show: "true"
                },
                exercises: {
                    round1: 'NA',
                    round2: 'NA',
                    round3: 'NA',
                    round4: 'NA'
                }
            }
        }
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

        // Create exercise log object
        let exerciseLog = {
            [Date.now() + '|' + $('#locationName').val().split(', ')[0].replace(/ /g, "_") + '|' + $('#locationName').val().split(', ')[1] + '|' + $('#clientName').val().replace(/ /g, "_") + '|' + $('.trainerName').val().replace(/ /g, "_")]: {
                info: {
                    client: $('#clientName').val(),
                    trainer: $('.trainerName').val(),
                    date: $('#date').val(),
                    last_updated: $('#date').val(),
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
                            level: $('.level.exercise-1').val(),
                            reps: $('.reps.exercise-1').val(),
                            weight: $('.weight.exercise-1').val()
                        },
                        exercise2: {
                            exercise: $('.exercises.exercise-2').val(),
                            ulc: $('.u_l_c.exercise-2').val(),
                            musclGroups: $('.muscleGroups.exercise-2').val(),
                            modality: $('.modality.exercise-2').val(),
                            level: $('.level.exercise-2').val(),
                            reps: $('.reps.exercise-2').val(),
                            weight: $('.weight.exercise-2').val()
                        },
                        exercise3: {
                            exercise: $('.exercises.exercise-3').val(),
                            ulc: $('.u_l_c.exercise-3').val(),
                            musclGroups: $('.muscleGroups.exercise-3').val(),
                            modality: $('.modality.exercise-3').val(),
                            level: $('.level.exercise-3').val(),
                            reps: $('.reps.exercise-3').val(),
                            weight: $('.weight.exercise-3').val()
                        },
                        exercise4: {
                            exercise: $('.exercises.exercise-4').val(),
                            ulc: $('.u_l_c.exercise-4').val(),
                            musclGroups: $('.muscleGroups.exercise-4').val(),
                            modality: $('.modality.exercise-4').val(),
                            level: $('.level.exercise-4').val(),
                            reps: $('.reps.exercise-4').val(),
                            weight: $('.weight.exercise-4').val()
                        },
                    },
                    round2: {
                        exercise1: {
                            exercise: $('.exercises.exercise-5').val(),
                            ulc: $('.u_l_c.exercise-5').val(),
                            musclGroups: $('.muscleGroups.exercise-5').val(),
                            modality: $('.modality.exercise-5').val(),
                            level: $('.level.exercise-5').val(),
                            reps: $('.reps.exercise-5').val(),
                            weight: $('.weight.exercise-5').val()
                        },
                        exercise2: {
                            exercise: $('.exercises.exercise-6').val(),
                            ulc: $('.u_l_c.exercise-6').val(),
                            musclGroups: $('.muscleGroups.exercise-6').val(),
                            modality: $('.modality.exercise-6').val(),
                            level: $('.level.exercise-6').val(),
                            reps: $('.reps.exercise-6').val(),
                            weight: $('.weight.exercise-6').val()
                        },
                        exercise3: {
                            exercise: $('.exercises.exercise-7').val(),
                            ulc: $('.u_l_c.exercise-7').val(),
                            musclGroups: $('.muscleGroups.exercise-7').val(),
                            modality: $('.modality.exercise-7').val(),
                            level: $('.level.exercise-7').val(),
                            reps: $('.reps.exercise-7').val(),
                            weight: $('.weight.exercise-7').val()
                        },
                        exercise4: {
                            exercise: $('.exercises.exercise-8').val(),
                            ulc: $('.u_l_c.exercise-8').val(),
                            musclGroups: $('.muscleGroups.exercise-8').val(),
                            modality: $('.modality.exercise-8').val(),
                            level: $('.level.exercise-8').val(),
                            reps: $('.reps.exercise-8').val(),
                            weight: $('.weight.exercise-8').val()
                        },
                    },
                    round3: {
                        exercise1: {
                            exercise: $('.exercises.exercise-9').val(),
                            ulc: $('.u_l_c.exercise-9').val(),
                            musclGroups: $('.muscleGroups.exercise-9').val(),
                            modality: $('.modality.exercise-9').val(),
                            level: $('.level.exercise-9').val(),
                            reps: $('.reps.exercise-9').val(),
                            weight: $('.weight.exercise-9').val()
                        },
                        exercise2: {
                            exercise: $('.exercises.exercise-10').val(),
                            ulc: $('.u_l_c.exercise-10').val(),
                            musclGroups: $('.muscleGroups.exercise-10').val(),
                            modality: $('.modality.exercise-10').val(),
                            level: $('.level.exercise-10').val(),
                            reps: $('.reps.exercise-10').val(),
                            weight: $('.weight.exercise-10').val()
                        },
                        exercise3: {
                            exercise: $('.exercises.exercise-11').val(),
                            ulc: $('.u_l_c.exercise-11').val(),
                            musclGroups: $('.muscleGroups.exercise-11').val(),
                            modality: $('.modality.exercise-11').val(),
                            level: $('.level.exercise-11').val(),
                            reps: $('.reps.exercise-11').val(),
                            weight: $('.weight.exercise-11').val()
                        },
                        exercise4: {
                            exercise: $('.exercises.exercise-12').val(),
                            ulc: $('.u_l_c.exercise-12').val(),
                            musclGroups: $('.muscleGroups.exercise-12').val(),
                            modality: $('.modality.exercise-12').val(),
                            level: $('.level.exercise-12').val(),
                            reps: $('.reps.exercise-12').val(),
                            weight: $('.weight.exercise-12').val()
                        },
                    },
                    round4: {
                        exercise1: {
                            exercise: $('.exercises.exercise-13').val(),
                            ulc: $('.u_l_c.exercise-13').val(),
                            musclGroups: $('.muscleGroups.exercise-13').val(),
                            modality: $('.modality.exercise-13').val(),
                            level: $('.level.exercise-13').val(),
                            reps: $('.reps.exercise-13').val(),
                            weight: $('.weight.exercise-13').val()
                        },
                        exercise2: {
                            exercise: $('.exercises.exercise-14').val(),
                            ulc: $('.u_l_c.exercise-14').val(),
                            musclGroups: $('.muscleGroups.exercise-14').val(),
                            modality: $('.modality.exercise-14').val(),
                            level: $('.level.exercise-14').val(),
                            reps: $('.reps.exercise-14').val(),
                            weight: $('.weight.exercise-14').val()
                        },
                        exercise3: {
                            exercise: $('.exercises.exercise-15').val(),
                            ulc: $('.u_l_c.exercise-15').val(),
                            musclGroups: $('.muscleGroups.exercise-15').val(),
                            modality: $('.modality.exercise-15').val(),
                            level: $('.level.exercise-15').val(),
                            reps: $('.reps.exercise-15').val(),
                            weight: $('.weight.exercise-15').val()
                        },
                        exercise4: {
                            exercise: $('.exercises.exercise-16').val(),
                            ulc: $('.u_l_c.exercise-16').val(),
                            musclGroups: $('.muscleGroups.exercise-16').val(),
                            modality: $('.modality.exercise-16').val(),
                            level: $('.level.exercise-16').val(),
                            reps: $('.reps.exercise-16').val(),
                            weight: $('.weight.exercise-16').val()
                        },
                    },
                }
            }
        }

        appointmentsRef.update(exerciseLog, (error) => {
            if (error) {
                alert(error)
            } else {
                alert('Data saved successfully!')
            }
        });
    }
});

// Keep copyright year up-to-date
$('.copyrightYear').html(new Date().getFullYear());

// No show checkmark
$('.noShow').click(function () {
    $('.noShow').toggleClass('checked');
    $('.exerciseLog').toggleClass('noShow')
});

// Basic validation for exercise log
let exercises = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

$(document).ready(function () {
    setTimeout(() => {
        checkRoundCompletion();
    }, 1000);
});

// Check if rounds are completed
$('.tab-pane').focusout(function () {
    checkRoundCompletion();
});

function checkRoundCompletion() {
    // console.log('checkRoundCompletion');
    let exercisesEntries = [];
    let exercisesInfo = [];
    let exercisesNum;

    exercises.forEach(function (res) {
        // console.log(res);
        exercisesEntries = [
            $('.exercises.exercise-' + res + ' ').val(),
            $('.reps.exercise-' + res).val(),
            $('.weight.exercise-' + res).val()
        ];
        // console.log(exercisesEntries);
        if (exercisesEntries.includes('') == false) {
            $('#ui-id-' + res).css('background-color', '#00b137 !important').css('border-color','#00b137 !important');
        } else {
            $('#ui-id-' + res).css('background-color', '#242cea !important').css('border-color','#242cea !important');
        };
    });

};

// Listen for backspace and clear selected autocomplete
exercises.forEach(function (res) {
    $('.exercises.exercise-' + res).keyup(function (e) {
        if (e.keyCode == 8) {
            $('.exercises.exercise-' + res).val('')
        }
    });

    $('.exercises.exercise-' + res).focusout(function () {
        if ($('.exercises.exercise-' + res) == '') {
            $('.u_l_c.exercise-' + res).val('');
            $('.muscleGroups.exercise-' + res).val('');
            $('.modality.exercise-' + res).val('');
            $('.level.exercise-' + res).val('');
        }
    })
});

// ********* Header User Info ********* //
// If logged in, add link to member profile
if (localStorage.getItem('name') && localStorage.getItem('email')) {
    $('.trainerName').val(localStorage.getItem('name'));
    $('.trainerEmail').text(localStorage.getItem('email'));
    $('#profile_link').attr('href', baseURL + '/pages/staffDetail.html?trainer=' + localStorage.getItem('name').replace(/\s/g, '_'));

    // Generate acronym
    var matches = localStorage.getItem('name').match(/\b(\w)/g);
    var acronym = matches.join('');
    $('.acronym').html(acronym)
};

// ********* Hide Pages ********* //
// Hide some pages while they're being worked.
let hiddenPages = ['addExercise.html', 'locations.html'];

hiddenPages.forEach(function (res) {
    $('a[href*="' + res + '"]').each(function () {
        $(this).parent().css('display', 'none');
    });
})
