// const { local } = require("d3");
const auth = firebase.auth();

// Check login status
console.log('loggedIn = ' + localStorage.getItem('loggedIn'))

// If not logged in, send to login page
if (document.location.href.indexOf('login.html') === -1 && localStorage.getItem('loggedIn') == 'false') {
        location.replace(baseURL + '/pages/login.html');
}

// listen for auth status changes
auth.onAuthStateChanged(user => {
    console.log('auth state changed');
    if (user) {
    // console.log('user logged in: ', user);
    localStorage.setItem('firebaseUID',user.uid);
    localStorage.setItem('loggedIn','true');

    $('.loggedInLink').css('display','inline-block');
    $('.loggedOutLink').css('display','none');
    } else {
    // console.log('user logged out');
    localStorage.setItem('loggedIn','false');
    }
});

// Redirect if you land on the index for now
    if (window.location.href.indexOf("index.html") > -1 || document.location.href.indexOf('pages') === -1) {
      location.replace(baseURL + '/pages/planAppointment.html');
    }

// Login
$('.loginPage #submit').click(function(e){
    console.log(e)
    e.preventDefault();

    // Get user info
    const email = $('.loginPage #email').val();
    const password = $('.loginPage #password').val();

    // Log the user in
    auth.signInWithEmailAndPassword(email, password)
    .then((cred) => {
    console.log(cred);
    // Display feedback
    $('.loginPage .signInFeedback').css('display','block');
    let success = 'Success! Signing you in.'
    $('.loginPage .signInFeedback').addClass('success').text(success);

    // Store name and email
    localStorage.setItem('email',cred.user.email),
    localStorage.setItem('name',cred.user.displayName)

    // Redirect to the index page
    setTimeout(() => {
        location.replace(baseURL + '/pages/planAppointment.html');
    }, 2000)
    }).catch(function(error) {
    // Display feedback
    $('.loginPage .signInFeedback').css('display','block');
    // Error Handling
    if (error == 'Error: The email address is badly formatted.'){
        error = 'Email and password do not match.'
    }
    $('.loginPage .signInFeedback').addClass('error').text(error);
    });
});

// logout
$('.logout').click(function(e) {
    console.log('logout');
    e.preventDefault();
    auth.signOut();

    // Clear storage items
    localStorage.removeItem('email'),
    localStorage.removeItem('name')

    // Redirect back to login page
    setTimeout(() => {
        location.replace('./login.html');
    }, 1000);
});

// Add User
$('.addStaffPage .submit').click(function(e){
    console.log(e)
    e.preventDefault();

    let access = $('.addStaffPage #access').val();
    let dob = $('.addStaffPage #dob').val();
    let phone = $('.addStaffPage #phone').val();
    let email = $('.addStaffPage #email').val();
    let password = $('.addStaffPage #password').val();
    let name = $('.addStaffPage #name').val();
    let key = $('.addStaffPage #name').val().replace(/ /g,"_");
    let location = $('.addStaffPage #locationName').val();
    let gender = $('.addStaffPage #gender').val();
    let start_date = $('.addStaffPage #start_date').val();
    let specialties = $('.addStaffPage #specialties').val();
    let notes = $('.addStaffPage #notes').val();
    console.log('click')
        auth.createUserWithEmailAndPassword(email, password)
        .then(function(res) {
            var user = auth.currentUser;
            user.updateProfile({
                displayName: name
            })
            console.log(res.user)
            let success = 'Success! ' + name + ' has been added.';
            $('.addStaffPage .signInFeedback').css('display','block');
            $('.addStaffPage .signInFeedback').addClass('success').text(success);
            
            // Add trainer to DB
            trainerRef.update({
                [key]: {
                    access: access,
                    location: location,
                    notes: notes,
                    personal: {
                        dob: dob,
                        email: email,
                        gender: gender,
                        name: name,
                        phone: phone   
                    },
                    specialties: specialties,
                    start_date: start_date,
                    status: 'Active'
                }
            });
        }).catch(function(error) {
            alert(error);
            console.log(error);
        });
})