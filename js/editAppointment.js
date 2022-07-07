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
                $('.editAppointmentsPage #clientNotes').val(result[clientKey].notes);
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
        const numExercises = 16;
        let exerciseInfo = [];

        if (info[0] == params) {
            matchingEntryExercises = (result[clientKey]).exercises;
            matchingEntryInfo = (result[clientKey]).info;

            getClientNotes(matchingEntryInfo.client.replace(/[ ,-,/]/g, '_'));

            $('.editAppointmentsPage #clientName').val(matchingEntryInfo.client);
            $('.editAppointmentsPage #physicalProblems').val(matchingEntryInfo.physical_problems);
            $('.editAppointmentsPage #clientNotes').val(matchingEntryInfo.client_notes);
            $('.editAppointmentsPage #date').val(matchingEntryInfo.date);
            $('.editAppointmentsPage #locationName').val(matchingEntryInfo.location);
            $('.editAppointmentsPage #trainerName').val(matchingEntryInfo.trainer);
            $('.editAppointmentsPage #appointmentNotes').val(matchingEntryInfo.notes);
            $('.backBtn').attr("href",'./client-detail.html?client='+matchingEntryInfo.client.replace(/[ ,-,/]/g, '_'));
            if (matchingEntryInfo.no_show == 'true') {
                $('#noShow').prop('checked', 'true');
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

                let roundNumNotation = 'round'+ roundNum;
                let exerciseNotation = 'exercise'+exerciseNum;
                let name = matchingEntryExercises[roundNumNotation][exerciseNotation].exerciseName;
                let notes = matchingEntryExercises[roundNumNotation][exerciseNotation].exerciseNotes;

                const setTotal = 4;
                for (let set = 1; set <= setTotal; set++) {
                    let setNotation = 'set'+set;
                    let rande = 'r'+roundNum+'_e'+exerciseNum;
    
                    let reps = matchingEntryExercises[roundNumNotation][exerciseNotation][setNotation].reps;
                    let tempo = matchingEntryExercises[roundNumNotation][exerciseNotation][setNotation].tempo;
                    let weight = matchingEntryExercises[roundNumNotation][exerciseNotation][setNotation].weight;

                    $('.'+rande +' .exercise'+exerciseNum+ '.name').val(name);
                    $('.'+rande +' .notes').val(notes);
                    $('.'+rande +' .set'+set+'Reps').val(reps);
                    $('.'+rande +' .set'+set+'Weight').val(weight);
                    $('.'+rande +' .set'+set+'Tempo').val(tempo);
                }
            }
        }
    }

});