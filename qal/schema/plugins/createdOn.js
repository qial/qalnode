// schema/plugins/lastMod.js
module.exports = exports = function createdOnPlugin (schema, options) {
  schema.add({ createdOn: Date });

  schema.pre('save', function (next) {
    if(!this.isNew) return next();

    this.createdOn = new Date;
    next();
  });
};
