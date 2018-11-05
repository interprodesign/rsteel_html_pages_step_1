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
        else if (base_bolt == "RPP-E-P" || base_bolt == "RPP-E-L") dim_arr = ['M30', 'M36', 'M39', 'M45', 'M52'];
        for (var i in dim_arr) res += "<option value=\"" + dim_arr[i] + "\">" + dim_arr[i] + "</option>";
        jQuery("#cs_bolt_dim").empty();
        jQuery("#cs_bolt_dim").append(res);
    };

    // Shoe Type selection ---------------------------------------------------------------------
    var initShoeTypes = function(shoe_type,update){
        var shoe_arr;
        var res = "";
        if (shoe_type == "RPK-N2") shoe_arr = ["RPP-P", "RPP-L"];
        else if (shoe_type == "RPK-E2") shoe_arr = ["RPP-E-P", "RPP-E-L"];
        for (var i in shoe_arr) res += "<option value=\"" + shoe_arr[i] + "\">" + shoe_arr[i] + "</option>";
        jQuery("#cs_bolt_type").empty();
        jQuery("#cs_bolt_type").append(res);
        initBoltDims(shoe_arr[0]);
        if (update) CS_LAYOUT_JSX.initRebarDraw();
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
            jQuery("#cs_round_reb_num_1").val('8');
            jQuery("#cs_round_reb_diam_1").val('16');
        };
    };


    // Shoe type selection ---------------------------------------------------------------------
    var initSectioninputs = function (sec_type) {
        
        function initChangeEvents(sec_type){
            if (sec_type == 'rect'){
                jQuery("#cs_rect_h").on('change', function () { CS_LAYOUT_JSX.initRebarDraw() });
                jQuery("#cs_rect_b").on('change', function () { CS_LAYOUT_JSX.initRebarDraw() });
                jQuery("#cs_rect_num_1_1").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_num_2_1").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_num_3_1").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_num_4_1").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_num_1_2").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_num_2_2").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_num_3_2").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_num_4_2").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_diam_1_1").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_diam_2_1").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_diam_3_1").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_diam_4_1").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_diam_1_2").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_diam_2_2").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_diam_3_2").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_diam_4_2").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_start_1_1").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_start_2_1").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_start_3_1").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_start_4_1").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_end_1_1").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_end_2_1").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_end_3_1").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_end_4_1").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_start_1_2").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_start_2_2").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_start_3_2").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_start_4_2").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_end_1_2").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_end_2_2").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_end_3_2").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_end_4_2").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_cover_1").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_rect_cover_2").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_shoe_s1").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_shoe_s2").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_shoe_s3").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_shoe_s4").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_corner_shoe").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
            }
            else if (sec_type == 'round'){
                jQuery("#cs_diam_D").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_round_cover_1").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_round_cover_2").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_round_reb_num_1").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_round_reb_num_2").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_round_reb_diam_1").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_round_reb_diam_2").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
                jQuery("#cs_round_shoe_num").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
            };
            jQuery("#cs_bolt_dim").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
            jQuery("#cs_grouting_bg").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
            jQuery("#cs_grouting_tg").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
            jQuery("#cs_base_tp").on('change', function () { CS_LAYOUT_JSX.initRebarDraw(); });
        };

        
        if (sec_type == "rect") {
            jQuery("#cs_sec_image img").attr("src", "cs_select_rect.png");
            jQuery("#cs_section_dims").empty();
            jQuery("#cs_section_dims").append('\
                    <label><i class="fa fa-arrows-h w3-margin-top"></i> Width B (mm)</label>\
                    <input id = "cs_rect_b" class= "w3-input w3-border" type = "text"">\
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
                    <div style="margin-top:6px" class="w3-center">\
                    <img src="cs_grouting_plate_t.png" style="width:135px">\
                    </div>\
                    <div style="margin-top:25px;">\
                    <label><i class="fa fa-arrows-h"></i> Grouting b<sub>g</sub> (mm)</label>\
                    <input id="cs_grouting_bg" class="w3-input w3-border" type="text" value="50">\
                    <label><i class="fa fa-arrows-v w3-margin-top"></i> Grouting t<sub>g</sub> (mm)</label>\
                    <input id="cs_grouting_tg" class="w3-input w3-border" type="text" value="100">\
                    <label><i class="fa fa-chain-broken w3-margin-top"></i> Grouting Mat.</label>\
                    <select id = "cs_grt_concrete_type" class= "w3-select w3-border" name = "option">\
                    <option value="20">C20/25</option>\
                    <option value="25">C25/30</option>\
                    <option value="30">C30/37</option>\
                    <option value="35">C35/45</option>\
                    <option value="40">C40/50</option>\
                    <option value="45">C45/55</option>\
                    <option value="50">C50/60</option>\
                    </select>\
                    <label><i class="fa fa-arrows-v w3-margin-top"></i> Base Plate t<sub>p</sub> (mm)</label>\
                    <input id="cs_base_tp" class="w3-input w3-border" type="text" value="400">\
                    <br>\
                    </div>\
                    </div>\
                    </div>');
            jQuery("#add_br").empty();

            // Shoe parameters --------------------------------------------------------------------------------------------------------------
            jQuery("#cs_shoe_image").empty();
            jQuery("#cs_shoe_image").append('<img src="cs_rect_shoes_pos.png" style="width:125px">');
            jQuery("#cs_rect_shoes_data_1").empty();
            jQuery("#cs_rect_shoes_data_1").append('\
                <div>\
                <label><i class="fa fa-toggle-up"></i> Side 1 (num)</label>\
                <input id="cs_shoe_s1" class="w3-input w3-border" type="number" value="1" name="Adults" min="0" max="5">\
                </div>\
                <div>\
                <label><i class="fa fa-toggle-right w3-margin-top"></i> Side 2 (num)</label>\
                <input id="cs_shoe_s2" class="w3-input w3-border" type="number" value="1" name="Adults" min="0" max="5">\
                </div>\
                <div>\
                <input id="cs_corner_shoe" class="w3-check" style="margin-top:30px" type="checkbox" checked="checked">\
                <label>Corner Shoes</label>\
                </div>\
            ');
            jQuery("#cs_rect_shoes_data_2").empty();
            jQuery("#cs_rect_shoes_data_2").append('\
                <div>\
                <label > <i class="fa fa-toggle-down"></i> Side 3(num)</label>\
                <input id="cs_shoe_s3" class="w3-input w3-border" type="number" value="1" name="Adults" min="0" max="5">\
                </div>\
                <div>\
                <label><i class="fa fa-toggle-left w3-margin-top"></i> Side 4 (num)</label>\
                <input id="cs_shoe_s4" class="w3-input w3-border" type="number" value="1" name="Adults" min="0" max="5">\
                </div>\
            ');


            // Reinforcement Dialog ---------------------------------------------------------------------------------------------------------
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

            for (i = 1; i <= 2; i++) {
                jQuery("#cs_sec_rebar_inputs").append('\
                        <div id =\"layer_'+ i + '\" class= \"w3-container w3-margin-top city\" style = \"display:' + ((i == 1) ? "block" : "none") + '\">\
                        <!-- ROW TOP -->\
                        <div class= "w3-row w3-margin-top">\
                        <!--Column 1 -->\
                        <div class="w3-col w3-center" style="width:20%">\
                        <div class="w3-bar-block">\
                        <img src="cs_rect_reb_layer_'+ i + '_1.png" style="width:145px">\
                        </div>\
                        </div>\
                        <!-- Column 2 -->\
                        <div class="w3-col w3-margin-left" style="width:20%">\
                        <div class="w3-bar-block">\
                        <label><i class="fa fa-toggle-up"></i> Side 1 (num)</label>\
                        <input id="cs_rebar_side_1_'+i+'" class="w3-input w3-border" type="number" value="0" name="Adults" min="0" max="5">\
                        </div>\
                        <div>\
                        <label><i class="fa fa-toggle-right w3-margin-top"></i> Side 2 (num)</label>\
                        <input id="cs_rebar_side_2_'+ i +'" class="w3-input w3-border" type="number" value="0" name="Adults" min="0" max="5">\
                        </div>\
                        <div>\
                        <label><i class="fa fa-toggle-down w3-margin-top"></i> Side 3 (num)</label>\
                        <input id="cs_rebar_side_3_'+ i +'" class="w3-input w3-border" type="number" value="0" name="Adults" min="0" max="5">\
                        </div>\
                        <div>\
                        <label><i class="fa fa-toggle-left w3-margin-top"></i> Side 4 (num)</label>\
                        <input id="cs_rebar_side_4_'+ i +'" class="w3-input w3-border" type="number" value="0" name="Adults" min="0" max="5">\
                        </div>\
                        </div>\
                        <!-- Column 3 -->\
                        <div class="w3-col w3-margin-left" style="width:20%">\
                        <label><i class="fa fa-circle"></i> Rebar Diam.</label>\
                        <select id="cs_side_diam_1_'+ i +'" type="diams" class="w3-select w3-border" name="option"></select>\
                        <label><i class="fa fa-circle" style="margin-top: 18px"></i> Rebar Diam.</label>\
                        <select id="cs_side_diam_2_'+ i +'" type="diams" class="w3-select w3-border" name="option"> </select>\
                        <label><i class="fa fa-circle" style="margin-top: 17px"></i> Rebar Diam.</label>\
                        <select id="cs_side_diam_3_'+ i +'" type="diams" class="w3-select w3-border" name="option"> </select>\
                        <label><i class="fa fa-circle" style="margin-top: 17px"></i> Rebar Diam.</label>\
                        <select id="cs_side_diam_4_'+ i +'" type="diams" class="w3-select w3-border" name="option"></select>\
                        </div>\
                        <!-- Column 4 -->\
                        <div class="w3-col w3-margin-left" style="width:20%">\
                        <label><i class="fa fa-window-maximize"></i> Cover (mm)</label>\
                        <input class="w3-input w3-border" type="text" value="0">\
                        <label><i class="fa fa-chain-broken w3-margin-top"></i> Steel</label>\
                        <select class="w3-select w3-border" name="option">\
                        <option value="400">Class A400</option>\
                        <option value="500">Class B500</option>\
                        <option value="600">Class C600</option>\
                        </select>\
                        </div>\
                        </div>\
                        <!-- ROW BOTTOM -->\
                        <div class="w3-row w3-margin-top">\
                        <!-- Column 1 -->\
                        <div class="w3-col w3-center" style="width:20%">\
                        <div class="w3-bar-block">\
                        <img src="cs_rect_reb_layer_'+ i + '_2.png" style="width:165px">\
                        </div>\
                        </div>\
                        <!-- Column 2 -->\
                        <div class="w3-col w3-margin-left" style="width:20%">\
                        <div class="w3-bar-block">\
                        <div style="margin-top:25px">\
                        <input id="cs_rebar_corner_1_'+ i +'" id="corner_bar_1_" class="w3-check" type="checkbox" checked="checked">\
                        <label>Corner Bar 1</label>\
                        </div>\
                        <div style="margin-top:28px">\
                        <input id="cs_rebar_corner_2_'+ i +'" class="w3-check w3-margin-top" type="checkbox" checked="checked">\
                        <label>Corner Bar 2</label>\
                        </div>\
                        <div style="margin-top:28px">\
                        <input id="cs_rebar_corner_3_'+ i +'" class="w3-check w3-margin-top" type="checkbox" checked="checked">\
                        <label>Corner Bar 3</label>\
                        </div>\
                        <div style="margin-top:28px">\
                        <input id="cs_rebar_corner_4_'+ i +'" class="w3-check w3-margin-top" type="checkbox" checked="checked">\
                        <label>Corner Bar 4</label>\
                        </div>\
                        </div>\
                        </div>\
                        <!-- Column 3 -->\
                        <div class="w3-col w3-margin-left" style="width:20%">\
                        <label><i class="fa fa-circle"></i> Rebar Diam.</label>\
                        <select id="cs_corner_diam_1_'+ i +'" type="diams" class="w3-select w3-border" name="option"></select>\
                        <label><i class="fa fa-circle" style="margin-top: 18px"></i> Rebar Diam.</label>\
                        <select id="cs_corner_diam_2_'+ i +'" type="diams" class="w3-select w3-border" name="option"> </select>\
                        <label><i class="fa fa-circle" style="margin-top: 17px"></i> Rebar Diam.</label>\
                        <select id="cs_corner_diam_3_'+ i +'" type="diams" class="w3-select w3-border" name="option"> </select>\
                        <label><i class="fa fa-circle" style="margin-top: 17px"></i> Rebar Diam.</label>\
                        <select id="cs_corner_diam_4_'+ i +'" type="diams" class="w3-select w3-border" name="option"></select>\
                        </div>\
                        </div>\
                        </div>');
            };
            initRebarDiams();
            initChangeEvents(sec_type);
        }
        else if (sec_type == "round") {
            jQuery("#cs_sec_image img").attr("src", "cs_select_round.png");
            jQuery("#cs_section_dims").empty();
            jQuery("#cs_section_dims").append('\
                    <label><i class="fa fa-arrows-v w3-margin-top"></i> Diam. D (mm)</label>\
                    <input id = "cs_diam_D" class= "w3-input w3-border" type = "text">');
            // Column Shoe ---------------------------------------------------------------------------------------------------------
            jQuery("#cs_col_shoes_inputs").empty();
            jQuery("#cs_col_shoes_inputs").append('\
                    <div class="w3-col w3-margin-left" style="width:15%">\
                    <div class= "w3-bar-block">\
                    <div style="margin-top:10px;" class="w3-center">\
                    <img src="cs_round_grt_num.png" style="width:120px">\
                    </div>\
                    <div style="margin-top:7px;">\
                    <label><i class="fa fa-life-bouy"></i> Number</label>\
                    <input id="cs_round_shoe_num" class="w3-input w3-border" type="number" value="4" name="Adults" min="0" max="10">\
                    </div>\
                    </div>\
                    </div>\
                    <div class="w3-col w3-margin-left" style="width:15%">\
                    <div class="w3-bar-block">\
                    <label><i class="fa fa-arrows-h"></i> Grouting b<sub>g</sub> (mm)</label>\
                    <input id="cs_grouting_bg" class="w3-input w3-border" type="text" value="20">\
                    <label><i class="fa fa-arrows-v w3-margin-top"></i> Grouting t<sub>g</sub> (mm)</label>\
                    <input id="cs_grouting_tg" class="w3-input w3-border" type="text" value="100">\
                    <label><i class="fa fa-chain-broken w3-margin-top"></i> Grouting Mat.</label>\
                    <select id = "cs_grt_concrete_type" class= "w3-select w3-border" name = "option">\
                    <option value="20">C20/25</option>\
                    <option value="25">C25/30</option>\
                    <option value="30">C30/37</option>\
                    <option value="35">C35/45</option>\
                    <option value="40">C40/50</option>\
                    <option value="45">C45/55</option>\
                    <option value="50">C50/60</option>\
                    </select>\
                    <label><i class="fa fa-arrows-v w3-margin-top"></i> Base Plate t<sub>p</sub> (mm)</label>\
                    <input id="cs_base_tp" class="w3-input w3-border" type="text" value="400">\
                    </div>\
                    </div>\
                    </div>\
                    </div><br>');
            jQuery("#add_br").append("<br>");

            // Shoe parameters --------------------------------------------------------------------------------------------------------------
            jQuery("#cs_shoe_image").empty();
            jQuery("#cs_shoe_image").append('<img src="cs_round_grt_num.png" style="width:120px">');
            jQuery("#cs_rect_shoes_data_1").empty();
            jQuery("#cs_rect_shoes_data_1").append('\
                <label><i class="fa fa-life-bouy"></i> Number</label>\
                <input id = "cs_round_shoe_num" class= "w3-input w3-border" type = "number" value = "4" name = "Adults" min = "0" max = "10">\
            ');
            jQuery("#cs_rect_shoes_data_2").empty();


            // Rebar Dialog ---------------------------------------------------------------------------------------------------------
            jQuery("#cs_sec_rebar_inputs").empty();
            jQuery("#cs_sec_rebar_inputs").append('\
                    <div class= "w3-row w3-margin-top">\
                    <div class="w3-col w3-center" style="width:20%;">\
                    <div class="w3-bar-block">\
                    <img src="cs_round_rebar.png" style="width:125px">\
                    </div>\
                    </div>\
                    <div class="w3-col w3-margin-left" style="width:20%">\
                    <div class="w3-bar-block">\
                    <div>\
                    <label><i class="fa fa-circle-o"></i> Cover L1 (mm)</label>\
                    <input id="cs_round_cover_1" class="w3-input w3-border" type="text" value="0">\
                    </div>\
                    <div>\
                    <label><i class="fa fa-circle-o w3-margin-top"></i> Cover L2 (mm)</label>\
                    <input id="cs_round_cover_2" class="w3-input w3-border" type="text" value="0">\
                    </div>\
                    <label><i class="fa fa-chain-broken w3-margin-top"></i> Steel</label>\
                    <select class="w3-select w3-border" name="option">\
                    <option value="400">Class A400</option>\
                    <option value="500">Class B500</option>\
                    <option value="600">Class C600</option>\
                    </select>\
                    </div>\
                    </div>\
                    <div class="w3-col w3-margin-left" style="width:20%">\
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
                    <div class="w3-col w3-margin-left" style="width:20%">\
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
        initChangeEvents(sec_type);
    };

    return {
        initBoltDims: initBoltDims,
        initShoeTypes: initShoeTypes,
        initSectioninputs: initSectioninputs,
        initRebarDiams: initRebarDiams,
        initSecDefaultData: initSecDefaultData,
    };

})();








