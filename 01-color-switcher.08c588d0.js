const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]");let d=null;e.addEventListener("click",(function(){d=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),e.disabled=!0,t.disabled=!1})),t.addEventListener("click",(function(){e.disabled=!1,t.disabled=!0,clearInterval(d)})),t.disabled=!0;
//# sourceMappingURL=01-color-switcher.08c588d0.js.map
