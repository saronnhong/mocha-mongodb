const assert = require('assert');
const MarioChar = require('../models/mariochar');


//Describes tests
describe("Saving records", function () {

    //Create tests
    it("Saves a record to the database", function (done) {
        var char = new MarioChar({
            name: "Mario"
        });

        char.save().then(function () {
            assert(char.isNew === false);
            done();
        });
    });

    it("Saves 2 record to the database", function (done) {
        var char = new MarioChar({
            name: "Mario"
        });
        var char2 = new MarioChar({
            name: "Luigi"
        });

        char.save().then(function () {
            assert(char.isNew === false);
        });

        char2.save().then(function () {
            assert(char2.isNew === false);
            done();
        });
    });
});

describe("Finding records", function () {
    var char;
    beforeEach(function (done) {
        char = new MarioChar({
            name: "Toad"
        });

        char.save().then(function () {
            done();
        })
    });

    it("Finds one record from the database", function (done) {
        MarioChar.findOne({ name: "Toad" }).then(function (result) {
            assert(result.name === "Toad");
            done();
        });
    });

    it("Finds one record by ID from the database", function (done) {
        MarioChar.findOne({ _id: char._id }).then(function (result) {
            assert(result._id.toString() === char._id.toString());
            done();
        });
    });

});

describe("Updating records", function () {
    var char;
    beforeEach(function (done) {
        char = new MarioChar({
            name: "Mario"
        });

        char.save().then(function () {
            done();
        })
    });

    it("Update record on database", function (done) {
        MarioChar.findOneAndUpdate({ name: "Mario" }, { name: "Peach" }, {useFindAndModify: false}).then(function (result) {
            MarioChar.findOne({ name: "Peach" }).then(function (result) {
                assert(result.name === "Peach");
                done();
            });
        });
    });

});

describe("Delete records", function () {
    var char;
    beforeEach(function (done) {
        char = new MarioChar({
            name: "Mario"
        });

        char.save().then(function () {
            done();
        })
    });

    it("Delete record on database", function (done) {
        MarioChar.deleteOne({ name: "Mario" }).then(function (result) {
            assert(result.deletedCount === 1);
            done();
        });
    });

});