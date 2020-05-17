// load up our shiny new route for games
const gamesRoutes = require('./games');


const appRouter = (app, fs) => {

    // we've added in a default route here that handles empty routes
    // at the base API url
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
    });


    // run our games route module here to complete the wire up
    gamesRoutes(app, fs);

};

// this line is unchanged
module.exports = appRouter;