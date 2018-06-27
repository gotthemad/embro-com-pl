'use strict';
document.addEventListener('DOMContentLoaded', function(event) {
 
    let allProjects = document.getElementsByClassName("jsProjects");

    let xhr = new XMLHttpRequest();
    let responseObject;

    xhr.onload = function(){
        if(xhr.status === 200){

            responseObject = JSON.parse(xhr.responseText);
            let projectsObj  = responseObject;

            for (let i = 0; i < projectsObj.projects.length; i++){

                let name = projectsObj.projects[i].name;
                let desc = projectsObj.projects[i].desc;
                let imgSrc = projectsObj.projects[i].imgSrc;
                let githubLink = projectsObj.projects[i].githubLink;
                let wwwLink = projectsObj.projects[i].wwwLink;

                let project = document.createElement("div");
                let projectImg = document.createElement("div");
                let projectImgMask = document.createElement("div");
                let projectName = document.createElement("h2");
                let projectDesc = document.createElement("p");
                
                // projectImgMask.insertAdjacentHTML('afterbegin', '<a class="btn-social" href=""><svg class="social-icons"><use xlink:href="#linkedin-logo"></use></svg></a>');

                project.classList.add("project");
                projectImg.classList.add("project__img");
                projectImgMask.classList.add('img__mask')
                projectName.classList.add("t2");
                projectName.classList.add("t-project");
                projectDesc.classList.add("t1");
                projectDesc.classList.add("t-project");

                project.appendChild(projectImg);
                project.appendChild(projectName);
                project.appendChild(projectDesc);
                projectImg.appendChild(projectImgMask);

                projectName.textContent = name;
                projectDesc.textContent = desc;
                projectImg.setAttribute("style","background-image: url("+imgSrc+");");

                for (let i = 0; i < allProjects.length; i++) {
                    allProjects[i].appendChild(project);
                }

                project.addEventListener("mouseenter", function(){
                    project.classList.add("project--active");

                },false);
                project.addEventListener("mouseleave", function(){
                    project.classList.remove("project--active");

                },false);

            }       
        }
    }
        
    xhr.open('GET', '/data/projects.json', true);
    xhr.send(null);

});//end document ready