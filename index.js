// 获取视频文件第一帧
export function oneImgUtil(file) {
    return new Promise((resolve, reject) => {
      // 创建一个 <video> 元素
      const video = document.createElement('video')
      video.muted = true;
      video.autoplay = true;
      video.preload = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '')
      video.setAttribute('crossOrigin', 'anonymous')
      video.currentTime = 1 //currentTime 属性设置或返回视频播放的当前位置（以秒计）   重要！不设置会导致第一帧图片不显示
      // 监听视频加载完成事件
      video.addEventListener('loadeddata', function () {
        // 将视频的第一帧绘制到 canvas 上
        // 兼容edag
        setTimeout(()=>{
        // 创建一个 <canvas> 元素
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
  
        // 设置 canvas 的宽高与视频的宽高相同
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
  
          
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
  
        // 将 canvas 转换为图片并显示
        const dataURL = canvas.toDataURL() // 默认格式为 PNG
        let files = setFile(dataURL)
        console.log(files.type)
        let type=files.type.split('/')[1]
        let newName=files.name+'.'+type
        const renamedFile = new File([files], newName, { type: files.type });
        resolve(renamedFile)
          },1000)
      })
  
      // 选择用户上传的视频文件
      function changeImg(file) {
        // 读取视频文件并将其赋值给 <video> 元素的 src 属性
        const reader = new FileReader()
        reader.onload = function (e) {
          video.src = e.target.result
        }
        reader.readAsDataURL(file)
      }
      changeImg(file)
    })
  }
  
  // base64转换file
  function setFile(base64) {
    const arr = base64.split(',')
    const type = arr[0].match(/:(.*?);/)[1]
    const size = window.atob(arr[1])
    let n = size.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = size.charCodeAt(n)
    }
    return new File([u8arr], Date.now(), { type })
  }
  