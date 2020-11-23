var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)
$("#btnChooseImg").on("click", function () {
    $("#files").click()
    $("#files").on("change", function (e) {
        let filse = this.files
        // console.log(filse);
        if (filse.length === 0) {
            return ('请选择照片')
        }
        let file = e.target.files[0]
        // 2. 将文件，转化为路径
        let imgURL = URL.createObjectURL(file)
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    $("#btnUpload").on("click", function () {
        let dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 2. 调用接口，把头像上传到服务器
        let layer = layui.layer
        $.ajax({
            method: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            succes: function (res) {
                if (res.status != 0) return ('上传图片失败')
                layer.msg("更新图片成功")
                window.parent.getUserInfo()
                console.log(123);
            }
        })
    })
})