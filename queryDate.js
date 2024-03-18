// https://www.bochk.com/sc/contact/online/hkpaccountopen.html
// to aovid CORS restrict, this script can only executed in the console of the inner iframe,
// named iframe(continueInput.action)[transaction.bochk.com], NOT top console[www.bochk.com].
// you can find the console panel in chrome devtools.

const districts = [
    { code: "_central_western_district", name: "中西区" },
    { code: "_eastern_district", name: "东区" },
    { code: "_island_district", name: "离岛区" },
    { code: "_kowloon_city_district", name: "九龙城区" },
    { code: "_kwai_tsing_district", name: "葵青区" },
    { code: "_kwun_tong_district", name: "观塘区" },
    { code: "_north_district", name: "北区" },
    { code: "_sai_kung_district", name: "西贡区" },
    { code: "_sha_tin_district", name: "沙田区" },
    { code: "_sham_shui_po_district", name: "深水埗区" },
    { code: "_southern_district", name: "南区" },
    { code: "_tai_po_district", name: "大埔区" },
    { code: "_tsuen_wan_district", name: "荃湾区" },
    { code: "_tuen_mun_district", name: "屯门区" },
    { code: "_wan_chai_district", name: "湾仔区" },
    { code: "_wong_tai_sin_district", name: "黄大仙区" },
    { code: "_yau_tsim_mong_district", name: "油尖旺区" },
    { code: "_yuen_long_district", name: "元朗区" }
];
const appTimesWeekdays = [
    { code: "P01", time: "09:00" },
    { code: "P02", time: "09:45" },
    { code: "P03", time: "10:30" },
    { code: "P04", time: "11:15" },
    { code: "P05", time: "14:00" },
    { code: "P06", time: "14:45" },
    { code: "P07", time: "15:30" },
    { code: "P08", time: "16:15" }
];
const appTimesSaturday = [
    { code: "P01", time: "09:00" },
    { code: "P02", time: "09:45" },
    { code: "P03", time: "10:30" },
    { code: "P04", time: "11:15" }
];

let globalTotalQueries = 0;
let globalCompletedQueries = 0;
let overallTotalQueries = 0;
let overallCompletedQueries = 0;
let availableAppointments = [];
let pendingQueries = 0;

async function queryDate(appDate) {
    pendingQueries++;
    const dayOfWeek = new Date(appDate.split("/").reverse().join("-")).getDay();
    let appTimes = [];

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        appTimes = appTimesWeekdays;
    } else if (dayOfWeek === 6) {
        appTimes = appTimesSaturday;
    } else {
        console.error("Error: Bank is closed on Sundays.");
        pendingQueries--;
        return; // Skip if it's Sunday
    }

    const totalQueries = districts.length * appTimes.length;
    globalTotalQueries += totalQueries;
    overallTotalQueries += totalQueries;
    let completedQueries = 0;

    for (const { name } of districts) {
        for (const { time } of appTimes) {
            console.log(`Requesting for District: ${name}, AppTime: ${time}, Date: ${appDate}`);
            const data = `bean.appDate=${appDate}&bean.appTime=${time}&bean.district=${name}&bean.precondition=D`;
            try {
                const response = await fetch("https://transaction.bochk.com/whk/form/openAccount/jsonAvailableBrsByDT.action", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "Accept": "application/json, text/javascript, */*; q=0.01",
                        "X-Requested-With": "XMLHttpRequest"
                    },
                    body: data
                });
                const json = await response.json();
                if (json.length > 1) {
                    console.log('%cResponse for District: ' + `${name}, AppTime: ${time}, Date: ${appDate}:`, 'color: green; font-weight: bold;', json);
                    availableAppointments.push({ district: name, appTime: time, date: appDate, branches: json.slice(1) });
                }
            } catch (error) {
                console.error(`Error fetching data for District: ${name}, AppTime: ${time}, Date: ${appDate}`, error);
            }
            completedQueries++;
            globalCompletedQueries++;
            overallCompletedQueries++;
            console.log(`Progress for ${appDate}: ${completedQueries}/${totalQueries} (${((completedQueries / totalQueries) * 100).toFixed(2)}%) \t Overall Progress: ${overallCompletedQueries}/${overallTotalQueries} (${((overallCompletedQueries / overallTotalQueries) * 100).toFixed(2)}%)`);
        }
    }

    if (globalCompletedQueries === globalTotalQueries) {
        console.log('%cAvailable Appointments Summary:', 'color: blue; font-weight: bold;', availableAppointments);
        // Reset counters and available appointments for the next batch
        globalTotalQueries = 0;
        globalCompletedQueries = 0;
        availableAppointments = [];
    }
    
    pendingQueries--;
    if (pendingQueries === 0) {
        // Reset overall counters after all queries are completed
        overallTotalQueries = 0;
        overallCompletedQueries = 0;
    }
}

// Example usage
// queryDate("22/03/2024");
// queryDate("23/03/2024");
// queryDate("24/03/2024");

// Later, you can execute again with different or same dates
// queryDate("25/03/2024");
// queryDate("26/03/2024");
