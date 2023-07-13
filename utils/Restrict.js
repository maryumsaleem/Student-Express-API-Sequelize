const { restrictedStatuses, fail } = require("./Constants");
/*** Restrict Users---> Assigning roles and permissions ***/
exports.RestrictTo = (...roles) => {
  return (req, res, next) => {
    console.log(req.user);
    if (!roles.includes(req.user.role)) {
      return res
        .status(401)
        .json({
          status: `${fail}`,
          message: `${restrictedStatuses.unauthorized}`,
        });
    }
    next();
  };
};
