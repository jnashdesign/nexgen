// Build exercises
const numExercises = 16;
let exerciseNum;
let roundNum;
for (i = 1; i <= numExercises; i++) {

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

    $('.exerciseLog').append('<div id="round' + roundNum + '" class="r'+roundNum+'_e'+exerciseNum+' roundContainer round' + roundNum + '"><h3><span>Round ' + roundNum + '</span> Exercise ' + exerciseNum + '</h3><div class="exercise' + exerciseNum + '"><div class="row"><div class="form-group col-md-12 grid-margin"><label>Excerise Name</label><div class="autocomplete"><input type="text" class="form-control exercises exercise' + exerciseNum + ' name" placeholder="Calf Raises" autocomplete="off"></div></div></div><div class="sets"></div><div class="row"><div class="form-group col-md-12 grid-margin"><label for="appointmentNotes">Exercise Notes</label><textarea class="form-control notes exercise-' + exerciseNum + '" name="exercise' + exerciseNum + 'Notes" placeholder="Exercise notes."></textarea></div></div></div></div>')
};

// Build sets
const setTotal = 4;
let roundNumSet = 1;
for (let i = 1; i <= setTotal; i++) {
    $('.sets').append('<div class="row set' + i + '"><h4>Set ' + i + '</h4><div class="form-group col-md-4 grid-margin"><label for="set' + i + 'Reps">Reps</label><div><input type="text" class="form-control reps set' + i + 'Reps"></div></div><div class="form-group col-md-4 grid-margin"><label for="set' + i + 'Weight">Weight</label><div><input type="text" class="form-control weight exercise set' + i + 'Weight" ></div></div><div class="form-group col-md-4 grid-margin"><label for="set' + i + 'Weight">Tempo</label><div><input type="text" class="form-control weight set' + i + 'Tempo"></div></div></div>')
}