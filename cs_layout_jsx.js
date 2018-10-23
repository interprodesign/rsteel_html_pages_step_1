CS_LAYOUT_JSX = (function () {

    // DRAW REBAR ----------------------------------------------------------------------------------------------------
    var Layers_board;

    // New point based on rotate
    /*
        CX @ Origin X  
        CY @ Origin Y
        X  @ Point X to be rotated
        Y  @ Point Y to be rotated  
    */
    function rotate(CX, CY, X, Y, angle) {
        var rad = angle * Math.PI / 180.0;
        var nx = Math.cos(rad) * (X - CX) - Math.sin(rad) * (Y - CY) + CX;
        var ny = Math.sin(rad) * (X - CX) + Math.cos(rad) * (Y - CY) + CY;
        return [nx, ny];
    }

    // Getting side bar coordinates
    function sideParse(side_num, start_p, end_p) {
        var temp = [];
        // Horizontal case
        if (start_p[1] == end_p[1]) {
            var sub_len = (side_num != 0) ? (end_p[0] - start_p[0]) / (side_num + 1) : 0;
            var pos = start_p[0];
            for (var i = 0; i < side_num; i++) {
                pos += sub_len;
                temp.push([pos, start_p[1]]);
            };
        }
        // Vertical case
        else {
            var sub_len = (side_num != 0) ? (end_p[1] - start_p[1]) / (side_num + 1) : 0;
            var pos = start_p[1];
            for (var i = 0; i < side_num; i++) {
                pos += sub_len;
                temp.push([start_p[0], pos]);
            };
        };
        return temp;
    };


    var shoe_coord = {
        'RPK-N2': {
            'M16': {
                'Db':16,
                'H':10,
                'B':27,
                'Dt':6,
                'Da': 38,
                'Du':38,
                't':15,
                'P': [0, 0],
                'D': 28,
                'shoe': [[20, -50], [-30, -50], [-30, 30], [50, 30], [50, -20]],
                'cover': [50, 50]
            },
            'M20': {
                'Db': 20,
                'H': 13,
                'B': 32,
                'Dt': 6,
                'Da': 46,
                'Du': 46,
                't': 20,
                'P': [0, 0],
                'D': 31,
                'shoe': [[20, -50], [-33, -50], [-33, 33], [50, 33], [50, -20]],
                'cover': [50, 50]
            },
            'M24': {
                'Db': 24,
                'H': 15,
                'B': 41,
                'Dt': 6,
                'Da': 55,
                'Du': 55,
                't': 25,
                'P': [0, 0],
                'D': 35,
                'shoe': [[20, -50], [-40, -50], [-40, 40], [50, 40], [50, -20]],
                'cover': [50, 50]
            },
            'M30': {
                'Db': 30,
                'H': 25,
                'B': 46,
                'Dt': 8,
                'Da': 65,
                'Du': 70,
                't': 35,
                'P': [0, 0],
                'D': 40,
                'shoe': [[20, -50], [-45, -50], [-45, 45], [50, 45], [50, -20]],
                'cover': [50, 50]
            },
            'M39': {
                'Db': 39,
                'H': 33,
                'B': 60,
                'Dt': 10,
                'Da': 90,
                'Du': 90,
                't': 40,
                'P': [0, 0],
                'D': 55,
                'shoe': [[23, -60], [-60, -60], [-60, 60], [60, 60], [60, -23]],
                'cover': [60, 60]
            },
        },
        'RPK-E2': {
            'M30': {
                'Db': 30,
                'H': 25,
                'B': 46,
                'Dt': 8,
                'Da': 65,
                'Du': 55,
                't': 40,
                'P': [0, 0],
                'D': 45,
                'shoe': [[20, -50], [-55, -50], [-55, 55], [50, 55], [50, -20]],
                'cover': [50, 50]
            },
            'M36': {
                'Db': 36,
                'H': 31,
                'B': 55,
                'Dt': 8,
                'Da': 80,
                'Du': 46,
                't': 45,
                'P': [0, 0],
                'D': 55,
                'shoe': [[23, -60], [-58, -60], [-58, 58], [60, 58], [60, -23]],
                'cover': [60, 60]
            },
            'M39': {
                'Db': 39,
                'H': 33,
                'B': 60,
                'Dt': 10,
                'Da': 90,
                'Du': 55,
                't': 50,
                'P': [0, 0],
                'D': 55,
                'shoe': [[23, -60], [-65, -60], [-65, 65], [60, 65], [60, -23]],
                'cover': [60, 60]
            },
            'M45': {
                'Db': 45,
                'H': 36,
                'B': 70,
                'Dt': 10,
                'Da': 100,
                'Du': 55,
                't': 60,
                'P': [0, 0],
                'D': 65,
                'shoe': [[23, -60], [-88, -60], [-88, 88], [60, 88], [60, -23]],
                'cover': [60, 60]
            },
            'M52': {
                'Db': 52,
                'H': 42,
                'B': 80,
                'Dt': 12,
                'Da': 100,
                'Du': 70,
                't': 70,
                'P': [0, 0],
                'D': 70,
                'shoe': [[23, -60], [-88, -60], [-88, 88], [60, 88], [60, -23]],
                'cover': [60, 60]
            },
        }
    };

    var updated_shoe_coord = [];
    var updated_bolt_coord = []

    
    var initRebarDraw = function () {

        updated_shoe_coord = [];
        updated_bolt_coord = [];

        var section_type = jQuery("#cs_sect_type").val();

        Layers_board = JXG.JSXGraph.initBoard('cs_column_sec_view', {
            showNavigation: false,
            showCopyright: false,
            axis: false,
            grid: false,
        });

        var shoe_type = jQuery("#cs_shoe_type").val();
        var bolt_dim = jQuery("#cs_bolt_dim").val();

        var temp_arr = shoe_coord[shoe_type][bolt_dim].shoe;
        var temp_cover = shoe_coord[shoe_type][bolt_dim].cover;
        var temp_center = shoe_coord[shoe_type][bolt_dim].P
        var temp_D = shoe_coord[shoe_type][bolt_dim].D

        // RECT CASE
        if (section_type == "rect") {

            // Section dims
            var col_height = parseFloat(jQuery("#cs_rect_h").val());
            var col_width = parseFloat(jQuery("#cs_rect_b").val());

            // refresh board
            var size = Math.max(col_height, col_width);
            var BB = [-0.7 * size, 0.7 * size, 0.7 * size, -0.7 * size];
            Layers_board.setBoundingBox(BB);

            // Section main points
            var sec_shape_p1 = [-0.5 * col_width, -0.5 * col_height]
            var sec_shape_p2 = [-0.5 * col_width, 0.5 * col_height]
            var sec_shape_p3 = [0.5 * col_width, 0.5 * col_height]
            var sec_shape_p4 = [0.5 * col_width, -0.5 * col_height]

            // Draw shape
            var p1 = Layers_board.create('point', sec_shape_p1, { fixed: true, visible: false });
            var p2 = Layers_board.create('point', sec_shape_p2, { fixed: true, visible: false });
            var p3 = Layers_board.create('point', sec_shape_p3, { fixed: true, visible: false });
            var p4 = Layers_board.create('point', sec_shape_p4, { fixed: true, visible: false });
            Layers_board.create('polygon', [p1, p2, p3, p4], {
                fillColor: '#d9d9d9',
                highlight: false,
                fixed: true,
                fillOpacity: 0.5,
                vertices: { visible: false },
                borders: { strokeColor: "#666666", highlight: false, strokeWidth: 2 },
            });

            // Dims left
            Layers_board.create('text', [-0.5 * col_width - 0.1 * size, 0, col_height], { anchorX: 'middle', anchorY: 'bottom', fontSize: 20, rotate: "90", display: 'internal', highlight: false, fixed: true });
            Layers_board.create('line', [[-0.5 * col_width - 0.075 * size, -0.5 * col_height], [-0.5 * col_width - 0.075 * size, 0.5 * col_height]], {
                strokeColor: "black",
                straightFirst: false,
                straightLast: false,
                strokeWidth: 2,
            });
            Layers_board.create('line', [[-0.5 * col_width - 0.1 * size, -0.5 * col_height], [-0.5 * col_width - 0.05 * size, -0.5 * col_height]], {
                strokeColor: "black",
                straightFirst: false,
                straightLast: false,
                strokeWidth: 2,
            });
            Layers_board.create('line', [[-0.5 * col_width - 0.1 * size, 0.5 * col_height], [-0.5 * col_width - 0.05 * size, 0.5 * col_height]], {
                strokeColor: "black",
                straightFirst: false,
                straightLast: false,
                strokeWidth: 2,
            });

            // Dims top 
            Layers_board.create('text', [0, 0.5 * col_height + 0.1 * size, col_width], { anchorX: 'middle', anchorY: 'bottom', fontSize: 20, display: 'internal', highlight: false, fixed: true });
            Layers_board.create('line', [[-0.5 * col_width, 0.5 * col_height + 0.075 * size], [0.5 * col_width, 0.5 * col_height + 0.075 * size]], {
                strokeColor: "black",
                straightFirst: false,
                straightLast: false,
                strokeWidth: 2,
            });
            Layers_board.create('line', [[-0.5 * col_width, 0.5 * col_height + 0.1 * size], [-0.5 * col_width, 0.5 * col_height + 0.05 * size]], {
                strokeColor: "black",
                straightFirst: false,
                straightLast: false,
                strokeWidth: 2,
            });
            Layers_board.create('line', [[0.5 * col_width, 0.5 * col_height + 0.1 * size], [0.5 * col_width, 0.5 * col_height + 0.05 * size]], {
                strokeColor: "black",
                straightFirst: false,
                straightLast: false,
                strokeWidth: 2,
            });


            // Draw shoes
            var shoe_side_1 = parseInt(jQuery("#cs_shoe_s1").val());
            var shoe_side_2 = parseInt(jQuery("#cs_shoe_s2").val());
            var shoe_side_3 = parseInt(jQuery("#cs_shoe_s3").val());
            var shoe_side_4 = parseInt(jQuery("#cs_shoe_s4").val());

            // Corver shoes
            if (document.getElementById("cs_corner_shoe").checked) {

                var angle_arr = [90 ,0, -90, -180];
                var add_to_coord_corner = [
                    [0.5 * col_width - temp_cover[0], 0.5 * col_height - temp_cover[1]],
                    [0.5 * col_width - temp_cover[0], -0.5 * col_height + temp_cover[1]],
                    [-0.5 * col_width + temp_cover[0], -0.5 * col_height + temp_cover[1]],
                    [-0.5 * col_width + temp_cover[0], 0.5 * col_height - temp_cover[1]]
                ];

                for (var corner = 0; corner <= 3; corner++) {
                    var temp_coord = [];
                    for (var i in temp_arr){
                        var CX = add_to_coord_corner[corner][0] + temp_center[0];
                        var CY = add_to_coord_corner[corner][1] + temp_center[1];
                        var X = add_to_coord_corner[corner][0] + temp_arr[i][0];
                        var Y = add_to_coord_corner[corner][1] + temp_arr[i][1];
                        temp_coord.push(rotate(CX, CY, X, Y, angle_arr[corner]));
                    } 
                    Layers_board.create('polygon', temp_coord, {
                        fillColor: '#3399ff',
                        highlight: false,
                        fixed: true,
                        fillOpacity: 0.5,
                        vertices: { visible: false },
                        borders: { strokeColor: "black", highlight: false, strokeWidth: 2 },
                    });
                    Layers_board.create('circle', [[add_to_coord_corner[corner][0] + temp_center[0], add_to_coord_corner[corner][1] + temp_center[1]], 0.5 * temp_D], { strokeColor: 'black', fillColor: 'white', fixed: true, highlight: false });
                    updated_shoe_coord.push(temp_coord);
                    updated_bolt_coord.push([add_to_coord_corner[corner][0] + temp_center[0], add_to_coord_corner[corner][1] + temp_center[1]]);
                };
            };

            // Side shoes
            if (shoe_side_1 > 0){
                var side_sub = (col_width - 2 * temp_cover[0]) / (shoe_side_1 + 1);
                var side_add = temp_cover[0];
                for (var j = 0; j < shoe_side_1; j++){
                    side_add += side_sub;
                    var temp_coord = [];
                    for (var i in temp_arr) {
                        var CX = -0.5 * col_width + side_add + temp_center[0];
                        var CY = 0.5 * col_height - temp_cover[1] + temp_center[1];
                        var X = -0.5 * col_width + side_add + temp_arr[i][0];
                        var Y = 0.5 * col_height - temp_cover[1] + temp_arr[i][1];
                        temp_coord.push(rotate(CX, CY, X, Y, 135));
                    };
                    Layers_board.create('polygon', temp_coord, {
                        fillColor: '#3399ff',
                        highlight: false,
                        fixed: true,
                        fillOpacity: 0.5,
                        vertices: { visible: false },
                        borders: { strokeColor: "black", highlight: false, strokeWidth: 2 },
                    });
                    Layers_board.create('circle', [[-0.5 * col_width + side_add + temp_center[0], 0.5 * col_height - temp_cover[1] + temp_center[1]], 0.5 * temp_D], { strokeColor: 'black', fillColor: 'white', fixed: true, highlight: false });
                    updated_shoe_coord.push(temp_coord);
                    updated_bolt_coord.push([-0.5 * col_width + side_add + temp_center[0], 0.5 * col_height - temp_cover[1] + temp_center[1]]);
                };
            };
            if (shoe_side_2 > 0) {
                var side_sub = (col_height - 2 * temp_cover[1]) / (shoe_side_2 + 1);
                var side_add = temp_cover[1];
                for (var j = 0; j < shoe_side_2; j++) {
                    side_add += side_sub;
                    var temp_coord = [];
                    for (var i in temp_arr) {
                        var CX = 0.5 * col_width - temp_cover[1] + temp_center[0];
                        var CY = 0.5 * col_height - side_add + temp_center[1];
                        var X = 0.5 * col_width - temp_cover[1] + temp_arr[i][0];
                        var Y = 0.5 * col_height - side_add + temp_arr[i][1];
                        temp_coord.push(rotate(CX, CY, X, Y, 45));
                    };
                    Layers_board.create('polygon', temp_coord, {
                        fillColor: '#3399ff',
                        highlight: false,
                        fixed: true,
                        fillOpacity: 0.5,
                        vertices: { visible: false },
                        borders: { strokeColor: "black", highlight: false, strokeWidth: 2 },
                    });
                    Layers_board.create('circle', [[0.5 * col_width - temp_cover[1] + temp_center[0], 0.5 * col_height - side_add + temp_center[1]], 0.5 * temp_D], { strokeColor: 'black', fillColor: 'white', fixed: true, highlight: false });
                    updated_shoe_coord.push(temp_coord);
                    updated_bolt_coord.push([0.5 * col_width - temp_cover[1] + temp_center[0], 0.5 * col_height - side_add + temp_center[1]]);
                };
            };
            if (shoe_side_3 > 0) {
                var side_sub = (col_width - 2 * temp_cover[0]) / (shoe_side_3 + 1);
                var side_add = temp_cover[0];
                for (var j = 0; j < shoe_side_3; j++) {
                    side_add += side_sub;
                    var temp_coord = [];
                    for (var i in temp_arr) {
                        var CX = -0.5 * col_width + side_add + temp_center[0];
                        var CY = -0.5 * col_height + temp_cover[1] + temp_center[1];
                        var X = -0.5 * col_width + side_add + temp_arr[i][0];
                        var Y = -0.5 * col_height + temp_cover[1] + temp_arr[i][1];
                        temp_coord.push(rotate(CX, CY, X, Y, -45));
                    };
                    Layers_board.create('polygon', temp_coord, {
                        fillColor: '#3399ff',
                        highlight: false,
                        fixed: true,
                        fillOpacity: 0.5,
                        vertices: { visible: false },
                        borders: { strokeColor: "black", highlight: false, strokeWidth: 2 },
                    });
                    Layers_board.create('circle', [[-0.5 * col_width + side_add + temp_center[0], -0.5 * col_height + temp_cover[1] + temp_center[1]], 0.5 * temp_D], { strokeColor: 'black', fillColor: 'white', fixed: true, highlight: false });
                    updated_shoe_coord.push(temp_coord);
                    updated_bolt_coord.push([-0.5 * col_width + side_add + temp_center[0], -0.5 * col_height + temp_cover[1] + temp_center[1]]);
                };
            };
            if (shoe_side_4 > 0) {
                var side_sub = (col_height - 2 * temp_cover[1]) / (shoe_side_4 + 1);
                var side_add = temp_cover[1];
                for (var j = 0; j < shoe_side_4; j++) {
                    side_add += side_sub;
                    var temp_coord = [];
                    for (var i in temp_arr) {
                        var CX = -0.5 * col_width + temp_cover[1] + temp_center[0];
                        var CY = 0.5 * col_height - side_add + temp_center[1];
                        var X = -0.5 * col_width + temp_cover[1] + temp_arr[i][0];
                        var Y = 0.5 * col_height - side_add + temp_arr[i][1];
                        temp_coord.push(rotate(CX, CY, X, Y, -135));
                    };
                    Layers_board.create('polygon', temp_coord, {
                        fillColor: '#3399ff',
                        highlight: false,
                        fixed: true,
                        fillOpacity: 0.5,
                        vertices: { visible: false },
                        borders: { strokeColor: "black", highlight: false, strokeWidth: 2 },
                    });
                    Layers_board.create('circle', [[-0.5 * col_width + temp_cover[1] + temp_center[0], 0.5 * col_height - side_add + temp_center[1]], 0.5 * temp_D], { strokeColor: 'black', fillColor: 'white', fixed: true, highlight: false });
                    updated_shoe_coord.push(temp_coord);
                    updated_bolt_coord.push([-0.5 * col_width + temp_cover[1] + temp_center[0], 0.5 * col_height - side_add + temp_center[1]]);
                };
            };
            
            // Get rebar data from inputs
            var rebar_data = [];
            for (var i = 1; i <= 2; i++) {
                rebar_data.push({
                    'cover': parseFloat(jQuery("#cs_rect_cover_" + i).val()),
                    'side_1': parseFloat(jQuery("#cs_rect_num_1_" + i).val()),
                    'side_2': parseFloat(jQuery("#cs_rect_num_2_" + i).val()),
                    'side_3': parseFloat(jQuery("#cs_rect_num_3_" + i).val()),
                    'side_4': parseFloat(jQuery("#cs_rect_num_4_" + i).val()),
                    'diam_1': parseFloat(jQuery("#cs_rect_diam_1_" + i).val()),
                    'diam_2': parseFloat(jQuery("#cs_rect_diam_2_" + i).val()),
                    'diam_3': parseFloat(jQuery("#cs_rect_diam_3_" + i).val()),
                    'diam_4': parseFloat(jQuery("#cs_rect_diam_4_" + i).val()),
                    'start_1': document.getElementById("cs_rect_start_1_" + i).checked,
                    'start_2': document.getElementById("cs_rect_start_2_" + i).checked,
                    'start_3': document.getElementById("cs_rect_start_3_" + i).checked,
                    'start_4': document.getElementById("cs_rect_start_4_" + i).checked,
                    'end_1': document.getElementById("cs_rect_end_1_" + i).checked,
                    'end_2': document.getElementById("cs_rect_end_2_" + i).checked,
                    'end_3': document.getElementById("cs_rect_end_3_" + i).checked,
                    'end_4': document.getElementById("cs_rect_end_4_" + i).checked
                });
            };

            // Get side and corner bar coordinates
            var rebar_coord = [];       // [ [diam,[x,y]], ... ]

            for (var i = 0; i < rebar_data.length; i++) {
                var layer = rebar_data[i];
                // Top Side
                if (layer.cover) {
                    var start_p = [-0.5 * col_width + layer.cover, 0.5 * col_height - layer.cover];
                    var end_p = [0.5 * col_width - layer.cover, 0.5 * col_height - layer.cover];
                    var temp = sideParse(layer.side_1, start_p, end_p);
                    if (layer.side_1 != 0) for (bar in temp) rebar_coord.push([layer.diam_1, temp[bar]]);
                    // Corner bars
                    if (layer.start_1) rebar_coord.push([layer.diam_1, start_p]);
                    if (layer.end_1) rebar_coord.push([layer.diam_1, end_p]);
                };
                // Right Side
                if (layer.cover) {
                    var start_p = [0.5 * col_width - layer.cover, 0.5 * col_height - layer.cover];
                    var end_p = [0.5 * col_width - layer.cover, -0.5 * col_height + layer.cover];
                    var temp = sideParse(layer.side_2, start_p, end_p);
                    if (layer.side_2 != 0) for (bar in temp) rebar_coord.push([layer.diam_2, temp[bar]]);
                    // Corner bars
                    if (layer.start_2) rebar_coord.push([layer.diam_2, start_p]);
                    if (layer.end_2) rebar_coord.push([layer.diam_2, end_p]);
                };
                // Bottom Side
                if (layer.cover) {
                    var start_p = [0.5 * col_width - layer.cover, -0.5 * col_height + layer.cover];
                    var end_p = [-0.5 * col_width + layer.cover, -0.5 * col_height + layer.cover];
                    var temp = sideParse(layer.side_3, start_p, end_p);
                    if (layer.side_3 != 0) for (bar in temp) rebar_coord.push([layer.diam_3, temp[bar]]);
                    // Corner bars
                    if (layer.start_3) rebar_coord.push([layer.diam_3, start_p]);
                    if (layer.end_3) rebar_coord.push([layer.diam_3, end_p]);
                };
                // Left Side
                if (layer.cover) {
                    var start_p = [-0.5 * col_width + layer.cover, -0.5 * col_height + layer.cover];
                    var end_p = [-0.5 * col_width + layer.cover, 0.5 * col_height - layer.cover];
                    var temp = sideParse(layer.side_4, start_p, end_p);
                    if (layer.side_4 != 0) for (bar in temp) rebar_coord.push([layer.diam_4, temp[bar]]);
                    // Corner bars
                    if (layer.start_4) rebar_coord.push([layer.diam_4, start_p]);
                    if (layer.end_4) rebar_coord.push([layer.diam_4, end_p]);
                };
            };

            for (point in rebar_coord) Layers_board.create('circle', [rebar_coord[point][1], 0.5 * rebar_coord[point][0]], { strokeColor: 'red', fillColor: 'red', fixed: true, highlight: false });
        }

        // ROUND CASE
        else if (section_type == "round") {

            // Section dims
            var col_diam = parseFloat(jQuery("#cs_diam_D").val());

            // refresh board
            var BB = [-0.7 * col_diam, 0.7 * col_diam, 0.7 * col_diam, -0.7 * col_diam];
            Layers_board.setBoundingBox(BB);

            // Draw shape
            Layers_board.create('circle', [[0, 0], 0.5 * col_diam], { strokeColor: '#666666', fillColor: '#d9d9d9', fillOpacity: 0.2, fixed: true, highlight: false });

            // Dims left
            Layers_board.create('text', [-0.5 * col_diam - 0.1 * col_diam, 0, col_diam], { anchorX: 'middle', anchorY: 'bottom', fontSize: 20, rotate: "90", display: 'internal', highlight: false, fixed: true });
            Layers_board.create('line', [[-0.5 * col_diam - 0.075 * col_diam, -0.5 * col_diam], [-0.5 * col_diam - 0.075 * col_diam, 0.5 * col_diam]], {
                strokeColor: "black",
                straightFirst: false,
                straightLast: false,
                strokeWidth: 2,
            });
            Layers_board.create('line', [[-0.5 * col_diam - 0.1 * col_diam, -0.5 * col_diam], [-0.5 * col_diam - 0.05 * col_diam, -0.5 * col_diam]], {
                strokeColor: "black",
                straightFirst: false,
                straightLast: false,
                strokeWidth: 2,
            });
            Layers_board.create('line', [[-0.5 * col_diam - 0.1 * col_diam, 0.5 * col_diam], [-0.5 * col_diam - 0.05 * col_diam, 0.5 * col_diam]], {
                strokeColor: "black",
                straightFirst: false,
                straightLast: false,
                strokeWidth: 2,
            });
			

				
			// Draw shoes
			
			var shoe_num = parseInt(jQuery("#cs_round_shoe_num").val());
			var update_arr_angle = [];
			for (var i in temp_arr) update_arr_angle.push(rotate(0, 0, temp_arr[i][0], temp_arr[i][1], 135));
			
			if (shoe_num > 0){
				var angle_sub = 360 / shoe_num;
				var angle_add = 0;
				for (var j=0; j < shoe_num; j++){
					var temp_coord = [];
					for (var i in update_arr_angle){
						var CX = 0;
						var CY = 0;
						var X = update_arr_angle[i][0];
						var Y = 0.5 * col_diam - temp_cover[1] + update_arr_angle[i][1];
						temp_coord.push(rotate(CX, CY, X, Y, angle_add));
					};
					Layers_board.create('polygon', temp_coord, {
						fillColor: '#3399ff',
						highlight: false,
						fixed: true,
						fillOpacity: 0.5,
						vertices: { visible: false },
						borders: { strokeColor: "black", highlight: false, strokeWidth: 2 },
                    });
                    var bolt_center = rotate(0, 0, 0, 0.5 * col_diam - temp_cover[1], angle_add);
                    Layers_board.create('circle', [bolt_center, 0.5 * temp_D], { strokeColor: 'black', fillColor: 'white', fixed: true, highlight: false });
                    angle_add += angle_sub;
                    updated_shoe_coord.push(temp_coord);
                    updated_bolt_coord.push(bolt_center);
				};
			};
			
				
			// Draw rebar
            var cover_1 = parseFloat(jQuery("#cs_round_cover_1").val());
            var cover_2 = parseFloat(jQuery("#cs_round_cover_2").val());
            var layer_1 = parseFloat(jQuery("#cs_round_reb_num_1").val());
            var layer_2 = parseFloat(jQuery("#cs_round_reb_num_2").val());
            var reb_1 = parseFloat(jQuery("#cs_round_reb_diam_1").val());
            var reb_2 = parseFloat(jQuery("#cs_round_reb_diam_2").val());

            if (layer_1 != 0) {
                if (layer_1 >= 2) var sub_angle = 360 / layer_1;
                else var sub_angle = 0;
                var angle = 0;
                for (var i = 0; i < layer_1; i++) {
                    Layers_board.create('circle', [rotate(0, 0, 0, 0.5 * col_diam - cover_1, angle, 0.5 * reb_1), 0.5 * reb_1], { strokeColor: 'red', fillColor: 'red', fixed: true, highlight: false });
                    angle += sub_angle;
                };
            };
            if (layer_2 != 0) {
                if (layer_2 >= 2) var sub_angle = 360 / layer_2;
                else var sub_angle = 0;
                var angle = 0;
                for (var i = 0; i < layer_2; i++) {
                    Layers_board.create('circle', [rotate(0, 0, 0, 0.5 * col_diam - cover_2, angle, 0.5 * reb_2), 0.5 * reb_2], { strokeColor: 'red', fillColor: 'red', fixed: true, highlight: false });
                    angle += sub_angle;
                };
            };
        };

        CS_THREE.initThreeView(updated_shoe_coord, updated_bolt_coord)
    };


    return {
        initRebarDraw: initRebarDraw,
        shoe_coord: shoe_coord,
    };


})();