jQuery(document).ready(function () {


    console.log('start layout page script');

    // Slect shoe type event ----------------------------------------------------------------
    jQuery("#cs_shoe_type").change(function () {
        CS_LAYOUT.initShoeTypes(jQuery(this).val(),true);
    });

    // Slect bolt type event ----------------------------------------------------------------
    jQuery("#cs_bolt_type").change(function () {
        CS_LAYOUT.initBoltDims(jQuery(this).val());
    });

    // Select section type event ------------------------------------------------------------
    jQuery("#cs_sect_type").change(function () {
        CS_LAYOUT.initSectioninputs(jQuery(this).val());
        CS_LAYOUT.initSecDefaultData(jQuery(this).val());
        CS_LAYOUT_JSX.initRebarDraw();
    });

    // Init column section deck  
    jQuery("#cs_column_sec_view").height(jQuery("#cs_column_sec_view").width());

    


    // Init starting section ----------------------------------------------------------------
    var init_sec = "rect";
    var init_shoe = "RPK-N2"
    var init_bolt = "RPP-P";
    CS_LAYOUT.initSectioninputs(init_sec);
    CS_LAYOUT.initShoeTypes(init_shoe,false);
    CS_LAYOUT.initBoltDims(init_bolt);
    CS_LAYOUT.initRebarDiams();
    CS_LAYOUT.initSecDefaultData(init_sec);
    CS_LAYOUT_JSX.initRebarDraw();


    jQuery("#cs_refresh_view").unbind().click(function(){
        CS_LAYOUT_JSX.initRebarDraw();
    });

    window.onresize = function(event) {
        CS_LAYOUT_JSX.initRebarDraw();
    };


});