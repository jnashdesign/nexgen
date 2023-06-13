// const baseURL = 'https://bleedblue.fitness';
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
const appointmentsRef= firebase.database().ref('/appointments');

// Check login status
console.log('loggedIn = ' + localStorage.getItem('loggedIn'));

$(document).ready(function(){
    // Check if admin, if not, populate location and disable field
    if (localStorage.getItem('access') !== 'Admin'){
        $('.adminOnly').parent().css('display','none');
        if (res.location !== location){
            return;
        }
    }
    appointmentsRef.on('value', function (snapshot) {
        // Get snapshot value
        localStorage.setItem('allAppointments', JSON.stringify(snapshot.val()));
    })
})

// If not logged in, send to login page
if (document.location.href.indexOf('login.html') === -1 && localStorage.getItem('loggedIn') == 'false') {
    console.log('not logged in')
    location.replace(baseURL + '/pages/login.html');
}

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
        let clientAge = getAge(result[clientKey].personal.dob);

        if (localStorage.getItem('access') !== 'Admin'){
            // Push names into array in preparation for autocomplete
            if (result[clientKey].location == localStorage.getItem('location')){
                clientNames.push(result[clientKey].personal.name);
            }
        }else{
            clientNames.push(result[clientKey].personal.name);
        }
        
            // Create new object with details for table
            clientDetails.push({
                name: result[clientKey].personal.name,
                age: clientAge,
                dob: result[clientKey].personal.dob,
                gender: result[clientKey].personal.gender,
                location: result[clientKey].location,
                client_notes: result[clientKey].client_notes,
                physical_problems: result[clientKey].physical_problems,
                status: result[clientKey].status
            });
    }

    $('#clientName').keyup(function(e){
        if(e.keyCode == 8 && $('#clientName').val() == ''){
            $(document).ready(function(){
                $('.row.appointments').css('display','none');
            });
        }
    })  


    // Add client names to autocomplete
    $("#clientName").autocomplete({
        source: clientNames,
        select: function (e, ui) {
            let appointments = [];
            $('.planAppointmentsPage .appointmentTable tbody').html('');
            $(clientDetails).each(function (index, client) {
                if (client.name == ui.item.value) {
                    $('.planAppointmentsPage #physicalProblems').val(client.physical_problems);
                    $('.planAppointmentsPage #clientNotes').val(client.client_notes);

                    let result = JSON.parse(localStorage.getItem('allAppointments'));

                    if (result == null){
                        $('.planAppointmentsPage .appointments').css('display','block');
                        return;
                    }else{
                    $(document).ready(function(){
                        $('.planAppointmentsPage .blocked').css('display','none');
                    });
                
                        // Loop through the keys
                        for (const [key, value] of Object.entries(result)) {
                            
                            let clientKey = `${key}`;
                            let info = clientKey.split('|');

                            if (info[3] == client.name.replace(' ', '_')){
                                let matchingEntry = (result[clientKey]);
                                appointments.push(matchingEntry);
                                let dateArray = matchingEntry.info.date.split('-');
                                let lastUpdatedArray = matchingEntry.info.last_updated.split('-');
                                let date = dateArray[1] + '/' + dateArray[2] + '/' + dateArray[0];
                                let lastUpdated = lastUpdatedArray[1] + '/' + lastUpdatedArray[2] + '/' + lastUpdatedArray[0];
        
                                localStorage.setItem('appointments', JSON.stringify(appointments));
                                $('.planAppointmentsPage .appointmentTable tbody').append('<tr><td><a target="_blank" class="mdi mdi-eye menu-icon" href="./viewAppointment.html?appointment=' + info[0] + '"></a></td><td><a class="mdi mdi-pencil menu-icon" href="./editAppointment.html?appointment=' + info[0] + '"></a></td><td>' + date + '</td><td>' + matchingEntry.info.location.replace('-', ' ') + '</td><td>' + matchingEntry.info.trainer.replace('-', ' ') + '</td><td>' + lastUpdated + '<td></tr>');
                            }
                            $('.planAppointmentsPage .appointments').css('display','block');
                        }
                        $('.planAppointmentsPage .appointmentTable tbody').each(function(elem,index){
                            var arr = $.makeArray($("tr",this).detach());
                            arr.reverse();
                              $(this).append(arr);
                          });
                    };
                }
            })
        }
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

        let location = localStorage.getItem('location');
        


        // Clear all data in table
        $('.clientTable tbody').html('');
        // Fill in table
        setTimeout(() => {
            
            if (localStorage.getItem('access') !== 'Admin' && res.location !== location) {
                // $('.clientTable tbody').append('<tr> <td class="clientDetailLink">' + res.name + '</td> <td>' + res.gender + '</td><td>' + res.age + '</td><td>' + res.age + '</td>  <td>' + res.location + '</td> <td><label class="badge badge-' + statusColor + '">' + res.status + '</label></td> </tr>');
            } else {
                $('.clientTable tbody').append('<tr> <td class="clientDetailLink">' + res.name + '</td> <td>' + res.gender + '</td><td>' + res.age + '</td><td>' + res.age + '</td>  <td>' + res.location + '</td> <td><label class="badge badge-' + statusColor + '">' + res.status + '</label></td> </tr>');
            }

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
        let exerciseName = result[prop].Exercise;
        let exerciseInfo = {
            [exerciseName.replace(/[ ,-,/]/g, '_').replace(/[(,)]/g, '')]: {
                Exercise: result[prop].Exercise,
                Notes: result[prop].Notes ?? null
            }
        };
        exerciseNames.push(exerciseName);
    }

    if (window.location.href.indexOf("editExercise.html") > -1) {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const eid = urlSearchParams.get('exercise');
        $('#name').val(exerciseArray[eid].Exercise);
        $('.notes').val(exerciseArray[eid].Notes);

        $('.editExercisePage .submit').click(function () {
            if ($('#name').val() == '') {
                callAlert('Name field is required.', 'danger');
                return;
            } else {
            let exerciseName = [exerciseArray[eid].Exercise.replace(/[ ,-,/]/g, '_').replace(/[(,)]/g, '')]
            let exerciseUpdate = {
                [exerciseName]: {
                    "Exercise": $('#name').val(),
                    "Notes": $('.notes').val(),
                    "video": $('#video').val()
                }
            }
            exerciseRef.update(exerciseUpdate);
            }
        });
    }

    // Add autocomplete to each exercise input
    $('.exercises').each(function (i, obj) {
        // Add exercise names to autocomplete
        $(obj).autocomplete({
            source: exerciseNames,
            select: function (e, ui) {
                let storedAppointments = JSON.parse(localStorage.getItem('appointments'));
                let date;
                let matchingDates = [];

                if (storedAppointments){
                // Update exercise array for each round
                storedAppointments.forEach(function (res) {
                    let test = JSON.stringify(res.exercises);

                    // Check if the substring exists inside the string
                    var index = test.indexOf('"exerciseName":"' + ui.item.value + '"');
                    if(index !== -1){
                        matchingDates.push(res.info.date);
                    } else{
                        return;
                    }
                });
                }

                if (matchingDates.length > 0){
                    // Sort through dates
                    matchingDates.sort(function(a,b){
                        return new Date(a) - new Date(b);
                    });
                    // Find last used date and format
                    const lastUsed = matchingDates.reverse()[0];
                    let dateArray = lastUsed.split('-');
                    date = dateArray[1] + '/' + dateArray[2] + '/' + dateArray[0];

                    // Add to value shown in input field
                        ui.item.value = ui.item.value + ' Last used:' + date;
                }
            }
        });
    });

    exerciseArray.forEach(function (res, index) {
        let video;
        let notes;
        if (!res.Notes){
            notes = 'Not provided'
        }else{
            notes = res.Notes;
        }

        if (res.video) {
            video = '<a target="_blank" href="' + res.video + '"><span style="font-size:1.5em" class="mdi mdi-video"></span></a>'
        } else {
            video = '<span style="font-size:1.5em; opacity:0.25" class="mdi mdi-video-off"></span>'
        }

        // Fill in table
        $('.exerciseTable tbody').append('<tr> <td class="exerciseName" id="exercise_' + index + '">' + res.Exercise + '</td> <td>' + video + '</td><td>' + notes + '</td></tr>')
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

        // Clear all data in table
        $('.staffTable tbody').html('');
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

        // Check if admin, if not, populate location and disable field
        if (localStorage.getItem('access') !== 'Admin') {
            let location = localStorage.getItem('location');
            if (res.location !== location) {
                return;
            }
        }

        // Fill in data after 100ms
        setTimeout(() => {
            let location = localStorage.getItem('location');
            if (localStorage.getItem('access') !== 'Admin' && res.location !== location) {
                $('.staffTable tbody').append('<tr> <td class="trainerDetailLink">' + res.name + '</td> <td>' + res.gender + '</td><td>' + res.age + '</td> <td>' + res.location + '</td> <td><label class="badge badge-' + statusColor + '">' + res.status + '</label></td> </tr>');
            } else {
                $('.staffTable tbody').append('<tr> <td class="trainerDetailLink">' + res.name + '</td> <td>' + res.gender + '</td><td>' + res.age + '</td> <td>' + res.location + '</td> <td><label class="badge badge-' + statusColor + '">' + res.status + '</label></td> </tr>');
            }
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
    $('input#locationName').autocomplete({
        source: individualLocations
    });

    // Add names to the autocomplete
    $('input.location').autocomplete({
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

$('.addLocationPage .submit').click(function(){
    let city = $('#city').val();
    let state = $('#state').val();

    let entry = state + '_' + city

    let locationList = [];
    locationRef.on('value', function(snapshot){
        let result = snapshot.val();
        for (const [key, value] of Object.entries(result)) {
            locationList.push(`${key}`);
        }
        if (!locationList.includes(entry)){
            console.log('doesn\'t exist');
            locationRef.update({
                [entry]: {
                    appointments: 0,
                    trainers: 1,
                    clients: 1
                }
            })
        } else {
            callAlert('This location already exists.', 'danger');
            return;
        }
    })
});

// Submit new client info
$('.addClientPage .submit').click(function () {
    if ($('.name').val() == '' || 
    $('#email').val() == '' || 
    $('.gender').val() == '' || 
    $('#date').val() == '' || 
    $('.height').val() == '---' || 
    $('.weight').val() == '') {
        callAlert('All fields other than Notes and Physical Problems are required.', 'danger');
        return;
    } else {
        let name = $('.name').val().replace(/\//g, ' and ');
        let key = name.replace(/ /g, "_");
        let email = $('#email').val();
        let gender = $('.gender').val();
        let dob = $('#date').val();
        let height = $('.height').val();
        let location = $('#locationName').val();
        let physical_problems = $('.physicalProblems').val();
        let notes = $('.notes').val();
        let weight = $('.weight').val();
        let clientInfo = {
            [key]: {
                location: location,
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
                callAlert(error, 'danger');
            } else {
                callAlert('Client successfully added!', 'success');
            }
        });
    }
});

// Edit client info
$('.editClientPage .submit').click(function () {
    if ($('.name').val() == '' || 
        $('#email').val() == '' || 
        $('.gender').val() == '' || 
        $('#date').val() == '' || 
        $('.height').val() == '') {
            callAlert('Name, email, gender, dob are required.', 'danger');
            return;
    } else {
        let key = $('.name').val().replace(/ /g, "_");
        let name = $('.name').val();
        let email = $('#email').val();
        let gender = $('.gender').val();
        let fullDate = $('#date').val().split('-');
        let location = $('.location').val();
        let yr = fullDate[0];
        let mo = fullDate[1];
        let dy = fullDate[2];
        let dob = yr + '-' + mo + '-' + dy;
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
                location: location,
                physical_problems: null ?? physical_problems,
                client_notes: null ?? notes
            }
        }
        clientsRef.update(clientInfo, (error) => {
            if (error) {
                callAlert(error, 'danger');
            } else {
                callAlert('Client successfully updated!', 'success')
            }
        });
    }
});

$('.clientDetailPage .submit').click(function () {
    location.replace(baseURL + '/pages/editClient.html?client=' + $('.name').html().replace(/\s/g, '_'))
});

// Capitalize first letter of each word in Exercise Name
$(document).ready(function () {
    $(".addExercisePage #name").keyup(function () {
        $(".addExercisePage #name").css('textTransform', 'capitalize');
    });
});

// Add new exercise
$('.addExercisePage .submit').click(function () {
    if ($('#name').val() == '') {
        callAlert('Name field is required.', 'danger');
        return;
    } else {
        let exerciseName = $('#name').val().replace(/[ ,-,/]/g, '_').replace(/[(,)]/g, '');
        let exerciseUpdate = {
            [exerciseName]: {
                "Exercise": $('#name').val(),
                // "Modality": $('#modality').val(),
                // "Muscle_Group": $('#muscleGroup').val(),
                // "U_L_C": $('#ulc').val(),
                "video": $('#video').val()
            }
        }
        exerciseRef.update(exerciseUpdate);
    }
});

// Keep copyright year up-to-date
$('.copyrightYear').html(new Date().getFullYear());

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
    let exercisesEntries = [];
    let exercisesInfo = [];
    let exercisesNum;

    exercises.forEach(function (res) {
        exercisesEntries = [
            $('.exercises.exercise-' + res + ' ').val(),
            $('.reps.exercise-' + res).val(),
            $('.weight.exercise-' + res).val()
        ];
        if (exercisesEntries.includes('') == false) {
            $('#ui-id-' + res).css('background-color', '#00b137 !important').css('border-color', '#00b137 !important');
        } else {
            $('#ui-id-' + res).css('background-color', '#242cea !important').css('border-color', '#242cea !important');
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
            // $('.u_l_c.exercise-' + res).val('');
            // $('.muscleGroups.exercise-' + res).val('');
            // $('.modality.exercise-' + res).val('');
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

// Check if admin, if not, populate location and disable field
if (localStorage.getItem('access') !== 'Admin') {
    $('#locationName').val(localStorage.getItem('location'));
    // $('#locationName').prop('disabled', 'true');
}

if (localStorage.getItem('access') !== 'Admin') {
    let staffTitle = $('.staffPage h4.card-title').html() + ' &mdash; ' + localStorage.getItem('location')
    $('.staffPage h4.card-title').html(staffTitle)
}

// ********* Hide Pages ********* //
// Hide some pages while they're being worked.
let hiddenPages = ['locations.html'];

hiddenPages.forEach(function (res) {
    $('a[href*="' + res + '"]').each(function () {
        $(this).parent().css('display', 'none');
    });
});

$('a[href^="#"]').click(function(e){        
    e.preventDefault();
    $('html,body').scrollTop($(this.hash).offset().top - 150);
});

function successMessage() {
    notif({
        msg: "<b>Success:</b> In 5 seconds i'll be gone",
        type: "success"
    });
}

function callAlert(message, status){
    $('html').append('<span class="alert ' + status + '">'+ message + '</span>');
    $('.alert').animate({
        top: "-10px"
    });
    setTimeout(() => {
        $('.alert').animate({
            top: "-200px"
        });    
    }, 3000);
    if ($('.alert').hasClass('danger')){
        $('.alert').prepend('<i class="menu-icon mdi mdi-alert-circle"></i>');
    }else if ($('.alert').hasClass('success')){
        $('.alert').prepend('<i class="menu-icon mdi mdi-check-bold"></i>');
    }
}
