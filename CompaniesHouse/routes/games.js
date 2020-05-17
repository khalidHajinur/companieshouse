const gamesRoutes = (app, fs) => {

    // variables
    const dataPath = './data/games.json';

    // READ
    app.get('/games/:id', (req, res, next) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            const game = JSON.parse(data);
            //if the parameters contains numbers then we will output each game by id
            if (!isNaN(req.params.id)) {
                res.send(game[req.params.id - 1]);
            }
            //if the parameter equals report then we will output the report
            if ((req.params.id) == 'report') {
                average_likes_per_game_list = [];
                var commentor = [];
                var likes = [];
                var likes_value = 0;
                var games_likes_name = '';
                var gameName = [];
                var commentors = [];
                comments_dict = {};
                frequency = {},
                    max = 0,
                    mostcommentor = '';

                // code to find most commentor
                for (i in game) {
                    for (let users in game[i]['comments']) {
                        commentor.push(game[i]['comments'][users]);

                    }
                    commentor.forEach(element => {
                        commentor = [];
                        commentors.push(element['user'])

                    });
                }
                commentors.forEach(function (a) {

                    frequency[a] = (frequency[a] || 0) + 1;
                    if (frequency[a] > max) {
                        max = frequency[a];
                        mostcommentor = a;
                        return;
                    }
                    if (frequency[a] === max) {
                        mostcommentor += ' ' + a;
                    }
                });
                console.log(mostcommentor);
                // code to find highest rates game
                for (i in game) {
                    likes = (game[i]['likes']);
                    gameName = (game[i]['title']);
                    if (likes_value < likes) {
                        likes_value = likes;
                        games_likes_name = gameName;
                    }
                }
                //code to find average likes per game
                for (i in game) {
                    gameTitle = game[i]['title'];
                    average_likes = 0;
                    game_likes = [];
                    like_games = [];
                    for (let users in game[i]['comments']) {
                        game_likes.push(game[i]['comments'][users]);

                    }
                    game_likes.forEach(element => {
                        game_likes = [];
                        like_games.push(element['like'])



                    });
                    var total = 0;
                    for (var j = 0; j < like_games.length; j++) {
                        total += like_games[j];
                    }
                    average_likes = total / like_games.length;
                    comments_dict[game] = Math.ceil(average_likes);

                    dict_onegame = {};
                    dict_onegame['title'] = gameTitle;
                    dict_onegame['average_likes'] = comments_dict[game];

                    average_likes_per_game_list.push(dict_onegame);

                }
                // storing all the data for the report
                report = {
                    user_with_most_comments: mostcommentor, highest_rated_game: games_likes_name, average_likes_per_game: average_likes_per_game_list
                };

                // output report as json
                res.json(report);
            }
        });
    });


};

module.exports = gamesRoutes;