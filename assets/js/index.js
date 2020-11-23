$(function () {
    // 实现退出功能
    let layer = layui.layer
    $("#btnLogout").on("click", function () {
        layer.confirm('确定要退出', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem("token");
            location.href = "/login.html"
            layer.close(index);
        });
    })
    //设置权限访问
    getUserInfo()

})
let layer = layui.layer
// 定义一个获取用户信息的函数 getUserInfo
function getUserInfo() {
    $.ajax({
        method: "get",
        url: '/my/userinfo',
        // 获取要求必须要加header所以可以再拦截器里添加好之后get请求可以不用写了
        success: function (res) {
            if (res.status !== 0) return layer.msg("获取数据失败");
            renderAvatar(res.data)
            // console.log(res.data);
        }
    })
}
// 获取数据成功后渲染个人信息到导航栏上去
function renderAvatar(user) {
    // 获取用户名和昵称,没有昵称以用户名优先
    let name = user.nickname || user.username;
    // console.log(name);
    $("#welcome").html("欢迎&nbsp;" + name)
    //如果用户上传了图片以上传的图片优先
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr("src", user.user_pic).show()
        $(".text-avatar").hide()
    } else {
        $(".layui-nav-img").hide()
        let first = name[0].toUpperCase()
        $(".text-avatar").html(first).show()
    }
}

