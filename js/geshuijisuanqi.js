// 全局变量
var taxType = null;
var city = null;

// init: 加载完成
$(document).ready(function(){
	$("#txtIncome")[0].focus();
});

// 键盘回车
function keyControl(evt){
	if(!evt) evt = window.event;
	var currentCode = evt.keyCode;
	
	if(currentCode == 13){
	   //document.getElementById("tax").blur();
		document.getElementById("btnCalc").click();
		cancelKey(evt);
	}
}
function cancelKey(evt) {
    if (evt.preventDefault) {
        evt.stopPropagation();
        evt.preventDefault();
    }
    else {
        evt.cancelBubble = true;
        evt.returnValue = false;
    }
}

/**
 * 收入类型选择
 * 
 * taxType
 * 
 * sqgz: 税前工资
 * shgz: 税后工资
 * 
 */
function taxTypeChange() {
	taxType = $("#taxType").val();
}

// 城市选择
function cityChange() {
	city = $("#city").val();
}

// 计算个人所得税
function btnCalc_onClick_index()
{
    clearResult_index();
    var income = parseFloat($("#txtIncome").val());
    if(isNaN(income)) {
        alert("无效的收入金额");
        $("#txtIncome")[0].focus();
        $("#txtIncome")[0].select();
        return;
    }
    $("#txtIncome").val(income); 
    
    var insure = parseFloat($("#txtInsure").val());
    if(isNaN(insure)) {
        alert("无效的各项社会保险费金额");
        $("#txtInsure")[0].focus();
        $("#txtInsure")[0].select();
        return;
    }
    $("#txtInsure").val(insure);   
    var baseLine=$("#selBaseLine").val();
    
    var taxableIncome = income - insure - baseLine;
    if(taxableIncome <=0){
        alert("您无需缴纳个人所得税!");
        $("#txtIncome")[0].focus();
        $("#txtIncome")[0].select();
        return; 
    }
    
    var R,Q;
    var A=taxableIncome;
    A=A.toFixed(2);
    if(A<=1500){R=0.03;Q=0;}
    else if(A>1500 && A<=4500){R=0.1;Q=105}
    else if(A>4500 && A<=9000){R=0.2;Q=555}
    else if(A>9000 && A<=35000){R=0.25;Q=1005}
    else if(A>35000 && A<=55000){R=0.3;Q=2755}
    else if(A>55000 && A<=80000){R=0.35;Q=5505}
    else{R=0.45;Q=13505;} 
    var tax=taxableIncome * R -Q;
    var realIncome=income - insure - tax;            
    $("#lblTaxableIncome")[0].innerText=taxableIncome.toFixed(2);
    $("#lblTaxRate")[0].innerText=R*100;
    $("#lblQuick")[0].innerText=Q;
    $("#txtTax")[0].value=tax.toFixed(2);
    $("#txtRealIncome")[0].value=realIncome.toFixed(2);
    $("#txtIncome")[0].select();
    
    
    
    
}

// 重置个税计算器
function btnReset_onClick_index()
{
    clearResult_index();
    $("#txtInsure")[0].value="0";
    $("#selBaseLine").val(3500);
    $("#txtIncome")[0].value="";
    $("#txtIncome")[0].focus();    
    $("#txtIncome")[0].select();
}

// 清空计算结果
function clearResult_index()
{
    $("#lblTaxableIncome")[0].innerText="0";
    $("#lblTaxRate")[0].innerText="0";
    $("#lblQuick")[0].innerText="0";
    $("#txtTax")[0].value="";
    $("#txtRealIncome")[0].value="";
}


