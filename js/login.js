const auth = firebase.auth();

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
        location.replace('/index.html');
    }, 2000);
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
        location.replace('../../login.html');
    }, 1000);
});

// Add User
$('.addStaffPage .submit').click(function(){
    let access = $('.addStaffPage #access').val();
    let dob = $('.addStaffPage #dob').val();
    let phone = $('.addStaffPage #phone').val();
    let email = $('.addStaffPage #email').val();
    let password = $('.addStaffPage #password').val();
    let name = $('.addStaffPage #name').val();
    let location = $('.addStaffPage #locationName').val();
    let gender = $('.addStaffPage #gender').val();
    let start_date = $('.addStaffPage #start_date').val();
    let specialties = $('.addStaffPage #specialties').val();
    let notes = $('.addStaffPage #notes').val();

    // if (!email || !password || !name || !location || !gender || !start_date || !dob || !phone || !access){
    //     $('.addStaffPage .signInFeedback').css('display','block');
    //     let error = 'Some required fields are empty.';
    //     $('.addStaffPage .signInFeedback').addClass('error').text(error);
    // }else{
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(result) {
            let success = 'Success! ' + name + ' has been added.';
            $('.addStaffPage .signInFeedback').css('display','none');
            $('.addStaffPage .signInFeedback').addClass('success').text(success);

            // Add trainer to DB
            firebase.database().ref('/people/staff/').update({
                [name]: {
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
            setTimeout(() => {
                return result.user.updateProfile({
                    displayName: name
                })
            }, 1000);
        }).catch(function(error) {
            $('.addStaffPage .signInFeedback').css('display','block');
            $('.addStaffPage .signInFeedback').addClass('error').text(error);
        });
    // }
})