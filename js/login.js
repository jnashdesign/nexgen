const auth = firebase.auth();
let trainerInfo = [];

// listen for auth status changes
auth.onAuthStateChanged((user) => {
  console.log("auth state changed");
  console.log(user);
  if (user) {
    localStorage.setItem("firebaseUID", user.uid);
    localStorage.setItem("loggedIn", "true");

    $(".loggedInLink").css("display", "inline-block");
    $(".loggedOutLink").css("display", "none");

    trainerRef.on("value", function (snapshot) {
      // Get snapshot value
      let result = snapshot.val();
      let name = localStorage.getItem("name").split(" ").join("_");

      // Set localStorage for access, location and status
      localStorage.setItem("access", result[name].access);
      localStorage.setItem("location", result[name].location);
      localStorage.setItem("status", result[name].status);

    });
  } else {
    localStorage.setItem("loggedIn", "false");
  }
});

// Login Page clear storage
if (window.location.href.indexOf("login.html") > -1) {
  localStorage.removeItem("access");
  localStorage.removeItem("email");
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("location");
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("name");
  localStorage.removeItem("status");
}

// Login Submit by Pressing Enter
$(".loginPage").keydown(function () {
  if (event.which == 13) {
    event.preventDefault();
    // alert( "Handler for .keydown() called." );
    submitLoginForm();
  }
});

// Login Submit
$(".loginPage #submit").click(function (e) {
  e.preventDefault();
  submitLoginForm();
});

function submitLoginForm() {
  // Get user info
  const email = $(".loginPage #email").val();
  const password = $(".loginPage #password").val();

  // Log the user in
  auth.signInWithEmailAndPassword(email, password)
    .then((cred) => {
      // Display feedback
      $(".loginPage .signInFeedback").css("display", "block");
      let success = "Success! Signing you in.";
      $(".loginPage .signInFeedback").addClass("success").text(success);

      // Store email from auth profile
      localStorage.setItem("email", cred.user.email),

      // Redirect to the index page
      setTimeout(() => {
        checkUseStatus(email);
      }, 2000);
    })
    .catch(function (error) {
      // Display feedback
      $(".loginPage .signInFeedback").css("display", "block");
      // Error Handling
      if (error == "Error: The email address is badly formatted.") {
        error = "Email and password do not match.";
      }

      $(".loginPage .signInFeedback").addClass("error").text(error);
    });
}

function checkUseStatus(email) {
  trainerRef.on("value", function (snapshot) {
    // Get snapshot value
    let result = snapshot.val();

    // Instantiate trainerEmail
    let trainerEmail;
    let status;

    // Loop through trainer keys
    for (const [key, value] of Object.entries(result)) {
      // Get key
      let trainerName = `${key}`;
      trainerEmail = result[trainerName].personal.email;
      if (email == trainerEmail) {
        localStorage.setItem('name', result[trainerName].personal.name)
        if (result[trainerName].status == "Active") {
          location.replace(baseURL + "/pages/planAppointment.html");
        } else if (result[trainerName].status == "Inactive") {
          // Display feedback
          $(".loginPage .signInFeedback").css("display", "block");

          // Error Handling
          let error = "Your account has been disabled.";

          $(".loginPage .signInFeedback")
            .removeClass("success")
            .addClass("error")
            .text(error);
        }
      }
    }
    return status;
  });
}

$(".content-wrapper.auth form .auth-link.forgotPassword").click(function (e) {
  e.preventDefault();

  $(".loginPage .pt-3").toggleClass("forgot");

  if ($(".pt-3").hasClass("forgot")) {
    $(".forgotPassword").text("< Back to Login");
    $(".passwordGroup").toggleClass("hide");
    $("#submit").toggleClass("hide");
    $("#sendResetEmail").toggleClass("hide");
  } else {
    $(".forgotPassword").text("Forgot Password?");
    $(".passwordGroup").toggleClass("hide");
    $("#submit").toggleClass("hide");
    $("#sendResetEmail").toggleClass("hide");
  }
});

$("#sendResetEmail").click(function () {
  auth
    .sendPasswordResetEmail($(".loginPage #email").val())
    .then((cred) => {
      // Recovery Email Sent
      $(".loginPage .signInFeedback").css("display", "block");
      $(".loginPage .signInFeedback")
        .addClass("success")
        .text("Check your email!");
    })
    .catch(function (error) {
      // Display feedback
      $(".loginPage .signInFeedback").css("display", "block");
      $(".loginPage .signInFeedback").addClass("error").text(error);
    });
});

// logout
$(".logout").click(function (e) {
  e.preventDefault();
  auth.signOut();

  // Clear storage items
  localStorage.removeItem("email"), localStorage.removeItem("name");

  // Redirect back to login page
  setTimeout(() => {
    if (window.location.href.indexOf("index.html") > -1) {
      location.replace("./pages/login.html");
    }else{
      location.replace("./login.html");
    }
  }, 1000);
});

