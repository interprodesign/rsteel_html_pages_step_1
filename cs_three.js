CS_THREE = (function () {

    var initThreeView = function () {

        var mesh, renderer, scene, camera, controls;

        jQuery("#cs_column_3d_view").empty();
        var sec_type = jQuery("#cs_sect_type").val();
        var view_width = parseFloat(jQuery("#cs_column_sec_view").innerWidth());
        var view_height = 0.992 * parseFloat(jQuery("#cs_column_sec_view").innerHeight());

        init(sec_type);
        animate();

        function init(sec_type) {

            if (sec_type == 'rect') {
                var col_width = parseFloat(jQuery("#cs_rect_b").val());
                var col_height = parseFloat(jQuery("#cs_rect_h").val());
            }
            else if (sec_type == 'round') {
                var col_width = parseFloat(jQuery("#cs_diam_D").val());
                var col_height = parseFloat(jQuery("#cs_diam_D").val());
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
            scene.add(new THREE.AxisHelper(500));




            // Draw Geometry ----------------------------------------------------------------------------------------------------------

            // Column geometry
            if (sec_type == 'rect') var column_geom = new THREE.BoxGeometry( col_width, 800, col_height );
            else if (sec_type == 'round') var column_geom = new THREE.CylinderGeometry( 0.5*col_width, 0.5*col_height, 800, 20);

            var mesh_1 = new THREE.Mesh ( 
                column_geom, 
                new THREE.MeshPhongMaterial( {
                    color: 0xffffff, 
                    transparent: true,
                    opacity: 0.5
                }) 
            );
            var mesh_2 = new THREE.Mesh( 
                column_geom, 
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
            if (sec_type == 'rect') column_geom = new THREE.BoxGeometry(2 * grt_width + col_width, grt_height, 2 * grt_width + col_height );
            else if (sec_type == "round") column_geom = new THREE.CylinderGeometry(2 * grt_width + 0.5 * col_width, 2 * grt_width + 0.5*col_height, grt_height, 20 );

            mesh_1 = new THREE.Mesh ( 
                column_geom, 
                new THREE.MeshPhongMaterial( {
                    color: 0x999966,
                    transparent: true,
                    opacity: 0.5
                }) 
            );
            mesh_2 = new THREE.Mesh( 
                column_geom, 
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
            column_geom = new THREE.BoxGeometry(2 * (grt_width + col_width), base_height, 2 * (grt_width + col_height) );
            mesh_1 = new THREE.Mesh ( 
                column_geom, 
                new THREE.MeshPhongMaterial( {
                    color: 0xcccccc,
                    transparent: true,
                    opacity: 0.5 
                }) 
            );
            mesh_2 = new THREE.Mesh( 
                column_geom, 
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


            // // Draw bolt axes
            // geometry = new THREE.Geometry();
            // geometry.vertices.push(new THREE.Vector3(100,0,0));
            // geometry.vertices.push(new THREE.Vector3(100,1000,0));


            // var material = new THREE.LineDashedMaterial({ color: 0x000000, dashSize: 100, gapSize: 30, linewidth: 10 });

            // var Line = new THREE.LineSegments(geometry, material);
            // Line.computeLineDistances()
            // scene.add(Line);


            
            
            // Material for mesh
            var material = new THREE.MeshPhongMaterial({color: 'red', transparent: false, side: THREE.DoubleSide });
            // Depth to extrude
            var depth = -100;
            // Shape to extrude
            var shape = new THREE.Shape([
                new THREE.Vector2(23, -60),
                new THREE.Vector2(-88, -60),
                new THREE.Vector2(-88, 88),
                new THREE.Vector2(60, 88),
                new THREE.Vector2(60, -23)
            ]);
            var extrudeSettings1 = {
                bevelEnabled: false,
                steps: 1,
                amount: depth
            };
            var geometry1 = new THREE.ExtrudeGeometry(shape, extrudeSettings1);
            var mesh1 = new THREE.Mesh(geometry1, material);
            mesh1.rotation.x = Math.PI / 2
            mesh1.rotation.z = Math.PI / 2
            // mesh1.position.set(0, 0, 0);
            scene.add(mesh1);

            


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



