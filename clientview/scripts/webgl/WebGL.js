/**
 * Created by sekwah on 30/5/2016.
 */

// if the window is resized change the aspect ration and add events to change the opengl perspective.
var horizAspect = 1280.0/720.0;

let canvas;
let gl;

let mvMatrix;

let mvMatrixStack = [];

let perspectiveMatrix;


var squareVerticesBuffer;

var shaderProgram;


// Set up opengl on the specified canvas
function initWebGL(canvas) {
    gl = null;
    try {
        // Check which chromium uses.
        gl = canvas.getContext("webgl")/* || canvas.getContext("experimental-webgl");*/
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    }
    catch (e) { }
    // If we don't have a GL context, give up now
    if (!gl) {
        alert("Unable to initialize WebGL, something is wrong.");
        gl = null;
    }
}


/*function drawScene() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    perspectiveMatrix = makePerspective(45, horizAspect, 0.1, 100.0);

    loadIdentity();
    mvTranslate([Math.sin(somenumber / 200), Math.sin(somenumber / 220), -6.0 + Math.sin(somenumber / 620)]);

    somenumber += 8;

    var angle = Math.sin(somenumber / 500) * 90;
    mvRotate(angle,angle,angle);

    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    //gl.drawArrays(gl.TRIANGLE_STRIP, 0, number of sides in the buffer to draw);
    //gl.drawArrays(gl.TRIANGLE_FAN, 0, numberofsides);

}*/

function initBuffers() {
    squareVerticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

    var vertices = [
        1.0,  1.0,  0.0,
        -1.0, 1.0,  0.0,
        1.0,  -1.0, 0.0,
        -1.0, -1.0, 0.0
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}


function setMatrixUniforms() {
    var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

    var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
}

function loadIdentity() {
    mvMatrix = Matrix.Identity(4);
}

function makePerspective(fovy, aspect, znear, zfar)
{
    var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
    var ymin = -ymax;
    var xmin = ymin * aspect;
    var xmax = ymax * aspect;

    return makeFrustum(xmin, xmax, ymin, ymax, znear, zfar);
}

function mvTranslate(v) {
    multMatrix(Matrix.Translation(Vector.create([v[0], v[1], v[2]])));
}

//
// glFrustum
//
function makeFrustum(left, right, bottom, top, znear, zfar)
{
    var X = 2*znear/(right-left);
    var Y = 2*znear/(top-bottom);
    var A = (right+left)/(right-left);
    var B = (top+bottom)/(top-bottom);
    var C = -(zfar+znear)/(zfar-znear);
    var D = -2*zfar*znear/(zfar-znear);

    return Matrix.create([[X, 0, A, 0],
                          [0, Y, B, 0],
                          [0, 0, C, D],
                          [0, 0, -1, 0]]);
};

function mvRotate(angleX, angleY, angleZ) {
    multMatrix(Matrix.xRotation(angleX));
    multMatrix(Matrix.yRotation(angleY));
    multMatrix(Matrix.zRotation(angleZ));
}

function mvPushMatrix(matrix) {
    if (matrix) {
        mvMatrixStack.push(matrix.dup());
        mvMatrix = matrix.dup();
    } else {
        mvMatrixStack.push(mvMatrix.dup());
    }
}

function mvPopMatrix() {
    if (!mvMatrixStack.length) {
        throw("Can't pop from an empty matrix stack.");
    }

    mvMatrix = mvMatrixStack.pop();
}




function initShaders() {
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");

    // Create the shader program

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Unable to initialize the shader program.");
    }

    gl.useProgram(shaderProgram);

    vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);
}



function getShader(gl, id) {
    console.log("Loading shader: " + id);
    var shaderScript, theSource, currentChild, shader;

    shaderScript = document.getElementById(id);

    if (!shaderScript) {
        return null;
    }

    theSource = "";
    currentChild = shaderScript.firstChild;

    while(currentChild) {
        if (currentChild.nodeType == currentChild.TEXT_NODE) {
            theSource += currentChild.textContent;
        }

        currentChild = currentChild.nextSibling;
    }

    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        // Unknown shader type
        return null;
    }

    gl.shaderSource(shader, theSource);

    // Compile the shader program
    gl.compileShader(shader);

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}



// Need to finish textures.
function handleTextureLoaded(image, texture) {
    console.log("Loading Texture - " + image);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
        gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
}