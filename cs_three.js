CS_THREE = (function () {

    var initThreeView = function (){

        var mesh, renderer, scene, camera, controls;

        jQuery("#cs_column_3d_view").empty();
        var sec_type = jQuery("#cs_sect_type").val();
        var view_width = parseFloat(jQuery("#cs_column_sec_view").innerWidth());
        var view_height = 0.992 * parseFloat(jQuery("#cs_column_sec_view").innerHeight());
        
        init(sec_type);
        animate();

        function init(sec_type) {

            if (sec_type == 'rect'){
                var col_width = parseFloat(jQuery("#cs_rect_b").val());
                var col_height = parseFloat(jQuery("#cs_rect_h").val());
            }
            else if (sec_type == 'round'){
                var col_width = parseFloat(jQuery("#cs_diam_D").val());
                var col_height = parseFloat(jQuery("#cs_diam_D").val());
            };

            var grt_height = parseFloat(jQuery("#cs_grouting_t").val());

            // renderer
            renderer = new THREE.WebGLRenderer();
            renderer.setSize( view_width, view_height );
            renderer.setClearColor( 0xffffff );
            jQuery("#cs_column_3d_view").append(renderer.domElement);
            
            // scene
            scene = new THREE.Scene(); 
    
            // camera
            camera = new THREE.PerspectiveCamera( 45, view_width / view_height, 1, 5000 );
            camera.position.set( 2000, 1200, -900 );
            scene.add( camera ); // required, since adding light as child of camera
            
            // controls
            controls = new THREE.OrbitControls(camera, renderer.domElement); 
            
            // ambient
            scene.add( new THREE.AmbientLight( 0x444444 ) ); 
            
            // light
            var light = new THREE.PointLight( 0xffffff, 0.8 );
            camera.add( light );
            
            // axes
            scene.add( new THREE.AxisHelper( 500 ) );
            
    
            // Draw Geometry -----------------------------------------------------------------
            // Column geometry
            if (sec_type == 'rect'){
                var column_geom = new THREE.BoxGeometry( col_width, 800, col_height );
                var mesh_1 = new THREE.Mesh ( 
                    column_geom, 
                    new THREE.MeshPhongMaterial( {
                        color: 0xffffff, 
                        transparent: true,
                        opacity: 0.7
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
            }
            else if (sec_type == 'round'){

            };
            
            // Steel plate
            var column_geom = new THREE.BoxGeometry( col_width, 20, col_height );
            mesh_1 = new THREE.Mesh ( 
                column_geom, 
                new THREE.MeshPhongMaterial( {
                    color: 0x3399ff, 
                    transparent: true,
                    opacity: 0.7
                }) 
            );
            mesh_2 = new THREE.Mesh( 
                column_geom, 
                new THREE.MeshPhongMaterial( {
                    color: 0x3399ff, 
                    transparent: false,
                    side: THREE.BackSide
                })
            );
            scene.add( mesh_1 );
            scene.add( mesh_2 );
            mesh_1.position.set( 0, -11, 0 );
            mesh_2.position.set( 0, -11, 0 );
    
            // Grouting
            column_geom = new THREE.BoxGeometry( col_width, grt_height, col_height );
            mesh_1 = new THREE.Mesh ( 
                column_geom, 
                new THREE.MeshPhongMaterial( {
                    color: 0xe6e6e6,
                    transparent: true,
                    opacity: 0.7 
                }) 
            );
            mesh_2 = new THREE.Mesh( 
                column_geom, 
                new THREE.MeshPhongMaterial( {
                    color: 0xe6e6e6, 
                    transparent: false,
                    side: THREE.BackSide
                })
            );
            scene.add( mesh_1 );
            scene.add( mesh_2 );
            mesh_1.position.set( 0, -22 - 0.5 * grt_height, 0 );
            mesh_2.position.set( 0, -22 - 0.5 * grt_height, 0 );
    
            // Base plate
            column_geom = new THREE.BoxGeometry( 2 * col_width, 300, 2 * col_height );
            mesh_1 = new THREE.Mesh ( 
                column_geom, 
                new THREE.MeshPhongMaterial( {
                    color: 0xcccccc,
                    transparent: true,
                    opacity: 0.7 
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
            mesh_1.position.set( 0, - grt_height - 172, 0 );
            mesh_2.position.set( 0, - grt_height - 172, 0 );
        };
    
        function animate() {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        };
 
    };

    return {
        initThreeView: initThreeView,
    };

})();



