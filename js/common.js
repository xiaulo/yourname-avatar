{
    const DOM = {
        canvas: document.getElementById("canvas"),
        ctx: document.getElementById("canvas").getContext("2d"),
        select: document.getElementById("control-select"),
        createBtn: document.getElementById("control-create"),
        oname: document.getElementById("control-name"),
        oresult: document.getElementsByClassName("control-result")[0],
    }

    const UTILS = (function(){
        let clearForm = () => {
            // 清空表单
            DOM.oname.value = "";
            DOM.oresult.innerHTML = "";
        }
        return {
            clearForm: clearForm,
        }
    })();

    var boyImg = new Image(), girlImg = new Image();
    boyImg.src = "images/long.jpg";
    girlImg.src = "images/sanye.jpg";

    var main = () => {
        // 入口
        eventBind();
    }

    var eventBind = () => {
        // DOM事件绑定
        // 初始画布渲染
        boyImg.onload = () => {
            DOM.ctx.drawImage(boyImg,0,0,250,250);
        }
        // 选择人物
        DOM.select.onchange = () => {
            UTILS.clearForm();
            if(DOM.select.value === "立花泷"){
                DOM.ctx.drawImage(boyImg,0,0,250,250);
            }else if(DOM.select.value === "宫水三叶"){
                DOM.ctx.drawImage(girlImg,0,0,250,250);
            }else{
                alert("请求非法");
            }
        }
        // 画布实时更新
        DOM.oname.oninput = () => {
            imageHandle();
        }
        // 生成图片处理
        DOM.createBtn.onclick = function(){
            if(DOM.oname.value == ""){
                alert("喂，真的什么都不写吗？");
            }else{
                DOM.createBtn.innerHTML = "生成中.";
                DOM.createBtn.setAttribute("disabled","disabled");
                DOM.createBtn.style.cursor = "not-allowed";
                setTimeout(function(){
                    imageHandle();
                    DOM.createBtn.innerHTML = "生成图片";
                    DOM.createBtn.removeAttribute("disabled");
                    DOM.createBtn.style.cursor = "pointer";
                    DOM.oresult.innerHTML = "生成成功，<a href='"+DOM.canvas.toDataURL("image/png")+"' download='avatar'>点击下载</a>"
                },2000);
            }
        }
    }

    function imageHandle(){
        // 图片处理
        let text = DOM.oname.value;
        DOM.ctx.font = "18px 宋体";
        if(DOM.select.value === "立花泷"){
            DOM.ctx.drawImage(boyImg,0,0,250,250); 
            drawText(text,117,60,1);
        }else if(DOM.select.value === "宫水三叶"){
            DOM.ctx.drawImage(girlImg,0,0,250,250); 
            drawText(text,105,50,1);
        }else{
            alert("请求非法！");
        }
    }
    
    function drawText(t,x,y,w){
        // 文字处理
        var chr = t.split("");
        var temp = "";              
        var row = [];
        DOM.ctx.textBaseline = "middle";
        for(var a = 0; a < chr.length; a++){
            if( !DOM.ctx.measureText(temp).width < w ){
                row.push(temp);
                temp = "";
            }
            temp += chr[a];
        }
        row.push(temp);
        for(var b = 0; b < row.length; b++){
            DOM.ctx.fillText(row[b],x,y+(b+1)*20);
        }
    }

    main();

}

