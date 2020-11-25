$(function () {
    let layer = layui.layer
    let form = layui.form
    initEditor()
    // 获取下拉文章类别


    $.ajax({
        method: "GET",
        url: '/my/article/cates',
        success: function (res) {
            if (res.status !== 0) {
                layer.msg(res.message)
            }
            let str = template("fn", res)
            $("[name=cate_id]").html(str)
            form.render()
        }
    })

    $("#btnUpload").click(function () {
        $(".hide").click()
    })
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    $(".hide").on("change", function (e) {
        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    // let ft = new FormData
    let state = '已发布'
    $("#btn2").click(function () {
        state = '草稿'
    })
    // 提交from表单
    $("#sub").on('submit', function (e) {
        e.preventDefault()
        var fd = new FormData($(this)[0])
        fd.append('state', state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                console.log();
                fd.append('cover_img', blob)
                // console.dir(fd);
                $.ajax({
                    method: "POST",
                    url: '/my/article/add',
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        if (res.status !== 0) {
                            return layer.msg("发布文章失败")
                        }
                        layer.msg('发布文章成功')
                        location.href = "/artice/artice_list.html"
                    }
                })
            })
    })
})