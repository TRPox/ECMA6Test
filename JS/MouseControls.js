/**
 * Created by Sven on 30.03.2016.
 */
class MouseControls extends Observer {

    constructor(domElement, camera) {
        super();
        this._camera = camera;
        this._mouse = new THREE.Vector2();
        this._domElement = domElement;
        this._mouseStrategy = new BaseMouseStrategy();
        this.setUpDOMObserver();
    }

    get domElement() {
        return this._domElement;
    }

    set domElement(value) {
        this._domElement = value;
    }

    set mouseStrategy(strategy) {
        this._mouseStrategy = strategy;
    }

    get mouseStrategy() {
        return this._mouseStrategy;
    }

    onMouseDown(event) {
        event.preventDefault();
        var mousePosition = this.getMousePosition(event);
        this._mouse.set(mousePosition.x, mousePosition.y);
        this._mouseStrategy.mouseDownAt(mousePosition);
        if(this._mouseStrategy.isFinished()) this._mouseStrategy = new BaseMouseStrategy();
    }

    getMousePosition(event) {
        var vector,
            rayDirection,
            distance,
            mouseXNormalized,
            mouseYNormalized,
            mousePosition3D;
        var element = this._domElement.getBoundingClientRect();
        mouseXNormalized = ((event.clientX - element.left) / element.width ) * 2 - 1;
        mouseYNormalized = -((event.clientY - element.top) / element.height ) * 2 + 1;
        vector = new THREE.Vector3();
        vector.set(mouseXNormalized, mouseYNormalized, 0.5);
        vector = vector.unproject(this._camera);
        rayDirection = vector.sub(this._camera.position).normalize();
        distance = -this._camera.position.z / rayDirection.z;
        mousePosition3D = this._camera.position.clone().add(rayDirection.multiplyScalar(distance));
        return mousePosition3D;
    }

    update(param) {
        switch (param.type) {
            case "mousedown":
                this.onMouseDown(param);
                break;
            default:
                throw new Error("Invalid Event Type");
        }
    }

    setUpDOMObserver() {
        if (!this._domElement.prototype) this._domElement.prototype = {};
        this._domElement.prototype.observers = [];
        this._domElement.prototype.notify = function (event) {
            for (var i = 0; i < this.prototype.observers.length; i++) {
                this.prototype.observers[i].update(event);
            }
        };
        this._domElement.prototype.addObserver = function (observer) {
            this.observers[this.observers.length] = observer;
        };
        this._domElement.prototype.removeObserver = function (observer) {
            var observers = this.observers;
            for (var i = 0; i < observers.length; i++) {
                if (observers[i] === observer) {
                    observers.splice(i, 1);
                }
            }
        };

        this._domElement.addEventListener("mousedown", this._domElement.prototype.notify, false);
        this._domElement.prototype.addObserver(this);
    };
}