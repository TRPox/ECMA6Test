/**
 * Created by Sven on 30.03.2016.
 */
var mouseControls, webGLWindow, strategy;
window.onload = function() {
    webGLWindow = new WebGLWindow();
    mouseControls = new MouseControls(webGLWindow.renderer.domElement, webGLWindow.camera);
    document.body.appendChild(webGLWindow.renderer.domElement);
    webGLWindow.beginRender();
}

function onLineClick() {
    mouseControls.mouseStrategy = new BuildObjectMouseStrategy("Line", webGLWindow.scene);
}

function onTestClick() {
    mouseControls.mouseStrategy = new BuildObjectMouseStrategy("Test", webGLWindow.scene);
}

