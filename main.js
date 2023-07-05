(()=>{"use strict";function t(){let t=[];for(let e=0;e<10;e++){let e=[];for(let t=0;t<10;t++)e.push(null);t.push(e)}let e={},n=[],r=[],a=[],s=function(e,n,r){t[e][n]=r},o=function(t){e[t].hit()},l=function(t,e){n.push([t,e])},u=function(t,e){r.push([t,e])},c=function(t,e){a.push([t,e])},d=function(){if(n.length>=99)return["board full",[e,r]];let e=Math.floor(10*Math.random()),r=Math.floor(10*Math.random());if("missed"==t[e][r]||"hitShip"==t[e][r])return d();if(null==t[e][r])s(e,r,"missed"),l(e,r),u(e,r);else{let n=t[e][r].toString();o(n),s(e,r,"hitShip"),u(e,r)}return["hitBefore",[e,r]]};return{board:t,ships:e,listMissed:n,isMissed:function(t,e){return!!n.some((function(n){return n[0]===t&&n[1]===e}))},placeShip:function(n,r,i,a){if(function(t){e[`ship${t}`]=function(t){return function(t){return{length:t,hits:0,hit:function(){this.hits+=1},isSunk:function(){return this.hits>=this.length}}}(t)}(t)}(n),r>9||i>9)return"offBoard";if("vertical"==a){for(let e=i;e<n+i;e++){if(e>9)return"offBoard";if(null!==t[r][e])return"occupiedSquare"}for(let t=i;t<n+i;t++)s(r,t,`ship${n}`)}else{for(let e=r;e<n+r;e++){if(e>9)return"offBoard";if(null!==t[e][i])return"occupiedSquare"}for(let t=r;t<n+r;t++)s(t,i,`ship${n}`)}},receiveAttack:function(e,n){if(null==t[e][n])s(e,n,"missed"),l(e,n),u(e,n);else{if("missed"==t[e][n])return"hitBefore";if("hitShip"==t[e][n])return"hitBefore";{let r=t[e][n].toString();o(r),s(e,n,"hitShip"),c(e,n),u(e,n)}}},receiveAIAttack:function(e,r){if(n.length>=99)return["board full",[e,r]];if(null==t[e][r])s(e,r,"missed"),l(e,r),u(e,r);else{if("missed"==t[e][r])return"missed";if("hitShip"==t[e][r])return"hitBefore";{let n=t[e][r].toString();o(n),s(e,r,"hitShip"),u(e,r),c(e,r)}}},receiveRandomAIAttack:d,allSunk:function(){for(let t in e)if(1!=e[t].isSunk())return!1;return!0},anyMissed:function(){for(let e=0;e<10;e++)for(let n=0;n<10;n++)if("missed"===t[e][n])return[!0,[e,n]];return[!1,[]]},anyAttacks:function(){for(let e=0;e<10;e++)for(let n=0;n<10;n++)if("missed"===t[e][n]||"hitShip"===t[e][n])return[!0,[e,n]];return[!1,[]]},missedInARow:function(e){for(let e=0;e<10;e++)for(let e=0;e<10;e++)if("missed"===t[i][e])return[!0,[i,e]];return!1},saveAttacked:u,isHit:function(t,e){return!!a.some((function(n){return n[0]===t&&n[1]===e}))},isAttacked:function(t,e){return!!r.some((function(n){return n[0]===t&&n[1]===e}))},listAttacked:r,generatePotentialTargets:function(){const t=[];for(let e=0;e<10;e++)for(let n=0;n<10;n++)this.isAttacked(e,n)||t.push([e,n]);return t},listHit:a}}function e(t,e){const n=[];return e>0&&n.push([t,e-1]),e<9&&n.push([t,e+1]),t>0&&n.push([t-1,e]),t<9&&n.push([t+1,e]),n}function n(t){const e=document.getElementsByClassName("announceCont")[0],n=e.querySelector("#announceText"),r=e.querySelector(".buttonContainer"),i=r.querySelector("button"),a=document.querySelector("#boardContainers");n.innerHTML="",a.innerHTML="","user"===t?(n.textContent="You win! Congratulations. Click below to play again.",a.innerHTML=""):"ai"===t&&(n.textContent="You lose! Better luck next time..."),e.style.display="grid",r.style.display="flex",i.style.display="inline-block",i.classList.add("playButton"),i.addEventListener("click",(()=>{location.reload()}))}!function(){let r=function(e){const n={name:"Hal",isTurn:!1,playerBoard:t()},r={name:e,isTurn:!0,playerBoard:t()},i=r.playerBoard.receiveRandomAIAttack.bind(r.playerBoard),a=r.playerBoard.receiveAIAttack.bind(r.playerBoard),s=n.playerBoard.receiveAttack.bind(n.playerBoard),o=function(){let t=0;return{whoseTurn:function(t,e){return 0==e.isTurn&&1==t.isTurn?"playerTurn":0==t.isTurn&&1==e.isTurn?"aiTurn":void 0},switchTurns:function(e,n){e.isTurn=!e.isTurn,n.isTurn=!n.isTurn,t+=1},getNo:function(){return t}}}(),l=n.playerBoard.placeShip.bind(n.playerBoard),u=r.playerBoard.placeShip.bind(r.playerBoard);return{ai:n,user:r,turns:o,attackPlayer:function(t,e){return"hitBefore"==a(t,e)?[[t,e],"hitBefore"]:(o.switchTurns(r,n),[t,e])},attackPlayerRandom:function(){let t=i()[1];return o.switchTurns(r,n),t},attackAI:function(t,e){return"hitBefore"==s(t,e)?[[t,e],"hitBefore"]:(o.switchTurns(r,n),[t,e])},placeAIShip:l,placeUserShip:u,placeGameShips:function(t){let e,n;t||(t={aiShips:[[2,2,1,"vertical"],[3,4,4,"horizontal"],[4,6,1,"horizontal"],[5,4,5,"vertical"]],playerShips:[[2,2,1,"vertical"],[3,4,3,"horizontal"],[4,6,1,"horizontal"],[5,4,5,"vertical"]]}),e=t.aiShips,n=t.playerShips,function(){for(let t=0;t<e.length;t++)l(...e[t]),u(...n[t])}()}}}("James");(function(t){function e(e,n){for(let r=0;r<10;r++){const i=document.createElement("div");i.classList.add("battleSquare"),i.classList.add("userSquare"),i.dataset.row=e.toString(),i.dataset.column=r.toString(),"blue"==n?r%2==0?i.classList.add("blue"):i.classList.add("cyan"):r%2==0?i.classList.add("cyan"):i.classList.add("blue"),i.classList.contains("shipSquare")&&i.classList.remove("shipSquare"),i.id=`${e}-${r}-${t}`,document.getElementById(t).appendChild(i)}}document.getElementById(t).innerHTML="",function(){for(let t=0;t<10;t++)e(t,"blue"),t++,e(t,"cyan")}()})("userBoard"),function(t){function e(e,n){for(let n=0;n<10;n++){const r=document.createElement("div");r.classList.add("battleSquare"),r.classList.add("aiSquare"),r.classList.add("grey"),r.dataset.row=e.toString(),r.dataset.column=n.toString(),r.classList.contains("aiShipSquare")&&r.classList.remove("aiShipSquare"),r.id=`${e}-${n}-${t}`,document.getElementById(t).appendChild(r)}}document.getElementById(t).innerHTML="",function(){for(let t=0;t<10;t++)e(t)}()}("aiBoard"),function(t,n){document.querySelectorAll(".aiSquare").forEach((r=>{r.addEventListener("click",(()=>{const i=parseInt(r.dataset.row),a=parseInt(r.dataset.column);let s,o;r.classList.contains("aiShipSquare")?r.classList.add("hitShip"):(r.classList.add("missed"),i%2==0&&a%2==0||i%2!=0&&a%2!=0?r.classList.add("blue"):r.classList.add("cyan")),r.classList.add("flash"),setTimeout((()=>{r.classList.remove("flash")}),500);let l=[];const u=n.user.playerBoard.listHit,c=n.user.playerBoard.generatePotentialTargets();for(const t of u){const[r,i]=t,a=e(r,i);for(const t of a){const[e,r]=t;n.user.playerBoard.isAttacked(e,r)||l.push(t)}}let d;if(l.length>0){const t=l[0];d=[t[0],t[1]]}else d=c[Math.floor(Math.random()*c.length)];const f=10*d[0]+d[1];s=d[0],o=d[1];const h=document.querySelectorAll(".userSquare")[f];h.classList.contains("shipSquare")?h.classList.add("hitShip"):(h.classList.add("missed"),i%2==0&&a%2==0||i%2!=0&&a%2!=0?h.classList.add("blue"):h.classList.add("cyan")),h.classList.add("flash"),setTimeout((()=>{h.classList.remove("flash")}),500),t(i,a,s,o)}))}))}(((t,e,i,a)=>{r.attackAI(t,e),r.attackPlayer(i,a),r.user.playerBoard.allSunk()?n("ai"):r.ai.playerBoard.allSunk()&&n("user")}),r)}(),function(){const t=document.querySelectorAll(".shipPiece"),e=document.querySelectorAll(".userSquare"),n=[];let r;function i(t){const e=t.target,n="horizontal"===e.dataset.orientation?"vertical":"horizontal";e.dataset.orientation=n,e.style.transform="vertical"===n?"rotate(90deg)":"none"}function a(t){r=t.target,t.dataTransfer.setData("text/plain","")}function s(t){console.log(t.target),console.log("targetAbove")}function o(t){t.preventDefault()}function l(t){t.preventDefault();const e=t.target.closest(".userSquare");if(e){const i=t.clientX-e.getBoundingClientRect().left,a=t.clientY-e.getBoundingClientRect().top,s=i/e.offsetWidth,o=a/e.offsetHeight,l=Math.min(parseInt(e.dataset.row,10),9),u=Math.min(parseInt(e.dataset.column,10),9),c=Math.min(l+Math.floor(o),9),d=Math.min(u+Math.floor(s),9),f=parseInt(r.getAttribute("alt"),10);let h=!0;const p=[];for(let t=0;t<f;t++){let e,n;if(s<.5?(e=c+t,n=d):(e=c,n=d+t),e>9||n>9){console.log("Invalid placement! Occupied squares extend beyond the boundary."),h=!1;break}p.push({row:e,column:n})}if(h){const t=s<.5?"vertical":"horizontal";console.log("Ship placed on User Squares:",p),e.appendChild(r),n.push({size:f,orientation:t,occupiedSquares:p}),console.log("Occupied Squares:",n)}}}t.forEach((t=>{t.addEventListener("dragstart",a),t.addEventListener("dragend",s),t.addEventListener("click",i)})),e.forEach((t=>{t.addEventListener("dragover",o),t.addEventListener("drop",l)}))}()})();