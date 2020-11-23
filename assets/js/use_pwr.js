$(function () {
    // 给表单设置验证规则
    let layer = layui.layer
    let form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        qr: function (value) {
            if ($("[name=newPwd]").val() != value) return ("俩次密码不一样")

        },
        samepw: function (value) {
            if ($("[name=oldPwd]").val() == value) return ("新旧密码不能一样")
        }
    })
    $("#submi").on("submit", function (e) {
        e.preventDefault()
        let data = $(this).serialize()
        $.ajax({
            url: '/my/updatepwd',
            method: "POST",
            data: data,
            success: function (res) {
                if (res.status != 0) return layer.msg(res.message)
                layer.msg(res.message + "请重新登录")
                localStorage.removeItem("token")
                $("#submi")[0].reset()
                window.parent.location.href = "/login.html"
            }
        })
    })
})
