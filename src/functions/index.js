const Filter = (f, b) => f.filter((a) => a.rating === b);

const states = (array) => array.map(state => `**${state.stateName}**`).join(' - ');

const subtract = (num) => 270 - num;

const division = (num) => (num / 270).toFixed(3);

class Embed {

    constructor() {
        this.fields = []
    }

    /**
     *
     * @param {string} title
     * @return {Embed}
     */

    eTitle (title) {
        this.title = title
        return this;
    }

    /**
     *
     * @param { string } url
     * @return { Embed }
     */

    eURL (url) {
        this.url = url;
        return this;
    }

    /**
     *
     * @param { string } info
     * @return { Embed }
     */

    eDescription (info) {
        this.description = info
        return this
    }

    /**
     *
     * @param { string } color
     * @return { Embed }
     */

    eColor (color) {
        this.color = color.startsWith('#') ? parseInt(color.replace('#', ''), 16) : color
        return this
    }

    /**
     *
     * @param { string } name
     * @param { string } value
     * @param { boolean }inline
     * @return { Embed }
     */

    field (name, value, inline) {
        this.fields.push({name, value, inline})
        return this
    }

    /**
     *
     * @param {string} text
     * @param {string} icon_url
     * @return { Embed }
     */

    eFooter (text, icon_url) {
        this.footer = { text , icon_url }
        return this
    }

}

module.exports = { Filter, states, subtract, division, Embed };


