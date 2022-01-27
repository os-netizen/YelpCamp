const mongoose = require('mongoose');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');
const cities = require('./cities');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex:true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Databse connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price=Math.random()*100
        const camp = new Campground({
            author:'61e95346f9c142cc370bdfd6', 
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            price:price,
            geometry:{
              type:"Point",
              coordinates:[cities[random1000].longitude,cities[random1000].latitude]
            },
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, ipsa? Itaque voluptatum iusto repellat, sit eum necessitatibus fugiat impedit unde, modi saepe, dolorem quibusdam quas obcaecati debitis ipsum totam dolores.',
            images:[
                {
                  url: 'https://res.cloudinary.com/drai4sqg5/image/upload/v1643177606/YelpCamp/acubmqq85zw4yzkcg4mb.jpg',
                  filename: 'YelpCamp/acubmqq85zw4yzkcg4mb',
                },
                {
                  url: 'https://res.cloudinary.com/drai4sqg5/image/upload/v1643177608/YelpCamp/fkd8vzhb90ug9uumjbfv.jpg',
                  filename: 'YelpCamp/fkd8vzhb90ug9uumjbfv',
                },
                {
                  url: 'https://res.cloudinary.com/drai4sqg5/image/upload/v1643177608/YelpCamp/kccrv0btegjfgxwqv9fn.jpg',
                  filename: 'YelpCamp/kccrv0btegjfgxwqv9fn',
                }
              ]
              
              
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
});

