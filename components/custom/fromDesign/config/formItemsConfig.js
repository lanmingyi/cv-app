/* 
  @Description: 移动表单拖拽控件项
/ */

export const basicsList = [{
	type: 'textBox',
	label: '输入框',
	options: {
		type: 'text',
		label: '输入框',
		name: 'textBox',
		inputAlign: 'left',
		maxlength: '140',
		placeholder: '请输入',
		value: '',
		disabled: false,
		border: true,
		required: true
	},
	key: "",
	model: "",
}, {
	type: 'inputSelect',
	label: '下拉选择框',
	options: {
		type: 'select',
		label: '下拉选择框',
		name: 'inputSelect',
		inputAlign: 'left',
		maxlength: '140',
		placeholder: '请选择',
		disabled: false,
		border: true,
		required: true,
		value: '',
		text: '',
		dynamicKey: "sex",
		dynamic: 'code',
		method: 'post',
		url: '/system/dicSet/getDicItemByCode?code=sex',
		options: [
			// 下拉选择项配置
			{
				label: '选项1',
				value: '1'
			}, {
				label: '选项2',
				value: '2'
			}
		],
		staticList: [{
			label: '选项1',
			value: 1
		}, {
			label: '选项2',
			value: 2
		}],
		dynamicList: [],
		codeList: []
	},
	key: "",
	model: "",
}, {
	type: 'textarea',
	label: '多文本输入框',
	options: {
		type: 'textarea',
		label: '多文本输入框',
		name: 'textarea',
		inputAlign: 'left',
		maxlength: '500',
		placeholder: '请输入',
		value: '',
		disabled: false,
		border: true,
		required:  true
	},
	key: "",
	model: "",
}, {
	type: 'numberBox',
	label: '数字输入框',
	options: {
		type: 'number',
		label: '数字输入框',
		name: 'numberBox',
		inputAlign: 'left',
		maxlength: '140',
		placeholder: '请输入',
		value: '',
		disabled: false,
		border: true,
		required:  true
	},
	key: "",
	model: "",
}, {
	type: 'pwdBox',
	label: '密码输入框',
	options: {
		type: 'password',
		label: '密码输入框',
		name: 'pwdBox',
		inputAlign: 'left',
		maxlength: '140',
		placeholder: '请输入',
		value: '',
		disabled: false,
		border: true,
		required:  true
	},
	key: "",
	model: "",
}, {
	type: 'checkbox',
	label: '复选框',
	options: {
		type: 'checkbox',
		label: '复选框',
		name: 'checkbox',
		size: '43',
		labelSize: '30',
		iconSize: '20',
		shape: 'square',
		wrap: false,
		required:  true,
		dynamicKey: "",
		dynamic: 'dynamic',
		dataType: 'dynamic',
		textFeiled: 'text',
		valueFeiled: 'value',
		method: 'post',
		// value: ['male','unknown'],
		value: [],
		url: '/system/dicSet/getDicItemByCode?code=sex',
		options: [{
				label: '选项1',
				checked: false,
				disabled: false,
				value: '1'
			},
			{
				label: '选项2',
				checked: false,
				disabled: false,
				value: '2'
			}
		],
		staticList: [{
			label: '选项1',
			checked: false,
			disabled: false,
			value: 1
		}, {
			label: '选项2',
			checked: false,
			disabled: false,
			value: 2
		}],
		dynamicList: [],
		codeList: []
	},
	key: "",
	model: "",
}, {
	type: 'radio',
	label: '单选框',
	options: {
		type: 'radio',
		label: '单选框',
		name: 'radio',
		size: '43',
		labelSize: '30',
		iconSize: '20',
		shape: 'circle',
		wrap: false,
		required:  true,
		dynamicKey: "",
		dynamic: 'dynamic',
		method: 'post',
		// value: "unknown",
		value: "",
		defaultText: "",
		url: '/system/dicSet/getDicItemByCode?code=sex',
		options: [{
				label: '选项1',
				checked: false,
				disabled: false,
				value: '1'
			},
			{
				label: '选项2',
				checked: false,
				disabled: false,
				value: '2'
			}
		],
		staticList: [{
			label: '选项1',
			checked: false,
			disabled: false,
			value: 1
		}, {
			label: '选项2',
			checked: false,
			disabled: false,
			value: 2
		}],
		dynamicList: [],
		codeList: []
	},
	key: "",
	model: "",
}, {
	type: 'switch',
	label: '开关',
	options: {
		type: 'switch',
		label: '开关',
		name: 'switch',
		activeColor: '#2979ff',
		inactiveColor: '#ffffff',
		value: true
	},
	key: "",
	model: "",
}, {
	type: 'rate',
	label: '评分',
	options: {
		type: 'rate',
		label: '评分',
		name: 'rate',
		value: 0,
		count: 6,
		size: 32,
		activeColor: '#FA3534',
		inactiveColor: '#b2b2b2',
		gutter: 10
	},
	key: "",
	model: "",
}, 
{
	type: 'datePicker',
	label: '日期选择器',
	options: {
		type: 'datePicker',
		label: '日期选择器',
		name: 'date',
		placeholder: '请选择',
		border: true,
		// value: '2021-07-08',
		value: '',
		required:  true,
		params: {
			year: true,
			month: true,
			day: true,
			hour: false,
			minute: false,
			second: false
		}
	},
	key: "",
	model: "",
},
{
	type: 'upload',
	label: '上传',
	options: {
		type: 'upload',
		label: '上传',
		name: 'upload',
		uploadText: '上传图片',
		action: '/system/attachment/upload',
		headers:{},
		data:{},
		fileName: 'file',
		multiple: false,
		maxSize: Number.MAX_VALUE,
		maxCount: 3,
		width: 200,
		height: 200,
		sourceValue: 0,
		sourceType: ['album', 'camera'],
		previewFullImage: true,
		showProgress: true,
		deletable: true,
		// value:['https://zysd-emis.oss-cn-shanghai.aliyuncs.com/user/avatar/ewsd0001/00dc8f22da2f45d8b3d65d5961deb434.png'],
		value:[],
		fileList: [],
		required:  false,
	},
	key: "",
	model: ""
}, {
	type: 'slider',
	label: '滑动选择器',
	options: {
		type: 'slider',
		label: '滑动选择器',
		name: 'slider',
		disabled:false,
		value: 40,
		min: 1,	
		max: 100,
		step: 1,
		blockWidth: 30,
		height: 6,
		inactiveColor: "#c0c4cc",
		activeColor: "#2979ff",
		blockColor: "#ffffff"
	},
	key: "",
	model: ""
}, {
	type: 'cascader',
	label: '级联选择器',
	options: {
		type: 'cascader',
		label: '级联选择器',
		name: 'cascader',
		url: '',
		border: true,
		method: 'post',
		dynamicKey: '',
		dynamic: 'static',	
		required:  true,
		placeholder: '请选择',
		// value: '1,2,4',
		value: '',
		list: [{
			value: 1,
			label: '选项1',
			title: '选项1',
			key: 1,
			scopedSlots: {
				title: "custom"
			},
			children: [{
				value: 2,
				label: '选项1-1',
				title: '选项1-1',
				key: 2,
				scopedSlots: {
					title: "custom"
				},
				children: [{
						value: 3,
						label: '选项1-1-1',
						title: '选项1-1-1',
						key: 3,
						scopedSlots: {
							title: "custom"
						}
					},
					{
						value: 4,
						label: '选项1-1-2',
						title: '选项1-1-2',
						key: 4,
						scopedSlots: {
							title: "custom"
						}
					}
				]
			}]
		}, {
			value: 8,
			label: '选项2',
			title: '选项2',
			key: 8,
			scopedSlots: {
				title: "custom"
			},
			children: [{
				value: 9,
				label: '选项2-1',
				title: '选项2-1',
				key: 9,
				scopedSlots: {
					title: "custom"
				},
				children: [{
					value: 10,
					label: '选项2-2',
					title: '选项2-2',
					key: 10,
					scopedSlots: {
						title: "custom"
					}
				}]
			}]
		}]
	},
	key: "",
	model: ""
}, {
	type: 'text',
	label: '文本',
	options: {
		type: 'textField',
		value: '文字',
		name: 'text',
		width: '100%',
		fontSize: 16,
		color: '#000000',
		bold: false,
		oblique: false,
		underline: false,
		lineThrough: false
	},
	key: "",
	model: ""
},{
	type: 'area',
	label: '省市区',
	options: {
		type: 'area',
		label: '省市区',
		name: 'area',
		areaCode: '',
		// areaText: ["河北省", "秦皇岛市", "北戴河区"],
		areaText: [],
		// value: ["13", "1303", "130304"],
		value: [],
		border: true,
		placeholder: '请选择',
		required:  true,
	},
	key: "",
	model: ""
}, {
	type: 'dept',
	label: '组织机构',
	options: {
		type: 'dept',
		label: '组织机构',
		name: 'dept',
		border: true,
		placeholder: '请选择',
		required:  true,
		value: ''
	},
	key: "",
	model: ""
}];