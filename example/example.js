const YMD_FORMAT = 'YYYYMMDDHHmmss';

function init(){
    setDateRangePicker('id_daterange1', 'id_h_daterange1', moment().subtract(1, 'days').second(00).format(YMD_FORMAT));
    setDateRangePicker('id_daterange2', 'id_h_daterange2', moment().second(59).format(YMD_FORMAT));
}

function setDateRangePicker(id, hiddenID, defaultDate) {
	let hiddenElement = document.getElementById(hiddenID);

	try {
		test_tagName(id, 'input');
		test_tagName(hiddenID, 'input');
	} catch (e) {
		console.error(e);
		return false;
	}
	if (!checkDateFormat(defaultDate)) return false;
	hiddenElement.value = defaultDate;
	$('#' + id).daterangepicker({
		"singleDatePicker": true,
		"startDate": defaultDate,
        "autoApply": true,
		"locale": {
			"format": "YYYY/MM/DD",
		},
	}, function (start, end, label) {
		hiddenElement.value = start.format(YMD_FORMAT);
	});
}

function changeDate(id, hiddenID, date){
	if (!checkDateFormat(date)) return false;
	$(`#${id}`).data('daterangepicker').setStartDate(date)
	document.getElementById(hiddenID).value = date;
	return true;
}

/** 型チェック用関数 **/

/****************************************************************
* 機能： 入力された値が日付でYYYYMMDDhhmmss形式になっているか調べる
* 引数： strDate = 入力された値
* 戻り値： 正 = true 不正 = false
****************************************************************/
function checkDateFormat(strDate) {
	if (!strDate) return false;
	if(!strDate.match(/^[0-9]{14}$/g)){
		console.error(`'${strDate}' is invalid date`);
		return false;
	}
	return true;
}


function test_tagName(id, tagName){
	let element = document.getElementById(id);

	try {
		test_isNotNullOrUndefined(element, `element[id='${id}']`);
		test_isEqual(element.tagName, tagName.toUpperCase(), `element[id='${id}']のタグ名`);
	} catch (e) {
		throw new Error(e);
	}
	return true;
}

function test_isEqual(actual, expected, testTag){
	let errorMsg = `not expected result. expected: '${expected}', actual: '${actual}'`;
	if (testTag) errorMsg = `テスト対象: '${testTag}'... ${errorMsg}`;
	if (actual !== expected){
		throw new Error(errorMsg);
	}
	return true;
}

function test_isArray(obj, objName){
	if (!Array.isArray(obj)) throw new TypeError(`'${objName}' is not Array`);
	return true;
}

function test_isObject(obj, objName){
	if (Object.prototype.toString.call(obj) === '[object, Object]'){
		throw new TypeError(`'${objName}' is not Object`);
	}
	return true;
}

function test_isNotNullOrUndefined(obj, objName){
	if (obj === undefined) throw new Error(`${objName} is undefined.`);
	if (obj === null) throw new Error(`${objName} is null.`);
	return true;
}
