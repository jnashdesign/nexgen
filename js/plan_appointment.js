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

    $('.exerciseLog').append('<div id="round' + roundNum + '" class="r'+roundNum+'_e'+exerciseNum+' roundContainer round' + roundNum + '"><h3><span>Round ' + roundNum + '</span> Exercise ' + exerciseNum + '</h3><div class="exercise' + exerciseNum + '"><div class="row"><div class="form-group col-md-12 grid-margin"><label>Excerise Name</label><div class="autocomplete"><input placeholder="Not provided." type="text" class="form-control exercises exercise' + exerciseNum + ' name" placeholder="Not provided" autocomplete="off"></div></div></div><div class="sets"></div><div class="row"><div class="form-group col-md-12 grid-margin"><label for="appointmentNotes">Exercise Notes</label><textarea class="form-control notes exercise-' + exerciseNum + '" name="exercise' + exerciseNum + 'Notes" placeholder="Not provided."></textarea></div></div></div></div>')
};

// Build sets
const setTotal = 4;
let roundNumSet = 1;
for (let i = 1; i <= setTotal; i++) {
    $('.sets').append('<div class="row set' + i + '"><h4>Set ' + i + '</h4><div class="form-group col-md-4 grid-margin"><label for="set' + i + 'Reps">Reps</label><div><input placeholder="Not provided." type="text" class="form-control reps set' + i + 'Reps"></div></div><div class="form-group col-md-4 grid-margin"><label for="set' + i + 'Weight">Weight</label><div><input placeholder="Not provided." type="text" class="form-control weight exercise set' + i + 'Weight" ></div></div><div class="form-group col-md-4 grid-margin"><label for="set' + i + 'Weight">Tempo</label><div><input placeholder="Not provided." type="text" class="form-control weight set' + i + 'Tempo"></div></div></div>')
}

// No show checkmark
$('.noShow').click(function () {
    $('.noShow').toggleClass('checked');
    $('.exerciseLog').toggleClass('noShow')
});

//Our custom function, which will be called whenever
//the user clicks on the checkbox in question.
function terms_change(checkbox){
    //If it is checked.
    if(checkbox.checked){
        $('.exerciseLog').css('display','none')
    }
    //If it has been unchecked.
    else{
        $('.exerciseLog').css('display','block')
    }
}

$('.editAppointmentsPage .submit').click(function(){
    submitAppointment()
});

// Collect appointment log info on submit
$(".planAppointmentsPage .submit").click(function () {
    submitAppointment()
});

