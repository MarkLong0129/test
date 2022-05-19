import React, { Component } from 'react';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

export default class Three extends Component {
    scene = null;
    helper = null;
    width = null;
    height = null;
    renderer = null;
    // labelRenderer = null;
    camera = null;
    control = null;
    light = null;
    light2 = null;
    light3 = null;
    AnimationAction = null;
    clock = new THREE.Clock();
    group = new THREE.Group();
    // mixer = new THREE.AnimationMixer(this.group);
    mixer = null;
    nameNode = null;
    timedown = null;
    timeup = null;
    oldMaterial = null;
    oldPosition = null;
    isChoosed = false;
    isdblChoosed = false;
    choosedModel = null;
    dblchoosedModel = null;
    setTimeoutId = null;
    screen = null
    container = null
    object = null
    oldMaterial2 = null
    setIntervalId = null
    //创场景
    initScene() {
        this.scene = new THREE.Scene();
    }
    //辅助坐标
    initAxesHelper() {
        this.helper = new THREE.AxesHelper(600);
        this.scene.add(this.helper);
    }
    //渲染器
    initRenderer() {
        // var container = document.getElementById('three')
        // var screen = container.getBoundingClientRect()
        this.width = 1090;

        this.height = 920;
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(0x808080, 1);

        this.container = document.getElementById('three')
        this.screen = this.container.getBoundingClientRect()

        this.container.appendChild(this.renderer.domElement);
    }
    //镜头
    initCamera() {
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 100000)
        this.camera.position.set(1500, 1500, 1500);
        this.camera.lookAt(0, 0, 0);
    }
    //场景、动画渲染
    //render要调用animation函数体，得用箭头函数，避免this指向错误。
    animation = () => {
        this.renderer.render(this.scene, this.camera);

        //不停渲染
        requestAnimationFrame(this.animation);
        if (this.mixer !== null) {
            this.mixer.update(this.clock.getDelta());
        }
    }
    //鼠标旋转场景
    initControl() {
        this.control = new OrbitControls(this.camera, this.renderer.domElement);
        // console.log(this.control)
    }
    //加载模型

    initModel() {
        var loadModel1 = new FBXLoader();
        loadModel1.load('Crane_Rail01.fbx', model => {
            model.scale.set(10, 10, 10);
            model.position.set(500, 0, 0);
            model.rotateY(Math.PI / 2);
            this.group.add(model);
            // console.log(model);
            // this.scene.add(model);
        })


        var loadModel2 = new FBXLoader();
        loadModel2.load('SambaDancing.fbx', model => {
            model.scale.set(0.7, 0.7, 0.7);
            model.position.set(0, 0, 500);
            this.group.add(model);
            // console.log(model);
            // this.scene.add(model);
            this.mixer = new THREE.AnimationMixer(model);
            // console.log("@",model.animations);
            this.AnimationAction = this.mixer.clipAction(model.animations[0]);
            this.AnimationAction.timeScale = 2;
            this.AnimationAction.play();
        })

        let loadModel3 = new GLTFLoader();
        loadModel3.load('workshop02.glb', model => {
            model.scene.translateX(400);
            this.group.add(model.scene);
            model.scene.position.set(0, 0, 1000);
        })

        let loadModel4 = new GLTFLoader();
        loadModel4.load('123.gltf', model => {
            model.scene.scale.set(25, 25, 25)
            model.scene.translateX(20)
            model.scene.translateZ(-100)
            this.group.add(model.scene);

            this.object = model
            console.log('@@', this.object.scene.children)

            model.scene.position.set(1800, 0, 0);
        })
        // this.mixer = new THREE.AnimationMixer(this.group);
        // this.AnimationAction.timeScale = 1.5;
        // this.AnimationAction.play();
        var geometry = new THREE.BoxGeometry(200, 200, 200);
        var material = new THREE.MeshLambertMaterial({ color: 0xFF0000 });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.name = "cube";
        mesh.position.set(0, 0, 0);
        this.group.add(mesh);

        // console.log("@",this.group);
        this.scene.add(this.group);

    }

    initLight() {
        this.light = new THREE.AmbientLight(0x666666);
        this.light.position.set(300, 300, 300);
        this.scene.add(this.light);
        this.light2 = new THREE.PointLight(0x666666)
        this.light2.position.set(1000, 1000, 1000);
        this.scene.add(this.light2);
        this.light3 = new THREE.PointLight(0x666666)
        this.light3.position.set(1000, 0, 1000);
        this.scene.add(this.light3);
        var directionalLight = new THREE.DirectionalLight(0x666666, 0.5);
        directionalLight.position.set(400, 200, 300);
        this.scene.add(directionalLight);
        // var directionalLight2 = new THREE.DirectionalLight(0x666666, 0.5);
        // directionalLight2.position.set(-400, -200, -300);
        // this.scene.add(directionalLight2);
        // var directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.5);
        // directionalLight3.position.set(1800, 0, 1800);
        // this.scene.add(this.directionalLight3)
    }

    pause = () => {
        if (this.AnimationAction.paused) {
            this.AnimationAction.paused = false;
        }
        else {
            this.AnimationAction.paused = true;
        }
        // this.camera.position.set(0, 0, 0);
    }

    getBox(object) {
        let box3 = new THREE.Box3();
        box3.setFromObject(object);
        return box3;
    }

    choose = (event) => {
        clearTimeout(this.setTimeoutId);
        this.setTimeoutId = setTimeout(() => {
            var Sx = event.clientX - this.screen.left; //鼠标单击位置横坐标
            var Sy = event.clientY - this.screen.top; //鼠标单击位置纵坐标
            //屏幕坐标转WebGL标准设备坐标
            // console.log("x坐标", Sx);
            var x = (Sx / this.width) * 2 - 1; //WebGL标准设备横坐标
            var y = -(Sy / this.height) * 2 + 1; //WebGL标准设备纵坐标
            //创建一个射线投射器`Raycaster`
            var raycaster = new THREE.Raycaster();
            //通过鼠标单击位置标准设备坐标和相机参数计算射线投射器`Raycaster`的射线属性.ray
            raycaster.setFromCamera(new THREE.Vector2(x, y), this.camera);

            var intersects = raycaster.intersectObjects(this.group.children, true);
            // console.log("射线投射器返回的对象", intersects);
            // console.log(this.group.children)
            // intersects.length大于0说明，说明选中了模型
            if (intersects.length > 0 && !this.isChoosed) {
                // 选中模型的第一个设置为半透明
                //   intersects[0].object.material.transparent = true;
                //   intersects[0].object.material.opacity = 0.6;
                //   this.group.children.material.opacity = 0.6;
                alert(intersects[0].object);
                this.choosedModel = intersects[0].object;
                this.oldMaterial = intersects[0].object.material;
                this.choosedModel.material = new THREE.MeshPhongMaterial({
                    color: 0x00FFFF,
                    specular: 0x00FFFF,
                    shininess: 10
                });
                //  console.log(intersects[0].object.name);
                document.getElementById("name").innerText = intersects[0].object.name;
                document.getElementById("name").style.left = Sx + 300 + 'px';
                document.getElementById("name").style.top = Sy - 100 + 'px';
                console.log(document.getElementById("name"));
                //  var choosedDiv = document.createElement('div');
                //  choosedDiv.classNme = 'label';
                //  choosedDiv.textContent = intersects[0].object.name;
                //  choosedDiv.style.marginTop = '-1em';
                //  var choosedLabel = new CSS2DObject(choosedDiv);
                //  choosedLabel.position.set(Sx , Sy , 0);
                //  intersects[0].object.add(choosedLabel);
                //  this.labelRenderer = new CSS2DRenderer();
                //  this.labelRenderer.setSize(window.innerWidth,window.innerHeight);
                //  this.labelRenderer.domElement.style.position = 'absolute';
                //  this.labelRenderer.domElement.style.top = '0px';
                //  document.getElementById('three').appendChild( this.labelRenderer.domElement);



                this.isChoosed = true;
                //  intersects[0].object.material.shininess = 12
                //  console.log(intersects[0].object)

            }
            else if (this.isChoosed) {
                this.choosedModel.material = this.oldMaterial;
                document.getElementById("name").innerText = "";
                this.isChoosed = false;
            }
        }, 250)
    }

    mouseDown = () => {
        this.timedown = new Date().getTime();
    }
    mouseUp = (event) => {
        this.timeup = new Date().getTime();
        //   console.log("@",this.timeup - this.timedown);
        if (this.timeup - this.timedown < 150) {
            this.choose(event);
        }
    }

    dblchoose = (event) => {
        clearTimeout(this.setTimeoutId);
        var Sx = event.clientX - this.screen.left; //鼠标单击位置横坐标
        var Sy = event.clientY - this.screen.top;  //鼠标单击位置纵坐标
        //屏幕坐标转WebGL标准设备坐标
        // console.log("x坐标", Sx);
        var x = (Sx / this.width) * 2 - 1; //WebGL标准设备横坐标
        var y = -(Sy / this.height) * 2 + 1; //WebGL标准设备纵坐标
        //创建一个射线投射器`Raycaster`
        var raycaster = new THREE.Raycaster();
        //通过鼠标单击位置标准设备坐标和相机参数计算射线投射器`Raycaster`的射线属性.ray
        raycaster.setFromCamera(new THREE.Vector2(x, y), this.camera);

        var intersects = raycaster.intersectObjects(this.group.children, true);
        if (intersects.length > 0 && !this.isdblChoosed) {
            this.dblchoosedModel = intersects[0].object;
            this.isdblChoosed = true;
            // this.oldPosition = intersects[0].object.position;
            // console.log(this.oldPosition)
            // intersects[0].object.position.set(500,500,500);
            // console.log(this.dblchoosedModel)

            var box = this.getBox(this.dblchoosedModel);
            console.log(this.getBox(this.dblchoosedModel));
            //getCenter()????
            //  var positionx = (Math.abs(box.max.x)+Math.abs(box.min.x))/2;
            //  var positiony = (Math.abs(box.max.y)+Math.abs(box.min.y))/2;
            //  var positionz = (Math.abs(box.max.z)+Math.abs(box.min.z))/2;
            var positionx = box.min.x + (box.max.x - box.min.x) / 2;
            var positiony = box.min.y + (box.max.y - box.min.y) / 2;
            var positionz = box.min.z + (box.max.z - box.min.z) / 2
            //   var positiony = 
            //   var positionz = 

            console.log(positionx);
            console.log(positiony);
            console.log(positionz);
            this.camera.position.set(positionx + 200, positiony + 200, positionz + 200);
            this.camera.lookAt(positionx, positiony, positionz);
        }
        else if (this.isdblChoosed) {
            // this.dblchoosedModel.position.set(0,0,0);
            this.camera.position.set(1500, 1500, 1500);

            this.camera.lookAt(0, 0, 0);
            this.isdblChoosed = false;
        }
    }





    //生命钩子
    componentDidMount() {
        this.initScene();
        this.initAxesHelper();
        this.initRenderer();
        this.initCamera();
        this.animation();
        this.initControl();
        this.initLight();
        this.initModel();
        // document.addEventListener('click', this.choose,false);
        document.addEventListener("mousedown", this.mouseDown);
        document.addEventListener("mouseup", this.mouseUp);
        document.addEventListener('dblclick', this.dblchoose);
    }





    changeColor = (name) => {
        return () => {
            var material1 = new THREE.MeshPhongMaterial({
                color: 0x00FFFF,
                specular: 0x00FFFF,
                shininess: 10
            })
            for (let i = 1; i < 100000; i++) {
                clearInterval(i);
            }
            this.object.scene.traverse((child) => {
                // if (child.name === 'FP_Material_FP_Material03') {
                //     child.material = material1
                // }

                if (child.name === name) {

                    this.oldMaterial2 = child.material
                    // this.setIntervalId = setInterval(this.changeColor2(material1 , child.material),1000)

                    setInterval(() => { child.material = material1 }, 1000)
                    setInterval(() => { child.material = this.oldMaterial2 }, 2000)
                    // this.changeColor2(material1, child.material)
                    console.log('1', material1);
                    console.log('2', child.material)

                }

                else if (child.name === 'FP_Buildings_FP_Building03') {
                    child.material = material1
                }
            })
        }
        // if(this.object.scene.children.name = 'FP_Material01_FP_Material'){

        // }
    }

    changeColor2 = (object) => {

        console.log(object)

    }
    changeColor3 = (material, childMaterial) => {
        childMaterial = material;
    }



    render() {
        return (
            <div id="three">
                <button id="pause" onClick={this.pause} style={{ position: 'absolute', width: 50, height: 50 }}>▶/⏸</button>
                <font id="name" style={{ position: "absolute" }}></font>
                <button style={{ position: "absolute", top: '10px', right: '100px', width: '100px', height: '40px' }} onClick={this.changeColor('FP_Material01_FP_Material')}>点我改颜色</button>
                <button style={{ position: "absolute", top: '70px', right: '100px', width: '100px', height: '40px' }} onClick={this.changeColor('FP_Material_FP_Material03')}>点我改颜色2</button>
            </div>


        )
    }
}
