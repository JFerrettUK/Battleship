(()=>{"use strict";function t(){let t=[];for(let e=0;e<10;e++){let e=[];for(let t=0;t<10;t++)e.push(null);t.push(e)}let e={},r=[],n=function(e,i,r){t[e][i]=r},s=function(t){e[t].hit()},a=function(t,e){r.push([t,e])},o=function(){if(99==r.length)return["board full",[e,i]];let e=Math.floor(10*Math.random()),i=Math.floor(10*Math.random());if("missed"==t[e][i]||"hitShip"==t[e][i])return o();if(null==t[e][i])n(e,i,"missed"),a(e,i);else{let r=t[e][i].toString();s(r),n(e,i,"hitShip")}return["hitBefore",[e,i]]};return{board:t,ships:e,listMissed:r,isMissed:function(t,e){return!!r.some((function(i){return i[0]===t&&i[1]===e}))},placeShip:function(i,r,s,a){if(function(t){e[`ship${t}`]=function(t){return function(t){return{length:t,hits:0,hit:function(){this.hits+=1},isSunk:function(){return this.hits>=this.length}}}(t)}(t)}(i),r>9||s>9)return"offBoard";if("vertical"==a){for(let e=s;e<i+s;e++){if(e>9)return"offBoard";if(null!==t[r][e])return"occupiedSquare"}for(let t=s;t<i+s;t++)n(r,t,`ship${i}`)}else{for(let e=r;e<i+r;e++){if(e>9)return"offBoard";if(null!==t[e][s])return"occupiedSquare"}for(let t=r;t<i+r;t++)n(t,s,`ship${i}`)}},receiveAttack:function(e,i){if(null==t[e][i])n(e,i,"missed"),a(e,i);else{if("missed"==t[e][i])return"hitBefore";if("hitShip"==t[e][i])return"hitBefore";{let r=t[e][i].toString();s(r),n(e,i,"hitShip")}}},receiveAIAttack:o,allSunk:function(){for(let t in e)if(1!=e[t].isSunk())return!1;return!0},anyMissed:function(){for(let e=0;e<10;e++)for(let i=0;i<10;i++)if("missed"===t[e][i])return[!0,[e,i]];return[!1,[]]},missedInARow:function(e){for(let e=0;e<10;e++)for(let e=0;e<10;e++)if("missed"===t[i][e])return[!0,[i,e]];return!1}}}function e(t,e,i){let r;r="user"==i?document.getElementById(t+"-"+e+"-userBoard"):document.getElementById(t+"-"+e+"-aiBoard"),(r.classList.contains("blue")||r.classList.contains("cyan"))&&(r.classList.remove("blue"),r.classList.remove("cyan")),r.classList.contains("grey")&&r.classList.remove("grey"),"user"==i?r.classList.add("shipSquare"):r.classList.add("aiShipSquare")}function r(t,i,r,n){if(i>9||r>9)return"offBoard";if("vertical"==n){for(let e=r;e<t+r;e++){if(e>9)return"offBoard";if(document.getElementById(i+"-"+e+"-userBoard").classList.contains("shipSquare"))return"occupiedSquare"}for(let n=r;n<t+r;n++)e(i,n,"user")}else{for(let e=i;e<t+i;e++){if(e>9)return"offBoard";if(document.getElementById(e+"-"+r+"-userBoard").classList.contains("shipSquare"))return"occupiedSquare"}for(let n=i;n<t+i;n++)e(n,r,"user")}}function n(t,i,r,n){if(i>9||r>9)return"offBoard";if("vertical"==n){for(let e=r;e<t+r;e++){if(e>9)return"offBoard";if(document.getElementById(i+"-"+e+"-aiBoard").classList.contains("aiShipSquare"))return"occupiedSquare"}for(let n=r;n<t+r;n++)e(i,n,"ai")}else{for(let e=i;e<t+i;e++){if(e>9)return"offBoard";if(document.getElementById(e+"-"+r+"-aiBoard").classList.contains("aiShipSquare"))return"occupiedSquare"}for(let n=i;n<t+i;n++)e(n,r,"ai")}}!function(){let e=function(e){const i={name:"Hal",isTurn:!1,playerBoard:t()},r={name:e,isTurn:!0,playerBoard:t()},n=r.playerBoard.receiveAIAttack.bind(r.playerBoard),s=i.playerBoard.receiveAttack.bind(i.playerBoard),a=function(){let t=0;return{whoseTurn:function(t,e){return 0==e.isTurn&&1==t.isTurn?"playerTurn":0==t.isTurn&&1==e.isTurn?"aiTurn":void 0},switchTurns:function(e,i){e.isTurn=!e.isTurn,i.isTurn=!i.isTurn,t+=1},getNo:function(){return t}}}(),o=i.playerBoard.placeShip.bind(i.playerBoard),l=r.playerBoard.placeShip.bind(r.playerBoard);return{ai:i,user:r,turns:a,attackPlayer:function(t,e){let s=n()[1];return a.switchTurns(r,i),s},attackAI:function(t,e){return"hitBefore"==s(t,e)?[[t,e],"hitBefore"]:(a.switchTurns(r,i),[t,e])},placeAIShip:o,placeUserShip:l,placeTempShips:function(){o(2,2,1,"vertical"),o(3,4,4,"horizontal"),o(4,6,1,"horizontal"),o(5,4,5,"vertical"),l(2,2,1,"vertical"),l(3,4,4,"horizontal"),l(4,6,1,"horizontal"),l(5,4,5,"vertical")}}}("James");e.placeTempShips(),function(t){function e(e,i){for(let r=0;r<10;r++){const n=document.createElement("div");n.classList.add("battleSquare"),n.classList.add("userSquare"),n.dataset.row=e.toString(),n.dataset.column=r.toString(),"blue"==i?r%2==0?n.classList.add("blue"):n.classList.add("cyan"):r%2==0?n.classList.add("cyan"):n.classList.add("blue"),n.classList.contains("shipSquare")&&n.classList.remove("shipSquare"),n.id=`${e}-${r}-${t}`,document.getElementById(t).appendChild(n)}}document.getElementById(t).innerHTML="",function(){for(let t=0;t<10;t++)e(t,"blue"),t++,e(t,"cyan")}()}("userBoard"),function(t){function e(e,i){for(let i=0;i<10;i++){const r=document.createElement("div");r.classList.add("battleSquare"),r.classList.add("aiSquare"),r.classList.add("grey"),r.dataset.row=e.toString(),r.dataset.column=i.toString(),r.classList.contains("aiShipSquare")&&r.classList.remove("aiShipSquare"),r.id=`${e}-${i}-${t}`,document.getElementById(t).appendChild(r)}}document.getElementById(t).innerHTML="",function(){for(let t=0;t<10;t++)e(t)}()}("aiBoard"),n(2,2,1,"vertical"),n(3,4,4,"horizontal"),n(4,6,1,"horizontal"),n(5,4,5,"vertical"),r(2,2,1,"vertical"),r(3,4,3,"horizontal"),r(4,6,1,"horizontal"),r(5,4,5,"vertical"),document.querySelectorAll(".aiSquare").forEach((t=>{t.addEventListener("click",(()=>{const i=parseInt(t.dataset.row),r=parseInt(t.dataset.column);t.classList.contains("aiShipSquare")?t.classList.add("hitShip"):(t.classList.add("missed"),i%2==0&&r%2==0||i%2!=0&&r%2!=0?t.classList.add("blue"):t.classList.add("cyan")),t.classList.add("flash"),setTimeout((()=>{t.classList.remove("flash")}),500);const n=document.querySelectorAll(".userSquare"),s=n.length,a=Math.floor(Math.random()*s),o=n[a];let l,u;o.classList.contains("shipSquare")?o.classList.add("hitShip"):(o.classList.add("missed"),i%2==0&&r%2==0||i%2!=0&&r%2!=0?o.classList.add("blue"):o.classList.add("cyan")),o.classList.add("flash"),setTimeout((()=>{o.classList.remove("flash")}),500),a<10?(l=0,u=a):(l=parseInt(a.toString()[0]),u=parseInt(a.toString()[1])),((t,i,r,n)=>{e.attackAI(t,i)})(i,r)}))}))}()})();