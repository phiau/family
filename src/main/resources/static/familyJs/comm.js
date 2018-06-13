

function log(o) {
    window.console.log(o);
}

function doGetAjax(url, param, callback) {
	$.ajax({
		type: "GET",
		url: url,
        async : false,
		success:function (data) {
            callback(data);
        },
        error:function (data) {
            alert("请求失败");
        }
	})
}

function doPostAjax(url, param, callback) {
	$.ajax({
		type: "POST",
		data: param,
		url: url,
		success:function (data) {
            callback(data);
        },
		error:function (data) {
            alert("请求失败");
        }
	});
}

var xuList;

function getXuList() {
	return xuList;
}

function saveXu(list) {
    var params = {};
    xuList = list;
    params['xuList'] = JSON.stringify(xuList);
    doPostAjax("/save/xu", params, function (data) {
        if (200 == data) {
            alert("保存成功");
        } else {
            alert("保存失败");
        }
    });
}

function getXu() {
    doGetAjax("/get/xu", null, function (data) {
        if (null != data && 0 < data.length) {
            log(data);
            xuList = JSON.parse(data);
        }
    });
}