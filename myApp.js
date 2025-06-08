require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  favoriteFoods: {
    type: [String]
  }
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {          // Create a new person and save it to the database
  const person = new Person({
    name: "John",
    age: 30,
    favoriteFoods: ["Pizza", "Pasta"]
  });

  person.save((err, data) => {
    if (err) return done(err); // Pass error if it exists
    return done(null, data);   // Pass saved data
  });
};

const createManyPeople = (arrayOfPeople, done) => {         // Create multiple people and save them to the database
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);
      return done(null, data);
  });
};

const findPeopleByName = (personName, done) => {               // Find people by name
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);
    return done(null, data); // Return found data
  });
};

const findOneByFood = (food, done) => {                       // Find one person by favorite food
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) return done(err);
    return done(null, data); // Return found data
  });
};

const findPersonById = (personId, done) => {             // Find a person by ID
  Person.findById(personId, (err, data) => {
    if (err) return done(err);
    return done(null, data); // Return found data
  });
};

const findEditThenSave = (personId, done) => {          // Find a person by ID, edit their favorite foods, and save
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return done(err);

    person.favoriteFoods.push(foodToAdd); // Add food
    person.save((err, updatedPerson) => {
      if (err) return done(err);
      return done(null, updatedPerson); // Return updated doc
    });
  });
};

const findAndUpdate = (personName, done) => {                // Find a person by name and update their age
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true }, // Return the updated document
    (err, updatedPerson) => {
      if (err) return done(err);
      return done(null, updatedPerson); // Return updated doc
    }
  );
};

const removeById = (personId, done) => {                 // Remove a person by ID
  Person.findByIdAndRemove(
    personId,
    (err, data) => {
      if (err) return done(err);
      return done(null, data); // Return removed doc
    }
  )
};

const removeManyPeople = (done) => {              // Remove many people by name
  const nameToRemove = "Mary";

  Person.remove({
    name: nameToRemove
  }, (err, data) => {
    if (err) return done(err);
    return done(null, data); // Return result of removal
  })
};

const queryChain = (done) => {                   // Query chain to find people who like a specific food, sort by name, limit results, and exclude age field
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 }) // Sort by name in ascending order
    .limit(2) // Limit to 2 results
    .select('-age') // Exclude age field
    .exec((err, data) => {
      if (err) return done(err);
      return done(null, data); // Return found data
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;