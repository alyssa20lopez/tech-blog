const { Post } = require('../models');

const postData = [
    {
        title: "Optimus, the Tesla Bot, Is Finally Here. Sorta. Well, at the Very Least It's Not a Guy in a Suit.",
        content: "Tesla has been promising to unveil a “humanoid” robot—a bipedal machine that can move, act, and behave like a person—since August, 2021. On Friday, the company finally revealed the long-awaited contraption, ushering it onto a stage at company headquarters in Palo Alto during its annual AI Day. According to Tesla ad copy, Optimus (you know, like the transformer) will someday help out everyday Americans with their household chores and will be an affordable product that most people can buy.",
        user_id: 1
    },
    {
        title: "Why Google Is Scrubbing Personal Info From Search Results (if You Ask Nicely)",
        content: "On Wednesday, the search giant launched “Results About You,” a new tool that allows users to request the removal of their physical address, phone number, and email address with just a few clicks. In addition, beginning next year, users will be able to set alerts on their personal information in Results About You, which will enable them to ask Google to remove it faster.",
        user_id: 2
    },
    {
        title: "Rights Groups Say the Pentagon Is Buying Its Way Around the Fourth Amendment",
        content: "The Fourth Amendment generally prohibits the government from bypassing judges when demanding access to cellphone data tracking Americans’ whereabouts. But the Biden administration, following in the footsteps of its predecessor, seems to have grown comfortable with the idea of buying its way around the Constitution.",
        user_id: 3

    },
    {
        title: "The Mascot 'La Bussi' Is Promoting Public Transportation, so Get Your Mind out of the Gutter",
        content: "A week ago, a new bus mascot happily presented itself to the world in Sabadell, a city outside of Barcelona in Spain. For some, it was big, unique, and colorful, with a certain je ne sais quoi. I, like many others, thought it looked like Pixar’s Baymax, Spanish style. Others were taken aback by the mascot, even going so far as to call it the stuff of nightmares.",
        user_id: 4
    },
    {
        title: "A Food Delivery Drone Crashed, Burned, and Left Thousands Without Electricity",
        content: "An unmanned delivery vehicle, operated by Wing—a subsidiary of Alphabet (parent of Google), landed on power lines in Brisbane and fried itself with 11,000 volts of electricity. As a result more than 2,000 homes and businesses briefly went dark on Thursday, according to reports from The Age and ABC News Australia.",
        user_id: 5
    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;