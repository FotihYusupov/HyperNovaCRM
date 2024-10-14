// const moment = require("moment")

// const currentMonth = Math.floor(
//   moment().startOf("date").valueOf() / 1000
// );

// console.log('====================================');
// console.log(currentMonth);
// console.log('====================================');

// const currentMonth2 = Math.floor(
//   moment().startOf("date").valueOf() / 1000
// );

// console.log('====================================');
// console.log(currentMonth2);
// console.log('====================================');

// const getCurrentTimestampAndFormattedDate = () => {
//   const currentTimestamp = moment().unix();
//   const formattedDate = moment.unix(currentTimestamp).format("DD/MM/YYYY");

//   return {
//     timeStamp: () => currentTimestamp,
//     format: () => formattedDate,
//   };
// };

// const result = getCurrentTimestampAndFormattedDate();
// console.log(getCurrentTimestampAndFormattedDate().timeStamp()); // Logs the current timestamp
// console.log(result.format());    // Logs the formatted date


// const { addDays, isWeekend, format } = require('date-fns');

// // List of holidays for Uzbekistan (you can add more if needed)
// const uzbekistanHolidays = [
//   '2024-01-01', // New Year
//   '2024-03-08', // International Women's Day
//   '2024-03-21', // Navruz (Persian New Year)
//   '2024-05-09', // Victory Day
//   '2024-09-01', // Independence Day
//   '2024-09-02', // Independence Day
// ];

// // Function to check if a date is a holiday
// function isHoliday(date) {
//   const formattedDate = format(date, 'yyyy-MM-dd');
//   return uzbekistanHolidays.includes(formattedDate);
// }

// function addBusinessDays(startDate, workingDays) {
//   let currentDate = new Date(startDate);
//   let addedDays = 0;

//   while (addedDays < workingDays) {
//     currentDate = addDays(currentDate, 1);

//     // Skip weekends and holidays
//     if (!isWeekend(currentDate) && !isHoliday(currentDate)) {
//       addedDays++;
//     }
//   }

//   return currentDate;
// }

// // Example usage
// const startDate = '2024-09-01';
// const workingDays = 30;

// const endDate = addBusinessDays(startDate, workingDays);
// console.log(endDate); // Output: the end date based on 5 working days (excluding weekends and holidays)


/* const [ a, b ] = fn( 2 )( 3 )[ 0 ]
console.log( a ) // 4
console.log( b ) // 6 */

// function fn( a ) {
//   return function( b ) {
//     return [ a + a, b + b ]
//   }
// }

// const [ a, b ] = fn( 2 )( 3 )
// console.log( a ) // 4
// console.log( b ) // 6
