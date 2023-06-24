(function ($) {
  "use strict";
  $(function () {

    function getAppointments() {
      return new Promise(function (resolve, reject) {
        // Grab all appointment data from firebase
        const appointmentsRef = firebase.database().ref("/appointments");
        appointmentsRef.on("value", function (snapshot) {
          // Get snapshot value
          const appointmentData = snapshot.val();
          resolve(appointmentData);
        }, function (error) {
          reject(error);
        });
      });
    }
    
    // Run functions after returned promise
    getAppointments()
      .then(function (allAppointments) {
        
    let uniqueClients = [];
    let uniqueClientsByLocation = {};
    let trainersAndTotals = {};
    let appointmentsByLocation = {};
    let appointments = [];
    const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    // Loop through the keys
    for (const [key, value] of Object.entries(allAppointments)) {
      // Get the total unique clients
      if (value.info !== undefined && !uniqueClients.includes(value.info.client)) {
        uniqueClients.push(value.info.client);
      }

      // Get total unique clients by location
      if (value.info !== undefined && value.info.location){
          let location = value.info.location;
          location = location.replace(/^[ '"]+|[ '"]+$|( ){2,}/g,'$1');
          location = location.substring(0, location.indexOf(","));
          let client = value.info.client;

        if (!uniqueClientsByLocation[location]) {
          uniqueClientsByLocation[location] = new Set();
        }

        uniqueClientsByLocation[location].add(client);

          // Get total appointments by location
          if (appointmentsByLocation[location]) {
            appointmentsByLocation[location] += 1;
          } else {
            appointmentsByLocation[location] = 1;
          }
        }


      // Get the unique trainers and their appointment totals
      if (value.info !== undefined && value.info.trainer){
        let trainer = value.info.trainer;
        if (trainersAndTotals[trainer]) {
          trainersAndTotals[trainer] += 1;
        } else {
          trainersAndTotals[trainer] = 1;
        }
      }


      let clientKey = '';
      clientKey = `${key}`;
      // debugger
      let info = clientKey.split("|");
      // let location = info[1];
      if (info[2] !== 'undefined'){
        let state = info[2];
        let day = dayNames[new Date(JSON.parse(info[0])).getDay()];
        let client = info[3];
        let trainer = info[4];
        let month = info[5].slice(5, 7);
        let year = info[5].slice(0, 4);

        appointments.push(
          {
            client: client,
            day: day,                                                    // Day of the week
            location: info[1],                                           // Location of appointment
            month: month,                                                // Month of appointment
            state: state.replace(/^[ '"]+|[ '"]+$|( ){2,}/g,'$1'), 
            trainer: trainer,                                            // Location state (filter for spaces and punctuation);
            year: year                                                   // Year of appointment
          }
        );
      }
    }

    // Get total unique clients by location
    let totalUniqueClientsByLocation = {};
    for (let location in uniqueClientsByLocation) {
      let uniqueClients = uniqueClientsByLocation[location];
      totalUniqueClientsByLocation[location] = uniqueClients.size;
    }

    // Get appointments by location
    let sortedAppointmentsByLocation = sortTotals(appointmentsByLocation);
    for (const [key, value] of Object.entries(sortedAppointmentsByLocation)) {
      $('.appointmentsByLocation').append('<div class="wrapper d-flex align-items-center justify-content-between py-2 border-bottom"><div class="d-flex"><div class="wrapper ms-3"><p class="ms-1 mb-1 fw-bold trainerName">' + key + '</p><small class="text-muted mb-0">' + value + ' Appointments</small></div></div></div>');
    }
 
    // Sort those locations by client total
    let sortedLocationsAndClientTotals = sortTotals(totalUniqueClientsByLocation);
    // Show that data on the dashboard
    for (const [key, value] of Object.entries(sortedLocationsAndClientTotals)) {
      $('.clientsByLocation').append('<div class="wrapper d-flex align-items-center justify-content-between py-2 border-bottom"><div class="d-flex"><div class="wrapper ms-3"><p class="ms-1 mb-1 fw-bold trainerName">' + key + '</p><small class="text-muted mb-0">' + value + ' Clients</small></div></div></div>');
    }

    // Sort trainers by appointment total
    let sortedTrainersAndTotals = sortTotals(trainersAndTotals);
    for (const [key, value] of Object.entries(sortedTrainersAndTotals)) {
      $('.appointmentsByTrainer').append('<div class="wrapper d-flex align-items-center justify-content-between py-2 border-bottom"><div class="d-flex"><div class="wrapper ms-3"><p class="ms-1 mb-1 fw-bold trainerName">' + key + '</p><small class="text-muted mb-0">' + value + ' Appointments</small></div></div></div>');
    }

    // Total sorting function
    function sortTotals(data){
      let sortedTotals = Object.entries(data)
      .sort((a, b) => b[1] - a[1])
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

      return sortedTotals;
    }

    // Get overall total of unique clients
    let totalUniqueClients = uniqueClients.length;
    $('#totalUniqueClients').text(totalUniqueClients);


    // Get total appointments per day per state
    // Initialize an object to store the arrays for each state
    let totalAppointmentsPerDayState = {};
    let totalAppointmentsPerState = {};

    // Loop through the appointments array
    for (let i = 0; i < appointments.length; i++) {
      const appointment = appointments[i];

      // Extract the day, state, and location from the current appointment
      const { day, state } = appointment;

      // Create the state array if it doesn't exist
      if (!totalAppointmentsPerDayState[state]) {
        totalAppointmentsPerDayState[state] = [0, 0, 0, 0, 0, 0, 0];
      }
      if (!totalAppointmentsPerState[state]) {
        totalAppointmentsPerState[state] = 0;
      }

      // Determine the index of the day in the state's array
      let dayIndex;
      switch (day) {
        case "Sunday":
          dayIndex = 0;
          break;
        case "Monday":
          dayIndex = 1;
          break;
        case "Tuesday":
          dayIndex = 2;
          break;
        case "Wednesday":
          dayIndex = 3;
          break;
        case "Thursday":
          dayIndex = 4;
          break;
        case "Friday":
          dayIndex = 5;
          break;
        case "Saturday":
          dayIndex = 6;
          break;
        default:
          // Invalid day, skip to the next iteration
          continue;
      }

      // Increment the count for total appointments per state
      totalAppointmentsPerState[state]++;

      // Increment the count for total appointments per state based on day of the week
      totalAppointmentsPerDayState[state][dayIndex]++;
    }


    // Get totals for each month and day
    const monthNumbers = {};
    const dayNumbers = {};

    // Get current year
    const currYear = JSON.stringify(new Date().getFullYear());
    $('.currYear').text(currYear);

    // Loop through data
    appointments.forEach((res) => {
      // Getting month numbers
      // Make sure the data is from this year and check to see if the month already exists in the array
      if (!monthNumbers[res.month] && res.year == currYear) {
        // If not, add this month to the array
        monthNumbers[res.month] = [];
      }
      // If month exists, push the entry into the array
      if (monthNumbers[res.month]) {
        monthNumbers[res.month].push(res);
      }

      // Getting day of the week numbers
      // Make sure the data is from this year and check to see if the day already exists in the array
      if (!dayNumbers[res.day] && res.year == currYear) {
        // If not, add this day to the array
        dayNumbers[res.day] = [];
      }     
       // If day exists, push the entry into the array
      if (dayNumbers[res.day]) {
        dayNumbers[res.day].push(res);
      }
    });


    let monthInfo = [];
    for (const [key, value] of Object.entries(monthNumbers)) {
      let monthDetails = {
        [key]: value,
      };
      monthInfo.push(monthDetails);
    }

    let monthData = [];
    let appointmentTotal = 0;
    monthInfo.forEach((res) => {
      let details = {
        month: parseInt(Object.entries(res)[0][0]),
        total: Object.values(res)[0].length,
      };
      monthData.push(details);
      appointmentTotal =
        appointmentTotal + parseInt(Object.values(res)[0].length);
    });

    $("#appointmentTotal").text(appointmentTotal.toLocaleString());
    $("#appointmentTotal").after('<h4 class="me-2">Total Appointments</h4>')

    // Create an array to hold the result
    let updatedMonthData = [];

    // Loop through months 1 to 12
    for (let i = 1; i <= 12; i++) {
      // Check if the current month exists in the original data
      const existingMonth = monthData.find((data) => data.month === i);

      if (existingMonth) {
        // If the month exists, add it to the updated data array
        updatedMonthData.push(existingMonth.total);
      } else {
        // If the month is missing, add a new object with total 0
        updatedMonthData.push(0);
      }
    }

    // Output the updated month data
    if ($("#performanceLine").length) {
      var graphGradient = document
        .getElementById("performanceLine")
        .getContext("2d");
      var graphGradient2 = document
        .getElementById("performanceLine")
        .getContext("2d");
      var graphGradient3 = document
        .getElementById("performanceLine")
        .getContext("2d");
      var saleGradientBg = graphGradient.createLinearGradient(5, 0, 5, 100);
      saleGradientBg.addColorStop(0, "rgba(26, 115, 232, 0.18)");
      saleGradientBg.addColorStop(1, "rgba(26, 115, 232, 0.02)");
      var saleGradientBg2 = graphGradient2.createLinearGradient(
        100,
        0,
        50,
        150
      );
      saleGradientBg2.addColorStop(0, "rgba(0, 208, 255, 0.19)");
      saleGradientBg2.addColorStop(1, "rgba(0, 208, 255, 0.03)");
      var saleGradientBg3 = graphGradient3.createLinearGradient(
        100,
        0,
        50,
        150
      );
      saleGradientBg3.addColorStop(0, "rgba(0, 0, 0, 0.19)");
      saleGradientBg3.addColorStop(1, "rgba(0, 0, 0, 0.05)");
      var salesTopData = {
        labels: [
          "SUN",
          "MON",
          "TUE",
          "WED",
          "THU",
          "FRI",
          "SAT",
        ],
        datasets: [
          {
            label: "TX",
            data: totalAppointmentsPerDayState['TX'],
            backgroundColor: saleGradientBg,
            borderColor: ["#1F3BB3"],
            borderWidth: 1.5,
            fill: true, // 3: no fill
            pointBorderWidth: 4,
            pointRadius: [4, 4, 4, 4, 4, 4, 4],
            pointHoverRadius: [4, 4, 4, 4, 4, 4, 4],
            pointBackgroundColor: [
              "#1F3BB3",
              "#1F3BB3",
              "#1F3BB3",
              "#1F3BB3",
              "#1F3BB3",
              "#1F3BB3",
              "#1F3BB3",
            ],
            pointBorderColor: [
              "#1F3BB3",
              "#1F3BB3",
              "#1F3BB3",
              "#1F3BB3",
              "#1F3BB3",
              "#1F3BB3",
              "#1F3BB3",
            ],
          },
          {
            label: "OK",
            data: totalAppointmentsPerDayState['OK'],
            backgroundColor: saleGradientBg3,
            borderColor: ["#000"],
            borderWidth: 1.5,
            fill: true, // 3: no fill
            pointBorderWidth: 4,
            pointRadius: [4, 4, 4, 4, 4, 4, 4],
            pointHoverRadius: [4, 4, 4, 4, 4, 4, 4],
            pointBackgroundColor: [
              "#000",
              "#000",
              "#000",
              "#000",
              "#000",
              "#000",
              "#000",
            ],
            pointBorderColor: [
              "#000",
              "#000",
              "#000",
              "#000",
              "#000",
              "#000",
              "#000",
            ],
          },
          {
            label: "NY",
            data: totalAppointmentsPerDayState['NY'],
            backgroundColor: saleGradientBg3,
            borderColor: ["#3ba8b3"],
            borderWidth: 1.5,
            fill: true, // 3: no fill
            pointBorderWidth: 4,
            pointRadius: [4, 4, 4, 4, 4, 4, 4],
            pointHoverRadius: [4, 4, 4, 4, 4, 4, 4],
            pointBackgroundColor: [
              "#3ba8b3",
              "#3ba8b3",
              "#3ba8b3",
              "#3ba8b3",
              "#3ba8b3",
              "#3ba8b3",
              "#3ba8b3",
            ],
            pointBorderColor: [
              "#3ba8b3",
              "#3ba8b3",
              "#3ba8b3",
              "#3ba8b3",
              "#3ba8b3",
              "#3ba8b3",
              "#3ba8b3",
            ],
          },
          {
            label: "MO",
            data: totalAppointmentsPerDayState['MO'],
            backgroundColor: saleGradientBg2,
            borderColor: ["#52CDFF"],
            borderWidth: 1.5,
            fill: true, // 3: no fill
            pointBorderWidth: 4,
            pointRadius: [4, 4, 4, 4, 4, 4, 4],
            pointHoverRadius: [4, 4, 4, 4, 4, 4, 4],
            pointBackgroundColor: [
              "#52CDFF",
              "#52CDFF",
              "#52CDFF",
              "#52CDFF",
              "#52CDFF",
              "#52CDFF",
              "#52CDFF",
            ],
            pointBorderColor: [
              "#52CDFF",
              "#52CDFF",
              "#52CDFF",
              "#52CDFF",
              "#52CDFF",
              "#52CDFF",
              "#52CDFF",
            ],
          }
        ],
      };

      var salesTopOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
                drawBorder: false,
                color: "#F0F0F0",
                zeroLineColor: "#F0F0F0",
              },
              ticks: {
                beginAtZero: false,
                autoSkip: true,
                maxTicksLimit: 4,
                fontSize: 10,
                color: "#6B778C",
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                beginAtZero: false,
                autoSkip: true,
                maxTicksLimit: 7,
                fontSize: 10,
                color: "#6B778C",
              },
            },
          ],
        },
        legend: false,
        legendCallback: function (chart) {
          var text = [];
          text.push('<div class="chartjs-legend"><ul>');
          for (var i = 0; i < chart.data.datasets.length; i++) {
            // console.log(chart.data.datasets[i]); // see what's inside the obj.
            text.push("<li>");
            text.push(
              '<span style="background-color:' +
                chart.data.datasets[i].borderColor +
                '">' +
                "</span>"
            );
            text.push(chart.data.datasets[i].label);
            text.push("</li>");
          }
          text.push("</ul></div>");
          return text.join("");
        },

        elements: {
          line: {
            tension: 0.4,
          },
        },
        tooltips: {
          backgroundColor: "rgba(31, 59, 179, 1)",
        },
      };
      var salesTop = new Chart(graphGradient, {
        type: "line",
        data: salesTopData,
        options: salesTopOptions,
      });
      document.getElementById("performance-line-legend").innerHTML =
        salesTop.generateLegend();
    }
    // if ($("#performaneLine-dark").length) {
    //   var graphGradient = document
    //     .getElementById("performaneLine-dark")
    //     .getContext("2d");
    //   var graphGradient2 = document
    //     .getElementById("performaneLine-dark")
    //     .getContext("2d");
    //   var saleGradientBg = graphGradient.createLinearGradient(5, 0, 5, 100);
    //   saleGradientBg.addColorStop(0, "rgba(26, 115, 232, 0.18)");
    //   saleGradientBg.addColorStop(1, "rgba(34, 36, 55, 0.5)");
    //   var saleGradientBg2 = graphGradient2.createLinearGradient(10, 0, 0, 150);
    //   saleGradientBg2.addColorStop(0, "rgba(0, 208, 255, 0.19)");
    //   saleGradientBg2.addColorStop(1, "rgba(34, 36, 55, 0.2)");
    //   var salesTopDataDark = {
    //     labels: [
    //       "SUN",
    //       "MON",
    //       "TUE",
    //       "WED",
    //       "THU",
    //       "FRI",
    //       "SAT",
    //     ],
    //     datasets: [
    //       {
    //         label: "# of Votes",
    //         data: [
    //           50, 110, 60, 290, 200, 115, 130, 170, 90, 210, 240, 280, 200,
    //         ],
    //         backgroundColor: saleGradientBg,
    //         borderColor: ["#1F3BB3"],
    //         borderWidth: 9,
    //         fill: true, // 3: no fill
    //         pointBorderWidth: 4,
    //         pointRadius: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    //         pointHoverRadius: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    //         pointBackgroundColor: [
    //           "#1F3BB3)",
    //           "#1F3BB3",
    //           "#1F3BB3",
    //           "#1F3BB3",
    //           "#1F3BB3)",
    //           "#1F3BB3",
    //           "#1F3BB3",
    //           "#1F3BB3",
    //           "#1F3BB3)",
    //           "#1F3BB3",
    //           "#1F3BB3",
    //           "#1F3BB3",
    //           "#1F3BB3)",
    //         ],
    //         pointBorderColor: [
    //           "#1F3BB3",
    //           "#1F3BB3",
    //           "#1F3BB3",
    //           "#1F3BB3",
    //           "#1F3BB3",
    //           "#1F3BB3",
    //           "#1F3BB3",
    //           "#1F3BB3",
    //           "#1F3BB3",
    //           "#1F3BB3",
    //           "#1F3BB3",
    //           "#1F3BB3",
    //           "#1F3BB3",
    //         ],
    //       },
    //       {
    //         label: "# of Votes",
    //         data: [30, 150, 190, 250, 120, 150, 130, 20, 30, 15, 40, 95, 180],
    //         backgroundColor: saleGradientBg2,
    //         borderColor: ["#52CDFF"],
    //         borderWidth: 9,
    //         fill: true, // 3: no fill
    //         pointBorderWidth: 4,
    //         pointRadius: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    //         pointHoverRadius: [0, 0, 0, 2, 0],
    //         pointBackgroundColor: [
    //           "#52CDFF)",
    //           "#52CDFF",
    //           "#52CDFF",
    //           "#52CDFF",
    //           "#52CDFF)",
    //           "#52CDFF",
    //           "#52CDFF",
    //           "#52CDFF",
    //           "#52CDFF)",
    //           "#52CDFF",
    //           "#52CDFF",
    //           "#52CDFF",
    //           "#52CDFF)",
    //         ],
    //         pointBorderColor: [
    //           "#52CDFF",
    //           "#52CDFF",
    //           "#52CDFF",
    //           "#52CDFF",
    //           "#52CDFF",
    //           "#52CDFF",
    //           "#52CDFF",
    //           "#52CDFF",
    //           "#52CDFF",
    //           "#52CDFF",
    //           "#52CDFF",
    //           "#52CDFF",
    //           "#52CDFF",
    //         ],
    //       },
    //     ],
    //   };

    //   var salesTopOptionsDark = {
    //     responsive: true,
    //     maintainAspectRatio: false,
    //     scales: {
    //       yAxes: [
    //         {
    //           gridLines: {
    //             display: true,
    //             drawBorder: false,
    //             color: "rgba(255,255,255,.05)",
    //             zeroLineColor: "rgba(255,255,255,.05)",
    //           },
    //           ticks: {
    //             beginAtZero: false,
    //             autoSkip: true,
    //             maxTicksLimit: 4,
    //             fontSize: 10,
    //             color: "#6B778C",
    //           },
    //         },
    //       ],
    //       xAxes: [
    //         {
    //           gridLines: {
    //             display: false,
    //             drawBorder: false,
    //           },
    //           ticks: {
    //             beginAtZero: false,
    //             autoSkip: true,
    //             maxTicksLimit: 7,
    //             fontSize: 10,
    //             color: "#6B778C",
    //           },
    //         },
    //       ],
    //     },
    //     legend: false,
    //     legendCallback: function (chart) {
    //       var text = [];
    //       text.push('<div class="chartjs-legend"><ul>');
    //       for (var i = 0; i < chart.data.datasets.length; i++) {
    //         // console.log(chart.data.datasets[i]); // see what's inside the obj.
    //         text.push("<li>");
    //         text.push(
    //           '<span style="background-color:' +
    //             chart.data.datasets[i].borderColor +
    //             '">' +
    //             "</span>"
    //         );
    //         text.push(chart.data.datasets[i].label);
    //         text.push("</li>");
    //       }
    //       text.push("</ul></div>");
    //       return text.join("");
    //     },

    //     elements: {
    //       line: {
    //         tension: 0.4,
    //       },
    //     },
    //     tooltips: {
    //       backgroundColor: "rgba(31, 59, 179, 1)",
    //     },
    //   };
    //   var salesTopDark = new Chart(graphGradient, {
    //     type: "line",
    //     data: salesTopDataDark,
    //     options: salesTopOptionsDark,
    //   });
    //   document.getElementById("performance-line-legend-dark").innerHTML =
    //     salesTopDark.generateLegend();
    // }
    if ($("#datepicker-popup").length) {
      $("#datepicker-popup").datepicker({
        enableOnReadonly: true,
        todayHighlight: true,
      });
      $("#datepicker-popup").datepicker("setDate", "0");
    }
    if ($("#status-summary").length) {
      var statusSummaryChartCanvas = document
        .getElementById("status-summary")
        .getContext("2d");
      var statusData = {
        labels: ["SUN", "MON", "TUE", "WED", "THU", "FRI"],
        datasets: [
          {
            label: "# of Votes",
            data: [50, 68, 70, 10, 12, 80],
            backgroundColor: "#ffcc00",
            borderColor: ["#01B6A0"],
            borderWidth: 2,
            fill: false, // 3: no fill
            pointBorderWidth: 0,
            pointRadius: [0, 0, 0, 0, 0, 0],
            pointHoverRadius: [0, 0, 0, 0, 0, 0],
          },
        ],
      };

      var statusOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              display: false,
              gridLines: {
                display: false,
                drawBorder: false,
                color: "#F0F0F0",
              },
              ticks: {
                beginAtZero: false,
                autoSkip: true,
                maxTicksLimit: 4,
                fontSize: 10,
                color: "#6B778C",
              },
            },
          ],
          xAxes: [
            {
              display: false,
              gridLines: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                beginAtZero: false,
                autoSkip: true,
                maxTicksLimit: 7,
                fontSize: 10,
                color: "#6B778C",
              },
            },
          ],
        },
        legend: false,

        elements: {
          line: {
            tension: 0.4,
          },
        },
        tooltips: {
          backgroundColor: "rgba(31, 59, 179, 1)",
        },
      };
      var statusSummaryChart = new Chart(statusSummaryChartCanvas, {
        type: "line",
        data: statusData,
        options: statusOptions,
      });
    }
    if ($("#totalVisitors").length) {
      var bar = new ProgressBar.Circle(totalVisitors, {
        color: "#fff",
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 15,
        trailWidth: 15,
        easing: "easeInOut",
        duration: 1400,
        text: {
          autoStyleContainer: false,
        },
        from: {
          color: "#52CDFF",
          width: 15,
        },
        to: {
          color: "#677ae4",
          width: 15,
        },
        // Set default step function for all animate calls
        step: function (state, circle) {
          circle.path.setAttribute("stroke", state.color);
          circle.path.setAttribute("stroke-width", state.width);

          var value = Math.round(circle.value() * 100);
          if (value === 0) {
            circle.setText("");
          } else {
            circle.setText(value);
          }
        },
      });

      bar.text.style.fontSize = "0rem";
      bar.animate(0.64); // Number from 0.0 to 1.0
    }
    if ($("#visitperday").length) {
      var bar = new ProgressBar.Circle(visitperday, {
        color: "#fff",
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 15,
        trailWidth: 15,
        easing: "easeInOut",
        duration: 1400,
        text: {
          autoStyleContainer: false,
        },
        from: {
          color: "#34B1AA",
          width: 5,
        },
        to: {
          color: "#677ae4",
          width: 45,
        },
        // Set default step function for all animate calls
        step: function (state, circle) {
          circle.path.setAttribute("stroke", state.color);
          circle.path.setAttribute("stroke-width", state.width);

          var value = Math.round(circle.value() * 100);
          if (value === 0) {
            circle.setText("");
          } else {
            circle.setText(value);
          }
        },
      });

      bar.text.style.fontSize = "0rem";
      bar.animate(0.34); // Number from 0.0 to 1.0
    }

    if ($("#marketingOverview").length) {
      var marketingOverviewChart = document
        .getElementById("marketingOverview")
        .getContext("2d");
      var marketingOverviewData = {
        labels: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC",
        ],
        datasets: [
          {
            label: "Appointments",
            data: updatedMonthData,
            backgroundColor: "#52CDFF",
            borderColor: ["#52CDFF"],
            borderWidth: 0,
            fill: true, // 3: no fill
          },
        ],
      };

      var marketingOverviewOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
                drawBorder: false,
                color: "#F0F0F0",
                zeroLineColor: "#F0F0F0",
              },
              ticks: {
                beginAtZero: true,
                autoSkip: true,
                maxTicksLimit: 5,
                fontSize: 10,
                color: "#6B778C",
              },
            },
          ],
          xAxes: [
            {
              stacked: true,
              barPercentage: 1,
              gridLines: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                beginAtZero: false,
                autoSkip: true,
                maxTicksLimit: 12,
                fontSize: 10,
                color: "#6B778C",
              },
            },
          ],
        },
        legend: false,
        legendCallback: function (chart) {
          var text = [];
          text.push('<div class="chartjs-legend"><ul>');
          for (var i = 0; i < chart.data.datasets.length; i++) {
            // console.log(chart.data.datasets[i]); // see what's inside the obj.
            text.push('<li class="text-muted text-small">');
            text.push(
              '<span style="background-color:' +
                chart.data.datasets[i].borderColor +
                '">' +
                "</span>"
            );
            text.push(chart.data.datasets[i].label);
            text.push("</li>");
          }
          text.push("</ul></div>");
          return text.join("");
        },

        elements: {
          line: {
            tension: 0.4,
          },
        },
        tooltips: {
          backgroundColor: "rgba(31, 59, 179, 1)",
        },
      };
      var marketingOverview = new Chart(marketingOverviewChart, {
        type: "bar",
        data: marketingOverviewData,
        options: marketingOverviewOptions,
      });
      document.getElementById("marketing-overview-legend").innerHTML =
        marketingOverview.generateLegend();
    }
    if ($("#marketingOverview-dark").length) {
      var marketingOverviewChartDark = document
        .getElementById("marketingOverview-dark")
        .getContext("2d");
      var marketingOverviewDataDark = {
        labels: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC",
        ],
        datasets: [
          {
            label: "Last week",
            data: [110, 220, 200, 190, 220, 110, 210, 110, 205, 202, 201, 150],
            backgroundColor: "#52CDFF",
            borderColor: ["#52CDFF"],
            borderWidth: 0,
            fill: true, // 3: no fill
          },
          {
            label: "This week",
            data: [215, 290, 210, 250, 290, 230, 290, 210, 280, 220, 190, 300],
            backgroundColor: "#1F3BB3",
            borderColor: ["#1F3BB3"],
            borderWidth: 0,
            fill: true, // 3: no fill
          },
        ],
      };

      var marketingOverviewOptionsDark = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
                drawBorder: false,
                color: "rgba(255,255,255,.05)",
                zeroLineColor: "rgba(255,255,255,.05)",
              },
              ticks: {
                beginAtZero: true,
                autoSkip: true,
                maxTicksLimit: 5,
                fontSize: 10,
                color: "#6B778C",
              },
            },
          ],
          xAxes: [
            {
              stacked: true,
              barPercentage: 0.35,
              gridLines: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                beginAtZero: false,
                autoSkip: true,
                maxTicksLimit: 7,
                fontSize: 10,
                color: "#6B778C",
              },
            },
          ],
        },
        legend: false,
        legendCallback: function (chart) {
          var text = [];
          text.push('<div class="chartjs-legend"><ul>');
          for (var i = 0; i < chart.data.datasets.length; i++) {
            // console.log(chart.data.datasets[i]); // see what's inside the obj.
            text.push('<li class="text-muted text-small">');
            text.push(
              '<span style="background-color:' +
                chart.data.datasets[i].borderColor +
                '">' +
                "</span>"
            );
            text.push(chart.data.datasets[i].label);
            text.push("</li>");
          }
          text.push("</ul></div>");
          return text.join("");
        },

        elements: {
          line: {
            tension: 0.4,
          },
        },
        tooltips: {
          backgroundColor: "rgba(31, 59, 179, 1)",
        },
      };
      var marketingOverviewDark = new Chart(marketingOverviewChartDark, {
        type: "bar",
        data: marketingOverviewDataDark,
        options: marketingOverviewOptionsDark,
      });
      document.getElementById("marketing-overview-legend").innerHTML =
        marketingOverviewDark.generateLegend();
    }

    if ($("#doughnutChart").length) {
      var doughnutChartCanvas = $("#doughnutChart").get(0).getContext("2d");
      var doughnutPieData = {
        datasets: [
          {
            data: [totalAppointmentsPerState['TX'], totalAppointmentsPerState['OK'], totalAppointmentsPerState['NY'],totalAppointmentsPerState['MO']],
            backgroundColor: ["#1F3BB3", "#000", "#3ba8b3", "#52CDFF"],
            borderColor: ["#1F3BB3", "#000", "#3ba8b3", "#52CDFF"],
          },
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: ['TX (' + totalAppointmentsPerState['TX'] + ')', 'OK (' + totalAppointmentsPerState['OK'] + ')', 'NY (' + totalAppointmentsPerState['NY'] + ')', 'MO (' + totalAppointmentsPerState['MO'] + ')'],
      };
      var doughnutPieOptions = {
        cutoutPercentage: 50,
        animationEasing: "easeOutBounce",
        animateRotate: true,
        animateScale: false,
        responsive: true,
        maintainAspectRatio: true,
        showScale: true,
        legend: false,
        legendCallback: function (chart) {
          var text = [];
          text.push(
            '<div class="chartjs-legend"><ul class="justify-content-center">'
          );
          for (var i = 0; i < chart.data.datasets[0].data.length; i++) {
            text.push(
              '<li><span style="background-color:' +
                chart.data.datasets[0].backgroundColor[i] +
                '">'
            );
            text.push("</span>");
            if (chart.data.labels[i]) {
              text.push(chart.data.labels[i]);
            }
            text.push("</li>");
          }
          text.push("</div></ul>");
          return text.join("");
        },

        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
        tooltips: {
          callbacks: {
            title: function (tooltipItem, data) {
              return data["labels"][tooltipItem[0]["index"]];
            },
            label: function (tooltipItem, data) {
              return data["datasets"][0]["data"][tooltipItem["index"]];
            },
          },

          backgroundColor: "#fff",
          titleFontSize: 14,
          titleFontColor: "#0B0F32",
          bodyFontColor: "#737F8B",
          bodyFontSize: 11,
          displayColors: false,
        },
      };
      var doughnutChart = new Chart(doughnutChartCanvas, {
        type: "doughnut",
        data: doughnutPieData,
        options: doughnutPieOptions,
      });
      document.getElementById("doughnut-chart-legend").innerHTML =
        doughnutChart.generateLegend();
    }
    if ($("#leaveReport").length) {
      var leaveReportChart = document
        .getElementById("leaveReport")
        .getContext("2d");
      var leaveReportData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
          {
            label: "Last week",
            data: [18, 25, 39, 11, 24],
            backgroundColor: "#52CDFF",
            borderColor: ["#52CDFF"],
            borderWidth: 0,
            fill: true, // 3: no fill
          },
        ],
      };

      var leaveReportOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
                drawBorder: false,
                color: "rgba(255,255,255,.05)",
                zeroLineColor: "rgba(255,255,255,.05)",
              },
              ticks: {
                beginAtZero: true,
                autoSkip: true,
                maxTicksLimit: 5,
                fontSize: 10,
                color: "#6B778C",
              },
            },
          ],
          xAxes: [
            {
              barPercentage: 0.5,
              gridLines: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                beginAtZero: false,
                autoSkip: true,
                maxTicksLimit: 7,
                fontSize: 10,
                color: "#6B778C",
              },
            },
          ],
        },
        legend: false,

        elements: {
          line: {
            tension: 0.4,
          },
        },
        tooltips: {
          backgroundColor: "rgba(31, 59, 179, 1)",
        },
      };
      var leaveReport = new Chart(leaveReportChart, {
        type: "bar",
        data: leaveReportData,
        options: leaveReportOptions,
      });
    }
    if ($("#leaveReport-dark").length) {
      var leaveReportChartDark = document
        .getElementById("leaveReport-dark")
        .getContext("2d");
      var leaveReportDataDark = {
        labels: ["JAN", "FEB", "MAR", "APR", "MAY"],
        datasets: [
          {
            label: "Last week",
            data: [18, 25, 39, 11, 24],
            backgroundColor: "#52CDFF",
            borderColor: ["#52CDFF"],
            borderWidth: 0,
            fill: true, // 3: no fill
          },
        ],
      };

      var leaveReportOptionsDark = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
                drawBorder: false,
                color: "#383e5d",
                zeroLineColor: "#383e5d",
              },
              ticks: {
                beginAtZero: true,
                autoSkip: true,
                maxTicksLimit: 5,
                fontSize: 10,
                color: "#6B778C",
              },
            },
          ],
          xAxes: [
            {
              barPercentage: 0.5,
              gridLines: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                beginAtZero: false,
                autoSkip: true,
                maxTicksLimit: 7,
                fontSize: 10,
                color: "#6B778C",
              },
            },
          ],
        },
        legend: false,

        elements: {
          line: {
            tension: 0.4,
          },
        },
        tooltips: {
          backgroundColor: "rgba(31, 59, 179, 1)",
        },
      };
      var leaveReportDark = new Chart(leaveReportChartDark, {
        type: "bar",
        data: leaveReportDataDark,
        options: leaveReportOptionsDark,
      });
    }
  })
  .catch(function (error) {
    // Handle any errors that occurred during the retrieval
    console.error("Error getting appointments: ", error);
  });
  });
})(jQuery);
