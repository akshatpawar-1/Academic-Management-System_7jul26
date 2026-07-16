/*isAuthenticated is middleware that protects backend routes and decides whether the request may proceed to a controller.*/

const isAuthenticated = (req, res, next) => {

    if (!req.session.user)
        return res.status(401).json({ message: "Please Login First" });

    next();

};

const isSuperAdmin = (req, res, next) => {

    if (req.session.user.role !== "super_admin")
        return res.status(403).json({ message: "Super Admin Access Only" });

    next();

};

module.exports = { 
	isAuthenticated,
	isSuperAdmin
};