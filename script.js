jQuery(document).ready(function () {

    var calcStr = ""; // display
    var histStr = ""; // history
    var total = ""; // total
    var visible = false; //validare display
    var dpoint_active = true; // validare decimal
    var oper_active = true; // validare operator


    document.getElementById('keypad').addEventListener('click', getKey);

    function getKey(k) {
        var key = k.target.id;
        switch (key) {
            case 'zero': key = 0;
                break;
            case 'b1': key = 1;
                break;
            case 'b2': key = 2;
                break;
            case 'b3': key = 3;
                break;
            case 'b4': key = 4;
                break;
            case 'b5': key = 5;
                break;
            case 'b6': key = 6;
                break;
            case 'b7': key = 7;
                break;
            case 'b8': key = 8;
                break;
            case 'b9': key = 9;
                break;

        }
        compute(key);
    }

    //afisare si calcul
    function displayIt(display, history) {
        document.getElementById("display").innerHTML = display;
        document.getElementById("history").innerHTML = history;
    }

    function calcIt(show, func) {
        calcStr += show;
        histStr += show;
        total += func;
        displayIt(calcStr, histStr);
    }

    function deleteOne() {
        calcStr = calcStr.slice(0, -1);
        histStr = histStr.slice(0, -1);
        total = total.slice(0, -1);
        displayIt(calcStr, histStr);
    }
    function factorial(calcStr){
      var num=0,i=1,f=1
      num=calcStr;
      if(num<0){
        document.getElementById("display").innerHTML="Numar negativ!";
      }else{
          for(i=1;i<=num;i++){
          f=f*i;
        };
          document.getElementById("display").innerHTML=f;
       }
    }
    function calcul(num1,num2){
      let data_arr=calcStr.split(';');
      //console.log(data_arr);
      num1=data_arr[0];
      num2=data_arr[1];
      i=0;
      s=0;
      //console.log(num1,num2);
      i=Number(num1);
      if(Number(num1)>Number(num2)){
        alert("Limite gresite!");
        }else{
      for(i=Number(num1);i<=Number(num2);i++){
        s=s+i;
      };
        document.getElementById("display").innerHTML=s;
      }
     }
    function compute(data) {
        //NUMBERS
        if (calcStr === "" && data === 0) {
            return 0;
        }

        if (data >= 0 && data <= 9) {
            if (visible) {
                calcStr = "";
                histStr = ""
                total = "";
                visible = false;
            }

            oper_active = true;
            calcIt(data, data);
        }

        //DECIMAL
        if (data == "decimal") {
            if (dpoint_active === false) {
                return 0;
            }
            if (visible || calcStr == 0 || histStr == 0) {
                calcStr = "0.";
                histStr = "0.";
                total = "0.";
                visible = false;
                displayIt(calcStr, histStr);
                dpoint_active = false;
            } else {
                calcIt(".", ".");
                dpoint_active = false;
            }
        }
        //SEPARATOR
        if (data == "separator") {
            if (dpoint_active === false) {
                return 0;
            }
            if (visible || calcStr == 0 || histStr == 0) {
                calcStr = "";
                histStr = "";
                total = "";
                visible = false;
                displayIt(calcStr, histStr);
                dpoint_active = false;
            } else {
                calcIt(";", ";");
                dpoint_active = false;
            }
        }


        //OPERATORS
        if (data == "adunare") {
            if (total == "") {
                return 0;
            }
            if (oper_active == false) {
                deleteOne();
            }
            visible = false;
            dpoint_active = true;
            calcIt("+", "+");
            oper_active = false;
        }
        if (data == "scadere") {
            if (total == "") {
                return 0;
            }
            if (oper_active == false) {
                deleteOne();
            }
            visible = false;
            dpoint_active = true;
            calcIt("-", "-");
            oper_active = false;
        }
        if (data == "inmultire") {
            if (total == "") {
                return 0;
            }
            if (oper_active == false) {
                deleteOne();
            }
            visible = false;
            dpoint_active = true;
            oper_active = false;
            calcIt("x", "*");
        }
        if (data == "impartire") {
            if (total == "") {
                return 0;
            }
            if (oper_active == false) {
                deleteOne();
            }
            visible = false;
            dpoint_active = true;
            oper_active = false;
            calcIt("/", "/");
        }
        if (data == "factorial") {

            factorial(calcStr);
        }
        if (data == "suma_limite") {
        alert("Introduceti limitele separate prin ; apoi apasati butonul Slim");
            calcul();
        }


        //EQUALS
        if (data == "equals") {
            if (total == "" || visible) {
                return 0;
            }
            visible = true;
            dpoint_active = true;
            histStr += " = \xa0" + eval(total);
            displayIt(eval(total), histStr);
            total = document.getElementById("display").innerHTML;
            calcStr = total;
        }

        //CLEAR
        if (data == "clear") {
            calcStr = "";
            histStr = "";
            total = "";
            visible = false;
            dpoint_active = true;
            displayIt("0", "0");
        }

        //DELETE
        if (data == "delete") {
            if (visible == true || calcStr == "" || calcStr.length == 1) {
                calcStr = "0";
                histStr = "0";
                displayIt(calcStr, histStr);
                return 0;
            }

            deleteOne();

        }

    }
});
