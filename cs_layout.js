CS_LAYOUT = (function () {


    // Init rebar diameters --------------------------------------------------------------------
    var initRebarDiams = function(){
        var init_rebar_arr = '\
        <option value ="8">d8</option>\
        <option value ="10">d10</option>\
        <option value ="12">d12</option>\
        <option value ="16">d16</option>\
        <option value ="20">d20</option>\
        <option value ="25">d25</option>\
        <option value ="32">d32</option>\
        <option value ="40">d40</option>';
        jQuery("select[type=\"diams\"]").each(function () { jQuery(this).append(init_rebar_arr) });
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
                        <div class="w3-third tablink w3-bottombar w3-hover-light-grey w3-padding w3-border-blue ">Layer 1</div>\
                        </a>\
                        <a href="javascript:void(0)" onclick="layerTab(event, \'layer_2\');">\
                        <div class="w3-third tablink w3-bottombar w3-hover-light-grey w3-padding">Layer 2</div>\
                        </a>\
                        </div>');

            var rebar_rec_img = ["cs_rect_reb_layer_1.png", "cs_rect_reb_layer_2.png"]
            for (i = 1; i <= 2; i++) {
                jQuery("#cs_sec_rebar_inputs").append('\
                        <div id =\"layer_'+ i + '\" class= \"w3-container city\" style = \"display:' + ((i == 1) ? "block" : "none") + '\">\
                        <div class="w3-row w3-margin-top">\
                        <div class="w3-col" style="width:15%;">\
                        <div class="w3-bar-block">\
                        <img src="'+ rebar_rec_img[i - 1] + '" style="width:125px">\
                        </div>\
                        </div>\
                        <div class="w3-col" style="width:16%">\
                        <div class="w3-bar-block">\
                        <div>\
                        <label><i class="fa fa-window-maximize"></i> Cover 1 (mm)</label>\
                        <input id="'+ "cs_rect_cover_1_" + i + '" class="w3-input w3-border" type="text">\
                        </div>\
                        <div>\
                        <label><i class="fa fa-window-maximize fa-rotate-90 w3-margin-top"></i> Cover 2 (mm)</label>\
                        <input id="'+ "cs_rect_cover_2_" + i + '" class="w3-input w3-border" type="text">\
                        </div>\
                        <div>\
                        <label><i class="fa fa-window-maximize fa-rotate-180 w3-margin-top"></i> Cover 3 (mm)</label>\
                        <input id="'+ "cs_rect_cover_3_" + i + '" class="w3-input w3-border" type="text">\
                        </div>\
                        <div>\
                        <label><i class="fa fa-window-maximize fa-rotate-270 w3-margin-top"></i> Cover 4 (mm)</label>\
                        <input id="'+ "cs_rect_cover_4_" + i + '" class="w3-input w3-border" type="text">\
                        </div>\
                        </div>\
                        </div>\
                        <div class="w3-col w3-margin-left" style="width:16%">\
                        <div class="w3-bar-block">\
                        <div>\
                        <label><i class="fa fa-toggle-up"></i> Side 1 (num)</label>\
                        <input id="'+ "cs_rect_num_1_" + i + '" class="w3-input w3-border" type="number" value="1" name="Adults" min="0"\
                        max="5">\
                        </div>\
                        <div>\
                        <label><i class="fa fa-toggle-right w3-margin-top"></i> Side 2 (num)</label>\
                        <input id="'+ "cs_rect_num_2_" + i + '" class="w3-input w3-border" type="number" value="1" name="Adults" min="0"\
                        max="5">\
                        </div>\
                        <div>\
                        <label><i class="fa fa-toggle-down w3-margin-top"></i> Side 3 (num)</label>\
                        <input id="'+ "cs_rect_num_3_" + i + '" class="w3-input w3-border" type="number" value="1" name="Adults" min="0"\
                        max="5">\
                        </div>\
                        <div>\
                        <label><i class="fa fa-toggle-left w3-margin-top"></i> Side 4 (num)</label>\
                        <input id="'+ "cs_rect_num_4_" + i + '" class="w3-input w3-border" type="number" value="1" name="Adults" min="0"\
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
                        <input id="'+ "cs_rect_start_1_" + i + '" class="w3-check" type="checkbox" checked="checked">\
                        <label>Start</label></p>\
                        </div>\
                        <div style="margin-top: 45px">\
                        <input id="'+ "cs_rect_start_2_" + i + '" class="w3-check" type="checkbox" checked="checked">\
                        <label>Start</label></p>\
                        </div>\
                        <div style="margin-top: 45px">\
                        <input id="'+ "cs_rect_start_3_" + i + '" class="w3-check" type="checkbox" checked="checked">\
                        <label>Start</label></p>\
                        </div>\
                        <div style="margin-top: 45px">\
                        <input id="'+ "cs_rect_start_4_" + i + '" class="w3-check" type="checkbox" checked="checked">\
                        <label>Start</label></p>\
                        </div>\
                        </div>\
                        </div>\
                        <div class="w3-col" style="width:8%">\
                        <div class="w3-bar-block">\
                        <div style="margin-top: 25px">\
                        <input id="'+ "cs_rect_end_1_" + i + '" class="w3-check" type="checkbox" checked="checked">\
                        <label>End</label></p>\
                        </div>\
                        <div style="margin-top: 45px">\
                        <input id="'+ "cs_rect_end_2_" + i + '" class="w3-check" type="checkbox" checked="checked">\
                        <label>End</label></p>\
                        </div>\
                        <div style="margin-top: 45px">\
                        <input id="'+ "cs_rect_end_3_" + i + '" class="w3-check" type="checkbox" checked="checked">\
                        <label>End</label></p>\
                        </div>\
                        <div style="margin-top: 45px">\
                        <input id="'+ "cs_rect_end_4_" + i + '" class="w3-check" type="checkbox" checked="checked">\
                        <label>End</label></p>\
                        </div>\
                        </div>\
                        </div>\
                        <div class="w3-col" style="width:15%">\
                        <label><i class="fa fa-chain-broken"></i> Steel</label>\
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
                    <label><i class="fa fa-arrows-h w3-margin-top"></i> Diam. D (mm)</label>\
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
                    <input class="w3-input w3-border" type="text">\
                    </div>\
                    <div>\
                    <label><i class="fa fa-circle-o w3-margin-top"></i> Cover L2 (mm)</label>\
                    <input class="w3-input w3-border" type="text">\
                    </div>\
                    </div>\
                    </div>\
                    <div class="w3-col w3-margin-left" style="width:16%">\
                    <div class="w3-bar-block">\
                    <div>\
                    <label><i class="fa fa-dot-circle-o"></i> Layer 1 (num)</label>\
                    <input class="w3-input w3-border" type="number" value="1" name="Adults" min="0" max="5">\
                    </div>\
                    <div>\
                    <label><i class="fa fa-dot-circle-o w3-margin-top"></i> Layer 2 (num)</label>\
                    <input class="w3-input w3-border" type="number" value="1" name="Adults" min="0" max="5">\
                    </div>\
                    </div>\
                    </div>\
                    <div class="w3-col w3-margin-left" style="width:16%">\
                    <div class="w3-bar-block">\
                    <label><i class="fa fa-circle"></i> Rebar Diam.</label>\
                    <select type="diams" class="w3-select w3-border" name="option">\
                    </select>\
                    <label><i class="fa fa-circle" style="margin-top: 18px"></i> Rebar Diam.</label>\
                    <select type="diams" class="w3-select w3-border" name="option">\
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
        initRebarDiams: initRebarDiams
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
    });


    // Init starting section ----------------------------------------------------------------
    var init_sec = "rect";
    var init_bolt = "RPP-P";
    CS_LAYOUT.initSectioninputs(init_sec);
    CS_LAYOUT.initBoltDims(init_bolt);
    CS_LAYOUT.initRebarDiams();

    

    // jQuery("#layerTabClick").on('a',function(){
    //     console.log(jQuery(this))
    // });



});