function submitAppointment(){
        console.log('click');

    // Check if name, location or date are empty
    if ($('#clientName').val() == '' || $('#date').val() == '' || $('#locationName').val() == '') {
        alert('Name location and date are required.')
        return;
    }

    // Build exercises
    const numRounds = 4;
    let exerciseLog;
    for (i = 1; i <= numExercises; i++) {
        // Check if "No Show" has been selected
        if ($('.noShow').hasClass('checked')) {
            // Create object with "No Show" data
            exerciseLog = {
                [Date.now() + '|' + $('#locationName').val().split(', ')[0].replace(/ /g, "_") + '|' + $('#locationName').val().split(', ')[1] + '|' + $('#clientName').val().replace(/ /g, "_") + '|' + $('.trainerName').val().replace(/ /g, "_")]: {
                    info: {
                        client: $('#clientName').val(),
                        trainer: $('.trainerName').val(),
                        date: $('#date').val(),
                        last_updated: $('#date').val(),
                        location: $('#locationName').val(),
                        no_show: "true",
                        notes: $('#appointmentNotes').val()
                    },
                    exercises: {
                        round1: {
                            exercise1: {
                                name: 'NA',
                                set1: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set2: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set3: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set4: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                            },
                            exercise2: {
                                name: 'NA',
                                set1: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set2: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set3: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set4: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                            },
                            exercise3: {
                                name: 'NA',
                                set1: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set2: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set3: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set4: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                            },
                            exercise4: {
                                name: 'NA',
                                set1: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set2: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set3: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set4: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                            }
                        },
                        round2: {
                            exercise1: {
                                name: 'NA',
                                set1: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set2: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set3: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set4: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                            },
                            exercise2: {
                                name: 'NA',
                                set1: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set2: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set3: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set4: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                            },
                            exercise3: {
                                name: 'NA',
                                set1: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set2: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set3: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set4: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                            },
                            exercise4: {
                                name: 'NA',
                                set1: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set2: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set3: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set4: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                            }
                        },
                        round3: {
                            exercise1: {
                                name: 'NA',
                                set1: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set2: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set3: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set4: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                            },
                            exercise2: {
                                name: 'NA',
                                set1: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set2: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set3: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set4: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                            },
                            exercise3: {
                                name: 'NA',
                                set1: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set2: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set3: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set4: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                            },
                            exercise4: {
                                name: 'NA',
                                set1: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set2: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set3: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set4: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                            }
                        },
                        round4: {
                            exercise1: {
                                name: 'NA',
                                set1: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set2: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set3: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set4: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                            },
                            exercise2: {
                                name: 'NA',
                                set1: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set2: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set3: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set4: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                            },
                            exercise3: {
                                name: 'NA',
                                set1: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set2: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set3: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set4: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                            },
                            exercise4: {
                                name: 'NA',
                                set1: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set2: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set3: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                                set4: {
                                    weight: 'NA',
                                    reps: 'NA',
                                    tempo: 'NA'
                                },
                            }
                        }
                    }
                }
            }
        } else {

            // Instantiate log results array
            let logResults = [];

            // Push input values into log results array
            $('.exerciseLog .form-control').each(function (i, obj) {
                    logResults.push($(obj).val());
            });
            let aid;
            if (window.location.href.indexOf("editAppointment.html") > -1) {
                const urlSearchParams = new URLSearchParams(window.location.search);
                 aid = urlSearchParams.get('appointment');
            }else{
                aid = Date.now();
            }

            // Create exercise log object
            exerciseLog = {
                [aid + '|' + $('#locationName').val().split(', ')[0].replace(/ /g, "_") + '|' + $('#locationName').val().split(', ')[1] + '|' + $('#clientName').val().replace(/ /g, "_") + '|' + $('.trainerName').val().replace(/ /g, "_")]: {
                    info: {
                        client: $('#clientName').val(),
                        trainer: $('.trainerName').val(),
                        date: $('#date').val(),
                        last_updated: $('#date').val(),
                        location: $('#locationName').val(),
                        no_show: "false",
                        notes: $('#appointmentNotes').val()
                    },
                    exercises: {
                        round1: {
                            exercise1: {
                                exerciseName: logResults[0],
                                set1: {
                                    weight: logResults[1],
                                    reps: logResults[2],
                                    tempo: logResults[3]
                                },
                                set2: {
                                    weight: logResults[4],
                                    reps: logResults[5],
                                    tempo: logResults[6]
                                },
                                set3: {
                                    weight: logResults[7],
                                    reps: logResults[8],
                                    tempo: logResults[9]
                                },
                                set4: {
                                    weight: logResults[10],
                                    reps: logResults[11],
                                    tempo: logResults[12]
                                },
                                exerciseNotes: logResults[13]
                            },
                            exercise2: {
                                exerciseName: logResults[14],
                                set1: {
                                    weight: logResults[15],
                                    reps: logResults[16],
                                    tempo: logResults[17]
                                },
                                set2: {
                                    weight: logResults[18],
                                    reps: logResults[19],
                                    tempo: logResults[20]
                                },
                                set3: {
                                    weight: logResults[21],
                                    reps: logResults[22],
                                    tempo: logResults[23]
                                },
                                set4: {
                                    weight: logResults[24],
                                    reps: logResults[25],
                                    tempo: logResults[26]
                                },
                                exerciseNotes: logResults[27]
                            },
                            exercise3: {
                                exerciseName: logResults[28],
                                set1: {
                                    weight: logResults[29],
                                    reps: logResults[30],
                                    tempo: logResults[31]
                                },
                                set2: {
                                    weight: logResults[32],
                                    reps: logResults[33],
                                    tempo: logResults[34]
                                },
                                set3: {
                                    weight: logResults[35],
                                    reps: logResults[36],
                                    tempo: logResults[37]
                                },
                                set4: {
                                    weight: logResults[38],
                                    reps: logResults[39],
                                    tempo: logResults[40]
                                },
                                exerciseNotes: logResults[41]
                            },
                            exercise4: {
                                exerciseName: logResults[42],
                                set1: {
                                    weight: logResults[43],
                                    reps: logResults[44],
                                    tempo: logResults[45]
                                },
                                set2: {
                                    weight: logResults[46],
                                    reps: logResults[47],
                                    tempo: logResults[48]
                                },
                                set3: {
                                    weight: logResults[49],
                                    reps: logResults[50],
                                    tempo: logResults[51]
                                },
                                set4: {
                                    weight: logResults[52],
                                    reps: logResults[53],
                                    tempo: logResults[54]
                                },
                                exerciseNotes: logResults[55]
                            }
                        },
                        round2: {
                            exercise1: {
                                exerciseName: logResults[56],
                                set1: {
                                    weight: logResults[57],
                                    reps: logResults[58],
                                    tempo: logResults[59]
                                },
                                set2: {
                                    weight: logResults[60],
                                    reps: logResults[61],
                                    tempo: logResults[62]
                                },
                                set3: {
                                    weight: logResults[63],
                                    reps: logResults[64],
                                    tempo: logResults[65]
                                },
                                set4: {
                                    weight: logResults[66],
                                    reps: logResults[67],
                                    tempo: logResults[68]
                                },
                                exerciseNotes: logResults[69]
                            },
                            exercise2: {
                                exerciseName: logResults[70],
                                set1: {
                                    weight: logResults[71],
                                    reps: logResults[72],
                                    tempo: logResults[73]
                                },
                                set2: {
                                    weight: logResults[74],
                                    reps: logResults[75],
                                    tempo: logResults[76]
                                },
                                set3: {
                                    weight: logResults[77],
                                    reps: logResults[78],
                                    tempo: logResults[79]
                                },
                                set4: {
                                    weight: logResults[80],
                                    reps: logResults[81],
                                    tempo: logResults[82]
                                },
                                exerciseNotes: logResults[83]
                            },
                            exercise3: {
                                exerciseName: logResults[84],
                                set1: {
                                    weight: logResults[85],
                                    reps: logResults[86],
                                    tempo: logResults[87]
                                },
                                set2: {
                                    weight: logResults[88],
                                    reps: logResults[89],
                                    tempo: logResults[90]
                                },
                                set3: {
                                    weight: logResults[91],
                                    reps: logResults[92],
                                    tempo: logResults[93]
                                },
                                set4: {
                                    weight: logResults[94],
                                    reps: logResults[95],
                                    tempo: logResults[96]
                                },
                                exerciseNotes: logResults[97]
                            },
                            exercise4: {
                                exerciseName: logResults[98],
                                set1: {
                                    weight: logResults[99],
                                    reps: logResults[100],
                                    tempo: logResults[101]
                                },
                                set2: {
                                    weight: logResults[102],
                                    reps: logResults[103],
                                    tempo: logResults[104]
                                },
                                set3: {
                                    weight: logResults[105],
                                    reps: logResults[106],
                                    tempo: logResults[107]
                                },
                                set4: {
                                    weight: logResults[108],
                                    reps: logResults[109],
                                    tempo: logResults[110]
                                },
                                exerciseNotes: logResults[111]
                            }
                        },
                        round3: {
                            exercise1: {
                                exerciseName: logResults[112],
                                set1: {
                                    weight: logResults[113],
                                    reps: logResults[114],
                                    tempo: logResults[115]
                                },
                                set2: {
                                    weight: logResults[116],
                                    reps: logResults[117],
                                    tempo: logResults[118]
                                },
                                set3: {
                                    weight: logResults[119],
                                    reps: logResults[120],
                                    tempo: logResults[121]
                                },
                                set4: {
                                    weight: logResults[122],
                                    reps: logResults[123],
                                    tempo: logResults[124]
                                },
                                exerciseNotes: logResults[125]
                            },
                            exercise2: {
                                exerciseName: logResults[126],
                                set1: {
                                    weight: logResults[127],
                                    reps: logResults[128],
                                    tempo: logResults[129]
                                },
                                set2: {
                                    weight: logResults[130],
                                    reps: logResults[131],
                                    tempo: logResults[132]
                                },
                                set3: {
                                    weight: logResults[133],
                                    reps: logResults[134],
                                    tempo: logResults[135]
                                },
                                set4: {
                                    weight: logResults[136],
                                    reps: logResults[137],
                                    tempo: logResults[138]
                                },
                                exerciseNotes: logResults[139]
                            },
                            exercise3: {
                                exerciseName: logResults[140],
                                set1: {
                                    weight: logResults[141],
                                    reps: logResults[142],
                                    tempo: logResults[143]
                                },
                                set2: {
                                    weight: logResults[144],
                                    reps: logResults[145],
                                    tempo: logResults[146]
                                },
                                set3: {
                                    weight: logResults[147],
                                    reps: logResults[148],
                                    tempo: logResults[149]
                                },
                                set4: {
                                    weight: logResults[150],
                                    reps: logResults[151],
                                    tempo: logResults[152]
                                },
                                exerciseNotes: logResults[153]
                            },
                            exercise4: {
                                exerciseName: logResults[154],
                                set1: {
                                    weight: logResults[155],
                                    reps: logResults[156],
                                    tempo: logResults[157]
                                },
                                set2: {
                                    weight: logResults[158],
                                    reps: logResults[159],
                                    tempo: logResults[160]
                                },
                                set3: {
                                    weight: logResults[161],
                                    reps: logResults[162],
                                    tempo: logResults[163]
                                },
                                set4: {
                                    weight: logResults[164],
                                    reps: logResults[165],
                                    tempo: logResults[166]
                                },
                                exerciseNotes: logResults[167]
                            }
                        },
                        round4: {
                            exercise1: {
                                exerciseName: logResults[168],
                                set1: {
                                    weight: logResults[169],
                                    reps: logResults[170],
                                    tempo: logResults[171]
                                },
                                set2: {
                                    weight: logResults[172],
                                    reps: logResults[173],
                                    tempo: logResults[174]
                                },
                                set3: {
                                    weight: logResults[175],
                                    reps: logResults[176],
                                    tempo: logResults[177]
                                },
                                set4: {
                                    weight: logResults[178],
                                    reps: logResults[179],
                                    tempo: logResults[180]
                                },
                                exerciseNotes: logResults[181]
                            },
                            exercise2: {
                                exerciseName: logResults[182],
                                set1: {
                                    weight: logResults[183],
                                    reps: logResults[184],
                                    tempo: logResults[185]
                                },
                                set2: {
                                    weight: logResults[186],
                                    reps: logResults[187],
                                    tempo: logResults[188]
                                },
                                set3: {
                                    weight: logResults[189],
                                    reps: logResults[190],
                                    tempo: logResults[191]
                                },
                                set4: {
                                    weight: logResults[192],
                                    reps: logResults[193],
                                    tempo: logResults[194]
                                },
                                exerciseNotes: logResults[195]
                            },
                            exercise3: {
                                exerciseName: logResults[196],
                                set1: {
                                    weight: logResults[197],
                                    reps: logResults[198],
                                    tempo: logResults[199]
                                },
                                set2: {
                                    weight: logResults[200],
                                    reps: logResults[201],
                                    tempo: logResults[202]
                                },
                                set3: {
                                    weight: logResults[203],
                                    reps: logResults[204],
                                    tempo: logResults[205]
                                },
                                set4: {
                                    weight: logResults[206],
                                    reps: logResults[207],
                                    tempo: logResults[208]
                                },
                                exerciseNotes: logResults[209]
                            },
                            exercise4: {
                                exerciseName: logResults[210],
                                set1: {
                                    weight: logResults[211],
                                    reps: logResults[212],
                                    tempo: logResults[213]
                                },
                                set2: {
                                    weight: logResults[214],
                                    reps: logResults[215],
                                    tempo: logResults[216]
                                },
                                set3: {
                                    weight: logResults[217],
                                    reps: logResults[218],
                                    tempo: logResults[219]
                                },
                                set4: {
                                    weight: logResults[220],
                                    reps: logResults[221],
                                    tempo: logResults[222]
                                },
                                exerciseNotes: logResults[223]
                            }
                        }
                    }
                }
            }
        }
    }            
    console.log(exerciseLog);
    updateDB(exerciseLog);

};

function updateDB(exerciseLog){
    setTimeout(() => {
        appointmentsRef.update(exerciseLog, (error) => {
        if (error) {
            alert(error)
        } else {
            console.log('Data saved successfully!')
        }
    });

}, 200)
};

function publishToDB(exerciseLog){
    setTimeout(() => {
        appointmentsRef.update(exerciseLog, (error) => {
        if (error) {
            alert(error)
        } else {
            console.log('Data saved successfully!')
        }
    });

}, 200)
};