//////////////////////////shgz
//function btnCalc_onClick_shgz()
//{
//    clearResult_shgz();
//    var income = parseFloat($("#txtIncome").val());
//    if(isNaN(income)) {
//        alert("无效的收入金额");
//        $("#txtIncome")[0].focus();
//        $("#txtIncome")[0].select();
//        return;
//    }
//    $("#txtIncome").val(income); 
//    
//    var insure = parseFloat($("#txtInsure").val());
//    if(isNaN(insure)) {
//        alert("无效的各项社会保险费金额");
//        $("#txtInsure")[0].focus();
//        $("#txtInsure")[0].select();
//        return;
//    }
//    $("#txtInsure").val(insure);   
//    var baseLine=$("#selBaseLine").val();
//    
//    var taxableIncome = income - baseLine;
//    if(taxableIncome <=0){
//        $("#txtTax")[0].value="0";
//        
//        $("#txtRealIncome")[0].value=(income +insure).toFixed(2);
//        $("#txtIncome")[0].focus();
//        $("#txtIncome")[0].select();
//        return;  
//    }
//    
//    var R,Q;
//    var A=taxableIncome;
//    A=A.toFixed(2);
//    
//    if(A<=1455){R=0.03;Q=0;}
//    else if(A>1455 && A<=4155){R=0.1;Q=105}
//    else if(A>4155 && A<=7755){R=0.2;Q=555}
//    else if(A>7755 && A<=27255){R=0.25;Q=1005}
//    else if(A>27255 && A<=41255){R=0.3;Q=2755}
//    else if(A>41255 && A<=57505){R=0.35;Q=5505}
//    else{R=0.45;Q=13505;}  
//    
//    taxableIncome=(A - Q)/(1-R);
//    A=taxableIncome.toFixed(2);    
//    if(A<=1500){R=0.03;Q=0;}
//    else if(A>1500 && A<=4500){R=0.1;Q=105}
//    else if(A>4500 && A<=9000){R=0.2;Q=555}
//    else if(A>9000 && A<=35000){R=0.25;Q=1005}
//    else if(A>35000 && A<=55000){R=0.3;Q=2755}
//    else if(A>55000 && A<=80000){R=0.35;Q=5505}
//    else{R=0.45;Q=13505;} 
//    var tax=A * R -Q;
//    var realIncome=income +insure + tax;            
// 
//    $("#txtTax")[0].value=tax.toFixed(2);
//    $("#txtRealIncome")[0].value=realIncome.toFixed(2);
//    $("#txtIncome")[0].select();
//}
//function btnReset_onClick_shgz()
//{
//    clearResult_shgz();
//    $("#txtInsure")[0].value="0";
//    $("#selBaseLine").val(3500);
//    $("#txtIncome")[0].value="";
//    $("#txtIncome")[0].focus();    
//    $("#txtIncome")[0].select();
//    
//}
//function clearResult_shgz()
//{
//
//    $("#txtTax")[0].value="";
//    $("#txtRealIncome")[0].value="";
//}
//
//
//////////////////////////nzj
//function btnCalc_onClick_nzj()
//{
//    clearResult_nzj();
//    var income = parseFloat($("#txtIncome").val());
//    if(isNaN(income)) {
//        alert("无效的输入金额");
//        $("#txtIncome")[0].focus();
//        $("#txtIncome")[0].select();
//        return;
//    }
//        
//    $("#txtIncome").val(income); 
//    
//    if(income <= 0){
//        alert("收入低于0元，无需纳税。");
//        $("#txtIncome")[0].focus();
//        $("#txtIncome")[0].select();
//        return;
//    }
//    var R,Q;
//    var A=income/12;
//    A=A.toFixed(2);
//    if(A<=1500){R=0.03;Q=0;}
//    else if(A>1500 && A<=4500){R=0.1;Q=105}
//    else if(A>4500 && A<=9000){R=0.2;Q=555}
//    else if(A>9000 && A<=35000){R=0.25;Q=1005}
//    else if(A>35000 && A<=55000){R=0.3;Q=2755}
//    else if(A>55000 && A<=80000){R=0.35;Q=5505}
//    else{R=0.45;Q=13505;}
//    
//
//    $("#lblAverage")[0].innerText=A; 
//    
//    var tax=income * R - Q;
//    $("#txtTax")[0].value=tax.toFixed(2);
//    $("#lblTaxRate")[0].innerText=R*100;
//    $("#lblQuick")[0].innerText=Q;
//    var realIncome = income - tax;
//    $("#txtRealIncome")[0].value=realIncome.toFixed(2);
//    $("#txtIncome")[0].select();
//}
//function btnReset_onClick_nzj()
//{
//    clearResult_nzj();
//    $("#txtIncome")[0].value="";
//    $("#txtIncome")[0].focus();    
//    $("#txtIncome")[0].select();
//}
//function clearResult_nzj()
//{
//    $("#lblAverage")[0].innerText="0";
//    $("#lblTaxRate")[0].innerText="0";
//    $("#txtTax")[0].value="";
//    $("#txtRealIncome")[0].value="";
//    $("#lblQuick")[0].innerText="0";
//}
//
//
//////////////////////////lwbc
//function btnCalc_onClick_lwbc()
//{
//    clearResult_lwbc();
//    var income = parseFloat($("#txtIncome").val());
//    if(isNaN(income)) {
//        alert("无效的输入金额");
//        $("#txtIncome")[0].focus();
//        $("#txtIncome")[0].select();
//        return;
//    }
//        
//    $("#txtIncome").val(income); 
//    
//    if(income < 800){
//        alert("收入低于800元，无需纳税。");
//        $("#txtIncome")[0].focus();
//        $("#txtIncome")[0].select();
//        return;
//    }
//    var deduct=800;
//    if(income>4000)
//        deduct=income * 0.2;
//    var taxableIncome=income - deduct;
//    $("#lblDeduct")[0].innerText=deduct.toFixed(2);
//    $("#lblTaxableIncome")[0].innerText=taxableIncome.toFixed(2);
//    var rate=0.2,quick=0;
//    if(taxableIncome > 20000 && taxableIncome<=50000)
//    {
//        rate=0.3;
//        quick=2000;
//    }
//    else if( taxableIncome > 50000)
//    {
//        rate=0.4;
//        quick=7000;
//    }
//    
//    
//    var tax=taxableIncome * rate - quick;
//    $("#txtTax")[0].value=tax.toFixed(2);
//    $("#lblTaxRate")[0].innerText=rate*100;
//    $("#lblQuick")[0].innerText=quick;
//    var realIncome = income - tax;
//    $("#txtRealIncome")[0].value=realIncome.toFixed(2);
//    $("#txtIncome")[0].select();
//}
//function btnReset_onClick_lwbc()
//{
//    clearResult_lwbc();
//    $("#txtIncome")[0].value="";
//    $("#txtIncome")[0].focus();    
//    $("#txtIncome")[0].select();
//}
//function clearResult_lwbc()
//{
//    $("#lblDeduct")[0].innerText="0";
//    $("#lblTaxableIncome")[0].innerText="0";
//    $("#lblTaxRate")[0].innerText="0";
//    $("#txtTax")[0].value="";
//    $("#txtRealIncome")[0].value="";
//    $("#lblQuick")[0].innerText="0";
//}
//
//
//
//////////////////////////gtgsh
//function btnCalc_onClick_gtgsh()
//{
//    clearResult_gtgsh();
//    var income = parseFloat($("#txtIncome").val());
//    if(isNaN(income)) {
//        alert("无效的输入金额");
//        $("#txtIncome")[0].focus();
//        $("#txtIncome")[0].select();
//        return;
//    }
//        
//    $("#txtIncome").val(income); 
//    
//    if(income <= 0){
//        alert("收入低于0元，无需纳税。");
//        $("#txtIncome")[0].focus();
//        $("#txtIncome")[0].select();
//        return;
//    }
//
//    var A=income.toFixed(2); 
//    var R=0,Q=0;
//    if(A<=15000){R=0.05;Q=0;}
//    else if( A>15000  && A<=30000){R=0.1;Q=750;}
//    else if( A>30000 && A<=60000){R=0.2;Q=3750;}
//    else if( A>60000 && A<=100000){R=0.3;Q=9750;}
//    else if( A>100000){R=0.35;Q=14750;}    
//    
//    var tax=A * R - Q;
//    var realIncome = income - tax;
//    $("#txtTax")[0].value=tax.toFixed(2);
//    $("#lblTaxRate")[0].innerText=R*100;
//    $("#lblQuick")[0].innerText=Q;
//    $("#lblTaxableIncome")[0].innerText=A;
//    $("#txtRealIncome")[0].value=realIncome.toFixed(2);
//    $("#txtIncome")[0].select();
//}
//function btnReset_onClick_gtgsh()
//{
//    clearResult_gtgsh();
//    $("#txtIncome")[0].value="";
//    $("#txtIncome")[0].focus();    
//    $("#txtIncome")[0].select();
//}
//function clearResult_gtgsh()
//{
//    $("#lblTaxableIncome")[0].innerText="0";
//    $("#lblTaxRate")[0].innerText="0";
//    $("#lblQuick")[0].innerText="0";
//    $("#txtTax")[0].value="";
//    $("#txtRealIncome")[0].value="";
//}
//
//
//
//////////////////////////cbcz
//function btnCalc_onClick_cbcz()
//{
//    clearResult_cbcz();
//    var income = parseFloat($("#txtIncome").val());
//    if(isNaN(income)) {
//        alert("无效的输入金额");
//        $("#txtIncome")[0].focus();
//        $("#txtIncome")[0].select();
//        return;
//    }
//        
//    $("#txtIncome").val(income); 
//    
//    if(income <= 0){
//        alert("收入低于0元，无需纳税。");
//        $("#txtIncome")[0].focus();
//        $("#txtIncome")[0].select();
//        return;
//    }
//    var month=$("#selMonths")[0].value;
//    var taxableIncome=income - month *3500;
//    if(taxableIncome <=0){
//        taxableIncome=0;
//        $("#lblTaxableIncome")[0].innerText="0";
//        $("#lblTaxRate")[0].innerText="0";
//        $("#lblQuick")[0].innerText="0";
//        $("#txtTax")[0].value="0";
//        $("#txtRealIncome")[0].value=income;
//        $("#txtIncome")[0].focus();
//        $("#txtIncome")[0].select();
//        return;
//    }
//
//    var A=taxableIncome.toFixed(2); 
//    var R=0,Q=0;
//    if(A<=15000){R=0.05;Q=0;}
//    else if( A>15000  && A<=30000){R=0.1;Q=750;}
//    else if( A>30000 && A<=60000){R=0.2;Q=3750;}
//    else if( A>60000 && A<=100000){R=0.3;Q=9750;}
//    else if( A>100000){R=0.35;Q=14750;}    
//    
//    var tax=A * R - Q;
//    var realIncome = income - tax;
//    $("#lblTaxableIncome")[0].innerText=A;
//    $("#lblTaxRate")[0].innerText=R*100;
//    $("#txtTax")[0].value=tax.toFixed(2);
//    $("#lblQuick")[0].innerText=Q;
//    $("#txtRealIncome")[0].value=realIncome.toFixed(2);
//    $("#txtIncome")[0].select();
//}
//function btnReset_onClick_cbcz()
//{
//    clearResult_cbcz();
//    $("#selMonths").val(12);
//    $("#txtIncome")[0].value="";
//    $("#txtIncome")[0].focus();    
//    $("#txtIncome")[0].select();
//}
//function clearResult_cbcz()
//{
//    $("#lblTaxableIncome")[0].innerText="0";
//    $("#lblTaxRate")[0].innerText="0";
//    $("#lblQuick")[0].innerText="0";
//    $("#txtTax")[0].value="";
//    $("#txtRealIncome")[0].value="";
//}
//
//
//
//////////////////////////gcsd
//function btnCalc_onClick_gcsd()
//{
//    clearResult_gcsd();
//    var income = parseFloat($("#txtIncome").val());
//    if(isNaN(income)) {
//        alert("无效的输入金额");
//        $("#txtIncome")[0].focus();
//        $("#txtIncome")[0].select();
//        return;
//    }
//        
//    $("#txtIncome").val(income); 
//    
//    if(income < 800){
//        alert("收入低于800元，无需纳税。");
//        $("#txtIncome")[0].focus();
//        $("#txtIncome")[0].select();
//        return;
//    }
//    var deduct=800;
//    if(income>4000)
//        deduct=income * 0.2;
//    var taxableIncome=income - deduct;
//    $("#lblDeduct")[0].innerText=deduct.toFixed(2);
//    $("#lblTaxableIncome")[0].innerText=taxableIncome.toFixed(2);
//    var tax=taxableIncome * 0.14;
//    $("#txtTax")[0].value=tax.toFixed(2);
//    $("#lblTaxRate")[0].innerText="14";
//    var realIncome = income - tax;
//    $("#txtRealIncome")[0].value=realIncome.toFixed(2);
//    $("#txtIncome")[0].select();
//}
//function btnReset_onClick_gcsd()
//{
//    clearResult_gcsd();
//    $("#txtIncome")[0].value="";
//    $("#txtIncome")[0].focus();    
//    $("#txtIncome")[0].select();
//}
//function clearResult_gcsd()
//{
//    $("#lblDeduct")[0].innerText="0";
//    $("#lblTaxableIncome")[0].innerText="0";
//    $("#lblTaxRate")[0].innerText="0";
//    $("#txtTax")[0].value="";
//    $("#txtRealIncome")[0].value="";
//}
//
//
//
//////////////////////////txq
//function btnCalc_onClick_txq()
//{
//    clearResult_txq();
//    var income = parseFloat($("#txtIncome").val());
//    if(isNaN(income)) {
//        alert("无效的输入金额");
//        $("#txtIncome")[0].focus();
//        $("#txtIncome")[0].select();
//        return;
//    }
//        
//    $("#txtIncome").val(income); 
//    
//    if(income < 800){
//        alert("收入低于800元，无需纳税。");
//        $("#txtIncome")[0].focus();
//        $("#txtIncome")[0].select();
//        return;
//    }
//    var deduct=800;
//    if(income>4000)
//        deduct=income * 0.2;
//    var taxableIncome=income - deduct;
//    $("#lblDeduct")[0].innerText=deduct.toFixed(2);
//    $("#lblTaxableIncome")[0].innerText=taxableIncome.toFixed(2);
//    var tax=taxableIncome * 0.2;
//    $("#txtTax")[0].value=tax.toFixed(2);
//    $("#lblTaxRate")[0].innerText="20";
//    var realIncome = income - tax;
//    $("#txtRealIncome")[0].value=realIncome.toFixed(2);
//    $("#txtIncome")[0].select();
//}
//function btnReset_onClick_txq()
//{
//    clearResult_txq();
//    $("#txtIncome")[0].value="";
//    $("#txtIncome")[0].focus();    
//    $("#txtIncome")[0].select();
//}
//function clearResult_txq()
//{
//    $("#lblDeduct")[0].innerText="0";
//    $("#lblTaxableIncome")[0].innerText="0";
//    $("#lblTaxRate")[0].innerText="0";
//    $("#txtTax")[0].value="";
//    $("#txtRealIncome")[0].value="";
//}
//
//
//
//////////////////////////cczl
//function btnCalc_onClick_cczl()
//{
//    clearResult_cczl();
//    var income = parseFloat($("#txtIncome").val());
//    if(isNaN(income)) {
//        alert("无效的输入金额");
//        $("#txtIncome")[0].focus();
//        $("#txtIncome")[0].select();
//        return;
//    }
//        
//    $("#txtIncome").val(income); 
//    
//    if(income < 800){
//        alert("收入低于800元，无需纳税。");
//        $("#txtIncome")[0].focus();
//        $("#txtIncome")[0].select();
//        return;
//    }
//    var deduct=800;
//    if(income>4000)
//        deduct=income * 0.2;
//    var taxableIncome=income - deduct;
//    $("#lblDeduct")[0].innerText=deduct.toFixed(2);
//    $("#lblTaxableIncome")[0].innerText=taxableIncome.toFixed(2);
//    var tax=taxableIncome * 0.2;
//    $("#txtTax")[0].value=tax.toFixed(2);
//    $("#lblTaxRate")[0].innerText="20";
//    var realIncome = income - tax;
//    $("#txtRealIncome")[0].value=realIncome.toFixed(2);
//    $("#txtIncome")[0].select();
//}
//function btnReset_onClick_cczl()
//{
//    clearResult_cczl();
//    $("#txtIncome")[0].value="";
//    $("#txtIncome")[0].focus();    
//    $("#txtIncome")[0].select();
//}
//function clearResult_cczl()
//{
//    $("#lblDeduct")[0].innerText="0";
//    $("#lblTaxableIncome")[0].innerText="0";
//    $("#lblTaxRate")[0].innerText="0";
//    $("#txtTax")[0].value="";
//    $("#txtRealIncome")[0].value="";
//}
//
//
//
//////////////////////////cczr
//function btnCalc_onClick_cczr()
//{
//    clearResult_cczr();
//    var income = parseFloat($("#txtIncome").val());
//    if(isNaN(income)) {
//        alert("无效的输入金额");
//        $("#txtIncome")[0].focus();
//        $("#txtIncome")[0].select();
//        return;
//    }
//        
//    $("#txtIncome").val(income);    
//    $("#lblTaxableIncome")[0].innerText=income.toFixed(2);
//    var tax=income * 0.2;
//    $("#txtTax")[0].value=tax.toFixed(2);
//    $("#lblTaxRate")[0].innerText="20";
//    var realIncome = income - tax;
//    $("#txtRealIncome")[0].value=realIncome.toFixed(2);
//    $("#txtIncome")[0].select();
//}
//function btnReset_onClick_cczr()
//{
//    clearResult_cczr()
//    $("#txtIncome")[0].value="";
//    $("#txtIncome")[0].focus();    
//    $("#txtIncome")[0].select();
//}
//function clearResult_cczr()
//{
//    $("#lblTaxableIncome")[0].innerText="0";
//    $("#lblTaxRate")[0].innerText="0";
//    $("#txtTax")[0].value="";
//    $("#txtRealIncome")[0].value="";
//}
//
//
//
//////////////////////////lxhl
//function btnCalc_onClick_lxhl()
//{
//    clearResult_lxhl();
//    var income = parseFloat($("#txtIncome").val());
//    if(isNaN(income)) {
//        alert("无效的输入金额");
//        $("#txtIncome")[0].focus();
//        $("#txtIncome")[0].select();
//        return;
//    }
//        
//    $("#txtIncome").val(income);    
//    $("#lblTaxableIncome")[0].innerText=income.toFixed(2);
//    var tax=income * 0.2;
//    $("#txtTax")[0].value=tax.toFixed(2);
//    $("#lblTaxRate")[0].innerText="20";
//    var realIncome = income - tax;
//    $("#txtRealIncome")[0].value=realIncome.toFixed(2);
//    $("#txtIncome")[0].select();
//}
//function btnReset_onClick_lxhl()
//{
//    clearResult_lxhl()
//    $("#txtIncome")[0].value="";
//    $("#txtIncome")[0].focus();    
//    $("#txtIncome")[0].select();
//}
//function clearResult_lxhl()
//{
//    $("#lblTaxableIncome")[0].innerText="0";
//    $("#lblTaxRate")[0].innerText="0";
//    $("#txtTax")[0].value="";
//    $("#txtRealIncome")[0].value="";
//}
//
//
//
//////////////////////////orsd
//function btnCalc_onClick_orsd()
//{
//    clearResult_orsd();
//    var income = parseFloat($("#txtIncome").val());
//    if(isNaN(income)) {
//        alert("无效的输入金额");
//        $("#txtIncome")[0].focus();
//        $("#txtIncome")[0].select();
//        return;
//    }
//        
//    $("#txtIncome").val(income);    
//    $("#lblTaxableIncome")[0].innerText=income.toFixed(2);
//    var tax=income * 0.2;
//    $("#txtTax")[0].value=tax.toFixed(2);
//    $("#lblTaxRate")[0].innerText="20";
//    var realIncome = income - tax;
//    $("#txtRealIncome")[0].value=realIncome.toFixed(2);
//    $("#txtIncome")[0].select();
//}
//function btnReset_onClick_orsd()
//{
//    clearResult_orsd()
//    $("#txtIncome")[0].value="";
//    $("#txtIncome")[0].focus();    
//    $("#txtIncome")[0].select();
//}
//function clearResult_orsd()
//{
//    $("#lblTaxableIncome")[0].innerText="0";
//    $("#lblTaxRate")[0].innerText="0";
//    $("#txtTax")[0].value="";
//    $("#txtRealIncome")[0].value="";
//}