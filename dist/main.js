(()=>{"use strict";function e(){let e=[];for(let t=0;t<10;t++){let t=[];for(let e=0;e<10;e++)t.push(null);e.push(t)}let t={},r=[],n=[],a=function(t,r,i){e[t][r]=i},s=function(e){t[e].hit()},o=function(e,t){r.push([e,t])},l=function(e,t){n.push([e,t])},u=function(){if(r.length>=99)return["board full",[t,i]];let t=Math.floor(10*Math.random()),i=Math.floor(10*Math.random());if("missed"==e[t][i]||"hitShip"==e[t][i])return u();if(null==e[t][i])a(t,i,"missed"),o(t,i),l(t,i);else{let r=e[t][i].toString();s(r),a(t,i,"hitShip"),l(t,i)}return["hitBefore",[t,i]]};return{board:e,ships:t,listMissed:r,isMissed:function(e,t){return!!r.some((function(r){return r[0]===e&&r[1]===t}))},placeShip:function(r,i,n,s){if(function(e){t[`ship${e}`]=function(e){return function(e){return{length:e,hits:0,hit:function(){this.hits+=1},isSunk:function(){return this.hits>=this.length}}}(e)}(e)}(r),i>9||n>9)return"offBoard";if("vertical"==s){for(let t=n;t<r+n;t++){if(t>9)return"offBoard";if(null!==e[i][t])return"occupiedSquare"}for(let e=n;e<r+n;e++)a(i,e,`ship${r}`)}else{for(let t=i;t<r+i;t++){if(t>9)return"offBoard";if(null!==e[t][n])return"occupiedSquare"}for(let e=i;e<r+i;e++)a(e,n,`ship${r}`)}},receiveAttack:function(t,r){if(null==e[t][r])a(t,r,"missed"),o(t,r),l(t,r);else{if("missed"==e[t][r])return"hitBefore";if("hitShip"==e[t][r])return"hitBefore";{let i=e[t][r].toString();s(i),a(t,r,"hitShip"),l(t,r)}}},receiveAIAttack:function(t,i){if(r.length>=99)return["board full",[t,i]];if(null==e[t][i])a(t,i,"missed"),o(t,i),l(t,i);else{if("missed"==e[t][i])return"missed";if("hitShip"==e[t][i])return"hitBefore";{let r=e[t][i].toString();s(r),a(t,i,"hitShip"),l(t,i)}}},receiveRandomAIAttack:u,allSunk:function(){for(let e in t)if(1!=t[e].isSunk())return!1;return!0},anyMissed:function(){for(let t=0;t<10;t++)for(let r=0;r<10;r++)if("missed"===e[t][r])return[!0,[t,r]];return[!1,[]]},anyAttacks:function(){for(let t=0;t<10;t++)for(let r=0;r<10;r++)if("missed"===e[t][r]||"hitShip"===e[t][r])return[!0,[t,r]];return[!1,[]]},missedInARow:function(t){for(let t=0;t<10;t++)for(let t=0;t<10;t++)if("missed"===e[i][t])return[!0,[i,t]];return!1},saveAttacked:l,isAttacked:function(e,t){return!!n.some((function(r){return r[0]===e&&r[1]===t}))},listAttacked:n}}function t(e,t,r){let i;i="user"==r?document.getElementById(e+"-"+t+"-userBoard"):document.getElementById(e+"-"+t+"-aiBoard"),(i.classList.contains("blue")||i.classList.contains("cyan"))&&(i.classList.remove("blue"),i.classList.remove("cyan")),i.classList.contains("grey")&&i.classList.remove("grey"),"user"==r?i.classList.add("shipSquare"):i.classList.add("aiShipSquare")}function r(e,r,i,n){if(r>9||i>9)return"offBoard";if("vertical"==n){for(let t=i;t<e+i;t++){if(t>9)return"offBoard";if(document.getElementById(r+"-"+t+"-userBoard").classList.contains("shipSquare"))return"occupiedSquare"}for(let n=i;n<e+i;n++)t(r,n,"user")}else{for(let t=r;t<e+r;t++){if(t>9)return"offBoard";if(document.getElementById(t+"-"+i+"-userBoard").classList.contains("shipSquare"))return"occupiedSquare"}for(let n=r;n<e+r;n++)t(n,i,"user")}}function n(e,r,i,n){if(r>9||i>9)return"offBoard";if("vertical"==n){for(let t=i;t<e+i;t++){if(t>9)return"offBoard";if(document.getElementById(r+"-"+t+"-aiBoard").classList.contains("aiShipSquare"))return"occupiedSquare"}for(let n=i;n<e+i;n++)t(r,n,"ai")}else{for(let t=r;t<e+r;t++){if(t>9)return"offBoard";if(document.getElementById(t+"-"+i+"-aiBoard").classList.contains("aiShipSquare"))return"occupiedSquare"}for(let n=r;n<e+r;n++)t(n,i,"ai")}}function a(e){const t=document.getElementsByClassName("announceCont")[0],r=t.querySelector("#announceText"),i=t.querySelector(".buttonContainer"),n=i.querySelector("button"),a=document.querySelector("#boardContainers");r.innerHTML="",a.innerHTML="","user"===e?(r.textContent="You win! Congratulations. Click below to play again.",a.innerHTML=""):"ai"===e&&(r.textContent="You lose! Better luck next time..."),t.style.display="grid",i.style.display="flex",n.style.display="inline-block",n.classList.add("playButton"),n.addEventListener("click",(()=>{location.reload()}))}!function(){let t=function(t){const r={name:"Hal",isTurn:!1,playerBoard:e()},i={name:t,isTurn:!0,playerBoard:e()},n=i.playerBoard.receiveRandomAIAttack.bind(i.playerBoard),a=i.playerBoard.receiveAIAttack.bind(i.playerBoard),s=r.playerBoard.receiveAttack.bind(r.playerBoard),o=function(){let e=0;return{whoseTurn:function(e,t){return 0==t.isTurn&&1==e.isTurn?"playerTurn":0==e.isTurn&&1==t.isTurn?"aiTurn":void 0},switchTurns:function(t,r){t.isTurn=!t.isTurn,r.isTurn=!r.isTurn,e+=1},getNo:function(){return e}}}(),l=r.playerBoard.placeShip.bind(r.playerBoard),u=i.playerBoard.placeShip.bind(i.playerBoard);return{ai:r,user:i,turns:o,attackPlayer:function(e,t){return"hitBefore"==a(e,t)?[[e,t],"hitBefore"]:(o.switchTurns(i,r),[e,t])},attackPlayerRandom:function(){let e=n()[1];return o.switchTurns(i,r),e},attackAI:function(e,t){return"hitBefore"==s(e,t)?[[e,t],"hitBefore"]:(o.switchTurns(i,r),[e,t])},placeAIShip:l,placeUserShip:u,placeTempShips:function(){l(2,2,1,"vertical"),l(3,4,4,"horizontal"),l(4,6,1,"horizontal"),l(5,4,5,"vertical"),u(2,2,1,"vertical"),u(3,4,4,"horizontal"),u(4,6,1,"horizontal"),u(5,4,5,"vertical")}}}("James");t.placeTempShips(),function(e){function t(t,r){for(let i=0;i<10;i++){const n=document.createElement("div");n.classList.add("battleSquare"),n.classList.add("userSquare"),n.dataset.row=t.toString(),n.dataset.column=i.toString(),"blue"==r?i%2==0?n.classList.add("blue"):n.classList.add("cyan"):i%2==0?n.classList.add("cyan"):n.classList.add("blue"),n.classList.contains("shipSquare")&&n.classList.remove("shipSquare"),n.id=`${t}-${i}-${e}`,document.getElementById(e).appendChild(n)}}document.getElementById(e).innerHTML="",function(){for(let e=0;e<10;e++)t(e,"blue"),e++,t(e,"cyan")}()}("userBoard"),function(e){function t(t,r){for(let r=0;r<10;r++){const i=document.createElement("div");i.classList.add("battleSquare"),i.classList.add("aiSquare"),i.classList.add("grey"),i.dataset.row=t.toString(),i.dataset.column=r.toString(),i.classList.contains("aiShipSquare")&&i.classList.remove("aiShipSquare"),i.id=`${t}-${r}-${e}`,document.getElementById(e).appendChild(i)}}document.getElementById(e).innerHTML="",function(){for(let e=0;e<10;e++)t(e)}()}("aiBoard"),n(2,2,1,"vertical"),n(3,4,4,"horizontal"),n(4,6,1,"horizontal"),n(5,4,5,"vertical"),r(2,2,1,"vertical"),r(3,4,3,"horizontal"),r(4,6,1,"horizontal"),r(5,4,5,"vertical"),function(e,t){document.querySelectorAll(".aiSquare").forEach((r=>{r.addEventListener("click",(()=>{const i=parseInt(r.dataset.row),n=parseInt(r.dataset.column);r.classList.contains("aiShipSquare")?r.classList.add("hitShip"):(r.classList.add("missed"),i%2==0&&n%2==0||i%2!=0&&n%2!=0?r.classList.add("blue"):r.classList.add("cyan")),r.classList.add("flash"),setTimeout((()=>{r.classList.remove("flash")}),500);const a=document.querySelectorAll(".userSquare"),s=a.length,o=a[Math.floor(Math.random()*s)];let l,u;o.classList.contains("shipSquare")?o.classList.add("hitShip"):(o.classList.add("missed"),i%2==0&&n%2==0||i%2!=0&&n%2!=0?o.classList.add("blue"):o.classList.add("cyan")),o.classList.add("flash"),setTimeout((()=>{o.classList.remove("flash")}),500),console.log(t.user.playerBoard.listAttacked);const c=[];for(let e=0;e<10;e++)for(let r=0;r<10;r++)t.user.playerBoard.listAttacked.some((([t,i])=>t===e&&i===r))||c.push([e,r]);console.log(c);let d=!1;c.forEach((e=>{const t=e[0],r=e[1];l===t&&u===r&&(d=!0)})),d||setValidTargets(),e(i,n,l,u)}))}))}(((e,r,i,n)=>{t.attackAI(e,r),t.attackPlayer(i,n),t.user.playerBoard.allSunk()?a("ai"):t.ai.playerBoard.allSunk()&&a("user")}),t)}()})();