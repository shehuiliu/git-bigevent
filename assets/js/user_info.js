$(function () {
    let form = layui.form
    let layer = layui.layer

    form.verify({
        usesix: function (value) {
            if (value.length > 6) {
                layer.msg('昵称请在六个字符之间')
            }

        }
    })
    // 重置用户信息

    $("#btnreset").on("click", function (e) {
        // e.preventDefault();
        e.preventDefault()
        ininUserIfor()
    })
    // 监听提交事件渲染页面
    $("#sub").on('submit', function (e) {
        e.preventDefault()
        let data = $(this).serialize()
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: data,
            success: function (res) {
                if (res.status !== 0) return layer.msg('修改用户信息失败')
                layer.msg("修改信息成功")
                window.parent.getUserInfo()
                // console.log(res);
            }

        })

    })
    ininUserIfor()

    // 封装获取用户信息的函数
    function ininUserIfor() {
        // console.log(123);
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status != 0) return layer.msg("获取用户信息失败")
                form.val("formUserInfo", res.data)
                console.log(res.data);
            }
        })

    }
})


