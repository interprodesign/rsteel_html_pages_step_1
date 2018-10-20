CS_LAYOUT = (function () {


    // Init rebar diameters --------------------------------------------------------------------
    var initRebarDiams = function () {
        var init_rebar_arr = '\
        <option value ="8">d8</option>\
        <option value ="10">d10</option>\
        <option value ="12">d12</option>\
        <option value ="16">d16</option>\
        <option value ="20">d20</option>\
        <option value ="25">d25</option>\
        <option value ="32">d32</option>\
        <option value ="40">d40</option>';
        jQuery("select[type=\"diams\"]").each(function () { jQuery(this).html(init_rebar_arr) });
    };


    // Bolt type selection ---------------------------------------------------------------------
    var initBoltDims = function (base_bolt) {
        var dim_arr;
        var res = "";
        if (base_bolt == "RPP-P" || base_bolt == "RPP-L") dim_arr = ['M16', 'M20', 'M24', 'M30', 'M39'];
        else if (base_bolt == "RPP-E-P" || base_bolt == "RPP-E-L") dim_arr = ['M30', 'M36', 'M39', 'M45', 'M52', 'M60'];
        for (var i in dim_arr) res += "<option value=\"" + dim_arr[i] + "\">" + dim_arr[i] + "</option>";
        jQuery("#cs_bolt_dim").empty();
        jQuery("#cs_bolt_dim").append(res);
    };

    // Init default section data ---------------------------------------------------------------
    var initSecDefaultData = function(sec_type){
        if (sec_type == "rect") {
            jQuery("#cs_rect_h").val('400');
            jQuery("#cs_rect_b").val('400');
            jQuery("#cs_rect_cover_1").val('50');
            jQuery("#cs_rect_num_1_1").val('1');
            jQuery("#cs_rect_num_2_1").val('1');
            jQuery("#cs_rect_num_3_1").val('1');
            jQuery("#cs_rect_num_4_1").val('1');
            jQuery("#cs_rect_diam_1_1").val('16');
            jQuery("#cs_rect_diam_2_1").val('16');
            jQuery("#cs_rect_diam_3_1").val('16');
            jQuery("#cs_rect_diam_4_1").val('16');
        }
        else if (sec_type == "round"){
            jQuery("#cs_diam_D").val('400');
            jQuery("#cs_round_cover_1").val('50');
            jQuery("#cs_round_reb_num_1").val('10');
            jQuery("#cs_round_reb_diam_1").val('16');
        };
    };


    // Shoe type selection ---------------------------------------------------------------------
    var initSectioninputs = function (sec_type) {
        if (sec_type == "rect") {
            jQuery("#cs_sec_image img").attr("src", "cs_select_rect.png");
            jQuery("#cs_section_dims").empty();
            jQuery("#cs_section_dims").append('\
                    <label><i class="fa fa-arrows-h w3-margin-top"></i> Width B (mm)</label>\
                    <input id = "cs_rect_b" class= "w3-input w3-border" type = "text" >\
                    <label><i class="fa fa-arrows-v w3-margin-top"></i> Height H (mm)</label>\
                    <input id="cs_rect_h" class="w3-input w3-border" type="text">');
            jQuery("#cs_col_shoes_inputs").empty();
            jQuery("#cs_col_shoes_inputs").append('\
                    <div class="w3-col w3-center" style="width:15%">\
                    <div class= "w3-bar-block">\
                    <img src="cs_rect_shoes_pos.png" style="width:125px">\
                    </div>\
                    </div>\
                    <div class="w3-col" style="width:15%">\
                    <div class="w3-bar-block">\
                    <div>\
                    <label><i class="fa fa-toggle-up"></i> Side 1 (num)</label>\
                    <input id="cs_shoe_s1" class="w3-input w3-border" type="number" value="1" name="Adults" min="0" max="5">\
                    </div>\
                    <div>\
                    <label><i class="fa fa-toggle-right w3-margin-top"></i> Side 2 (num)</label>\
                    <input id="cs_shoe_s2" class="w3-input w3-border" type="number" value="1" name="Adults" min="0" max="5">\
                    </div>\
                    <div>\
                    <label><i class="fa fa-toggle-down w3-margin-top"></i> Side 3 (num)</label>\
                    <input id="cs_shoe_s3" class="w3-input w3-border" type="number" value="1" name="Adults" min="0" max="5">\
                    </div>\
                    <div>\
                    <label><i class="fa fa-toggle-left w3-margin-top"></i> Side 4 (num)</label>\
                    <input id="cs_shoe_s4" class="w3-input w3-border" type="number" value="1" name="Adults" min="0" max="5">\
                    </div>\
                    <div>\
                    <input id="cs_corner_shoe" class="w3-check w3-margin-top" type="checkbox" checked="checked">\
                    <label>Corner Shoes</label></p>\
                    </div>\
                    </div>\
                    </div>\
                    <div class="w3-col w3-margin-left" style="width:15%">\
                    <div class="w3-bar-block">\
                    <div style="margin-top:15px" class="w3-center">\
                    <img src="cs_grouting_t.png" style="width:110px">\
                    </div>\
                    <div style="margin-top:18px;">\
                    <label><i class="fa fa-arrows-v"></i> Grouting t (mm)</label>\
                    <input id="cs_grouting_t" class="w3-input w3-border" type="text">\
                    </div>\
                    </div>\
                    </div>');
            jQuery("#add_br").empty();
            jQuery("#cs_sec_rebar_inputs").empty();
            jQuery("#cs_sec_rebar_inputs").append('\
                        <div id="layerTabClick" class="w3-row w3-third">\
                        <a href="javascript:void(0)" onclick = "layerTab(event, \'layer_1\');">\
                        <div class="w3-third tablink w3-bottombar w3-hover-light-grey w3-padding w3-border-blue w3-center">Layer 1</div>\
                        </a>\
                        <a href="javascript:void(0)" onclick="layerTab(event, \'layer_2\');">\
                        <div class="w3-third tablink w3-bottombar w3-hover-light-grey w3-padding w3-center">Layer 2</div>\
                        </a>\
                        </div>');

            var rebar_rec_img = ["cs_rect_reb_layer_1.png", "cs_rect_reb_layer_2.png"]

            for (i = 1; i <= 2; i++) {
                jQuery("#cs_sec_rebar_inputs").append('\
                        <div id =\"layer_'+ i + '\" class= \"w3-container city\" style = \"display:' + ((i == 1) ? "block" : "none") + '\">\
                        <div class="w3-row w3-margin-top">\
                        <div class="w3-col" style="width:22%;">\
                        <div class="w3-bar-block" style="padding-left:15px">\
                        <img src="'+ rebar_rec_img[i - 1] + '" style="width:150px">\
                        </div>\
                        </div>\
                        <div class="w3-col" style="width:16%">\
                        <div class="w3-bar-block">\
                        <div>\
                        <label><i class="fa fa-toggle-up"></i> Side 1 (num)</label>\
                        <input id="'+ "cs_rect_num_1_" + i + '" class="w3-input w3-border" type="number" value="0" name="Adults" min="0"\
                        max="5">\
                        </div>\
                        <div>\
                        <label><i class="fa fa-toggle-right w3-margin-top"></i> Side 2 (num)</label>\
                        <input id="'+ "cs_rect_num_2_" + i + '" class="w3-input w3-border" type="number" value="0" name="Adults" min="0"\
                        max="5">\
                        </div>\
                        <div>\
                        <label><i class="fa fa-toggle-down w3-margin-top"></i> Side 3 (num)</label>\
                        <input id="'+ "cs_rect_num_3_" + i + '" class="w3-input w3-border" type="number" value="0" name="Adults" min="0"\
                        max="5">\
                        </div>\
                        <div>\
                        <label><i class="fa fa-toggle-left w3-margin-top"></i> Side 4 (num)</label>\
                        <input id="'+ "cs_rect_num_4_" + i + '" class="w3-input w3-border" type="number" value="0" name="Adults" min="0"\
                        max="5">\
                        </div>\
                        </div>\
                        </div>\
                        <div class="w3-col w3-margin-left" style="width:16%">\
                        <div class="w3-bar-block">\
                        <label><i class="fa fa-circle"></i> Rebar Diam.</label>\
                        <select type="diams" id="'+ "cs_rect_diam_1_" + i + '" class="w3-select w3-border" name="option">\
                        </select>\
                        <label><i class="fa fa-circle" style="margin-top: 18px"></i> Rebar Diam.</label>\
                        <select type="diams" id="'+ "cs_rect_diam_2_" + i + '" class="w3-select w3-border" name="option">\
                        </select>\
                        <label><i class="fa fa-circle" style="margin-top: 17px"></i> Rebar Diam.</label>\
                        <select type="diams" id="'+ "cs_rect_diam_3_" + i + '" class="w3-select w3-border" name="option">\
                        </select>\
                        <label><i class="fa fa-circle" style="margin-top: 17px"></i> Rebar Diam.</label>\
                        <select type="diams" id="'+ "cs_rect_diam_4_" + i + '" class="w3-select w3-border" name="option">\
                        </select>\
                        </div>\
                        </div>\
                        <div class="w3-col w3-margin-left" style="width:8%">\
                        <div class="w3-bar-block">\
                        <div style="margin-top: 25px">\
                        <input id="'+ "cs_rect_start_1_" + i + '" class="w3-check" type="checkbox" ' + ((i == 1) ? 'checked="checked"' : '') + '>\
                        <label>Start</label></p>\
                        </div>\
                        <div style="margin-top: 45px">\
                        <input id="'+ "cs_rect_start_2_" + i + '" class="w3-check" type="checkbox" ' + ((i == 1) ? 'checked="checked"' : '') + '>\
                        <label>Start</label></p>\
                        </div>\
                        <div style="margin-top: 45px">\
                        <input id="'+ "cs_rect_start_3_" + i + '" class="w3-check" type="checkbox" ' + ((i == 1) ? 'checked="checked"' : '') + '>\
                        <label>Start</label></p>\
                        </div>\
                        <div style="margin-top: 45px">\
                        <input id="'+ "cs_rect_start_4_" + i + '" class="w3-check" type="checkbox" ' + ((i == 1) ? 'checked="checked"' : '') + '>\
                        <label>Start</label></p>\
                        </div>\
                        </div>\
                        </div>\
                        <div class="w3-col" style="width:8%">\
                        <div class="w3-bar-block">\
                        <div style="margin-top: 25px">\
                        <input id="'+ "cs_rect_end_1_" + i + '" class="w3-check" type="checkbox">\
                        <label>End</label></p>\
                        </div>\
                        <div style="margin-top: 45px">\
                        <input id="'+ "cs_rect_end_2_" + i + '" class="w3-check" type="checkbox">\
                        <label>End</label></p>\
                        </div>\
                        <div style="margin-top: 45px">\
                        <input id="'+ "cs_rect_end_3_" + i + '" class="w3-check" type="checkbox">\
                        <label>End</label></p>\
                        </div>\
                        <div style="margin-top: 45px">\
                        <input id="'+ "cs_rect_end_4_" + i + '" class="w3-check" type="checkbox">\
                        <label>End</label></p>\
                        </div>\
                        </div>\
                        </div>\
                        <div class="w3-col" style="width:15%">\
                        <label><i class="fa fa-window-maximize"></i> Cover (mm)</label>\
                        <input id="'+ "cs_rect_cover_" + i + '" class="w3-input w3-border" type="text" value="0">\
                        <label><i class="fa fa-chain-broken w3-margin-top"></i> Steel</label>\
                        <select id="'+ "cs_rect_steel_" + i + '" class="w3-select w3-border" name="option">\
                        <option value="400">Class A400</option>\
                        <option value="500">Class B500</option>\
                        <option value="600">Class C600</option>\
                        </select>\
                        </div>\
                        </div>\
                        </div>');
            };
            initRebarDiams();
        }
        else if (sec_type == "round") {
            jQuery("#cs_sec_image img").attr("src", "cs_select_round.png");
            jQuery("#cs_section_dims").empty();
            jQuery("#cs_section_dims").append('\
                    <label><i class="fa fa-arrows-v w3-margin-top"></i> Diam. D (mm)</label>\
                    <input id = "cs_diam_D" class= "w3-input w3-border" type = "text">');
            jQuery("#cs_col_shoes_inputs").empty();
            jQuery("#cs_col_shoes_inputs").append('\
                    <div class="w3-col w3-margin-left" style="width:15%">\
                    <div class= "w3-bar-block">\
                    <div style="margin-top:12px;" class="w3-center">\
                    <img src="cs_round_shoes_pos.png" style="width:120px">\
                    </div>\
                    <div style="margin-top:26px;">\
                    <label><i class="fa fa-life-bouy"></i> Number</label>\
                    <input class="w3-input w3-border" type="number" value="4" name="Adults" min="0" max="10">\
                    </div>\
                    </div>\
                    </div>\
                    <div class="w3-col w3-margin-left" style="width:15%">\
                    <div class="w3-bar-block">\
                    <div style="margin-top:4px;" class="w3-center">\
                    <img src="cs_grouting_t.png" style="width:110px">\
                    </div>\
                    <div style="margin-top:27px;">\
                    <label><i class="fa fa-window-minimize"></i> Grouting t (mm)</label>\
                    <input id="cs_grouting_t" class="w3-input w3-border" type="text">\
                    </div>\
                    </div>\
                    </div><br>');
            jQuery("#add_br").append("<br>");
            jQuery("#cs_sec_rebar_inputs").empty();
            jQuery("#cs_sec_rebar_inputs").append('\
                    <div class= "w3-row w3-margin-top">\
                    <div class="w3-col" style="width:15%;margin-left:7px">\
                    <div class="w3-bar-block">\
                    <img src="cs_round_rebar.png" style="width:125px">\
                    </div>\
                    </div>\
                    <div class="w3-col" style="width:16%">\
                    <div class="w3-bar-block">\
                    <div>\
                    <label><i class="fa fa-circle-o"></i> Cover L1 (mm)</label>\
                    <input id="cs_round_cover_1" class="w3-input w3-border" type="text" value="0">\
                    </div>\
                    <div>\
                    <label><i class="fa fa-circle-o w3-margin-top"></i> Cover L2 (mm)</label>\
                    <input id="cs_round_cover_1" class="w3-input w3-border" type="text" value="0">\
                    </div>\
                    </div>\
                    </div>\
                    <div class="w3-col w3-margin-left" style="width:16%">\
                    <div class="w3-bar-block">\
                    <div>\
                    <label><i class="fa fa-dot-circle-o"></i> Layer 1 (num)</label>\
                    <input id="cs_round_reb_num_1" class="w3-input w3-border" type="number" value="0" name="Adults" min="0" max="5">\
                    </div>\
                    <div>\
                    <label><i class="fa fa-dot-circle-o w3-margin-top"></i> Layer 2 (num)</label>\
                    <input id="cs_round_reb_num_2" class="w3-input w3-border" type="number" value="0" name="Adults" min="0" max="5">\
                    </div>\
                    </div>\
                    </div>\
                    <div class="w3-col w3-margin-left" style="width:16%">\
                    <div class="w3-bar-block">\
                    <label><i class="fa fa-circle"></i> Rebar Diam.</label>\
                    <select id="cs_round_reb_diam_1" type="diams" class="w3-select w3-border" name="option">\
                    </select>\
                    <label><i class="fa fa-circle" style="margin-top: 18px"></i> Rebar Diam.</label>\
                    <select id="cs_round_reb_diam_2" type="diams" class="w3-select w3-border" name="option">\
                    </select>\
                    </div>\
                    </div>\
                    </div>');
        };
        initRebarDiams();
    };

    return {
        initBoltDims: initBoltDims,
        initSectioninputs: initSectioninputs,
        initRebarDiams: initRebarDiams,
        initSecDefaultData: initSecDefaultData
    };

})();








