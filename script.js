
window.addEventListener('DOMContentLoaded', (event) => {
    const music = document.getElementById('background-music');
    music.volume = 0.5; // Điều chỉnh âm lượng nhạc nền (giá trị từ 0.0 đến 1.0)
});


/*Con Lắc Lò Xo*/
function conlacloxo() {
    var cannang = (parseFloat(document.getElementById("mass").value) || 0);
    var docung = (parseFloat(document.getElementById("stiffness").value) || 0);
    var tansogoc = (parseFloat(document.getElementById("tansogoc").value) || 0);

    var chuki = (parseFloat(document.getElementById("chuki").value) || 0);
    var tanso = (parseFloat(document.getElementById("tanso").value)||0);
    for (let i=0; i<10; i++) {
        if (docung!==0 && cannang!==0 && (tansogoc===0 || tansogoc===undefined)) {
            tansogoc = Math.sqrt(docung / cannang);
        } 
        
        if (tansogoc!==0 && cannang!==0 && (docung===0 || docung===undefined)){
            docung=(tansogoc**2)*cannang
        }
        
        if (docung!==0 && tansogoc!==0 && (cannang===0 || cannang===undefined)) {
            cannang=(docung/(tansogoc**2))
        }
        
        if (tansogoc!==0 && cannang!==0 && (docung===0 || docung===undefined)){
            docung=(cannang*(tansogoc**2))
        }

        if (tansogoc!==0) {
            chuki = 2 * Math.PI / tansogoc;
            tanso = 1/chuki
        }

        if (chuki!==0) {
            tansogoc=(2*Math.PI)/chuki
        }

        if (tanso!==0) {
            tansogoc=(2*Math.PI)*tanso
        }
    }
    
    if (cannang===0){
        cannang=NaN
    }
    if (docung===0){
        docung=NaN
    }
    if (tansogoc===0){
        tansogoc=NaN
    }
    if (chuki===0){
        chuki=NaN
    }
    if (tanso===0){
        tanso=NaN
    }
    
    document.getElementById("result").innerHTML = "Cân nặng: " + cannang.toFixed(2) + " kg <br> Độ cứng: "+ docung.toFixed(2) + " N/m <br> Tần số góc: " + tansogoc.toFixed(2) + " rad/s <br> Chu kỳ: " + chuki.toFixed(2) + " s <br> Tần số :" + tanso.toFixed(2) + " Hz " ;
}

/*Con Lắc Đơn*/
function conlacdon() {
    let g=9.8
    var l=parseFloat(document.getElementById("l").value);

    var angularFrequency = Math.sqrt(g / l);
    var period = 2 * Math.PI * Math.sqrt(l / g);
    var tanso = 1 / period;
    
    document.getElementById("result").innerHTML = "Tần số góc: " + angularFrequency.toFixed(2) + " rad/s <br> Chu kỳ: " + period.toFixed(2) + " s <br> Tần số: " + tanso.toFixed(2) + " Hz ";
}

/*CHƯƠNG SÓNG*/
function giaothoa() {
    function convertValue(value,unit) {
        // Lấy giá trị và đơn vị từ các phần tử HTML
        
        // Kiểm tra nếu giá trị và đơn vị hợp lệ
            switch (unit) {
                case "cm":
                    value *= 10; // Chuyển đổi thành mm
                    break;
                case "µm":
                    value /= 1000; // Chuyển đổi thành mm
                    break;
                case "m":
                    value *= 1000; // Chuyển đổi thành mm
                    break;
            // Thêm các trường hợp chuyển đổi khác tương ứng với đơn vị bạn muốn
            }
        
        return value;
    }   
    var lamda = (parseFloat(document.getElementById("lamda").value) || 0);
    var ulamda = document.getElementById("ulamda").value;
    var lamda = (convertValue(lamda,ulamda) || 0);
    var a = (parseFloat(document.getElementById("a").value) || 0);
    var ua = document.getElementById("ua").value;
    var a = (convertValue(a,ua) || 0);
    var i = (parseFloat(document.getElementById("i").value) || 0);
    var ui = document.getElementById("ui").value;
    var i = (convertValue(i,ui) ||0);
    var D = (parseFloat(document.getElementById("D").value) || 0);
    var uD = document.getElementById("uD").value;
    var D = (convertValue(D,uD) || 0);
    var ks=(parseFloat(document.getElementById("k1").value)||0);
    var kt=(parseFloat(document.getElementById("k2").value)||0);
    var xs=0;
    var xt=0;
    
    for (let j=2; j<8; j++) {
        if (i!==0 && a!==0 && D!==0 &&(lamda===0 || lamda===undefined)) {
            lamda = (i*a)/D;
        } 
        
        if (i!==0 && a!==0 && lamda!==0 &&(D===0 || D===undefined)) {
            D = (i*a)/lamda;
        }
        
        if (lamda!==0 && a!==0 && D!==0 &&(i===0 || i===undefined)) {
            i = (lamda*D)/a;
        }
        
        if (i!==0 && lamda!==0 && D!==0 &&(a===0 || a===undefined)) {
            a=(lamda*D)/i;
        }
        if (kt!==0 && (i!==0 || (lam*D)/a!==0)){
            xt=((kt+1/2)*i || (kt+1/2)*((lamda*D)/a));
        }  
        if (ks!==0 && (i!==0 || (lam*D)/a!==0)){
            xs= (ks*i || ks*((lam*D)/a));
        }

        /*if (k!==0 && (i!==0 || (lam*D)/a!==0)){
            if(k1!==k) {
                xt= ((k+1/2)*i || (k+1/2)*((lamda*D)/a));
            }
            else{
                xs= (k*i || k*((lam*D)/a));
            }
        }*/
    }

    document.getElementById("result").innerHTML = "Bước sóng: "+ lamda +"mm <br> Khoảng cách giữa 2 khe: " + a +"mm <br> Khoảng vân: " + i +"mm <br> Khoảng cách từ 2 Khe đến màn: " + D +"mm <br> Vị trí vân sáng: " + xs +"mm <br> Vị trí vân tối: "+ xt +"mm";
}

function convertValue(value,unit) {
    // Lấy giá trị và đơn vị từ các phần tử HTML
    
    // Kiểm tra nếu giá trị và đơn vị hợp lệ
        switch (unit) {
            case "cm":
                value *= 10; // Chuyển đổi thành mm
                break;
            case "µm":
                value /= 1000; // Chuyển đổi thành mm
                break;
            case "m":
                value *= 1000; // Chuyển đổi thành mm
                break;
        // Thêm các trường hợp chuyển đổi khác tương ứng với đơn vị bạn muốn
        }
    
    return value;
}   
/* function convertValue1(value,unit) {
    // Lấy giá trị và đơn vị từ các phần tử HTML
    
    // Kiểm tra nếu giá trị và đơn vị hợp lệ
        switch (unit) {
            case "sáng":
                value = value; // tìm k
                break;
            case "tối":
                value = value - 1; // tìm k
                break;
        // Thêm các trường hợp chuyển đổi khác tương ứng với đơn vị bạn muốn
        }
    
    return value;
}*/



window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  var floatingButton = document.getElementById("floating-button");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    floatingButton.style.display = "block";
  } else {
    floatingButton.style.display = "none";
  }
}

