(()=>{"use strict";function e(){let e=[];for(let t=0;t<10;t++){let t=[];for(let e=0;e<10;e++)t.push(null);e.push(t)}let t={},r=[],n=function(t,i,r){e[t][i]=r},s=function(e){t[e].hit()},a=function(e,t){r.push([e,t])},o=function(){if(99==r.length)return"board full";let t=Math.floor(10*Math.random()),i=Math.floor(10*Math.random());if("missed"==e[t][i]||"hitShip"==e[t][i])return o();if(null==e[t][i])n(t,i,"missed"),a(t,i);else{let r=e[t][i].toString();s(r),n(t,i,"hitShip")}return"hitBefore"};return{board:e,ships:t,listMissed:r,isMissed:function(e,t){return!!r.some((function(i){return i[0]===e&&i[1]===t}))},placeShip:function(i,r,s,a){if(function(e){t[`ship${e}`]=function(e){return function(e){return{length:e,hits:0,hit:function(){this.hits+=1},isSunk:function(){return this.hits>=this.length}}}(e)}(e)}(i),r>9||s>9)return"offBoard";if("vertical"==a){for(let t=s;t<i+s;t++){if(t>9)return"offBoard";if(null!==e[r][t])return"occupiedSquare"}for(let e=s;e<i+s;e++)n(r,e,`ship${i}`)}else{for(let t=r;t<i+r;t++){if(t>9)return"offBoard";if(null!==e[t][s])return"occupiedSquare"}for(let e=r;e<i+r;e++)n(e,s,`ship${i}`)}},receiveAttack:function(t,i){if(null==e[t][i])n(t,i,"missed"),a(t,i);else{if("missed"==e[t][i])return"hitBefore";if("hitShip"==e[t][i])return"hitBefore";{let r=e[t][i].toString();s(r),n(t,i,"hitShip")}}},receiveAIAttack:o,allSunk:function(){for(let e in t)if(1!=t[e].isSunk())return!1;return!0},anyMissed:function(){for(let t=0;t<10;t++)for(let i=0;i<10;i++)if("missed"===e[t][i])return[!0,[t,i]];return[!1,[]]},missedInARow:function(t){for(let t=0;t<10;t++)for(let t=0;t<10;t++)if("missed"===e[i][t])return[!0,[i,t]];return!1}}}function t(e,t,i){let r;r="user"==i?document.getElementById(e+"-"+t+"-userBoard"):document.getElementById(e+"-"+t+"-aiBoard"),(r.classList.contains("blue")||r.classList.contains("cyan"))&&(r.classList.remove("blue"),r.classList.remove("cyan")),r.classList.contains("grey")&&r.classList.remove("grey"),"user"==i?r.classList.add("shipSquare"):r.classList.add("aiShipSquare")}!async function(){(function(t){const i={name:"Hal",isTurn:!1,playerBoard:e()},r={name:t,isTurn:!0,playerBoard:e()},n=r.playerBoard.receiveAIAttack.bind(r.playerBoard),s=i.playerBoard.receiveAttack.bind(i.playerBoard),a=function(){let e=0;return{whoseTurn:function(e,t){return 0==t.isTurn&&1==e.isTurn?"playerTurn":0==e.isTurn&&1==t.isTurn?"aiTurn":void 0},switchTurns:function(t,i){t.isTurn=!t.isTurn,i.isTurn=!i.isTurn,e+=1},getNo:function(){return e}}}(),o=i.playerBoard.placeShip.bind(i.playerBoard),u=r.playerBoard.placeShip.bind(r.playerBoard);return{ai:i,user:r,turns:a,attackPlayer:function(){n(),a.switchTurns(r,i)},attackAI:function(e,t){if("hitBefore"==s(e,t))return"hitBefore";a.switchTurns(r,i)},placeAIShip:o,placeUserShip:u,placeTempShips:function(){o(2,2,1,"vertical"),o(3,4,4,"horizontal"),o(4,6,1,"horizontal"),o(5,4,5,"vertical"),u(2,2,1,"vertical"),u(3,4,4,"horizontal"),u(4,6,1,"horizontal"),u(5,4,5,"vertical")}}})("James").placeTempShips();const i=function(){let e=function(e,i,r,n){!function(e,i,r,n){if(i>9||r>9)return"offBoard";if("vertical"==n){for(let t=r;t<e+r;t++){if(t>9)return"offBoard";if(document.getElementById(i+"-"+t+"-userBoard").classList.contains("shipSquare"))return"occupiedSquare"}for(let n=r;n<e+r;n++)t(i,n,"user")}else{for(let t=i;t<e+i;t++){if(t>9)return"offBoard";if(document.getElementById(t+"-"+r+"-userBoard").classList.contains("shipSquare"))return"occupiedSquare"}for(let n=i;n<e+i;n++)t(n,r,"user")}}(e,i,r,n)},i=function(e,i,r,n){!function(e,i,r,n){if(i>9||r>9)return"offBoard";if("vertical"==n){for(let t=r;t<e+r;t++){if(t>9)return"offBoard";if(document.getElementById(i+"-"+t+"-aiBoard").classList.contains("aiShipSquare"))return"occupiedSquare"}for(let n=r;n<e+r;n++)t(i,n,"ai")}else{for(let t=i;t<e+i;t++){if(t>9)return"offBoard";if(document.getElementById(t+"-"+r+"-aiBoard").classList.contains("aiShipSquare"))return"occupiedSquare"}for(let n=i;n<e+i;n++)t(n,r,"ai")}}(e,i,r,n)};return{aiAttackDOM:function(e,t){!function(e,t){let i=document.getElementById(`${e}-${t}-userBoard`);i&&(i.classList.contains("shipSquare")?i.classList.add("hitShip"):i.classList.add("missed"),i.classList.add("flash"),setTimeout((()=>{i.classList.remove("flash")}),500))}(e,t)},changeNameDOM:function(e,t){return function(e,t){return t.innerText=e,t}(e,t)},aiBoardDOM:function(e){!function(e){function t(t,i){for(let i=0;i<10;i++){const r=document.createElement("div");r.classList.add("battleSquare"),r.classList.add("aiSquare"),r.classList.add("grey"),r.classList.contains("aiShipSquare")&&r.classList.remove("aiShipSquare"),r.id=`${t}-${i}-${e}`,document.getElementById(e).appendChild(r)}}!function(){for(let e=0;e<10;e++)t(e)}()}(e)},playerBoardDOM:function(e){!function(e){function t(t,i){for(let r=0;r<10;r++){const n=document.createElement("div");n.classList.add("battleSquare"),n.classList.add("userSquare"),"blue"==i?r%2==0?n.classList.add("blue"):n.classList.add("cyan"):r%2==0?n.classList.add("cyan"):n.classList.add("blue"),n.classList.contains("shipSquare")&&n.classList.remove("shipSquare"),n.id=`${t}-${r}-${e}`,document.getElementById(e).appendChild(n)}}!function(){for(let e=0;e<10;e++)t(e,"blue"),e++,t(e,"cyan")}()}(e)},explosionClickDOM:function(){document.querySelectorAll(".battleSquare").forEach((e=>{e.addEventListener("click",(()=>{e.classList.add("boom"),setTimeout((()=>{e.classList.remove("boom")}),500)}))}))},placeTempDOMShips:function(){i(2,2,1,"vertical"),i(3,4,4,"horizontal"),i(4,6,1,"horizontal"),i(5,4,5,"vertical"),e(2,2,1,"vertical"),e(3,4,3,"horizontal"),e(4,6,1,"horizontal"),e(5,4,5,"vertical")},placeAIShipDOM:i,placePlayerShipDOM:e,squareHMDOM:function(e,t){!function(e,t){"missed"==t?e.classList.add("missed"):"hitShip"==t&&e.classList.add("hitShip")}(e,t)},userClickDOM:function(){document.querySelectorAll(".aiSquare").forEach((e=>{e.addEventListener("click",(()=>{e.classList.contains("aiShipSquare")?e.classList.add("hitShip"):(e.classList.add("missed"),parseInt(e.dataset.row)%2==0&&parseInt(e.dataset.column)%2==0||parseInt(e.dataset.row)%2!=0&&parseInt(e.dataset.column)%2!=0?e.classList.add("blue"):e.classList.add("cyan")),e.classList.add("flash"),setTimeout((()=>{e.classList.remove("flash")}),500)}))}))}}}();i.playerBoardDOM("userBoard"),i.aiBoardDOM("aiBoard"),i.userClickDOM(),i.placeTempDOMShips(),await new Promise((e=>setTimeout(e,1e3)))}()})();