$(function () {
    $("#reg-link").on("click", function (e) {
        e.preventDefault();
        $(".login-box").hide();
        $(".res-box").show();

    })
    $("#log-link").on("click", function (e) {
        e.preventDefault();
        $(".login-box").show();
        $(".res-box").hide();

    })

    //layui 只定义表单验证规则
    let form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码6-12位且不能有空格'],
        pswe: function (value) {
            if ($(".res-box [name = password]").val() != value) return "俩次密码不一样"
        }
    })

    let layer = layui.layer
    $("#reg-form").on("submit", function (e) {
        e.preventDefault()
        let data = $(this).serialize()

        // console.log(data);
        // $.ajax({
        //     method: "POST",
        //     url: '/api/reguser',
        //     data: data,
        $.post("/api/reguser", data, function (res) {
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg('注册成功请登录')
            $("#log-link").click()
            $(this).setItem()
        })

    })

    // 注册登录的from监听事
    $("#login").on("submit", function (e) {
        e.preventDefault()
        let data = $(this).serialize()
        // console.log(data);
        $.ajax({
            method: "POST",
            url: '/api/login',
            data: data,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                localStorage.setItem("token", res.token)
                location.href = "/index.html"
            }
        })
    })
})