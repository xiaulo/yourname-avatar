var canvas = document.getElementById("canvas");
var ctx = document.getElementById("canvas").getContext("2d");
var select = document.getElementById("control-select");
var createBtn = document.getElementById("control-create");
var oname = document.getElementById("control-name");
var oresult = document.getElementsByClassName("control-result")[0];
var longImg = new Image();
var sanyeImg = new Image();
longImg.onload = function(){
    ctx.drawImage(longImg,0,0,250,250);
    
}
longImg.src = "images/long.jpg";
sanyeImg.src = "images/sanye.jpg";

// 选择人物
select.onchange = function(){
    clearForm();
    if(select.value == "立花泷"){
        ctx.drawImage(longImg,0,0,250,250);
    }else if(select.value == "宫水三叶"){
        ctx.drawImage(sanyeImg,0,0,250,250);
    }else{
        alert("请求非法");
    }
}

// 实时图片处理
oname.oninput = function(){
    imageHandle();
}

// 生成图片处理
createBtn.onclick = function(){
    if(oname.value == ""){
        alert("喂，真的什么都不写吗？");
    }else{
        createBtn.innerHTML = "生成中.";
        createBtn.setAttribute("disabled","disabled");
        createBtn.style.cursor = "not-allowed";
        setTimeout(function(){
            imageHandle();
            createBtn.innerHTML = "生成图片";
            createBtn.removeAttribute("disabled");
            createBtn.style.cursor = "pointer";
            oresult.innerHTML = "生成成功，<a href='"+canvas.toDataURL("image/png")+"' download='avatar'>点击下载</a>"
        },2000);
    }
}

// 清空表单
function clearForm(){
    oname.value = "";
    oresult.innerHTML = "";
}

// 图片处理
function imageHandle(){
    // 图片处理
    var text = oname.value;
    ctx.font = "18px 宋体";
    if(select.value == "立花泷"){
        ctx.drawImage(longImg,0,0,250,250); 
        drawText(text,117,60,1);
    }else if(select.value == "宫水三叶"){
        ctx.drawImage(sanyeImg,0,0,250,250); 
        drawText(text,105,50,1);
    }else{
        alert("请求非法！");
    }
}

// 文字处理
function drawText(t,x,y,w){
    var chr = t.split("");
    var temp = "";              
    var row = [];
    ctx.textBaseline = "middle";
    for(var a = 0; a < chr.length; a++){
        if( ctx.measureText(temp).width < w ){}
        else{
            row.push(temp);
            temp = "";
        }
        temp += chr[a];
    }
    row.push(temp);
    for(var b = 0; b < row.length; b++){
        ctx.fillText(row[b],x,y+(b+1)*20);
    }
}
