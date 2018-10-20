



var col_height = 400;
var col_width = 400;

var rebar_data = [
    {
        'cover': 50,
        'side_1': 2,
        'side_2': 2,
        'side_3': 2,
        'side_4': 2,
        'diam_1': 16,
        'diam_2': 16,
        'diam_3': 16,
        'diam_4': 16,
        'start_1': true,
        'start_2': true,
        'start_3': true,
        'start_4': true,
        'end_1': false,
        'end_2': false,
        'end_3': false,
        'end_4': false,
    },
    {
        'cover': 100,
        'side_1': 2,
        'side_2': 2,
        'side_3': 2,
        'side_4': 2,
        'diam_1': 16,
        'diam_2': 16,
        'diam_3': 16,
        'diam_4': 16,
        'start_1': true,
        'start_2': true,
        'start_3': true,
        'start_4': true,
        'end_1': false,
        'end_2': false,
        'end_3': false,
        'end_4': false,
    }
];

var rebar_coord = [];

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




for (var i = 0; i < rebar_data.length; i++) {
    var layer = rebar_data[i];
    // Top Side
    if (layer.side_1 != 0) {
        var start_p = [-0.5 * col_width + layer.cover, 0.5 * col_height - layer.cover];
        var end_p = [0.5 * col_width - layer.cover, 0.5 * col_height - layer.cover];
        var temp = sideParse(layer.side_1, start_p, end_p);
        for (bar in temp) rebar_coord.push([layer.diam_1,temp[bar]]);
    };
    // Right Side
    if (layer.side_2 != 0) {
        var start_p = [0.5 * col_width - layer.cover, 0.5 * col_height - layer.cover];
        var end_p = [0.5 * col_width - layer.cover, -0.5 * col_height + layer.cover];
        var temp = sideParse(layer.side_2, start_p, end_p);
        for (bar in temp) rebar_coord.push([layer.diam_2, temp[bar]]);
    };
    // Bottom Side
    if (layer.side_3 != 0) {
        var start_p = [-0.5 * col_width + layer.cover, -0.5 * col_height + layer.cover];
        var end_p = [0.5 * col_width - layer.cover, -0.5 * col_height + layer.cover];
        var temp = sideParse(layer.side_3, start_p, end_p);
        for (bar in temp) rebar_coord.push([layer.diam_3, temp[bar]]);
    };
    // Left Side
    if (layer.side_4 != 0) {
        var start_p = [-0.5 * col_width + layer.cover, -0.5 * col_height + layer.cover];
        var end_p = [-0.5 * col_width + layer.cover, 0.5 * col_height - layer.cover];
        var temp = sideParse(layer.side_4, start_p, end_p);
        for (bar in temp) rebar_coord.push([layer.diam_4, temp[bar]]);
    };
};