jQuery(document).ready(function () {


    console.log('start layout page script');

    // Slect bolt type event ----------------------------------------------------------------
    jQuery("#cs_bolt_type").change(function () {
        CS_LAYOUT.initBoltDims(jQuery(this).val());
    });


    // Select section type event ------------------------------------------------------------
    jQuery("#cs_sect_type").change(function () {
        CS_LAYOUT.initSectioninputs(jQuery(this).val());
        CS_LAYOUT.initSecDefaultData(jQuery(this).val());
    });


    // Init starting section ----------------------------------------------------------------
    var init_sec = "rect";
    var init_bolt = "RPP-P";
    CS_LAYOUT.initSectioninputs(init_sec);
    CS_LAYOUT.initBoltDims(init_bolt);
    CS_LAYOUT.initRebarDiams();
    CS_LAYOUT.initSecDefaultData(init_sec);


    // Init column section deck  
    jQuery("#cs_column_sec_view").height(jQuery("#cs_column_sec_view").width());








    // Refresh view ------------------------------------------------------------------------------------

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


    jQuery("#cs_refresh_view").unbind().click(function () {

        var section_type = jQuery("#cs_sect_type").val();
        var Layers_board = JXG.JSXGraph.initBoard('cs_column_sec_view', {
            showNavigation: false,
            showCopyright: false,
            axis: false,
            grid: false,
        });

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

        // RECT CASE
        else if (section_type == "round") {

            // Section dims
            var col_diam = parseFloat(jQuery("#cs_diam_D").val());

            // refresh board
            var BB = [-0.7 * col_diam, 0.7 * col_diam, 0.7 * col_diam, -0.7 * col_diam];
            Layers_board.setBoundingBox(BB);

            // Draw shape
            Layers_board.create('circle', [[0, 0], 0.5 * col_diam], { strokeColor: '#666666', fillColor: '#d9d9d9', fixed: true, highlight: false });

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

            var cover_1 = parseFloat(jQuery("#cs_round_cover_1"));
            var cover_2 = parseFloat(jQuery("#cs_round_cover_2"));
            var layer_1 = parseFloat(jQuery("#cs_round_reb_num_1"));
            var layer_2 = parseFloat(jQuery("#cs_round_reb_num_2"));
            var reb_1 = parseFloat(jQuery("#cs_round_reb_diam_1"));
            var reb_2 = parseFloat(jQuery("#cs_round_reb_diam_2"));


            if (layer_1 != 0) {
                if (layer_1 >= 2) var sub_angle = 360 / layer_1;
                else var sub_angle = 0;
                var angle = 0;
                for (var i = 0; i < layer_1; i++) {
                    Layers_board.create('circle', [rotate(0, 0, 0, 0.5 * col_diam - cover_1,angle), 0.5 * reb_1], { strokeColor: 'red', fillColor: 'red', fixed: true, highlight: false });
                    angle += sub_angle;
                };
            };





        };



    });








});