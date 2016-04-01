/**
 * Created by Sven on 30.03.2016.
 */
class ObjectBuilderFactory {

    static createBuilder(objectType) {
        switch (objectType) {
            case "Line":
                return new LineBuilder();
            case "Test":
                return new TestBuilder();
            default:
                throw new Error("Invalid Object Type");
        }
    }

}

class ObjectBuilder {
    constructor() {
        this._geometry = new THREE.Geometry();
        this._isObjectFinished = false;
    }

    addPoint(point) {
        if(!this._isObjectFinished) {
            // console.log(this._geometry);
            this._geometry.vertices.push(point);
        }
    }

    isObjectFinished() {
        return this._isObjectFinished;
    }

    getMesh() {
       throw new Error("Must be implemented in sub class");
    }
}

class LineBuilder extends ObjectBuilder {
    constructor() {
        super();
    }

    addPoint(point) {
        super.addPoint(point);
        if(this._geometry.vertices.length == 2) this._isObjectFinished = true;
    }

    getMesh() {
        var material, line;
        material = new THREE.LineBasicMaterial({color: 0x00ff00});
        line = new THREE.Line(this._geometry, material);
        return line;
    }
}


class TestBuilder extends ObjectBuilder {
    constructor() {
        super();
    }

    addPoint(point) {
        var cubeGeo = new THREE.CubeGeometry(100, 100, 0);
        var cubeMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
        this.cubeMesh = new THREE.Mesh(cubeGeo, cubeMaterial);
        this.cubeMesh.position.set(point.x,point.y, 0);
        this._isObjectFinished = true;
    }

    getMesh() {
        return this.cubeMesh;
    }
}
