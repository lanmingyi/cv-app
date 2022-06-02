

function checkApp(url, version) {  
	var nowv = plus.runtime.version.replace(/\./g, '')  
	var newv = ''  
	if(version) {  
		newv = version.replace(/\./g, '')  
	}  
	if(newv && url && parseInt(newv) > parseInt(nowv)) {  
		uni.confirm('发现新版本,是否立即升级', '新版提醒', ['稍后再说', '现在升级'], function(e) {  
			if(e.index == 1) {  
				plus.runtime.openURL(url)  
			}  
		})  
		return true  
	} else {  
		return false  
	}  
} 
function checkWgt(url, version) {  
	var newVersion = version  
	uni.plusReady(function() {  
		plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {  
			var nowv = wgtinfo.version.replace(/\./g, '')  
			var newv = ''  
			if(version) {  
				newv = version.replace(/\./g, '')  
			}  
			if(newv && url && newv > nowv) {  
				uni.toast('发现新版,自动更新:' + nowv);  
				//执行更新  
				plus.io.resolveLocalFileSystemURL('_doc/update/' + version + '.wgt', function(entry) {  
					entry.remove();  
				});  
				//下载wgt  
				plus.downloader.createDownload(url, {  
					filename: "_doc/update/"  
				}, function(d, status) {  
					if(status == 200) {  
						var path = d.filename;  
						// 安装wgt包  
						plus.runtime.install(path, {}, function() {  
							uni.toast(newVersion + " 更新成功！");  
							setTimeout(function() {  
								plus.runtime.restart();  
							}, 500);  
						}, function(e) {  
							uni.toast("更新包安装失败:" + e.message);  
						});  
					} else {  
						uni.toast("下载更新包失败！");  
					}  
				}).start();  
				return true  
			} else {  
				return false  
			}  
		})  
	})  
} 
