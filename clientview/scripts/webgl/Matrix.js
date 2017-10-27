/**
 * Created by sekwah on 30/5/2016.
 */

// File to handle matrix creation and transformations.
function Matrix(){};
// Sorta like a list like json, use , after every value or method exept the last one.
//  Anything in the prototype is inherited by every new Matrix
Matrix.prototype = {
    
    matrixElements: [],
    
    setElements: function(matEle){
        // If the first value is undefined then there is no array of values so its input incorrect
        if (typeof(matEle) != 'undefined') {
            // sets the value of the currently stored matrixElements to nothing,
            //  if the matrixElements are not valid then the matrix has not been created correctly
            
            // code the loop to make sure matricies are created correctly if needed
            this.matrixElements = matEle;
        }
        return this;
    },
    
    flatten: function()
		{
    	var result = [];
    	if (this.matrixElements.length == 0)
        	return [];


    	for (var j = 0; j < this.matrixElements[0].length; j++)
        	for (var i = 0; i < this.matrixElements.length; i++)
            	result.push(this.matrixElements[i][j]);
    	return result;
	},  
    
    multiply: function(matrix) {
        if(typeof(matrix) == "number"){
            for(var i = 0; i < this.matrixElements.length; i++){
                for(var j = 0; j < matrix.matrixElements[0].length; j++){
                    this.matrixElements[i][j] *= matrix;
                }
            }
        }
        else if(this.matrixElements[0].length == matrix.matrixElements.length){
            var multiMatrix = [];
            for(var i = 0; i < this.matrixElements.length; i++){
                multiMatrix[i] = [];
                for(var j = 0; j < matrix.matrixElements[0].length; j++){
                    multiMatrix[i][j] = 0;
                    for(var z = 0; z < this.matrixElements[0].length; z++){
                        multiMatrix[i][j] += this.matrixElements[i][z] * matrix.matrixElements[z][j];
                    }
                }
            }
            this.matrixElements = multiMatrix;
        }
        else{
            throw "Impossible to multiply a " + this.matrixElements.length + "x"
            + this.matrixElements[0].length + " with a " + matrix.matrixElements.length + "x" + matrix.matrixElements[0].length;
            // Make no changes
        }
        return this;
    }
    
};

Matrix.Translation = function (v)
{
  if (v.vectorElements.length == 2) {
    var r = Matrix.Identity(3);
    r.matrixElements[2][0] = v.vectorElements[0];
    r.matrixElements[2][1] = v.vectorElements[1];
    return r;
  }

  if (v.vectorElements.length == 3) {
    var r = Matrix.Identity(4);
    r.matrixElements[0][3] = v.vectorElements[0];
    r.matrixElements[1][3] = v.vectorElements[1];
    r.matrixElements[2][3] = v.vectorElements[2];
    return r;
  }

  throw "Invalid length for Translation";
};

// Matrix transformations
// http://nehe.gamedev.net/article/matrices/19004/
Matrix.xRotation = function(degrees){
	var angle = Matrix.toRadians(degrees);
	return Matrix.create([[1,0,0,0],
		[0,Math.cos(angle),-Math.sin(angle),0],
		[0,Math.sin(angle),Math.cos(angle),0],
		[0,0,0,1]]);
};

Matrix.yRotation = function(degrees){
	var angle = Matrix.toRadians(degrees);
	return Matrix.create([[Math.cos(angle),0,Math.sin(angle),0],
		[0,1,0,0],
		[-Math.sin(angle),0,Math.cos(angle),0],
		[0,0,0,1]]);
};

Matrix.zRotation = function(degrees){
	var angle = Matrix.toRadians(degrees);
	return Matrix.create([[Math.cos(angle),-Math.sin(angle),0,0],
		[Math.sin(angle),Math.cos(angle),0,0],
		[0,0,1,0],
		[0,0,0,1]]);
};


// convert to a array of all values with no height

// Creates an identity matrix

// Create matrix from array of arrays
// E.g.  Identity(4)
//      [1, 0, 0, 0],
//      [0, 1, 0, 0],
//      [0, 0, 1, 0],
//      [0, 0, 0, 1]]
// This would create the 4x4 identity matrix
Matrix.Identity = function(size){
    var iMatrix = [];
    for(var i = 0; i < size; i++){
        iMatrix[i] = [];
        for(var j = 0; j < size; j++){
            if(i == j){
                iMatrix[i][j] = 1;
            }
            else{
                iMatrix[i][j] = 0;
            }
        }
    }
    return Matrix.create(iMatrix);
};


Matrix.create = function(matrixElements) {
  var mat = new Matrix();
  return mat.setElements(matrixElements);
};

// Converts from degrees to radians.
Matrix.toRadians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Matrix.toDegrees = function(radians) {
  return radians * 180 / Math.PI;
};
