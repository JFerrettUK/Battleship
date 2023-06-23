(()=>{"use strict";function t(){let t=[];for(let e=0;e<10;e++){let e=[];for(let t=0;t<10;t++)e.push(null);t.push(e)}let e={},r=[],n=function(e,r,i){t[e][r]=i},a=function(t){e[t].hit()},s=function(t,e){r.push([t,e])},o=function(){if(r.length>=99)return["board full",[e,i]];let e=Math.floor(10*Math.random()),i=Math.floor(10*Math.random());if("missed"==t[e][i]||"hitShip"==t[e][i])return o();if(null==t[e][i])n(e,i,"missed"),s(e,i);else{let r=t[e][i].toString();a(r),n(e,i,"hitShip")}return["hitBefore",[e,i]]};return{board:t,ships:e,listMissed:r,isMissed:function(t,e){return!!r.some((function(r){return r[0]===t&&r[1]===e}))},placeShip:function(r,i,a,s){if(function(t){e[`ship${t}`]=function(t){return function(t){return{length:t,hits:0,hit:function(){this.hits+=1},isSunk:function(){return this.hits>=this.length}}}(t)}(t)}(r),i>9||a>9)return"offBoard";if("vertical"==s){for(let e=a;e<r+a;e++){if(e>9)return"offBoard";if(null!==t[i][e])return"occupiedSquare"}for(let t=a;t<r+a;t++)n(i,t,`ship${r}`)}else{for(let e=i;e<r+i;e++){if(e>9)return"offBoard";if(null!==t[e][a])return"occupiedSquare"}for(let t=i;t<r+i;t++)n(t,a,`ship${r}`)}},receiveAttack:function(e,r){if(null==t[e][r])n(e,r,"missed"),s(e,r);else{if("missed"==t[e][r])return"hitBefore";if("hitShip"==t[e][r])return"hitBefore";{let i=t[e][r].toString();a(i),n(e,r,"hitShip")}}},receiveAIAttack:function(e,i){if(r.length>=99)return["board full",[e,i]];if(null==t[e][i])n(e,i,"missed"),s(e,i);else{if("missed"==t[e][i])return"missed";if("hitShip"==t[e][i])return"hitBefore";{let r=t[e][i].toString();a(r),n(e,i,"hitShip")}}},receiveRandomAIAttack:o,allSunk:function(){for(let t in e)if(1!=e[t].isSunk())return!1;return!0},anyMissed:function(){for(let e=0;e<10;e++)for(let r=0;r<10;r++)if("missed"===t[e][r])return[!0,[e,r]];return[!1,[]]},anyAttacks:function(){for(let e=0;e<10;e++)for(let r=0;r<10;r++)if("missed"===t[e][r]||"hitShip"===t[e][r])return[!0,[e,r]];return[!1,[]]},missedInARow:function(e){for(let e=0;e<10;e++)for(let e=0;e<10;e++)if("missed"===t[i][e])return[!0,[i,e]];return!1}}}function e(t,e,r){let i;i="user"==r?document.getElementById(t+"-"+e+"-userBoard"):document.getElementById(t+"-"+e+"-aiBoard"),(i.classList.contains("blue")||i.classList.contains("cyan"))&&(i.classList.remove("blue"),i.classList.remove("cyan")),i.classList.contains("grey")&&i.classList.remove("grey"),"user"==r?i.classList.add("shipSquare"):i.classList.add("aiShipSquare")}function r(t,r,i,n){if(r>9||i>9)return"offBoard";if("vertical"==n){for(let e=i;e<t+i;e++){if(e>9)return"offBoard";if(document.getElementById(r+"-"+e+"-userBoard").classList.contains("shipSquare"))return"occupiedSquare"}for(let n=i;n<t+i;n++)e(r,n,"user")}else{for(let e=r;e<t+r;e++){if(e>9)return"offBoard";if(document.getElementById(e+"-"+i+"-userBoard").classList.contains("shipSquare"))return"occupiedSquare"}for(let n=r;n<t+r;n++)e(n,i,"user")}}function n(t,r,i,n){if(r>9||i>9)return"offBoard";if("vertical"==n){for(let e=i;e<t+i;e++){if(e>9)return"offBoard";if(document.getElementById(r+"-"+e+"-aiBoard").classList.contains("aiShipSquare"))return"occupiedSquare"}for(let n=i;n<t+i;n++)e(r,n,"ai")}else{for(let e=r;e<t+r;e++){if(e>9)return"offBoard";if(document.getElementById(e+"-"+i+"-aiBoard").classList.contains("aiShipSquare"))return"occupiedSquare"}for(let n=r;n<t+r;n++)e(n,i,"ai")}}function a(t){document.querySelectorAll(".aiSquare").forEach((e=>{e.addEventListener("click",(()=>{const r=parseInt(e.dataset.row),i=parseInt(e.dataset.column);e.classList.contains("aiShipSquare")?e.classList.add("hitShip"):(e.classList.add("missed"),r%2==0&&i%2==0||r%2!=0&&i%2!=0?e.classList.add("blue"):e.classList.add("cyan")),e.classList.add("flash"),setTimeout((()=>{e.classList.remove("flash")}),500);const n=document.querySelectorAll(".userSquare"),a=n.length,s=Math.floor(Math.random()*a),o=n[s];let l,u;o.classList.contains("shipSquare")?o.classList.add("hitShip"):(o.classList.add("missed"),r%2==0&&i%2==0||r%2!=0&&i%2!=0?o.classList.add("blue"):o.classList.add("cyan")),o.classList.add("flash"),setTimeout((()=>{o.classList.remove("flash")}),500),s<10?(l=0,u=s):(l=parseInt(s.toString()[0]),u=parseInt(s.toString()[1])),t(r,i,l,u)}))})),1==function(t){const e=t.user.playerBoard,r=t.ai.playerBoard;return e.allSunk()&&r.allSunk()?1==e.allSunk()?[!0,"aiWins"]:1==r.allSunk()?[!0,"userWins"]:void 0:[!1,[]]}(thisGame)[0]&&console.log("gameOver")}!function(){let e=function(e){const r={name:"Hal",isTurn:!1,playerBoard:t()},i={name:e,isTurn:!0,playerBoard:t()},n=i.playerBoard.receiveRandomAIAttack.bind(i.playerBoard),a=i.playerBoard.receiveAIAttack.bind(i.playerBoard),s=r.playerBoard.receiveAttack.bind(r.playerBoard),o=function(){let t=0;return{whoseTurn:function(t,e){return 0==e.isTurn&&1==t.isTurn?"playerTurn":0==t.isTurn&&1==e.isTurn?"aiTurn":void 0},switchTurns:function(e,r){e.isTurn=!e.isTurn,r.isTurn=!r.isTurn,t+=1},getNo:function(){return t}}}(),l=r.playerBoard.placeShip.bind(r.playerBoard),u=i.playerBoard.placeShip.bind(i.playerBoard);return{ai:r,user:i,turns:o,attackPlayer:function(t,e){return"hitBefore"==a(t,e)?[[t,e],"hitBefore"]:(o.switchTurns(i,r),[t,e])},attackPlayerRandom:function(){let t=n()[1];return o.switchTurns(i,r),t},attackAI:function(t,e){return"hitBefore"==s(t,e)?[[t,e],"hitBefore"]:(o.switchTurns(i,r),[t,e])},placeAIShip:l,placeUserShip:u,placeTempShips:function(){l(2,2,1,"vertical"),l(3,4,4,"horizontal"),l(4,6,1,"horizontal"),l(5,4,5,"vertical"),u(2,2,1,"vertical"),u(3,4,4,"horizontal"),u(4,6,1,"horizontal"),u(5,4,5,"vertical")}}}("James");e.placeTempShips(),function(t){function e(e,r){for(let i=0;i<10;i++){const n=document.createElement("div");n.classList.add("battleSquare"),n.classList.add("userSquare"),n.dataset.row=e.toString(),n.dataset.column=i.toString(),"blue"==r?i%2==0?n.classList.add("blue"):n.classList.add("cyan"):i%2==0?n.classList.add("cyan"):n.classList.add("blue"),n.classList.contains("shipSquare")&&n.classList.remove("shipSquare"),n.id=`${e}-${i}-${t}`,document.getElementById(t).appendChild(n)}}document.getElementById(t).innerHTML="",function(){for(let t=0;t<10;t++)e(t,"blue"),t++,e(t,"cyan")}()}("userBoard"),function(t){function e(e,r){for(let r=0;r<10;r++){const i=document.createElement("div");i.classList.add("battleSquare"),i.classList.add("aiSquare"),i.classList.add("grey"),i.dataset.row=e.toString(),i.dataset.column=r.toString(),i.classList.contains("aiShipSquare")&&i.classList.remove("aiShipSquare"),i.id=`${e}-${r}-${t}`,document.getElementById(t).appendChild(i)}}document.getElementById(t).innerHTML="",function(){for(let t=0;t<10;t++)e(t)}()}("aiBoard"),n(2,2,1,"vertical"),n(3,4,4,"horizontal"),n(4,6,1,"horizontal"),n(5,4,5,"vertical"),r(2,2,1,"vertical"),r(3,4,3,"horizontal"),r(4,6,1,"horizontal"),r(5,4,5,"vertical"),a(((t,r,i,n)=>{e.attackAI(t,r),e.attackPlayer(i,n)}))}()})();