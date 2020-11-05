const axios = require('axios');
const { Filter, subtract, states, division , Embed } = require("../functions");

const electionInfo = async (url) => {
    /* fetching data */
    const res = await axios.get(url);
    const data = res.data;

    /* Republican Info */
    const red = Filter(data, 'Rep Win')
    const redEV = red.reduce((a, b) => a += b.electoralVotes, 0);
    const likelyRed = Filter(data, 'Likely Rep');

    /* Democratic Info */
    const blue = Filter(data, 'Dem Win');
    const blueEV = blue.reduce((a, b) => a += b.electoralVotes, 0);
    const likelyBlue = Filter(data, 'Likely Dem');

    /* toss up info */
    const tossUp = Filter(data, 'Toss-up');

    /* embed */
    const mainEmbed = new Embed()
        .eTitle('2020 Election')
        .eURL(url)
        .eDescription('**The Electoral Votes of 2020**')
        .eColor('#ff0000')
        .field('Republican Votes', redEV, true )
        .field('Votes Needed', `${subtract(redEV)} - ${division(redEV)}%`, true )
        .field('Republican States',  states(red), true )
        .field('Democrat Votes', blueEV, true )
        .field('Votes Needed', `${subtract(blueEV)} - ${division(blueEV)}%`, true )
        .field('Democrat States',  states(blue), true )
        .eFooter(new Date(), 'https://emails.illinois.edu/files/264695/electiongraphic_2020.gif');
    const extraEmbed = new Embed()
        .eDescription('**Unpicked States**')
        .eColor('#ff0000')
        .field('Likely Republican', states(likelyRed), false )
        .field('Likely Democratic', states(likelyBlue), false )
        .field('Toss Up State(s)', states(tossUp), false )
        .eFooter(new Date(), 'https://emails.illinois.edu/files/264695/electiongraphic_2020.gif');

    /* webhook info */
    try {


        await axios.post(process.env.WEBHOOK, {
            "embeds": [
                mainEmbed,
                extraEmbed,
            ]
        });

        return 'sent'

    } catch (e) {
        return e
    }

}

module.exports = { electionInfo }
