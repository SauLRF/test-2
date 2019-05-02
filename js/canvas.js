let colorBar=document.getElementById("color-select");
let points=document.querySelector(".amount-points");
let reset=document.querySelector("[name=reset]");
// область для рисования
let canvas=document.querySelector("canvas");
let ctx=canvas.getContext("2d");
ctx.strokeStyle="#a4a6a1";
ctx.lineWidth=3;
ctx.strokeRect(0,0,600,500);

let collectionCords=[]; // кэш для хранения координат
// основная функция для отрисовки точек и линий с анимированным представлением
function paint(e){
  let cords=Object.create(null);
  let x=e.pageX-this.offsetLeft;
  let y=e.pageY-this.offsetTop;
  cords.x=x;
  cords.y=y;
  collectionCords.push(cords);
  let count=0.5;
  let timer=setInterval(function(){ // анимированное появление точек
         ctx.fillStyle=colorBar.value;
         ctx.beginPath();
         ctx.arc(x,y,count,0,Math.PI*2,false);
         ctx.fill();
         count+=0.5;
        if(count>=5){
           clearInterval(timer);
           return;}},20);

  let lastCordX=collectionCords[collectionCords.length-1].x;
  let lastCordY=collectionCords[collectionCords.length-1].y;

   if(collectionCords.length==2){
     ctx.fillStyle=colorBar.value;
     ctx.strokeStyle=colorBar.value;
     ctx.beginPath();
     ctx.moveTo(collectionCords[0].x,collectionCords[0].y);
     ctx.lineTo(lastCordX,lastCordY);
     ctx.stroke();
   }
    else if(collectionCords.length>points.value){
      ctx.fillStyle=colorBar.value;
      ctx.strokeStyle=colorBar.value;
      ctx.beginPath();
      let prevCords=2;
        for(var i=0; i<points.value; i++){
          ctx.moveTo(collectionCords[collectionCords.length-prevCords].x,collectionCords[collectionCords.length-prevCords].y);
          ctx.lineTo(lastCordX,lastCordY);
          prevCords++;
        }
      ctx.stroke(); }
    else if(collectionCords.length!=1){
      ctx.fillStyle=colorBar.value;
      ctx.strokeStyle=colorBar.value;
      ctx.beginPath();
      ctx.moveTo(collectionCords[collectionCords.length-2].x,collectionCords[collectionCords.length-2].y);
      ctx.lineTo(lastCordX,lastCordY);
      ctx.stroke();
    }
   }
canvas.addEventListener("click",paint);
reset.addEventListener("click",function(){
    collectionCords=[];
    ctx.clearRect(3,3,594,494);
})
