const checkSession = (req, res) => {

    if (req.session.user) {

        return res.json({

            loggedIn: true,

            user: req.session.user

        });

    }

    else {

        return res.json({

            loggedIn: false

        });

    }

};
module.exports = {
	checkSession
};