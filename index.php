
<html>

  <head>
    
    <title>Les tours de Hanoi</title>
    <link href="css/tours.css" rel="stylesheet">

   
  </head>
  <body onload="init();" onselectstart="return false" oncontextmenu="return false">
    <div class="container">
    <form name="hanoi" >

      <div id="title" style="position:absolute;visibility:visible;left:-250px;top:-250px;width:160px;height:20px;font:bold 20px Tahoma;text-align:center;">Les tours de Hanoi</div>
        <!--les 3 tours-->
        <div id="tower1" class="container" style="left:-250px;top:-250px;width:200px;height:200px" onmousemove="indexTo=1">
          <div id="verttower1" class="towervert" style="left:99px;top:10px;width:3px;height:170px"></div>
          <div id="horiztower1" class="towerhoriz" style="left:0px;top:180px;width:200px;height:2px"></div><br/>
          <div class="tower"></div>
        </div>

        <div id="tower2" class="container" style="left:-250px;top:-250px;width:200px;height:200px" onmousemove="indexTo=2">
          <div id="verttower2" class="towervert" style="left:99px;top:10px;width:3px;height:170px"></div>
          <div id="horiztower2" class="towerhoriz" style="left:0px;top:180px;width:200px;height:2px"></div><br/>
          <div class="tower"></div>
        </div>

        <div id="tower3" class="container" style="left:-250px;top:-250px;width:200px;height:200px" onmousemove="indexTo=3">
          <div id="verttower3" class="towervert" style="left:99px;top:10px;width:3px;height:170px"></div>
          <div id="horiztower3" class="towerhoriz" style="left:0px;top:180px;width:200px;height:2px"></div><br/>
          <div class="tower"></div>
        </div>

      <div id="disk1" class="disk" style="left:-250px;top:-250px;width:50px;height:19px;" onmousedown="initializeDrag(this,event)" onmouseup="dropDisk(this)" title="Disk 1"></div>
      <div id="disk2" class="disk" style="left:-250px;top:-250px;width:70px;height:19px;" onmousedown="initializeDrag(this,event)" onmouseup="dropDisk(this)" title="Disk 2"></div>
      <div id="disk3" class="disk" style="left:-250px;top:-250px;width:90px;height:19px;" onmousedown="initializeDrag(this,event)" onmouseup="dropDisk(this)" title="Disk 3"></div>
      <div id="disk4" class="disk" style="left:-250px;top:-250px;width:110px;height:19px;" onmousedown="initializeDrag(this,event)" onmouseup="dropDisk(this)" title="Disk 4"></div>
      <div id="disk5" class="disk" style="left:-250px;top:-250px;width:130px;height:19px;" onmousedown="initializeDrag(this,event)" onmouseup="dropDisk(this)" title="Disk 5"></div>
      <div id="disk6" class="disk" style="left:-250px;top:-250px;width:150px;height:19px;" onmousedown="initializeDrag(this,event)" onmouseup="dropDisk(this)" title="Disk 6"></div>
      <div id="disk7" class="disk" style="left:-250px;top:-250px;width:170px;height:19px;" onmousedown="initializeDrag(this,event)" onmouseup="dropDisk(this)" title="Disk 7"></div>
      <div id="disk8" class="disk" style="left:-250px;top:-250px;width:190px;height:19px;" onmousedown="initializeDrag(this,event)" onmouseup="dropDisk(this)" title="Disk 8"></div>

      
      

      <div id="settings" class="container" style="left:-250px;top:-250px;width:260px;">
        <table>
          <tr>
            
              
              <td>
                <div style="visibility:hidden">
                <select name="diskno" id="nombreDisque" onchange="newGame(this)" onclick="prevIndex=this.options.selectedIndex">
                  <option value="7" selected>3</option>
                   <option value="15">4</option>
                  <option value="31">5</option>
                   <option value="63">6</option>
                 <option value="127">7</option>
                  <option value="255">8</option>
                 </select>
                 </div>
              </td>
            
          </tr>
          <tr>
            <td>
               <div style="visibility:hidden">
                  Minimum no. of moves&nbsp;&nbsp;
                </div>
            </td>
            <td>
               <div style="visibility:hidden">
                  <input name="minmove" style="border:none" size="3" value="255" readonly="readonly" />
                </div>
            </td>
          </tr>
          <tr>
            <td>
              Your no. of moves for this level
            </td>
            <td>
              <input name="yourmove" style="border:none" size="3" value="0" readonly="readonly" />
            </td>
          </tr>
          <tr>
            <td>
              All your moves
            </td>
            <td>
              <input name="mouvementTotal" style="border:none" size="3" value="0" readonly="readonly" />
            </td>
          </tr>
         
          <tr>
            <td colspan="2" align="center">
              <div style="visibility:hidden">
                <input type="button" name="btnIns" value="Instructions" onclick="displayIns()" />
                <input type="button" name="btnRes" value="Restart" onclick="newGame(document.hanoi.diskno)" />
                <input type="button" name="btnUndo" value="Undo" onclick="unDo(this)" disabled="disabled" />
                <input type="button" name="btnSolve" value="Solve" onclick="solve(this)" />
              </div>
              <span id="time">00:00:00</span>
              <input type="button" name="btnIns" value="Instructions" onclick="displayIns()" style="width:200px"/>
              <!--<p>
                <H3>Instructions</H3>
                1) Try to move all the disks from TOWER 1 to TOWER 3.<br/><br/>
                2) You may only move one disk at a time.<br/><br/>
                3) You must never allow a bigger disk to go on top of a smaller disk.<br/><br/>
              </p>-->
              
            </td>
          </tr>
        </table>
        <p>&nbsp;</p>
        <p>
        Le code source sur le quel je me suis base est disponible sur <a href="http://www.dynamicdrive.com/dynamicindex12/hanoi.htm" target="_blank">Dynamic Drive</a>.
        </p>
      </div>
    </form>
    <div class="imgReward" id="imgReward">
    </div>
    <div class="texteRewardParchemin" id="texteRewardParchemin" style="width: 580px; height: 200px; background-image: url(http://img515.imageshack.us/img515/426/parcheminforumgw2rp.gif);overflow:auto; visibility:hidden;">
      <p class="texteReward" id="texteReward" style="width: 480px; height: 200px; ">

      </p>
    </div>
   </div>
    <script src="JS/tours.js"></script>
  </body>
</html>
