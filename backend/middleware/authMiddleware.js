/* isAuthenticated is middleware that protects backend routes */

const isAuthenticated = (req, res, next) => {

    if (!req.session.user)
        return res.status(401).json({
            message: "Please Login First"
        });

    next();

};

const isSuperAdmin = (req, res, next) => {

    if (req.session.user.role !== "super_admin")
        return res.status(403).json({
            message: "Super Admin Access Only"
        });

    next();

};

const isAdmin = (req, res, next) => {

    if (
        req.session.user.role !== "admin" &&
        req.session.user.role !== "super_admin"
    )
        return res.status(403).json({
            message: "Admin Access Only"
        });

    next();

};

const isStudent = (req, res, next) => {

    if (req.session.user.role !== "student")
        return res.status(403).json({
            message: "Student Access Only"
        });

    next();

};

module.exports = {
    isAuthenticated,
    isSuperAdmin,
    isAdmin,
    isStudent
};