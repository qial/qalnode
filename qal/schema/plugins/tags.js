// schema/plugins/tags.js
module.exports = exports = function tagsPlugin (schema, options) {
  schema.add({ tags: [String] })

//  schema.pre('save', function (next) {
//    this.lastMod = new Date
//    next()
//  })

//  if (options && options.index) {
//    schema.path('lastMod').index(options.index)
//  }

}
