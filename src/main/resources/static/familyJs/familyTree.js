var presentId = 0;
var rootNode = null;
var selectNode = null;
var map = new Map();
getXu();
var xuDataList;

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

function getXu() {
    doGetAjax("/get/xu", null, function (data) {
        if (null != data && 0 < data.length) {
            log(data);
            xuDataList = JSON.parse(data);
        }
    });
}

function saveTree(data) {
    var params = {};
    params['tree'] = data;
    doPostAjax("/save/tree", params, function (data) {
        if (200 == data) {
            alert("保存成功");
        } else {
            alert("保存失败");
        }
    });
}

function getTree() {
    doGetAjax("/get/tree", null, function (data) {
        if (null != data && 0 < data.length) {
            log(data);
        }
    });
}

function isUndefined(o) {
    if (undefined == o || 'undefined' == o || 'undefined' == typeof(o)) {
        return true;
    }
    return false;
}

function genId() {
    presentId++;
    return presentId;
}

function Item(name, shiXu, info, parentName) {
    this.name = name;
    this.shiXu = shiXu;
    this.info = info;
    this.parentName = parentName;
}

function itemFromVal() {
    var xu = getShiXu().val();
    return new Item($("#name").val(), xu, $("#info").val(), getParent().val())
}

function itemFromObj(obj) {
    return new Item(obj.name, obj.shiXu, obj.info, obj.parentName)
}

function nodeAddChild(node, childNode) {
    if (undefined == node.nodes) {
        node.nodes = new Array();
    }

    childNode.id = genId();
    childNode.partentId = node.item.id;
    childNode.parentName = node.item.name;
    node.nodes.push(childNode);
}

function node2String(node) {
    return JSON.stringify(node);
}

function Node() {

    this.fromItem = function(item) {
        this.item = item;
        this.text = item.name;
    }

    this.fromObj = function(obj) {
        this.item = itemFromObj(obj.item);
        this.text = obj.text;
    }
}

function nodeFromItem(item) {
    var n = new Node();
    n.fromItem(item);
    return n;
}

function log(o) {
    window.console.log(o);
}

function initRootNode(item) {
    rootNode = nodeFromItem(item);
}

function findNextXuIndex(prXu, xuList) {
    var index = xuList.indexOf(prXu);
    if(index >= 0 && index < xuList.length - 1) {
        return nextItem = xuList[index + 1]
    }
    return null;
}

function reloadIn(s) {
    $('#tree').treeview({
        data: "[" + s + "]",
        onNodeSelected: function(event, node) {
            selectNode = map.get(node.id);
            setElemVal(getParent(), selectNode.item.name);

            var nextXuIndex = findNextXuIndex(selectNode.item.shiXu, xuDataList);
            setElemVal(getShiXu(), nextXuIndex);

            getAddBun().attr("disabled", false);
        }
    });
}

function reload(rn) {
    reloadIn(node2String(rn));
}

function addChildClick() {
    var name = $("#name").val();
    var parentName = getParent().val();
    if (null != rootNode) {
        if ("" == parentName || isUndefined(parentName)) {
            alert("传承不能为空");
            return null;
        }
    }
    if ("" == name || isUndefined(name)) {
        alert("名字不能为空");
        return null;
    }
    $('#addBtn').attr("disabled", true);
    var item = itemFromVal();
    if (null == rootNode) {
        getAddBun().text("添加节点");
        rootNode = nodeFromItem(item);
        rootNode.id = genId();
        map.set(rootNode.id, rootNode);
        reload(rootNode);
        $('#tree').treeview('toggleNodeSelected', [0]);
    } else {
        var childNode = nodeFromItem(item);
        nodeAddChild(selectNode, childNode);
        map.set(childNode.id, childNode);
        reload(rootNode);
        $('#tree').treeview('expandAll');
    }
    saveRootNodeToCache(rootNode);
}

function saveRootNodeToCache(node) {
    localStorage.setItem("rootNodeCache", JSON.stringify(node));
    saveTree(JSON.stringify(node));
}

function getRootNodeFromCache() {
    return JSON.parse(localStorage.getItem("rootNodeCache"));
}


function finishMap(node) {
    if (undefined != node) {
        map.set(node.id, node);
        if (presentId < node.id) {
            presentId = node.id;
        }
        if (undefined != node.nodes) {
            for (var i = 0; i < node.nodes.length; i++) {
                finishMap(node.nodes[i]);
            }
        }
    }
}


function stringIsNullOrEmpty(s) {
    return null == s || "" == s || undefined == s;
}

var s = localStorage.getItem("rootNodeCache");

if (isUndefined(xuDataList)) {
    alert("请先添加序");
} else if (stringIsNullOrEmpty(s)) {
    getAddBun().text("添加根");
    setElemVal(getShiXu(), xuDataList[0]);
} else {
    getAddBun().text("添加节点");
    getAddBun().attr("disabled", true);
    rootNode = JSON.parse(s);
    finishMap(rootNode);
    reloadIn(s);
    $('#tree').treeview('expandAll');
}

function setElemVal(obj, v) {
    obj.attr("disabled", false);
    obj.val(v);
    obj.attr("disabled", true);
}

function getAddBun() {
    return $("#addBtn");
}

function getShiXu() {
    return $('#shiXu');
}

function getParent() {
    return $('#parentName');
}




