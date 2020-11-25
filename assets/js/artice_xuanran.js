$(function () {
    let layer = layui.layer
    let form = layui.form
    initArtCateList()
    // 封装一个获取数据的渲染函数函数
    function initArtCateList() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                let str = template("atrice_table", res)
                $("tbody").html(str)
            }
        })
    }

    // 点击添加添加图书按钮时需要弹出框
    let index = null
    $("#form_add").click(function () {
        index = layer.open({
            title: "添加文章分类",
            type: 1,
            area: ['500px', '300px'],
            content: $("#btnAddcode").html() //这里content是一个普通的String
        })
    })
    $("body").on("submit", "#btnUpload", function (e) {
        e.preventDefault();
        let data = $(this).serialize()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: data,
            success: function (res) {
                if (res.status != 0) return layer.msg(res.message)
                initArtCateList()
                layer.msg(res.message)
                layer.close(index)
            }
        })
    })
    // 修改区域
    let newIndex = null
    $("body").on("click", "#new-Id", function () {
        newIndex = layer.open({
            title: "修改文章分类",
            type: 1,
            area: ['500px', '300px'],
            content: $("#btnNewcode").html() //这里content是一个普通的String
        });
        let id = $(this).attr("data-id");
        // console.log(id);
        $.ajax({
            method: "get",
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status !== 0) return layer.msg("获取信息失败");
                form.val("new_form", res.data)
                // console.log(123);
            }
        })
    })
    $("body").on("submit", "#news", function (e) {
        console.log(123);
        e.preventDefault()
        let data = $(this).serialize()
        console.log(data);
        $.ajax({
            method: "POST",
            url: '/my/article/updatecate',
            data: data,
            success: function (res) {
                if (res.status1 = 0) return layer.msg(res.message)
                layer.msg(res.message)
                initArtCateList()
                layer.close(newIndex)
            }
        })
    })
    // 删除区域

    $("body").on("click", "#skill-Id", function () {
        let id = $(this).attr("data-id")
        layer.confirm('确定删除吗', { icon: 3, title: '提示' }, function (index) {

            console.log(id);
            $.ajax({
                method: "GET",
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    console.log(res);
                    if (res.status !== 0) return layer.msg("删除信息失败");
                    initArtCateList()
                    layer.msg(res.message)
                }
            })
            layer.close(index);
        })
    })

})