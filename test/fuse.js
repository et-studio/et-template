'use strict'

require('should')
var specs = {
  'parsers/condition': require('./spec/parsers/condition'),
  'parsers/dot': require('./spec/parsers/dot'),
  'parsers/element': require('./spec/parsers/element'),
  'parsers/for': require('./spec/parsers/for'),
  'parsers/origin': require('./spec/parsers/origin'),
  'parsers/value': require('./spec/parsers/value'),
  'design': require('./spec/design/bomb')
}

for (var description in specs) {
  var test = specs[description]
  global.describe(description, function () {
    test()
  })
}
