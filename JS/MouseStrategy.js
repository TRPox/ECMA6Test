/**
 * Created by Sven on 30.03.2016.
 */
class BaseMouseStrategy {
    constructor() {
    }

    mouseDownAt(point, buttonNum) {
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
        this._strategyFinished = false;
    }

    mouseDownAt(point, buttonNum) {
        if (buttonNum === 0)
            this._builder.addPoint(point);
        else if (buttonNum === 2) {
            this._builder.finishObject();
            this._strategyFinished = true;
        }

        this.addObjectToSceneWhenFinished();
    }

    isFinished() {
        return this._strategyFinished;
    }

    addObjectToSceneWhenFinished() {
        if (this._builder.isObjectFinished()) {
            this._scene.add(this._builder.getMesh());
            this._strategyFinished = true;
        }
    }
}