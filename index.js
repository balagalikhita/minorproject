/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
var connToken = "90931791|-31949307996913033|90963031";
$('#stdId').focus();
function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', lvData.rec_no);
}

function getStdIdAsJsonObj() {
    var stdid = $("#stdId").val();
    var jsonStr = {
        stdId: stdid
    };
    return JSON.stringify(jsonStr);
}
function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var data = JSON.parse(jsonObj.data).record;
    $('#stdName').val(data.name);
    $("#stdClass").val(data.class);
    $('#stdDOB').val(data.dob);
    $("#stdADD").val(data.add);
    $('#stdED').val(data.ed);
}
function resetStudent() {
    $("#stdId").val("");
    $('#stdName').val("");
    $("#stdClass").val("");
    $("#stdDOB").val("");
    $("#stdADD").val("");
    $("#stdED").val("");
    $("#stdId").prop("disabled", false);
    $("#stdSave").prop("disabled", true);
    $("#stdChange").prop("disabled", true);
    $("#stdReset").prop("disabled", true);
    $("#stdId").focus();
}
function validateData() {
    var stdid, stdname, stdclass,stddob, stdadd, stded;
    stdid = $("#stdId").val();
    stdname = $("#stdName").val();
    stdclass = $("#stdClass").val();
    stddob = $("#stdDOB").val();
    stdadd = $("#stdADD").val();
    stded = $("#stdED").val();
    if (stdid === "") {
        alert("Student ID Required Value");
        $("#stdId").focus();
        return "";
    }
    if (stdname === "") {
        alert("Student Name is Required Value");
        $("#stdName").focus();
        return "";
    }
    if (stdclass === "") {
        alert("Student class is Required Value");
        $("#stdClass").focus();
        return "";
    }
    if (stddob === "") {
        alert("Student DOB Required Value");
        $("#stdDOB").focus();
        return "";
    }
    if (stdadd === "") {
        alert("Student address is Required Value");
        $("#stdADD").focus();
        return "";
    }
    if ( stded === "") {
        alert("Student enrollment is Required Value");
        $("#stdED").focus();
        return "";
    }
    var jsonStrObj = {
        stdId: stdid,
        stdName: stdname,
        stdClass: stdclass,
        stdDOB: stddob,
        stdADD: stdadd,
        stdED: stded
    };
    return JSON.stringify(jsonStrObj);
}
function getStd() {
    var stdIdJsonObj = getStdIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, "SCHOOL-DB", "STUDENTDATA", stdIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,  "http://api.login2explore.com:5577", "/api/irl");
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400) {
        $("#stdSave").prop("disabled", false);
        $("#stdReset").prop("disabled", false);
        $("#stdName").focus();
    } else if (resJsonObj.status === 200) {
        $("#stdId").prop('disabled', true);
        fillData(resJsonObj);
        $("#stdChange").prop('disabled', false);
        $("#stdReset").prop('disabled', false);
        $("#stdName").focus();
    }
}
function saveStudent() {
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return"";
    }

    var putRequest = createPUTRequest(connToken, jsonStrObj,"SCHOOL-DB", "STUDENTDATA");
    alert(putRequest);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, "http://api.login2explore.com:5577", "/api/iml");
    alert(JSON.stringify(resJsonObj));
    jQuery.ajaxSetup({async: true});
    resetStudent();
    $("#stdId").focus();
}

function changeStudent()
{
    $("#stdChange").prop("disabled", true);
   
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, "SCHOOL-DB", "STUDENTDATA", localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,  "http://api.login2explore.com:5577", "/api/iml");
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetStudent();
    $("#stdId").focus();

}