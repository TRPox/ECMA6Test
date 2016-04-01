/**
 * Created by Sven on 30.03.2016.
 */
class BaseMouseStrategy {
    constructor() {
    }

    mouseDownAt(point) {
        console.log("Using BaseMouseStrategy");
    }

    isFinished() {
        return false;
    }
}

class BuildObjectMouseStrategy extends BaseMouseStrategy {
    constructor(objectType, scene) {
        super();
        this._builder = ObjectBuilderFactory.createBuilder(objectType);
        this._scene = scene;
    }

    mouseDownAt(point) {
        this._builder.addPoint(point);
        if(this._builder.isObjectFinished()) {
            this._scene.add(this._builder.getMesh());
        }
    }

    isFinished() {
        return this._builder.isObjectFinished();
    }
}