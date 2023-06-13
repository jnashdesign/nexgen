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
                Modality: result[prop].Modality,
                U_L_C: result[prop].U_L_C,
                Joint: result[prop].Joint,
                Muscle_Group: result[prop].Muscle_Group,
                Notes: result[prop].Notes ?? null
            }
        };
        exerciseNames.push(exerciseName);
    }

if (window.location.href.indexOf("editExercise.html") > -1) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const eid = urlSearchParams.get('exercise');

    $('#name').val(exerciseArray[eid].Exercise);
    $('#ulc').val(exerciseArray[eid].U_L_C);
    $('#muscleGroup').val(exerciseArray[eid].Muscle_Group);
    $('#modality').val(exerciseArray[eid].Modality);
    $('#video').val(exerciseArray[eid].video);
    $('#difficulty').val(exerciseArray[eid].Difficulty);
    $('.notes').val(exerciseArray[eid].Notes);

    $('.editExercisePage .submit').click(function () {
        let exerciseName = [exerciseArray[eid].Exercise.replace(/[ ,-,/]/g, '_').replace(/[(,)]/g, '')]
        let exerciseUpdate = {
            [exerciseName]: {
                "Exercise": $('#name').val(),
                "Notes": $('.notes').val(),
                // "Modality": $('#modality').val(),
                // "Muscle_Group": $('#muscleGroup').val(),
                // "U_L_C": $('#ulc').val(),
                "video": $('#video').val()
            }
        }
        exerciseRef.update(exerciseUpdate);
    });
}
});