* @Author: 张夕雅
* @Date: 2021-07-21

## 参数传递
column : 数组
 	————数组格式 : [{
 				filedName: '',  			label标签值
				filed: '',   					字段名
				placeholder : '',    	占位符
 				type: '',  						text(输入框)   select(下拉选择框)
				value:'',    					双向绑定值  显示value值  			->  传参作用
				valueText: '',				当type为select时  显示text值 	->  页面显示作用
				list: [{							当type为select时 静态数组数据
					label: '',					
					value: ''
				}],
 				height: '',    				输入框高度(rpx) text默认70
 				......(待添加) 
 			}]
search : 回调方法  => data(Object)
	————回调带参格式 : {
				name: '123',
				...
	}
showLabel : 			是否显示label标签值  多个条件时默认true
borderBottom : 		是否显示表单域下边框  多个条件时默认true


## 单个搜索条件组件
```js
<list-search-single class="bg-box" :column="searchColumn" @search="searchFrom" :showLabel="false" :borderBottom="false"></list-search-single>
import listSearchSingle from '@/components/custom/search/listSearchSingle'
```

## 2个搜索条件组件
```js
<list-search class="bg-box" :column="searchColumn" @search="searchFrom" :showLabel="false" :borderBottom="false"></list-search>
import listSearch from '@/components/custom/search/listSearch'
```

## 3个以上搜索条件组件
```js
<list-search-more class="bg-box" :column="searchColumn" @search="searchFrom" :showLabel="true" :borderBottom="true"></list-search-more>
import listSearchMore from '@/components/custom/search/listSearchMore'
```


components: {
	listSearchSingle,
	listSearch,
	listSearchMore
},
