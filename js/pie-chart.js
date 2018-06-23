
'use strict';
document.addEventListener('DOMContentLoaded', function(event) {

    let pie = document.getElementsByClassName("pie-chart");
    let NS = "http://www.w3.org/2000/svg";

    for (let i = 0; i < pie.length; i++){
        let p = parseFloat(pie[i].textContent);
        let svg = document.createElementNS(NS, "svg");
        let circle = document.createElementNS(NS, "circle");
        let title = document.createElementNS(NS, "title");
        circle.setAttribute("r", 16);
        circle.setAttribute("cx", 16);
        circle.setAttribute("cy", 16);
        circle.setAttribute("stroke-dasharray", p + " 100");
        svg.setAttribute("viewBox", "0 0 32 32");
        title.textContent = pie[i].textContent;
        pie[i].textContent = '';
        svg.appendChild(title);
        svg.appendChild(circle);
        pie[i].appendChild(svg);
    }
});//end document ready