/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const dinosaurs = require("../data/dinosaurs");
const exampleDinosaurData = require("../data/dinosaurs");
// Do not change the line above.

/**
 * getLongestDinosaur()
 * ---------------------
 * Returns an object with the longest dinosaur from the list. Converts from meters to feet.
 *
 * NOTE: To convert from meters to feet, multiply the meters by `3.281`.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @returns {Object} An object where the key is the name of the dinosaur and the value is the height of the dinosaur in feet.
 *
 * EXAMPLE:
 *  getLongestDinosaur(dinosaurs);
 *  //> { Brachiosaurus: 98.43 }
 */
function getLongestDinosaur(dinosaurs) {
  let object = {};
  let length = 0; //<- will be converted to feet in for loop
  //Length must be converted to feet.
  if (dinosaurs.length === 0) {
    return object;
    //if there are no dinosaurs return an empty object
  } for (let i = 0; i < dinosaurs.length; i++) {
    if (dinosaurs[i].lengthInMeters > length) {
      length = dinosaurs[i].lengthInMeters;
      dinoKey = dinosaurs[i].name;
      lengthInFeet = length * 3.281;
    }
  } object[dinoKey] = lengthInFeet;
  return object;
}
//Must return an object with the longest dinosaur. (probs a new object)
//need for loop to check through every dino
//Dino name(key): length in feet


/**
 * getDinosaurDescription()
 * ---------------------
 * Returns a formatted description of a dinosaur. If the dinosaur cannot be found, returns an error message.
 *
 * NOTE: Carefully view the test output and example below to see how the returned string should be formatted.
 *
 * NOTE: The `\n` represents a new line in text.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {string} id - The unique identifier for the dinosaur.
 * @returns {string} A detailed description of the dinosaur.
 *
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. It lived in the Early Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
function getDinosaurDescription(dinosaurs, id) {
  //need for loop to run through each dinosaur.
  //should work for dinosaurs with only one value in mya (millon years ago)
  //let's make a msg so this is easier
  for (const dinos of dinosaurs) {
    if (dinos.dinosaurId === id && dinos.mya.length > 1) {
      dinoDesc = `${dinos.name} (${dinos.pronunciation})\n${dinos.info} It lived in the ${dinos.period} period, over ${dinos.mya[dinos.mya.length - 1]} million years ago.`;
      return dinoDesc;
    } if (dinos.dinosaurId === id && dinos.mya.length === 1) {
      dinoDesc = `${dinos.name} (${dinos.pronunciation})\n${dinos.info} It lived in the ${dinos.period} period, over ${dinos.mya} million years ago.`;
      return dinoDesc;
    }
    //happy path
  }

  return `A dinosaur with an ID of '${id}' cannot be found.`
}



/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") value. If a `key` is provided, returns the value of that key for each dinosaur alive at that time. Otherwise, returns the ID.
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to the given value or one less. For example, if a dinosaur has a `mya` value of `[29]`, the dinosaur's information will be returned if `29` is entered or `28` is entered.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {number} mya - "Millions of years ago."
 * @param {string} key - An optional parameter. If included, for dinosaurs that lived during the `mya` value given, will return the value of the supplied key. Otherwise, returns the ID.
 * @returns {*[]} An array of values, which depend on the key given. The array should only include data of dinosaurs who lived during the given time period.
 *
 * EXAMPLE:
 *  getDinosaursAliveMya(dinosaurs, 150);
 *  //> ["YLtkN9R37", "GGvO1X9Zeh", "BFjjLjea-O", "V53DvdhV2A"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65);
 *  //> ["WHQcpcOj0G"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "name");
 *  //> ["Dracorex"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "unknown-key");
 *  //> ["WHQcpcOj0G"]
 */
function getDinosaursAliveMya(dinosaurs, mya, key) {
  /*happy path:
  * Tests only say  "INCLUDE dinos with only one mya year", NOT "return only the dinos with one mya value."
  *key represents the values that we should return INSTEAD of the ID.
  *if the key given does not return a value, (not found in ...dinosaurs), return IDs.
  Note: dinos with two mya values: first value is always greater than the second value.
   */
  let dinoArr = [];
  for (let i = 0; i < dinosaurs.length; i++) {
    if ((mya <= dinosaurs[i].mya[0] && mya >= dinosaurs[i].mya[1]) || ((mya === dinosaurs[i].mya[0])) || (dinosaurs[i].mya - mya === 1)) {
      /*if mya param is less than or equal to a dinosaur with this mya in its first value,
      AND if mya param is greater than or equal to a dino with an mya in the second value. because the second value is always smaller, we can expect mya param to be larger than or equal to dino's mya, every time.
     This condition ensures we include dinosaurs with two mya values.*/

      /* OR if the dinosaur has only one mya value, mya must be equal to OR mya must equal the dinosaur's mya value minus 1. */
      if (dinosaurs[i][key] !== undefined) {
        dinoArr.push(dinosaurs[i][key])
        /*if key returns a value, can be pushed into the new array. */
      } else {
        dinoArr.push(dinosaurs[i].dinosaurId)
        /*will return IDs if above conditions are met. but if key returns no value, return IDs. */
      }
    }
  }
  return dinoArr;
}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
