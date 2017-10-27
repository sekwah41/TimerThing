/**
 * Created by sekwah on 30/5/2016.
 */

function Vector() {}
Vector.prototype = {
	
	vectorElements: [],
	
	// Set vector's elements from an array
  setElements: function(els) {
    this.vectorElements = (els.elements || els).slice();
    return this;
  }
    
};

Vector.create = function(vectorElements) {
  var vec = new Vector();
  return vec.setElements(vectorElements);
};