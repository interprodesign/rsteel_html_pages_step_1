CS_THREE = (function () {

    var mesh, renderer, scene, camera, controls;
    
    var initThreeView = function (updated_shoe_coord, updated_bolt_coord) {

        jQuery("#cs_column_3d_view").empty();
        var sec_type = jQuery("#cs_sect_type").val();
        var view_width = parseFloat(jQuery("#cs_column_sec_view").innerWidth());
        var view_height = 0.992 * parseFloat(jQuery("#cs_column_sec_view").innerHeight());

        init(sec_type);
        animate();

        function init(sec_type) {   

            if (sec_type == 'rect') {
                var col_width = 1.01 * parseFloat(jQuery("#cs_rect_b").val());
                var col_height = 1.01 * parseFloat(jQuery("#cs_rect_h").val());
            }
            else if (sec_type == 'round') {
                var col_width = 1.02 * parseFloat(jQuery("#cs_diam_D").val());
                var col_height = 1.02 * parseFloat(jQuery("#cs_diam_D").val());
            };

            var grt_width = parseFloat(jQuery("#cs_grouting_bg").val());
            var grt_height = parseFloat(jQuery("#cs_grouting_tg").val());
            var base_height = parseFloat(jQuery("#cs_base_tp").val());

            // renderer
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(view_width, view_height);
            renderer.setClearColor(0xffffff);
            jQuery("#cs_column_3d_view").append(renderer.domElement);

            // scene
            scene = new THREE.Scene();

            // camera
            camera = new THREE.PerspectiveCamera(45, view_width / view_height, 1, 5000);
            camera.position.set(2000, 1200, -900);
            scene.add(camera); // required, since adding light as child of camera

            // controls
            controls = new THREE.OrbitControls(camera, renderer.domElement);

            // ambient
            scene.add(new THREE.AmbientLight(0x444444));

            // light
            var light = new THREE.PointLight(0xffffff, 0.8);
            camera.add(light);

            // axes
            // scene.add(new THREE.AxisHelper(500));




            // Draw Geometry ----------------------------------------------------------------------------------------------------------

            // Column geometry
            if (sec_type == 'rect') var geometry = new THREE.BoxGeometry( col_width, 800, col_height );
            else if (sec_type == 'round') var geometry = new THREE.CylinderGeometry( 0.5 * col_width, 0.5 * col_height, 800, 20);

            var mesh_1 = new THREE.Mesh ( 
                geometry, 
                new THREE.MeshPhongMaterial( {
                    color: 0xffffff, 
                    transparent: true,
                    opacity: 0.5
                }) 
            );
            var mesh_2 = new THREE.Mesh( 
                geometry, 
                new THREE.MeshPhongMaterial( {
                    color: 0xffffff, 
                    transparent: false,
                    side: THREE.BackSide
                })
            );
            scene.add( mesh_1 );
            scene.add( mesh_2 );
            mesh_1.position.set( 0, 400, 0 );
            mesh_2.position.set( 0, 400, 0 );



            // Grouting
            if (sec_type == 'rect') geometry = new THREE.BoxGeometry(2 * grt_width + col_width, grt_height, 2 * grt_width + col_height );
            else if (sec_type == "round") geometry = new THREE.CylinderGeometry(2 * grt_width + 0.5 * col_width, 2 * grt_width + 0.5*col_height, grt_height, 20 );

            mesh_1 = new THREE.Mesh ( 
                geometry, 
                new THREE.MeshPhongMaterial( {
                    color: 0x999966,
                    transparent: true,
                    opacity: 0.5
                }) 
            );
            mesh_2 = new THREE.Mesh( 
                geometry, 
                new THREE.MeshPhongMaterial( {
                    color: 0x999966, 
                    transparent: false,
                    side: THREE.BackSide
                })
            );
            scene.add( mesh_1 );
            scene.add( mesh_2 );
            mesh_1.position.set( 0, -0.51 * grt_height, 0 );
            mesh_2.position.set( 0, -0.51 * grt_height, 0 );


            // Base plate
            geometry = new THREE.BoxGeometry(2 * (grt_width + col_width), base_height, 2 * (grt_width + col_height) );
            mesh_1 = new THREE.Mesh ( 
                geometry, 
                new THREE.MeshPhongMaterial( {
                    color: 0xcccccc,
                    transparent: true,
                    opacity: 0.5 
                }) 
            );
            mesh_2 = new THREE.Mesh( 
                geometry, 
                new THREE.MeshPhongMaterial( {
                    color: 0xcccccc, 
                    transparent: false,
                    side: THREE.BackSide
                })
            );
            scene.add( mesh_1 );
            scene.add( mesh_2 );
            mesh_1.position.set(0, - grt_height - 0.5 * base_height + 3, 0 );
            mesh_2.position.set(0, - grt_height - 0.5 * base_height + 3, 0 );

  
            // Draw Shoes ------------------------------------------------------------------------------------------------

            var shoe_type = jQuery("#cs_shoe_type").val();
            var bolt_dim = jQuery("#cs_bolt_dim").val();
            var bolt_type = jQuery("#cs_bolt_type").val();

            var shoe_data = CS_LAYOUT_JSX.shoe_coord[shoe_type][bolt_dim];
            var shoe_coord = updated_shoe_coord;
            var bolt_coord = updated_bolt_coord;

            if (shoe_coord.length > 0){
                for (var shoe_arr = 0; shoe_arr < shoe_coord.length; shoe_arr++){
                    var temp = [];
                    for (var shoe in shoe_coord[shoe_arr]){
                        temp.push(new THREE.Vector2(shoe_coord[shoe_arr][shoe][0], shoe_coord[shoe_arr][shoe][1]))    
                    };

                    // Shoe
                    geometry = new THREE.ExtrudeGeometry(new THREE.Shape(temp), {
                        bevelEnabled: false,
                        steps: 1,
                        amount: -shoe_data.t
                    });
                    var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
                        color: 0x3399ff,
                        transparent: false,
                        side: THREE.DoubleSide
                    }));
                    mesh.rotation.x = Math.PI / 2
                    // mesh.rotation.z = Math.PI / 2
                    // mesh1.position.set(0, 0, 0);
                    scene.add(mesh);

                    // Bolt
                    geometry = new THREE.CylinderGeometry(0.5 * shoe_data.Da, 0.5 * shoe_data.Da, shoe_data.Dt, 20);
                    mesh = new THREE.Mesh(geometry,new THREE.MeshPhongMaterial({color: 0x0088cc,}));
                    scene.add(mesh);
                    mesh.position.set(bolt_coord[shoe_arr][0], shoe_data.t + 0.5 * shoe_data.Dt, bolt_coord[shoe_arr][1],10);

                    // Top Nut
                    geometry = new THREE.CylinderGeometry(0.5 * shoe_data.B, 0.5 * shoe_data.B, shoe_data.H, 6);
                    mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0x0088cc, }));
                    scene.add(mesh);
                    mesh.position.set(bolt_coord[shoe_arr][0], shoe_data.t + 0.5 * shoe_data.Dt + 0.5 * shoe_data.H, bolt_coord[shoe_arr][1], 10);

                    // Anchor
                    if (["RPP-P", "RPP-L"].indexOf(bolt_type) != -1 ){
                        geometry = new THREE.CylinderGeometry(0.5 * shoe_data.Db, 0.5 * shoe_data.Db, 20, 10);
                        mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0x0088cc, }));
                        scene.add(mesh);
                        mesh.position.set(bolt_coord[shoe_arr][0], shoe_data.t + 0.5 * shoe_data.Dt + 0.5 * shoe_data.H + 10, bolt_coord[shoe_arr][1], 10);  
                    };

                    // Anchor Axis
                    geometry = new THREE.Geometry();
                    geometry.vertices.push(new THREE.Vector3(bolt_coord[shoe_arr][0], -400, bolt_coord[shoe_arr][1]));
                    geometry.vertices.push(new THREE.Vector3(bolt_coord[shoe_arr][0], 400, bolt_coord[shoe_arr][1]));
                    var Line = new THREE.LineSegments(geometry, new THREE.LineDashedMaterial({ color: 0x000000, dashSize: 100, gapSize: 30, linewidth: 10 }));
                    Line.computeLineDistances()
                    scene.add(Line);
                };
            };
        };


        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

    };

    return {
        initThreeView: initThreeView,   
    };

})();



