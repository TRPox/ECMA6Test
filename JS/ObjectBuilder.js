/**
 * Created by Sven on 30.03.2016.
 */
class ObjectBuilderFactory {

    static createBuilder(objectType) {
        switch (objectType) {
            case "Line":
                return new LineBuilder();
            case "Rectangle":
                return new RectangleBuilder();
            case "Spline":
                return new SplineBuilder();
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
        if(!this._isObjectFinished)
            this._geometry.vertices.push(point);
    }

    isObjectFinished() {
        return this._isObjectFinished;
    }

    finishObject() {
        if(this._geometry.vertices.length >= 2)
            this._isObjectFinished = true;
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
        this.finishObject();
    }

    getMesh() {
        var material, line;
        material = new THREE.LineBasicMaterial({color: 0x00ff00});
        line = new THREE.Line(this._geometry, material);
        return line;
    }
}

class RectangleBuilder extends ObjectBuilder {
    constructor() {
        super();
    }

    addPoint(point) {
        super.addPoint(point);
        this.finishObject();
    }

    getMesh() {
        var material, planeWidth, planeHeight, planeCenterX, planeCenterY, planeGeo, planeMesh;
        var upperLeft, bottomRight;
        upperLeft = this._geometry.vertices[0];
        bottomRight = this._geometry.vertices[1];
        planeCenterX = (upperLeft.x + bottomRight.x) / 2;
        planeCenterY = (upperLeft.y + bottomRight.y) / 2;
        planeHeight = Math.abs(upperLeft.y - bottomRight.y);
        planeWidth = Math.abs(upperLeft.x - bottomRight.x);
        material = new THREE.MeshBasicMaterial({color: 0x33ccff});
        planeGeo = new THREE.PlaneGeometry(planeWidth, planeHeight);
        planeMesh = new THREE.Mesh(planeGeo, material);
        planeMesh.position.set(planeCenterX, planeCenterY, 0);
        return planeMesh;
    }
}

class SplineBuilder extends ObjectBuilder {
    constructor() {
        super();
    }

    addPoint(point) {
        super.addPoint(point);
    }

    getMesh() {
        var material, splineCurve, splinePath, splineGeo, spline;
        material = new THREE.LineBasicMaterial({color: 0xfff000});
        splineCurve = new THREE.SplineCurve(this._geometry.vertices);
        splinePath = new THREE.Path(splineCurve.getPoints(50));
        splineGeo = splinePath.createPointsGeometry(50);
        spline = new THREE.Line(splineGeo, material);
        return spline;
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
