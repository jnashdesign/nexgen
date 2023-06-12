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
};

if (localStorage.getItem('location')){
    $('#locationName').val(localStorage.getItem('location'));
    $('#locationName').attr('disabled');
}

// Build sets
const setTotal = 4;
const roundTotal = 3;
let roundNumSet = 1;
for (let i = 1; i <= roundTotal; i++) {
    $('.exerciseLog').append('<div id="round-' + i + '" class="roundContainer"><h3>Round ' + i + '</h3></div>');
};

for (let i = 1; i <= setTotal; i++) {
    $('.roundContainer').append('<div class="exerciseContainer exercise-'+ i +'"><input placeholder="Exercise ' + i + ' Name" type="text" class="form-control exercises exercise' + i + ' name" placeholder="Not provided" autocomplete="off"></div></div>');
};
for (let i = 1; i <= setTotal; i++) {
    $('.exerciseContainer').append('<div class="row set' + i + '"><div class="form-group col-md-4 grid-margin"><input placeholder="Set ' + i + ' Weight" type="text" class="form-control weight set' + i + 'Weight" ></div><div class="form-group col-md-4 grid-margin"><input placeholder="Set ' + i + ' Reps" type="text" class="form-control reps set' + i + 'Reps"></div><div class="form-group col-md-4 grid-margin"><div><input placeholder="Set ' + i + ' Notes" type="text" class="form-control notes set' + i + 'Notes"></div></div>');
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
        callAlert('Name location and date are required.', 'danger')
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
                    exercises: 'NA'
                }
            }
        } else {

            // Instantiate log results array
            let logResults = [];

            // Push input values into log results array
            $('.exerciseLog .form-control').each(function (i, obj) {
                    logResults.push($(obj).val());
                    console.log(logResults);
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
                [aid + '|' + $('#locationName').val().split(', ')[0].replace(/ /g, "_") + '|' + $('#locationName').val().split(', ')[1] + '|' + $('#clientName').val().replace(/ /g, "_") + '|' + $('.trainerName').val().replace(/ /g, "_") + '|' + $('#date').val()]: {
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
                                exerciseName: logResults[0].split(' (')[0] || 'Not Provided',
                                set1: {
                                    weight: logResults[1] || 'Not Provided',
                                    reps: logResults[2] || 'Not Provided',
                                    notes: logResults[3] || 'Not Provided',
                                },
                                set2: {
                                    weight: logResults[4] || 'Not Provided',
                                    reps: logResults[5] || 'Not Provided',
                                    notes: logResults[6] || 'Not Provided',
                                },
                                set3: {
                                    weight: logResults[7] || 'Not Provided',
                                    reps: logResults[8] || 'Not Provided',
                                    notes: logResults[9] || 'Not Provided',
                                },
                                set4: {
                                    weight: logResults[10] || 'Not Provided',
                                    reps: logResults[11] || 'Not Provided',
                                    notes: logResults[12] || 'Not Provided',
                                },
                            },
                            exercise2: {
                                exerciseName: logResults[13].split(' (')[0] || 'Not Provided',
                                set1: {
                                    weight: logResults[14] || 'Not Provided',
                                    reps: logResults[15] || 'Not Provided',
                                    notes: logResults[16] || 'Not Provided',
                                },
                                set2: {
                                    weight: logResults[17] || 'Not Provided',
                                    reps: logResults[18] || 'Not Provided',
                                    notes: logResults[19] || 'Not Provided',
                                },
                                set3: {
                                    weight: logResults[20] || 'Not Provided',
                                    reps: logResults[21] || 'Not Provided',
                                    notes: logResults[22] || 'Not Provided',
                                },
                                set4: {
                                    weight: logResults[23] || 'Not Provided',
                                    reps: logResults[24] || 'Not Provided',
                                    notes: logResults[25] || 'Not Provided',
                                },
                            },                        
                            exercise3: {
                                exerciseName: logResults[26].split(' (')[0] || 'Not Provided',
                                    set1: {
                                        weight: logResults[27] || 'Not Provided',
                                        reps: logResults[28] || 'Not Provided',
                                        notes: logResults[29] || 'Not Provided',
                                    },
                                    set2: {
                                        weight: logResults[30] || 'Not Provided',
                                        reps: logResults[31] || 'Not Provided',
                                        notes: logResults[32] || 'Not Provided',
                                    },
                                    set3: {
                                        weight: logResults[33] || 'Not Provided',
                                        reps: logResults[34] || 'Not Provided',
                                        notes: logResults[35] || 'Not Provided',
                                    },
                                    set4: {
                                        weight: logResults[36] || 'Not Provided',
                                        reps: logResults[37] || 'Not Provided',
                                        notes: logResults[38] || 'Not Provided',
                                    },
                            },                        
                            exercise4: {
                            exerciseName: logResults[39].split(' (')[0] || 'Not Provided',
                                set1: {
                                    weight: logResults[40] || 'Not Provided',
                                    reps: logResults[41] || 'Not Provided',
                                    notes: logResults[42] || 'Not Provided',
                                },
                                set2: {
                                    weight: logResults[43] || 'Not Provided',
                                    reps: logResults[44] || 'Not Provided',
                                    notes: logResults[45] || 'Not Provided',
                                },
                                set3: {
                                    weight: logResults[46] || 'Not Provided',
                                    reps: logResults[47] || 'Not Provided',
                                    notes: logResults[48] || 'Not Provided',
                                },
                                set4: {
                                    weight: logResults[49] || 'Not Provided',
                                    reps: logResults[50] || 'Not Provided',
                                    notes: logResults[51] || 'Not Provided',
                                },
                            },
                        },
                        round2: {
                            exercise1: {
                                exerciseName: logResults[52].split(' (')[0] || 'Not Provided',
                                set1: {
                                    weight: logResults[53] || 'Not Provided',
                                    reps: logResults[54] || 'Not Provided',
                                    notes: logResults[55] || 'Not Provided',
                                },
                                set2: {
                                    weight: logResults[56] || 'Not Provided',
                                    reps: logResults[57] || 'Not Provided',
                                    notes: logResults[58] || 'Not Provided',
                                },
                                set3: {
                                    weight: logResults[59] || 'Not Provided',
                                    reps: logResults[60] || 'Not Provided',
                                    notes: logResults[61] || 'Not Provided',
                                },
                                set4: {
                                    weight: logResults[62] || 'Not Provided',
                                    reps: logResults[63] || 'Not Provided',
                                    notes: logResults[64] || 'Not Provided',
                                },
                                },
                            exercise2: {
                                exerciseName: logResults[65].split(' (')[0] || 'Not Provided',
                                set1: {
                                    weight: logResults[66] || 'Not Provided',
                                    reps: logResults[67] || 'Not Provided',
                                    notes: logResults[68] || 'Not Provided',
                                },
                                set2: {
                                    weight: logResults[69] || 'Not Provided',
                                    reps: logResults[70] || 'Not Provided',
                                    notes: logResults[71] || 'Not Provided',
                                },
                                set3: {
                                    weight: logResults[72] || 'Not Provided',
                                    reps: logResults[73] || 'Not Provided',
                                    notes: logResults[74] || 'Not Provided',
                                },
                                set4: {
                                    weight: logResults[75] || 'Not Provided',
                                    reps: logResults[76] || 'Not Provided',
                                    notes: logResults[77] || 'Not Provided',
                                },
                            },                        
                            exercise3: {
                                exerciseName: logResults[78].split(' (')[0] || 'Not Provided',
                                    set1: {
                                        weight: logResults[79] || 'Not Provided',
                                        reps: logResults[80] || 'Not Provided',
                                        notes: logResults[81] || 'Not Provided',
                                    },
                                    set2: {
                                        weight: logResults[82] || 'Not Provided',
                                        reps: logResults[83] || 'Not Provided',
                                        notes: logResults[84] || 'Not Provided',
                                    },
                                    set3: {
                                        weight: logResults[85] || 'Not Provided',
                                        reps: logResults[86] || 'Not Provided',
                                        notes: logResults[87] || 'Not Provided',
                                    },
                                    set4: {
                                        weight: logResults[88] || 'Not Provided',
                                        reps: logResults[89] || 'Not Provided',
                                        notes: logResults[90] || 'Not Provided',
                                    },
                            },                        
                            exercise4: {
                            exerciseName: logResults[91].split(' (')[0] || 'Not Provided',
                                set1: {
                                    weight: logResults[92] || 'Not Provided',
                                    reps: logResults[93] || 'Not Provided',
                                    notes: logResults[94] || 'Not Provided',
                                },
                                set2: {
                                    weight: logResults[95] || 'Not Provided',
                                    reps: logResults[96] || 'Not Provided',
                                    notes: logResults[97] || 'Not Provided',
                                },
                                set3: {
                                    weight: logResults[98] || 'Not Provided',
                                    reps: logResults[99] || 'Not Provided',
                                    notes: logResults[100] || 'Not Provided',
                                },
                                set4: {
                                    weight: logResults[101] || 'Not Provided',
                                    reps: logResults[102] || 'Not Provided',
                                    notes: logResults[103] || 'Not Provided',
                                },
                            },
                        },
                        round3: {
                            exercise1: {
                                exerciseName: logResults[104].split(' (')[0] || 'Not Provided',
                                set1: {
                                    weight: logResults[105] || 'Not Provided',
                                    reps: logResults[106] || 'Not Provided',
                                    notes: logResults[107] || 'Not Provided',
                                },
                                set2: {
                                    weight: logResults[108] || 'Not Provided',
                                    reps: logResults[109] || 'Not Provided',
                                    notes: logResults[110] || 'Not Provided',
                                },
                                set3: {
                                    weight: logResults[111] || 'Not Provided',
                                    reps: logResults[112] || 'Not Provided',
                                    notes: logResults[113] || 'Not Provided',
                                },
                                set4: {
                                    weight: logResults[114] || 'Not Provided',
                                    reps: logResults[115] || 'Not Provided',
                                    notes: logResults[116] || 'Not Provided',
                                },
                                },
                            exercise2: {
                                exerciseName: logResults[117].split(' (')[0] || 'Not Provided',
                                set1: {
                                    weight: logResults[118] || 'Not Provided',
                                    reps: logResults[119] || 'Not Provided',
                                    notes: logResults[120] || 'Not Provided',
                                },
                                set2: {
                                    weight: logResults[121] || 'Not Provided',
                                    reps: logResults[122] || 'Not Provided',
                                    notes: logResults[123] || 'Not Provided',
                                },
                                set3: {
                                    weight: logResults[124] || 'Not Provided',
                                    reps: logResults[125] || 'Not Provided',
                                    notes: logResults[126] || 'Not Provided',
                                },
                                set4: {
                                    weight: logResults[127] || 'Not Provided',
                                    reps: logResults[128] || 'Not Provided',
                                    notes: logResults[129] || 'Not Provided',
                                },
                            },                        
                            exercise3: {
                                exerciseName: logResults[130].split(' (')[0] || 'Not Provided',
                                    set1: {
                                        weight: logResults[131] || 'Not Provided',
                                        reps: logResults[132] || 'Not Provided',
                                        notes: logResults[133] || 'Not Provided',
                                    },
                                    set2: {
                                        weight: logResults[134] || 'Not Provided',
                                        reps: logResults[135] || 'Not Provided',
                                        notes: logResults[136] || 'Not Provided',
                                    },
                                    set3: {
                                        weight: logResults[137] || 'Not Provided',
                                        reps: logResults[138] || 'Not Provided',
                                        notes: logResults[139] || 'Not Provided',
                                    },
                                    set4: {
                                        weight: logResults[140] || 'Not Provided',
                                        reps: logResults[141] || 'Not Provided',
                                        notes: logResults[142] || 'Not Provided',
                                    },
                            },                        
                            exercise4: {
                            exerciseName: logResults[143].split(' (')[0] || 'Not Provided',
                                set1: {
                                    weight: logResults[144] || 'Not Provided',
                                    reps: logResults[145] || 'Not Provided',
                                    notes: logResults[146] || 'Not Provided',
                                },
                                set2: {
                                    weight: logResults[147] || 'Not Provided',
                                    reps: logResults[148] || 'Not Provided',
                                    notes: logResults[149] || 'Not Provided',
                                },
                                set3: {
                                    weight: logResults[150] || 'Not Provided',
                                    reps: logResults[151] || 'Not Provided',
                                    notes: logResults[152] || 'Not Provided',
                                },
                                set4: {
                                    weight: logResults[153] || 'Not Provided',
                                    reps: logResults[154] || 'Not Provided',
                                    notes: logResults[155] || 'Not Provided',
                                },
                            },
                        },
                        // round4: {
                        //     exercise1: {
                        //         exerciseName: logResults[156].split(' (')[0]|| 'Not Provided',
                        //         set1: {
                        //             weight: logResults[157]|| 'Not Provided',
                        //             reps: logResults[158]|| 'Not Provided',
                        //             notes: logResults[159]|| 'Not Provided',
                        //         },
                        //         set2: {
                        //             weight: logResults[160] || 'Not Provided',
                        //             reps: logResults[161] || 'Not Provided',
                        //             notes: logResults[162] || 'Not Provided',
                        //         },
                        //         set3: {
                        //             weight: logResults[163] || 'Not Provided',
                        //             reps: logResults[164] || 'Not Provided',
                        //             notes: logResults[165] || 'Not Provided'
                        //         },
                        //         set4: {
                        //             weight: logResults[166] || 'Not Provided',
                        //             reps: logResults[167] || 'Not Provided',
                        //             notes: logResults[168] || 'Not Provided'
                        //         },
                        //         },
                        //     exercise2: {
                        //         exerciseName: logResults[169].split(' (')[0] || 'Not Provided',
                        //         set1: {
                        //             weight: logResults[170] || 'Not Provided',
                        //             reps: logResults[171] || 'Not Provided',
                        //             notes: logResults[172] || 'Not Provided',
                        //         },
                        //         set2: {
                        //             weight: logResults[173] || 'Not Provided',
                        //             reps: logResults[174] || 'Not Provided',
                        //             notes: logResults[175] || 'Not Provided',
                        //         },
                        //         set3: {
                        //             weight: logResults[176] || 'Not Provided',
                        //             reps: logResults[177] || 'Not Provided',
                        //             notes: logResults[178] || 'Not Provided',
                        //         },
                        //         set4: {
                        //             weight: logResults[179] || 'Not Provided',
                        //             reps: logResults[180] || 'Not Provided',
                        //             notes: logResults[181] || 'Not Provided',
                        //         },
                        //     },                        
                        //     exercise3: {
                        //         exerciseName: logResults[182].split(' (')[0] || 'Not Provided',
                        //             set1: {
                        //                 weight: logResults[183] || 'Not Provided',
                        //                 reps: logResults[184] || 'Not Provided',
                        //                 notes: logResults[185] || 'Not Provided',
                        //             },
                        //             set2: {
                        //                 weight: logResults[186] || 'Not Provided',
                        //                 reps: logResults[187] || 'Not Provided',
                        //                 notes: logResults[188] || 'Not Provided',
                        //             },
                        //             set3: {
                        //                 weight: logResults[189] || 'Not Provided',
                        //                 reps: logResults[190] || 'Not Provided',
                        //                 notes: logResults[191] || 'Not Provided',
                        //             },
                        //             set4: {
                        //                 weight: logResults[192] || 'Not Provided',
                        //                 reps: logResults[193] || 'Not Provided',
                        //                 notes: logResults[194] || 'Not Provided',
                        //             },
                        //     },                        
                        //     exercise4: {
                        //     exerciseName: logResults[195].split(' (')[0] || 'Not Provided',
                        //         set1: {
                        //             weight: logResults[196] || 'Not Provided',
                        //             reps: logResults[197] || 'Not Provided',
                        //             notes: logResults[198] || 'Not Provided',
                        //         },
                        //         set2: {
                        //             weight: logResults[199] || 'Not Provided',
                        //             reps: logResults[200] || 'Not Provided',
                        //             notes: logResults[201] || 'Not Provided',
                        //         },
                        //         set3: {
                        //             weight: logResults[202] || 'Not Provided',
                        //             reps: logResults[203] || 'Not Provided',
                        //             notes: logResults[204] || 'Not Provided',
                        //         },
                        //         set4: {
                        //             weight: logResults[205] || 'Not Provided',
                        //             reps: logResults[206] || 'Not Provided',
                        //             notes: logResults[207] || 'Not Provided',
                        //         },
                        //     }
                        // }    
                    }
                }
            }
        }
    }            
    updateDB(exerciseLog);
};

function updateDB(exerciseLog){
    setTimeout(() => {
        appointmentsRef.update(exerciseLog, (error) => {
        if (error) {
            callAlert(error, 'danger')
        } else {
            let message = 'Data saved successfully!';
            callAlert(message, 'success');
            $('input').val('');
            $('textarea').val('');
            $("html,body").animate({
                scrollTop: 0
              }, "slow");
        }
    });

}, 200)
};

function publishToDB(exerciseLog){
    setTimeout(() => {
        appointmentsRef.update(exerciseLog, (error) => {
        if (error) {
            callAlert(error, 'danger')
        } else {
            console.log('Data saved successfully!')
        }
    });

}, 200)
};
