(function (root, factory) {
  if (typeof exports == 'object') {
    module.exports = factory(require('magic'));
  } else if (typeof define == 'function' && define.amd) {
    define(['magic'], function (magic) {
      return (root.returnExportsGlobal = factory(magic));
    });
  } else {
    root.returnExportsGlobal = factory(root.b);
  }
}(this, function (magic) {
  magic.castSpell = function(spell) {
    document.querySelector('#wand').innerHTML = spell;
  };
}));
