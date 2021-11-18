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

// Look through client node
clientsRef.on('value', function (snapshot) {
    // Get snapshot value
    let result = snapshot.val();

    // Instantiate arrays
    let clientNames = [];
    let clientDetails = []

    // Loop through clients
    for (const [key, value] of Object.entries(result)) {
        // Get keys
        let clientKey = `${key}`;

        // Get age
        let clientAge = getAge(result[clientKey].personal.dob)

        // Push names into array in preparation for autocomplete
        clientNames.push(result[clientKey].personal.name);

        // Get appointment total
        let appointmentTotal = Object.keys(result[clientKey].appointments).length;

        // Create new object with details for table
        clientDetails.push({
            name: result[clientKey].personal.name,
            age: clientAge,
            dob: result[clientKey].personal.dob,
            gender: result[clientKey].personal.gender,
            notes: result[clientKey].client_notes.general,
            status: result[clientKey].status,
            appointments: appointmentTotal
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
            $('.clientTable tbody').append('<tr> <td class="clientDetailLink">' + res.name + '</td> <td>' + res.gender + '</td> <td>' + res.age + '</td>  <td>' + res.dob + '</td> <td>' + res.appointments + '</td> <td><label class="badge badge-' + statusColor + '">' + res.status + '</label></td> </tr>')
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

    // Add exercise names to autocomplete
    $(".round-1 .exercises, .round-2 .exercises, .round-3 .exercises, .round-4 .exercises, .round-5 .exercises, .round-6 .exercises, .round-7 .exercises, .round-8 .exercises, .round-9 .exercises, .round-10 .exercises").autocomplete({
        source: exerciseNames,
        select: function (e, ui) {
            // Identify the parent
            let parent = $(e.target).parent().parent().parent().parent()[0].className.replace(/ /g, '.');

            // Update exercise array for each round
            exerciseArray.forEach(function (res) {
                if (res.Exercise == ui.item.label) {
                    $('.' + parent + ' .muscleGroups').val(res.Muscle_Group);
                    $('.' + parent + ' .u_l_c').val(res.U_L_C)
                    $('.' + parent + ' .modality').val(res.Modality);
                    $('.' + parent + ' .level').val(res.Level);
                }
            })
        }
    });

    exerciseArray.forEach(function (res) {

        // console.log(res);

        // Create badge colors
        let levelColor;
        if (res.Level == 'Beginner') {
            levelColor = 'success';
        } else if (res.Level == 'Intermediate') {
            levelColor = 'warning';
        } else {
            levelColor = 'danger'
        };

        // Fill in table
        $('.exerciseTable tbody').append('<tr> <td>' + res.Exercise + '</td> <td>' + res.Muscle_Group + '</td> <td>' + res.U_L_C + '</td> <td>' + res.Modality + '</td> <td><label class="badge badge-' + levelColor + '">' + res.Level + '</label></td> </tr>')
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
        if (result[trainerName].appointments){
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
            notes: result[trainerName].notes,
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
        $('.trainerTable tbody').html('');

        // Fill in data after 100ms
        setTimeout(() => {
            $('.trainerTable tbody').append('<tr> <td class="trainerDetailLink">' + res.name + '</td> <td>' + res.gender + '</td> <td>' + res.age + '</td> <td>' + res.tenure + '</td>  <td>' + res.location + '</td> <td>' + res.appointments + '</td> <td><label class="badge badge-' + statusColor + '">' + res.status + '</label></td> </tr>')
        }, 100);
    });
});

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
        individualLocations.push(location.split('-')[1]);
        stateNames.push(location.split('-')[0]);

        locationsByState.push({
            state: location.split('-')[0],
            location: location.split('-')[1],
            appointments: result[location].appointments,
            clients: result[location].clients,
            trainers: result[location].trainers
        });
    }

    // Remove duplicates
    stateNames = [...new Set(stateNames)];

    // Loop through states
    stateNames.forEach(function (res) {
        $('.locationPage .card-body').append('<h5 style="margin-top: 30px;">' + res + '</h5><div class="table-responsive" style="border-bottom: 1px solid #ddd"><table class="table locationsTable ' + res.replace(/\s/g, '') + '"><thead><tr class="headers"><td>Location</td><td>Trainers</td><td>Clients</td><td>Appointments</td></tr></thead><tbody></tbody></table></div><br>')
    });

    locationsByState.forEach(function (res) {

        setTimeout(() => {
            $('.locationsTable.' + res.state.replace(/\s/g, '') + ' tbody').append('<tr><td>' + res.location + '</td><td>' + res.trainers + '</td><td>' + res.clients + '</td><td>' + res.appointments + '</td></tr>')
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
today = mm + '/' + dd + '/' + yyyy;
$('#date').val(today)

// Collect appointment log info on submit
$(".logAppointmentsPage .submit").click(function () {
    // Check if name, location or date are empty
    if ($('#clientName').val() == '' || $('#date').val() == '' ||  $('#locationName').val() == '') {
        alert('Name location and date are required.')
        return;
    }
    // Check if "No Show" has been selected
    if ($('.noShow').hasClass('checked')) {
        // Create object with "No Show" data
        let exerciseLog = {
            [Date.now() + '_' + $('#clientName').val()]: {
                info: {
                    client: $('#clientName').val(),
                    trainer: $('.trainerName').val(),
                    date: $('#date').val(),
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
        // Log results to the console for now
        console.log(exerciseLog);
        return;

    }else{

    // Check if any important fields are empty
    if ($('.roundContainer .round-1.exercises').val() == '' || $('.roundContainer .round-1.exercises').val() == '') {
        alert('Log is incomplete.');
        return;
    }

    // Instantiate log results array
    let logResults = [];

    // Push input values into log results array
    $('.expandCollapse .form-control').each(function (i, obj) {
        logResults.push($(obj).val());
    });

    // Create exercise log object
    let exerciseLog = {
        [Date.now() + '_' + $('#clientName').val()]: {
            info: {
                client: $('#clientName').val(),
                trainer: $('.trainerName').val(),
                date: $('#date').val(),
                location: $('#locationName').val(),
                no_show: "false"
            },
            exercises: {
                round1: {
                    exercise: logResults[0],
                    ulc: logResults[1],
                    musclGroups: logResults[2],
                    modality: logResults[3],
                    level: logResults[4],
                    reps: logResults[5],
                    weight: logResults[6]
                },
                round2: {
                    exercise: logResults[7],
                    ulc: logResults[8],
                    musclGroups: logResults[9],
                    modality: logResults[10],
                    level: logResults[11],
                    reps: logResults[12],
                    weight: logResults[13]
                },
                round3: {
                    exercise: logResults[14],
                    ulc: logResults[15],
                    musclGroups: logResults[16],
                    modality: logResults[17],
                    level: logResults[18],
                    reps: logResults[19],
                    weight: logResults[20]
                },
                round4: {
                    exercise: logResults[21],
                    ulc: logResults[22],
                    musclGroups: logResults[23],
                    modality: logResults[24],
                    level: logResults[25],
                    reps: logResults[26],
                    weight: logResults[27]
                }
            }
        }
    }
    // Log results to the console for now
    console.log(exerciseLog);
}

});

// Add Client Modal Trigger
$('#addClient').click(function () {
    $('.modal').css('display', 'block');
});

// Client Notes Modal Trigger
$('#clientNotes').click(function () {
    $('.modal').css('display', 'block');
});

// Modal Close
$('.modal-header .close').click(function () {
    $('.modal').css('display', 'none');
});

// Keep copyright year up-to-date
$('.copyrightYear').html(new Date().getFullYear());

// No show checkmark
$('.noShow').click(function () {
    $('.noShow').toggleClass('checked');
    if ($('.noShow').hasClass('checked')) {
        $(".formCollapse").css('pointer-events', 'none');
        $('.formCollapse').css('background-color', '#999999');
    } else {
        $(".formCollapse").css('pointer-events', 'inherit');
        $('.formCollapse').css('background-color', '#333333')
    }
});

// Basic validation for exercise log
let rounds = [1,2,3,4];
$('.roundContainer').focusout(function() {
    rounds.forEach(function(res){
        let roundEntries = [];
        $('#round-' + res +' .form-control').each(function (i, obj) {
            roundEntries.push($(obj).val());
        });

        if (roundEntries.includes('') == false){
            $('.formCollapse.round-' + res).css('background-color','green');
        } else {
            $('.formCollapse.round-' + res).css('background-color','#333');
        };
    })
});

// Listen for backspace and clear selected autocomplete
rounds.forEach(function(res){
    $('.exercises.round-' + res).keyup(function(e){
        if(e.keyCode == 8){
            $('.exercises.round-' + res).val('')
        }
    });

    $('.exercises.round-' + res).focusout(function() {
        if ($('.exercises.round-' + res) == ''){
            $('.u_l_c.round-' + res).val('');
            $('.muscleGroups.round-' + res).val('');
            $('.modality.round-' + res).val('');
            $('.level.round-' + res).val('');
        }
    })
});

if (localStorage.getItem('name') && localStorage.getItem('email')){
    $('#trainerName').text(localStorage.getItem('name'));
    $('#trainerEmail').text(localStorage.getItem('email'));
    $('#profile_link').attr('href','../../pages/trainer-detail.html?trainer=' + localStorage.getItem('name'));

    // Generate acronym
    var matches = localStorage.getItem('name').match(/\b(\w)/g);
    var acronym = matches.join('');
    $('.acronym').html(acronym)
};