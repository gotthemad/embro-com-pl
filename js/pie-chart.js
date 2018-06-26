'use strict';
document.addEventListener('DOMContentLoaded', function(event) {
 
    let pieChart = document.getElementsByClassName("jsPieChart");
    let NS = "http://www.w3.org/2000/svg";

    let xhr = new XMLHttpRequest();
    let responseObject;

    xhr.onload = function(){
        if(xhr.status === 200){

            responseObject = JSON.parse(xhr.responseText);
            let skillsObj  = responseObject;

            for (let i = 0; i < skillsObj.skills.length; i++){

                let name = skillsObj.skills[i].name;
                let progress = parseFloat(skillsObj.skills[i].progress);

                let singlePie = document.createElement("div");
                let h2 = document.createElement("h2");
                let p = document.createElement("p");
                let svg = document.createElementNS(NS, "svg");
                let circle = document.createElementNS(NS, "circle");
                let title = document.createElementNS(NS, "title");

                singlePie.classList.add("pie-chart");
                svg.setAttribute("viewBox", "0 0 32 32");
                circle.setAttribute("r", 16);
                circle.setAttribute("cx", 16);
                circle.setAttribute("cy", 16);
                circle.setAttribute("stroke-dasharray", progress + " 100");
                title.textContent = name;
                h2.classList.add("pie-chart__desc");
                h2.classList.add("t2");
                h2.textContent = name;

                svg.appendChild(title);
                svg.appendChild(circle);
                singlePie.appendChild(h2);
                singlePie.appendChild(svg);

                singlePie.addEventListener("mouseenter", function(){
                    singlePie.classList.add("pie-chart--active");
                    h2.textContent = progress;

                },false);
                singlePie.addEventListener("mouseleave", function(){
                    singlePie.classList.remove("pie-chart--active");
                    h2.textContent = name;
                },false);

                for(let i = 0; i < pieChart.length; i++){
                    pieChart[i].appendChild(singlePie);
                }
            
                console.log('name: '+name+' | progress: '+progress);

            }       
        }
    }
        
    xhr.open('GET', '/data/skills.json', true);
    xhr.send(null);

});//end document ready