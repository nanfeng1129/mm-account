export const FORM_TYPE = {
    INPUT:'input',//输入框
    INPUT_SEARCH: 'inputSearch',  //查询会员编号
    SELECT:'select',//下拉框
    SELECT_FILTER: 'selectFilter', //搜索下拉框
    SELECT_MULTIPLE:'multiple',//多选下拉框
    MONTH_PICKER:'monthPicker',//年月
    RANGE_PICKER:'rangePicker',//起始日期
    DATE_PICKER:'datePicker',//交易日期
    DATE_TIME_PICKER:'dateTimePicker',//日期+时间
    TIME_PICKER:'timePicker',//时间选择框  20200806新增类型
    TIME_PICKER_BN:'timePickerBeginEnd',//时间选择框 有开始结束  20200806新增类型
    BTN_QUERY:'query',//按钮组的 查询
    BTN_RESET:'reset',//按钮组的 重置
    BTN_SHRINK:'shrink',//按钮组的 展开收起
    TREE_SELECT:'treeSelect', //树形下拉框
}

export const RESP_TYPE = {
    SUCCESS: 200,
    FAILURE: 0
}