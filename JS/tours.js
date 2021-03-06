
/***********************************************
* Tower of Hanoi- by Glenn G. Vergara (glenngv@REMOVETHISyahoo.com)
* This notice must stay intact for use
* Visit Dynamic Drive (http://www.dynamicdrive.com/) for full source code
*
*Je me suis basé sur le code décrit ci dessus, mais je l'ai modifier pour créer un jeux compétitif
***********************************************/
    var delay = 200; //in milliseconds
    var nombreDisque=3;
    var drag=false;
    var objDisk=null;
    var x = 0;
    var y = 0;
    var disksOnTower1 = new Array(null,null,null,null,null,null,null,null);
    var disksOnTower2 = new Array(null,null,null,null,null,null,null,null);
    var disksOnTower3 = new Array(null,null,null,null,null,null,null,null);
    var disksOnTowers = new Array(disksOnTower1,disksOnTower2,disksOnTower3);
    var offsetleft = 30;
    var offsettop = 30;
    var offsettower = 20;
    var offsethoriz = 30;
    var basetop = 0;
    var diskheight = 0;
    var midhoriztower = 0;
    var indexTo=1;
    var indexFr=1;
    var movectr=0;
    var gameOver=false;
    var prevIndex=0;
    var zindex = 0;
    var currTower=1;
    var prevTower=1;
    var demo=false;
    var arrFr = new Array(255);
    var arrTo = new Array(255);
    var idx = 0;
    var pos = 0;
    var t=null;
    var stop=false;
    var nombreTotalMouvement=0;
    var time="0:0:0";
    var imageReward= new Array("css/img1.jpg","css/img2.jpg","css/img3.jpg","css/img4.jpg","css/img5.jpg","css/img6.jpg","css/img7.jpg","css/img8.jpg");
    var imageEnCour=0;
    var texteReward= new Array("La legende veut que lorsque les moines d'Hanoi auront fini de bouger la tour de 64 anneaux d'or, le monde disparaitra dans un coup de foudre.","Afin de bouger les 64 anneaux, ils faudrait un total de 18,446,744,073,709,551,615 déplacement.","Cela équivaux à peut pres à 584,5 milliards d'années, soit 43 fois le temps qui nous sépare du big bang.","Le probleme mathématique des tours a été inventé par le francais Édouard Lucas en 1892.","Le graphe des Tours de Hanoi à N disques est identique au Triangle de Pascal d'ordre 2N, dont l'on a relie une par une arête les coefficients binomiaux impairs","Bravo, vous avez réussi à résoudre ce probleme. Heureusement, il n'y avait pas 64 disques, et le monde n'a pas encore disparu.");
    
    function init()
        {
            if (document.getElementById)
                {
                    var diskno = document.hanoi.diskno;

                    diskno.options.selectedIndex = 0;
                    drawTowers();
                    drawDisks(parseInt(diskno.options[diskno.options.selectedIndex].text));     
                }
        }
    
    function initVars(){
        for (var i=0;i<disksOnTower1.length;i++)
            {
                disksOnTower1[i]=null;
                disksOnTower2[i]=null;
                disksOnTower3[i]=null;
            }
        drag = false;
        indexTo = 1;
        indexFr = 1;
        movectr = 0;
        zindex = 0;
        idx = 0;
        pos = 0;
        t = null;
        gameOver=false;
        stop=false;
        demo=false;
        document.hanoi.btnUndo.disabled=true;
    }
    
    function drawTowers()
        {
            var title=document.getElementById("title");
            var tower1=document.getElementById("tower1");
            var tower2=document.getElementById("tower2");
            var tower3=document.getElementById("tower3");
            var settings=document.getElementById("settings");
            var titlewidth = parseInt(title.style.width);
            var titleheight = parseInt(title.style.height);        
            var towerwidth = parseInt(tower1.style.width);
            var towerheight = parseInt(tower1.style.height);
            var settingswidth = parseInt(settings.style.width);
            midhoriztower = parseInt(document.getElementById("horiztower1").style.width)/2;
            diskheight = parseInt(document.getElementById("disk1").style.height);
                    
            title.style.left=offsetleft+(1.5*towerwidth)+offsettower-(titlewidth/2)+"px";
            title.style.top=offsettop+"px";
            tower1.style.left=offsetleft+"px";
            tower1.style.top=offsettop+titleheight+offsethoriz+"px";
            tower2.style.left=offsetleft+towerwidth+offsettower+"px";
            tower2.style.top=offsettop+titleheight+offsethoriz+"px";
            tower3.style.left=offsetleft+(towerwidth+offsettower)*2+"px";
            tower3.style.top=offsettop+titleheight+offsethoriz+"px";
            settings.style.left=offsetleft+(1.5*towerwidth)+offsettower-(settingswidth/2)+"px";
            settings.style.top=parseInt(tower1.style.top)+towerheight+offsethoriz+"px";
        }
    
    function drawDisks(disknum){
        var tower1=document.getElementById("tower1");
        var disktop = parseInt(tower1.style.top)+parseInt(document.getElementById("horiztower1").style.top);
        var lefttower1 = parseInt(tower1.style.left);
        var disk;
        var f=document.hanoi;
        basetop = disktop;
        for (var i=disksOnTower1.length;i>=1;i--){
            //alert(disksOnTower1.length);
            disk = document.getElementById("disk"+i);
            disk.style.zIndex=++zindex; 
            if (i<=disknum){
                disk.style.left=lefttower1+midhoriztower-parseInt(disk.style.width)/2+"px";
                disk.style.top=disktop-diskheight-1+"px";
                disktop = parseInt(disk.style.top);
                disksOnTowers[0][i-1]=disk;
            }            
            else {
                disk.style.left="-250px";
                disk.style.top="-250px";
                disksOnTowers[0][i-1]=null;
            }
        }       
        f.minmove.value=f.diskno.options[f.diskno.options.selectedIndex].value;
        f.yourmove.value=0;
    }
    
    function newGame(obj){
        if (movectr>0 && !gameOver && !stop){
            if (confirm("Current game will be aborted, would you like to continue?")){
                initVars();
                drawDisks(parseInt(obj.options[obj.options.selectedIndex].text));
            }
            else document.hanoi.diskno.options.selectedIndex=prevIndex;
        }
        else {
            initVars();
            drawDisks(parseInt(obj.options[obj.options.selectedIndex].text));
        }
    }

     function nextLevel()
         {
            var obj=document.hanoi.diskno;
            if (movectr>0 && !gameOver && !stop)
                {
                    if (nombreDisque<8)
                        {
                            if (confirm("Next level, do you want to continue?"))
                                {
                                    imageEnCour++;
                                    document.getElementById('texteReward').innerHTML=texteReward[imageEnCour];
                                    initVars();
                                    nombreDisque++;
                                    document.getElementById("nombreDisque").value=nombreDisque;
                                    drawDisks(nombreDisque);

                                }
                            else document.hanoi.diskno.options.selectedIndex=prevIndex;

                            
                        }
                    else
                        {
                            alert("Bravo, vous avez gagné le jeu!!! :)");
                            nombreDisque++;

                            
                        }
                    
                }
            else 
                {
                    initVars();
                    drawDisks(parseInt(obj.options[obj.options.selectedIndex].text));
                }
        }
    
    function initializeDrag(disk,e){
        if (!e) e=event;
        if (stop){
            alert("You cannot continue solving the puzzle after clicking the 'Stop' button.\nClick 'Restart' button or select no. of disks to continue playing.");
            return;
        }
        indexFr = indexTo;
        if (disk.id!=disksOnTowers[indexFr-1][0].id || gameOver || demo) return;
        objDisk=disk;
        x=e.clientX;
        y=e.clientY;
        tempx=parseInt(disk.style.left);
        tempy=parseInt(disk.style.top);
        document.onmousemove=dragDisk;
    }
    
    function dragDisk(e){
        if (!e) e=event;
        zindex++;
        drag=true;
        var posX = tempx+e.clientX-x;
        var posY = tempy+e.clientY-y;
        var objTower1 = document.getElementById("tower1");
        var objTower2 = document.getElementById("tower2");
        var objTower3 = document.getElementById("tower3");
        var tower1Left = parseInt(objTower1.style.left);
        var tower2Left = parseInt(objTower2.style.left);
        var tower3Left = parseInt(objTower3.style.left);
        var tower3Width = parseInt(objTower3.style.width);
        
        objDisk.style.zIndex=zindex;
        objDisk.style.left=posX+'px';
        objDisk.style.top=posY+'px';        
        
        if (e.clientX>=document.body.clientWidth-10 || e.clientY>=document.body.clientHeight-5 || e.clientX==5 || e.clientY==5){ //outside available window
            indexTo=indexFr;
            dropDisk(objDisk);
        }
        else if ( //in the vicinity of tower 3
            (tower3Left<=posX) && 
            (tower3Left+tower3Width>=posX) && 
            (parseInt(objTower3.style.top)+parseInt(objTower3.style.height)>posY)
            ){
            indexTo=3;
        }
        else if ((tower2Left<=posX) && (tower2Left+tower3Width>=posX)){ //in the vicinity of tower 2
            indexTo=2;
        }
        else if ((tower1Left<=posX) && (tower1Left+parseInt(objTower1.style.width)>=posX)){ //in the vicinity of tower 1
            indexTo=1;
        }
        else indexTo = indexFr;
        return false;
    }

    function dropDisk(disk){
        var f=document.hanoi;
        if (nombreTotalMouvement==0)
            {
                chrono();
                document.getElementById('texteReward').innerHTML=texteReward[imageEnCour];
                document.getElementById('texteRewardParchemin').style.visibility = 'visible';
                var instance = self.setInterval(chrono ,1000);
            }
        document.onmousemove=new Function("return false");
        if (!drag) return;
        var gameStatus=false;
        var topDisk = disksOnTowers[indexTo-1][0];
        if (indexFr==indexTo){
            getNewTop(indexFr,null);
            pushDisk(disk,indexFr); //put disk back to original tower
            getNewTop(indexFr,disk);
        }
        else if (topDisk==null) {
            pushDisk(disk,indexTo);
            getNewTop(indexFr,null);
            getNewTop(indexTo,disk);
            movectr++;
            nombreTotalMouvement++;
            currTower=indexTo;
            prevTower=indexFr;
            f.btnUndo.disabled=false;
        }
        else if (parseInt(disk.style.width)<parseInt(topDisk.style.width)){
            pushDisk(disk,indexTo);
            getNewTop(indexFr,null);
            getNewTop(indexTo,disk);
            movectr++;
            nombreTotalMouvement++;
            currTower=indexTo;
            prevTower=indexFr;
            if (indexTo==3) gameStatus=checkStatus();
            f.btnUndo.disabled=false;
        }
        else {
            getNewTop(indexFr,null);
            pushDisk(disk,indexFr); //put disk back to original tower
            getNewTop(indexFr,disk);
        }
      
        drag=false;
        f.yourmove.value=movectr;
        f.mouvementTotal.value=nombreTotalMouvement;
        if (gameStatus) {
            f.btnUndo.disabled=true;
            minmove = parseInt(f.minmove.value);
            if (movectr==minmove) msg="\nCongratulations! You got it in "+minmove+" moves."
            else if (movectr>minmove) msg="\nYou can do better than that."
            else msg="";
            //alert("Game Over !!!"+msg);
            //gameOver=true;
            nextLevel();

        }
        return;
    }      
    
    function checkStatus(){
        var gameStat = false;
        var disks=0;
        for (var i=0;i<disksOnTower3.length;i++){
            if (disksOnTowers[2][i]!=null) disks++;
        }
        if (disks==nombreDisque) gameStat=true;
        return gameStat;
    }

    function pushDisk(disk,index){
        var diskWidth = parseInt(disk.style.width);
        var towerLeft = parseInt(document.getElementById("tower"+index).style.left);
        var topDisk = disksOnTowers[index-1][0];
        if (topDisk!=null){
            topDiskWidth = parseInt(topDisk.style.width);
            topDiskTop = parseInt(topDisk.style.top);
            disk.style.left=towerLeft+midhoriztower-diskWidth/2+"px";
            disk.style.top=topDiskTop-diskheight-1+"px";
        }
        else {
            disk.style.left=towerLeft+midhoriztower-diskWidth/2+"px";
            disk.style.top=basetop-diskheight-1+"px";
        }   
    }
   
    function getNewTop(index,disk){
        if (disk==null){        //pop
            for (var i=0;i<disksOnTower1.length-1;i++){
                disksOnTowers[index-1][i]=disksOnTowers[index-1][i+1];
            }
            disksOnTowers[index-1][disksOnTower1.length-1]=null;
        }
        else {      //push
            for (var i=disksOnTower1.length-1;i>=1;i--){
                disksOnTowers[index-1][i]=disksOnTowers[index-1][i-1];
            }
            disksOnTowers[index-1][0]=disk;
        }
    }
    
    function solve(btn){
        if (btn.value=="Solve"){
            if (movectr>0 && !gameOver && !stop)
                if (!confirm("Current game will be aborted, would you like to continue?")) return;
            btn.value="Stop";
            initVars();
            stop=false;
            demo=true;
            var f=document.hanoi;
            f.btnIns.disabled=true;
            f.btnRes.disabled=true;
            f.btnUndo.disabled=true;
            disknum = parseInt(f.diskno.options[f.diskno.options.selectedIndex].text);
            drawDisks(disknum);
            getMoves(0, 2, 1, disknum); 
            t=window.setTimeout("moveDisk()",delay);
        }
        else {
            if (t) {
                window.clearTimeout(t);
                btn.value="Solve";
                frm.btnIns.disabled=false;
                frm.btnRes.disabled=false;
                t = null;
                stop=true;
                demo=false;
            }
            
        }
    }
    
    function moveDisk(){
        frm = document.hanoi;
        disk=disksOnTowers[arrFr[pos]][0];
        pushDisk(disk,arrTo[pos]+1);
        getNewTop(arrFr[pos]+1,null);
        getNewTop(arrTo[pos]+1,disk);
        movectr++;
        frm.yourmove.value=movectr;
        pos++;
        if (movectr<parseInt(frm.minmove.value)) t=window.setTimeout("moveDisk()",delay);
        else {
            alert("Can you do that in "+movectr+" moves?");
            gameOver=true;
            stop=false;
            frm.btnSolve.value="Solve";
            frm.btnIns.disabled=false;
            frm.btnRes.disabled=false;
        }
    }

    function getMoves(from,to,empty,numDisk){
        if (numDisk > 1) {
            getMoves(from, empty, to, numDisk - 1);
            arrFr[idx] = from;
            arrTo[idx++] = to;
            getMoves(empty, to, from, numDisk - 1);
        }
        else {
            arrFr[idx] = from;
            arrTo[idx++] = to;
        }
    }

    
    function unDo(btn){
        disk=disksOnTowers[currTower-1][0];
        pushDisk(disk,prevTower);
        getNewTop(currTower,null);
        getNewTop(prevTower,disk);
        movectr--;
        document.hanoi.yourmove.value=movectr;
        btn.disabled=true;
    }
    
    function displayIns(){
        var msg="Try to move all the disks from TOWER 1 to TOWER 3.\n";
        msg+="You may only move one disk at a time.\n";
        msg+="You must never allow a bigger disk to go on top of a smaller disk.";
        alert(msg);
    }

    function chrono()
        {

                var timeSplited = time.split(':');
                var hour = timeSplited[0];
                var minute = timeSplited[1];
                var second = timeSplited[2];
                second++;
                if(second==60) {
                    second = '0';
                    minute++;
                    if(minute == 60){
                        minute = '0';
                        hour++;
                    }
                }
                hour = '0'+hour;
                hour = hour.toString().substr(-2, 2);
                minute = '0'+minute;
                minute = minute.toString().substr(-2, 2);
                second = '0'+second;
                second = second.toString().substr(-2, 2);
                time = hour+':'+minute+':'+second;
                document.getElementById('time').innerHTML = time;
                if (nombreDisque>8)
                    {
                        var pseudo;
                        pseudo=prompt("Vous avez réolu le jeu en "+time+". Quel est votre nom?");
                        sauvgarderResultat(pseudo, time);

                    }
            
            
        }
    

function getXMLHttpRequest()
  {
      var xhr = null;

      if (window.XMLHttpRequest || window.ActiveXObject)
        {
         if (window.ActiveXObject)
         {
         try
                {
                 xhr = new ActiveXObject("Msxml2.XMLHTTP");
                }
         catch(e)
                {
                 xhr = new ActiveXObject("Microsoft.XMLHTTP");
                }
         }
         else
         {
         xhr = new XMLHttpRequest();
         }
        }
      else
        {
         alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
         return null;
        }

      return xhr;
  }
function sauvgarderResultat(pseudo, score)
  {
            var pseudo;
            //instanciation de l'objet de requete ajax
            var xhr = getXMLHttpRequest();
            


            
           

            //fonction de ce qui se passe lorsque le xhr recoit la réponse
            xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
                {
                //alert(xhr.responseText);

                }
              
             };

            xhr.open("POST", "sauvgarderResultats.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send("pseudo="+pseudo+"&score="+score);
  }