/**
 * Created by Sven on 30.03.2016.
 */
class WebGLWindow {
    constructor() {
        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setSize(500, 300);
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this._camera.position.z = 300;
        this._animationFrameId = -1;
    }

    get renderer() {
        return this._renderer;
    }

    set renderer(renderer) {
        this._renderer = renderer;
    }

    get scene() {
        return this._scene;
    }

    set scene(scene) {
        this._scene = scene;
    }

    get camera() {
        return this._camera;
    }

    set camera(camera) {
        this._camera = camera;
    }

    beginRender() {
        var renderer = this.renderer;
        var scene = this._scene;
        var camera = this._camera;
        var id = -1;
        var render = function() {
            id = requestAnimationFrame(render);
            renderer.render(scene, camera);
        }
        render();
        this._animationFrameId = id;
    }

    stopRender() {
        cancelAnimationFrame(this._animationFrameId);
    }
}