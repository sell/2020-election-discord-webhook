require('dotenv').config()
const { electionInfo } = require("./data");
const cron = require('node-cron');
const url = 'https://api-election.cbsnews.com/api/public/races2/2020/G?Filter.officeCode=P';

electionInfo(url).then(d => console.log(d));

/* updating every 10 minutes to match api */
cron.schedule('*/10 * * * *', () => {
    electionInfo(url).then(d => console.log(d));
});
