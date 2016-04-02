/**
 * Created by Sven on 30.03.2016.
 */
var mouseControls, webGLWindow, strategy;
window.onload = function() {
    webGLWindow = new WebGLWindow();
    mouseControls = new MouseControls(webGLWindow.renderer.domElement, webGLWindow.camera);
    mouseControls.disableContextMenu();
    document.body.appendChild(webGLWindow.renderer.domElement);
    webGLWindow.beginRender();
}

function onLineClick() {
    mouseControls.mouseStrategy = new BuildObjectMouseStrategy("Line", webGLWindow.scene);
}

function onSplineClick() {
    mouseControls.mouseStrategy = new BuildObjectMouseStrategy("Spline", webGLWindow.scene);
}

function onRectangleClick() {
    mouseControls.mouseStrategy = new BuildObjectMouseStrategy("Rectangle", webGLWindow.scene);
}
