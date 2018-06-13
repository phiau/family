
var preIndex = -1;

function itemOnblur(thisObj) {
    preIndex = $(thisObj).attr('indexOA');
}

function selectPresent() {
    if (0 <= preIndex) {
        return $("[indexOA=" + preIndex + "]");
    }
    return undefined;
}

function itemUp() {
    var s = selectPresent();
    var p = s.prev();
    s.after(p);
}

function itemDown() {
    var s = selectPresent();
    var n = s.next();
    n.after(s);
}

var index = 0;

function initXuList(list) {
    if (null != list) {
        for (var i = 0; i < list.length; i++) {
            index = i;
            var li = ['<input indexOA="' + index + '" class="form-control list-group-item" type="text" value=' + list[i] + ' onblur="itemOnblur(this)" onclick="itemOnclick(this)">'];
            $("#xuList").append(li);
        }
        index++;
    }
}

function itemAdd() {
    var li = ['<input indexOA="' + index + '" class="form-control list-group-item" type="text" value=' + index + "世序" + ' onblur="itemOnblur(this)" onclick="itemOnclick(this)">'];
    index++;
    if (0 <= preIndex) {
        log("here - " + preIndex);
        selectPresent().after(li);
    } else {
        $("#xuList").append(li);
    }
}

function itemDel() {
    selectPresent().remove();
}

function xuListData() {
    var xl = new Array();
    var pre = $('#xuList').children().first();
    var next = pre.next();
    while (undefined != next.val()) {
        xl.push(pre.val());
        pre = next;
        next = next.next();
    }
    xl.push(pre.val());
    return xl;
}


function itemOnclick(thisObj) {}