// Add User
$(".addStaffPage .submit").click(function (e) {
  if (
    $(".addStaffPage #access").val() == "" ||
    $(".addStaffPage #dob").val() == "" ||
    $(".addStaffPage #phone").val() == "" ||
    $(".addStaffPage #email").val() == "" ||
    $(".addStaffPage #password").val() == "" ||
    $(".addStaffPage #name").val() == "" ||
    $(".addStaffPage #locationName").val() == "" ||
    $(".addStaffPage #start_date").val() == ""
  ) {
    callAlert(
      "All fields other than Gender, Specialties and Notes are required.",
      "danger"
    );
    return;
  } else {
    e.preventDefault();

    let access = $(".addStaffPage #access").val();
    let dob = $(".addStaffPage #dob").val();
    let phone = $(".addStaffPage #phone").val();
    let email = $(".addStaffPage #email").val();
    let password = $(".addStaffPage #password").val();
    let name = $(".addStaffPage #name").val();
    let key = $(".addStaffPage #name").val().replace(/ /g, "_");
    let location = $(".addStaffPage #locationName").val();
    let gender = $(".addStaffPage #gender").val();
    let start_date = $(".addStaffPage #start_date").val();
    let specialties = $(".addStaffPage #specialties").val();
    let notes = $(".addStaffPage #notes").val();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(function (res) {
        var user = auth.currentUser;
        user.updateProfile({
          displayName: name,
        });
        let success = "Success! " + name + " has been added.";
        $(".addStaffPage .signInFeedback").css("display", "block");
        $(".addStaffPage .signInFeedback").addClass("success").text(success);

        // Add trainer to DB
        trainerRef
          .update({
            [key]: {
              access: access,
              location: location,
              notes: notes,
              personal: {
                dob: dob,
                email: email,
                gender: gender,
                name: name,
                phone: phone,
              },
              specialties: specialties,
              start_date: start_date,
              status: "Active",
            },
          })
          .then(function (res) {
            window.location.replace(baseURL + "/pages/staff.html");
          });
      })
      .catch(function (error) {
        callAlert(error, "danger");
      });
  }
});

// Edit User
$(".editStaffPage .submit").click(function (e) {
  if (
    $(".addStaffPage #access").val() == "" ||
    $(".addStaffPage #dob").val() == "" ||
    $(".addStaffPage #phone").val() == "" ||
    $(".addStaffPage #email").val() == "" ||
    $(".addStaffPage #password").val() == "" ||
    $(".addStaffPage #name").val() == "" ||
    $(".addStaffPage #locationName").val() == "" ||
    $(".addStaffPage #start_date").val() == ""
  ) {
    callAlert(
      "All fields other than Gender, Specialties and Notes are required.",
      "danger"
    );
    return;
  } else {
    e.preventDefault();

    let access = $(".addStaffPage #access").val();
    let dob = $(".addStaffPage #dob").val();
    let phone = $(".addStaffPage #phone").val();
    let email = $(".addStaffPage #email").val();
    let password = $(".addStaffPage #password").val();
    let name = $(".addStaffPage #name").val();
    let key = $(".addStaffPage #name").val().replace(/ /g, "_");
    let location = $(".addStaffPage #locationName").val();
    let gender = $(".addStaffPage #gender").val();
    let start_date = $(".addStaffPage #start_date").val();
    let specialties = $(".addStaffPage #specialties").val();
    let notes = $(".addStaffPage #notes").val();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(function (res) {
        var user = auth.currentUser;
        user.updateProfile({
          displayName: name,
        });
        let success = "Success! " + name + " has been added.";
        $(".addStaffPage .signInFeedback").css("display", "block");
        $(".addStaffPage .signInFeedback").addClass("success").text(success);

        // Add trainer to DB
        trainerRef
          .update({
            [key]: {
              access: access,
              location: location,
              notes: notes,
              personal: {
                dob: dob,
                email: email,
                gender: gender,
                name: name,
                phone: phone,
              },
              specialties: specialties,
              start_date: start_date,
              status: "Active",
            },
          })
          .then(function (res) {
            window.location.replace(baseURL + "/pages/staff.html");
          });
      })
      .catch(function (error) {
        callAlert(error, "danger");
      });
  }
});

// Function to add authentication accounts for locations
// $(document).ready(function () {
//   let userList = [
//     ["adriatica@nexgenfitness.com", "Adriatica"]
    // ["buffalo@nexgenfitness.com", "Buffalo"],
    // ["flowermound@nexgenfitness.com", "Flower Mound"],
    // ["frisco@nexgenfitness.com", "Frisco"],
    // ["southfrisco@nexgenfitness.com", "South Frisco"],
//     ["adriatica@nexgenfitness.com", "Adriatica"],
//     ["mckinney@nexgenfitness.com", "McKinney"],
//     ["nicholshills@nexgenfitness.com", "Nicols Hills"],
    // ["edmond@nexgenfitness.com", "Edmond"],
//     ["norman@nexgenfitness.com", "Norman"],
//     ["tulsa@nexgenfitness.com", "Tulsa"],
    // ["plano@nexgenfitness.com", "Plano"],
//     ["prosper@nexgenfitness.com", "Prosper"],
//     ["richardson@nexgenfitness.com", "Richardson"],
    // ["southlake@nexgenfitness.com", "Southlake"],
//     ["springfield@nexgenfitness.com", "Springfield"]
//   ];

//   userList.forEach((element) => {
//     let email = element[0];
//     let displayName = element[1];
//     let password = "BleedBlue";
//     firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password)
//       .then(function (result) {
//         return result.user.updateProfile({
//           displayName: displayName,
//         });
//       });
//   });
// });
