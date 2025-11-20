const mongoose = require('mongoose');
require('dotenv').config();
const Country = require('../src/models/Country');
const ActivityDestination = require('../src/models/ActivityDestination');

const mongoURI = process.env.MONGODB_URL;

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
}

async function fetchDestinationsByCountry() {
  try {
    const countries = await Country.find();
    console.log('Fetched destinations:', countries);
    const dest = await ActivityDestination.find();
    console.log('Fetched destinations:', dest);
  } catch (error) {
    console.error(
      'An error occurred while fetching destinations:',
      error.message
    );
  }
}

async function main() {
  await connectToDatabase();
  await fetchDestinationsByCountry();
  await mongoose.disconnect();
}

main();
