const { compareSync, hashSync } = require("bcrypt");

const bcrypt = {

    generateHash: (text:string) => {
        return hashSync(text, 5);
    },

    compareHash: (text:string, hashed:string) => {
        return compareSync(text, hashed);
    },
};

module.exports = bcrypt;