(()=>{"use strict";function e(){let e=[];for(let t=0;t<10;t++){let t=[];for(let e=0;e<10;e++)t.push(null);e.push(t)}let t={},n=[],i=[],r=[],o=function(t,n,i){e[t][n]=i},s=function(e){t[e].hit()},a=function(e,t){n.push([e,t])},l=function(e,t){i.push([e,t])},c=function(e,t){r.push([e,t])},u=function(){if(n.length>=99)return["board full",[t,i]];let t=Math.floor(10*Math.random()),i=Math.floor(10*Math.random());if("missed"==e[t][i]||"hitShip"==e[t][i])return u();if(null==e[t][i])o(t,i,"missed"),a(t,i),l(t,i);else{let n=e[t][i].toString();s(n),o(t,i,"hitShip"),l(t,i)}return["hitBefore",[t,i]]};return{board:e,ships:t,listMissed:n,isMissed:function(e,t){return!!n.some((function(n){return n[0]===e&&n[1]===t}))},placeShip:function(n,i,r,s){if(function(e){t[`ship${e}`]=function(e){return function(e){return{length:e,hits:0,hit:function(){this.hits+=1},isSunk:function(){return this.hits>=this.length}}}(e)}(e)}(n),i>9||r>9)return"offBoard";if("vertical"===s.toLowerCase()){for(let t=i;t<n+i;t++)if(t>9||null!==e[t][r])return"occupiedSquare";for(let e=i;e<n+i;e++)o(e,r,`ship${n}`)}else{for(let t=r;t<n+r;t++)if(t>9||null!==e[i][t])return"occupiedSquare";for(let e=r;e<n+r;e++)o(i,e,`ship${n}`)}},receiveAttack:function(t,n){if(null==e[t][n])o(t,n,"missed"),a(t,n),l(t,n);else{if("missed"==e[t][n])return"hitBefore";if("hitShip"==e[t][n])return"hitBefore";{let i=e[t][n].toString();s(i),o(t,n,"hitShip"),c(t,n),l(t,n)}}},receiveAIAttack:function(t,i){if(n.length>=99)return["board full",[t,i]];if(null==e[t][i])o(t,i,"missed"),a(t,i),l(t,i);else{if("missed"==e[t][i])return"missed";if("hitShip"==e[t][i])return"hitBefore";{let n=e[t][i].toString();s(n),o(t,i,"hitShip"),l(t,i),c(t,i)}}},receiveRandomAIAttack:u,allSunk:function(){for(let e in t)if(1!=t[e].isSunk())return!1;return!0},anyMissed:function(){for(let t=0;t<10;t++)for(let n=0;n<10;n++)if("missed"===e[t][n])return[!0,[t,n]];return[!1,[]]},anyAttacks:function(){for(let t=0;t<10;t++)for(let n=0;n<10;n++)if("missed"===e[t][n]||"hitShip"===e[t][n])return[!0,[t,n]];return[!1,[]]},missedInARow:function(t){for(let n=0;n<10;n++)if("missed"===e[t][n])return[!0,[t,n]];return!1},saveAttacked:l,isHit:function(e,t){return!!r.some((function(n){return n[0]===e&&n[1]===t}))},isAttacked:function(e,t){return!!i.some((function(n){return n[0]===e&&n[1]===t}))},listAttacked:i,generatePotentialTargets:function(){const e=[];for(let t=0;t<10;t++)for(let n=0;n<10;n++)this.isAttacked(t,n)||e.push([t,n]);return e},listHit:r}}function t(e,t,n){let i;i="user"==n?document.getElementById(e+"-"+t+"-userBoard"):document.getElementById(e+"-"+t+"-aiBoard"),(i.classList.contains("blue")||i.classList.contains("cyan"))&&(i.classList.remove("blue"),i.classList.remove("cyan")),i.classList.contains("grey")&&i.classList.remove("grey"),"user"==n?i.classList.add("shipSquare"):i.classList.add("aiShipSquare")}function n(e,n,i,r){if(n>9||i>9)return"offBoard";if("vertical"===r){for(let t=n;t<e+n;t++){if(t>9)return"offBoard";if(document.getElementById(t+"-"+i+"-userBoard").classList.contains("shipSquare"))return"occupiedSquare"}for(let r=n;r<e+n;r++)t(r,i,"user")}else{for(let t=i;t<e+i;t++){if(t>9)return"offBoard";if(document.getElementById(n+"-"+t+"-userBoard").classList.contains("shipSquare"))return"occupiedSquare"}for(let r=i;r<e+i;r++)t(n,r,"user")}}function i(e,n,i,r){if(n>9||i>9)return"offBoard";if("vertical"==r){for(let t=i;t<e+i;t++){if(t>9)return"offBoard";if(document.getElementById(n+"-"+t+"-aiBoard").classList.contains("aiShipSquare"))return"occupiedSquare"}for(let r=i;r<e+i;r++)t(n,r,"ai")}else{for(let t=n;t<e+n;t++){if(t>9)return"offBoard";if(document.getElementById(t+"-"+i+"-aiBoard").classList.contains("aiShipSquare"))return"occupiedSquare"}for(let r=n;r<e+n;r++)t(r,i,"ai")}}function r(e,t){const n=[];return t>0&&n.push([e,t-1]),t<9&&n.push([e,t+1]),e>0&&n.push([e-1,t]),e<9&&n.push([e+1,t]),n}function o(e){const t=document.getElementsByClassName("announceCont")[0],n=t.querySelector("#announceText"),i=t.querySelector(".buttonContainer"),r=i.querySelector("button"),o=document.querySelector("#boardContainers");n.innerHTML="",o.innerHTML="","user"===e?(n.textContent="You win! Congratulations. Click below to play again.",o.innerHTML=""):"ai"===e&&(n.textContent="You lose! Better luck next time..."),t.style.display="grid",i.style.display="flex",r.style.display="inline-block",r.classList.add("playButton"),r.addEventListener("click",(()=>{location.reload()}))}function s(e){!function(){const e=document.getElementById("aiTitle"),t=document.getElementById("aiBoard");e.style.display="none",t.style.display="none"}(),function(){const e=document.getElementById("boardContainers");e.style.gridTemplateColumns="1fr 0.1fr",e.style.flexDirection="row"}(),function(){const e=document.getElementById("flipShips"),t=document.getElementById("verShips"),n=document.getElementById("horShips");e.addEventListener("click",(()=>{"none"===t.style.display?(t.style.display="grid",n.style.display="none"):(t.style.display="none",n.style.display="grid")}))}();let t=0,n=!1;!function(e){var t=document.getElementById("aiTitle"),n=document.getElementById("aiBoard");t.style.display="none",n.style.display="none";const i=document.querySelectorAll(".shipPiece"),r=document.querySelectorAll(".userSquare");let o,s,a=[],l=0,c=!1;function u(e){o=e.target,s=o.dataset.orientation,e.dataTransfer.setData("text/plain","")}function d(){o&&o.parentNode&&o.parentNode.removeChild(o)}function f(e){e.preventDefault()}function p(t){t.preventDefault();const n=t.target.closest(".userSquare");if(n){const i=t.clientX-n.getBoundingClientRect().left,r=t.clientY-n.getBoundingClientRect().top,s=Math.min(parseInt(n.dataset.row,10),9),u=Math.min(parseInt(n.dataset.column,10),9),d=parseInt(o.getAttribute("alt"),10),f=o.dataset.orientation;let p,h;console.log(f),"vertical"===f?(p=Math.min(s+Math.floor(r/n.offsetHeight),9-d+1),h=u):(p=s,h=Math.min(u+Math.floor(i/n.offsetWidth),9-d+1));const m=[];for(let e=0;e<d;e++){let t,n;if("vertical"===f?(t=p+e,n=h):(t=p,n=h+e),t>9||n>9)return;m.push({row:t,column:n})}if(c=function(e){for(const t of e)for(const e of a)if(e.occupiedSquares.some((e=>e.row===t.row&&e.column===t.column)))return!1;return!0}(m),c){if("vertical"===f&&(o.style.transform="none",o.style.position="absolute",o.style.left=h*n.offsetWidth+"px",o.style.top=p*n.offsetHeight+"px"),a.push({size:d,orientation:f,occupiedSquares:m}),l++,o.parentElement){const e=document.getElementById(o.id.replace(/V$/,""));if(e&&e.parentElement&&e.parentElement.removeChild(e),!o.id.endsWith("V")){const e=document.getElementById(`${o.id}V`);e&&e.parentElement&&e.parentElement.removeChild(e)}}if(4===l&&"function"==typeof e){console.log("occupiedSquares in D&D"),console.log(a);const t=function(e){const t=[];for(let n=0;n<e.length;n++){const i=e[n],r=i.size,o=i.orientation,s=i.occupiedSquares;let a=1/0,l=1/0;for(let e=0;e<s.length;e++){const{row:t,column:n}=s[e];a=Math.min(a,t),l=Math.min(l,n)}t.push([r,a,l,o])}return t}(a);console.log("shipLocations in D&D"),console.log(t),e(t,c)}}else console.log("Invalid placement! Overlapping with existing ships or occupied squares.")}}i.forEach((e=>{e.addEventListener("dragstart",u),e.addEventListener("dragend",d)})),r.forEach((e=>{e.addEventListener("dragover",f),e.addEventListener("drop",p)}))}((function(i){t=i.length,t>3&&!n&&(n=!0,function(){const e=document.getElementById("boardContainers"),t=document.querySelector(".boardCont1"),n=document.getElementById("flipShips"),i=document.getElementById("aiTitle"),r=document.getElementById("aiBoard");i.style.display="flex",r.style.display="grid",e&&t&&(e.style.display="grid",e.style.justifyContent="center",e.style.gridTemplateColumns="1fr 1fr",e.style.top="52px",e.style.minWidth="800px",e.style.gridTemplateColumns="1fr 1fr",t.style.position="",t.style.marginTop="",n.style.display="none")}(),e(i))}))}function a(e){return e.map((e=>{const[t,n,i,r]=e;return[t,i,n,"vertical"===r?"horizontal":"vertical"]}))}!function(){let t=function(t){const n={name:"Hal",isTurn:!1,playerBoard:e()},i={name:t,isTurn:!0,playerBoard:e()},r=i.playerBoard.receiveRandomAIAttack.bind(i.playerBoard),o=i.playerBoard.receiveAIAttack.bind(i.playerBoard),s=n.playerBoard.receiveAttack.bind(n.playerBoard),a=function(){let e=0;return{whoseTurn:function(e,t){return 0==t.isTurn&&1==e.isTurn?"playerTurn":0==e.isTurn&&1==t.isTurn?"aiTurn":void 0},switchTurns:function(t,n){t.isTurn=!t.isTurn,n.isTurn=!n.isTurn,e+=1},getNo:function(){return e}}}(),l=n.playerBoard.placeShip.bind(n.playerBoard),c=i.playerBoard.placeShip.bind(i.playerBoard);return{ai:n,user:i,turns:a,attackPlayer:function(e,t){return"hitBefore"==o(e,t)?[[e,t],"hitBefore"]:(a.switchTurns(i,n),[e,t])},attackPlayerRandom:function(){let e=r()[1];return a.switchTurns(i,n),e},attackAI:function(e,t){return"hitBefore"==s(e,t)?[[e,t],"hitBefore"]:(a.switchTurns(i,n),[e,t])},placeAIShip:l,placeUserShip:c,placeGameShips:function(e){let t,n;e||(e={aiShips:[[2,2,1,"vertical"],[3,4,4,"horizontal"],[4,6,1,"horizontal"],[5,4,5,"vertical"]],playerShips:[[2,2,1,"vertical"],[3,4,3,"horizontal"],[4,6,1,"horizontal"],[5,4,5,"vertical"]]}),t=e.aiShips,n=e.playerShips,function(){for(let e=0;e<t.length;e++)l(...t[e]),c(...n[e])}()}}}("James");(function(e){function t(t,n){for(let i=0;i<10;i++){const r=document.createElement("div");r.classList.add("battleSquare"),r.classList.add("userSquare"),r.dataset.row=t.toString(),r.dataset.column=i.toString(),"blue"==n?i%2==0?r.classList.add("blue"):r.classList.add("cyan"):i%2==0?r.classList.add("cyan"):r.classList.add("blue"),r.classList.contains("shipSquare")&&r.classList.remove("shipSquare"),r.id=`${t}-${i}-${e}`,document.getElementById(e).appendChild(r)}}document.getElementById(e).innerHTML="",function(){for(let e=0;e<10;e++)t(e,"blue"),e++,t(e,"cyan")}()})("userBoard"),function(e){function t(t,n){for(let n=0;n<10;n++){const i=document.createElement("div");i.classList.add("battleSquare"),i.classList.add("aiSquare"),i.classList.add("grey"),i.dataset.row=t.toString(),i.dataset.column=n.toString(),i.classList.contains("aiShipSquare")&&i.classList.remove("aiShipSquare"),i.id=`${t}-${n}-${e}`,document.getElementById(e).appendChild(i)}}document.getElementById(e).innerHTML="",function(){for(let e=0;e<10;e++)t(e)}()}("aiBoard"),s((function(e){const r={aiShips:e,playerShips:e};!function(e){let t,r;console.log("placeshipsDOM shipsToPlace"),console.log(e),e||(e={aiShips:[[2,2,1,"vertical"],[3,4,4,"horizontal"],[4,6,1,"horizontal"],[5,4,5,"vertical"]],playerShips:[[2,2,1,"vertical"],[3,4,3,"horizontal"],[4,6,1,"horizontal"],[5,4,5,"vertical"]]}),t=e.aiShips,r=e.playerShips,function(){for(let e=0;e<t.length;e++)i(...t[e]),n(...r[e])}()}(r),a(r.aiShips),a(r.playerShips),t.placeGameShips(r),console.log(t.user.playerBoard.board)})),function(e,t){document.querySelectorAll(".aiSquare").forEach((n=>{n.addEventListener("click",(()=>{const i=parseInt(n.dataset.row),o=parseInt(n.dataset.column);let s,a;n.classList.contains("aiShipSquare")?n.classList.add("hitShip"):(n.classList.add("missed"),i%2==0&&o%2==0||i%2!=0&&o%2!=0?n.classList.add("blue"):n.classList.add("cyan")),n.classList.add("flash"),setTimeout((()=>{n.classList.remove("flash")}),500);let l=[];const c=t.user.playerBoard.listHit,u=t.user.playerBoard.generatePotentialTargets();for(const e of c){const[n,i]=e,o=r(n,i);for(const e of o){const[n,i]=e;t.user.playerBoard.isAttacked(n,i)||l.push(e)}}let d;if(l.length>0){const e=l[0];d=[e[0],e[1]]}else d=u[Math.floor(Math.random()*u.length)];const f=10*d[0]+d[1];s=d[0],a=d[1];const p=document.querySelectorAll(".userSquare")[f];p.classList.contains("shipSquare")?p.classList.add("hitShip"):(p.classList.add("missed"),i%2==0&&o%2==0||i%2!=0&&o%2!=0?p.classList.add("blue"):p.classList.add("cyan")),p.classList.add("flash"),setTimeout((()=>{p.classList.remove("flash")}),500),e(i,o,s,a)}))}))}(((e,n,i,r)=>{t.attackAI(e,n),t.attackPlayer(i,r),t.user.playerBoard.allSunk()?o("ai"):t.ai.playerBoard.allSunk()&&o("user")}),t)}()})();