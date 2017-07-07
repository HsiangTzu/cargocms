module.exports.init = () => {
  sails.log('polyfill ES6 Array.find with Array.Find');
  if (!Array.prototype.Find) {
    Array.prototype.Find = function(predicate) {
      if (this === null) 
        throw new TypeError('Array.prototype.Find called on null or undefined');
      if (typeof predicate !== 'function')
        throw new TypeError('predicate must be a function');
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;
  
      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list))
          return value;
      }
      return void 0;
    };
  }
}