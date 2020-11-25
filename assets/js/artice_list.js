$(function () {
    let layer = layui.layer
    let laypage = layui.laypage;
    let form = layui.form
    let p = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    // 时间过滤器
    template.defaults.imports.dataFormat = function (data) {
        const dt = new Date(data)
        let n = a(dt.getFullYear())
        let y = a(dt.getMonth() + 1)
        let r = a(dt.getDate())
        let s = a(dt.getHours())
        let f = a(dt.getMinutes())
        let m = a(dt.getSeconds())
        return n + "-" + y + "-" + r + " " + s + ":" + f + ":" + m
    }
    function a(zero) {
        return zero < 10 ? '0' + zero : zero
    }
    initTable()
    // 获取列表区域
    // 筛选区域
    $.ajax({
        method: "GET",
        url: '/my/article/cates',
        success: function (res) {
            if (res.status !== 0) {
                layer.msg('获取分类失败')
            }
            let htmlStr = template("fn_from", res)
            $("[name=cate_id]").html(htmlStr)
            form.render()
        }
    })
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: p,
            success: function (res) {
                if (res.status != 0) return layer.msg(res.message)
                let htmlStr = template('table_title', res)
                $("tbody").html(htmlStr)
                // console.log(res);
                renderPage(res.total)
            }
        })
    }
    //分页区域
    function renderPage(total) {
        laypage.render({
            elem: 'test1',  //注意，这里的 test1 是 ID，不用加 # 号
            count: total,//数据总数，从服务端得到
            curr: p.pagenum,
            limits: [3, 6, 9],
            limit: p.pagesize,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function (obj, first) {
                // console.log(obj.curr);
                p.pagenum = obj.curr
                p.pagesize = obj.limit
                if (!first) {
                    initTable()

                }
            }
        });
    }

    // 给筛选按钮绑定sub事件
    $("#form_list").on("submit", function (e) {
        e.preventDefault()
        p.cate_id = $("[name=cate_id]").val()
        p.state = $("[name=city]").val()
        initTable()
    })
    // 给分类注册删除事件
    $("body").on("click", '.tb_del', function () {
        let id = $(this).attr("data-id")
        layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function (index) {
            let len = $('.tb_del').length
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    if (len === 1) {
                        p.pagenum = p.pagenum === 1 ? 1 : p.pagenum - 1

                    }
                    initTable()


                }

            })
            layer.close(index);

        })

    })
    // 给分类渲染页面
    $("body").on("click", '.tb_gai', function (e) {
        let id = $(this).attr('data-id')
        $.ajax({
            method: "get",
            url: '/my/article/' + id,
            success: function (res) {
                if (res.status != 0) {
                    layer.msg('获取信息失败')

                }
                location.href = '/artice/atrice-pub.html?id=' + id
            }
        })

    })

})