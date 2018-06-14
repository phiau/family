var presentId = 0;
var rootNode = null;
var selectNode = null;
var map = new Map();
getXu();
var xuDataList;
var nodeList;

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

function nodes2tree(nl) {
    nl.sort(function (a, b) { a.xu - b.xu; })
    rootNode = nodeFromItem(nl[0]);
    map.set(rootNode.item.id, rootNode);

    for (var i=1; i<nl.length; i++) {
        var pn = map.get(nl[i].parent);
        var cn = nodeFromItem(nl[i]);
        nodeAddChild(pn, cn);
        map.set(cn.item.id, cn);
    }
    reload(rootNode);
    $('#tree').treeview('expandAll');
    log(rootNode);
}

function getNodes() {
    doGetAjax("/get/nodes", null, function (data) {
        if (null != data && 0 < data.length) {
            nodeList = JSON.parse(data);
            log(nodeList);
            nodes2tree(nodeList);
        } else {
            nodeList = new Array();
        }

        if (0 < nodeList.length) {
            for (var i=0; i<nodeList.length; i++) {
                if (presentId < nodeList[i].id) {
                    presentId = nodeList[i].id;
                }
            }
            nodes2tree(nodeList);
            getAddBun().text("添加节点");
        } else {
            getAddBun().text("添加根");
            setElemVal(getShiXu(), xuDataList[0]);
        }
    });
}

function Item(name, xu, info, parent) {
    this.id = genId();
    this.name = name;
    this.xu = xu;
    this.info = info;
    this.parent = parent;
}

function saveNode(item) {
    doPostAjax("/save/node", item, function (data) {
        if (200 == data) {
            alert("保存节点成功");
        } else {
            alert("保存节点失败");
        }
    });
}

function saveRootNode(item) {
    doPostAjax("/save/root", item, function (data) {
        if (200 == data) {
            alert("保存根节点成功");
        } else {
            alert("保存根节点失败");
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

function itemFromVal() {
    var xu = findXuIndex(xuDataList, getShiXu().val());
    var parent = 0;
    if (0 < nodeList.length) {
        parent = selectNode.item.id;
        xu = selectNode.item.id + 1;
    }
    return new Item($("#name").val(), xu, $("#info").val(), parent);
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
        log('fromItem;' + item);
        this.item = item;
        this.text = item.name;
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

function findXuIndex(xuVal, xuList) {
    return xuList.indexOf(xuVal);
}

function reloadIn(s) {
    $('#tree').treeview({
        data: "[" + s + "]",
        onNodeSelected: function(event, node) {
            selectNode = map.get(node.item.id);
            setElemVal(getParent(), selectNode.item.name);
            setElemVal(getShiXu(), xuDataList[selectNode.item.xu + 1]);
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
    if (0 < nodeList.length) {
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
    saveNode(item);
    nodeList.push(item);
    nodes2tree(nodeList);
    getAddBun().text("添加节点");
}

getNodes();


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





