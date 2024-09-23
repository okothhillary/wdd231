document.addEventListener('DOMContentLoaded', function () {

    // Get the current year
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').innerHTML = currentYear;

    // Get the last modified date
    const lastModified = document.lastModified;
    document.getElementById('lastModified').innerHTML = `Last Modified: ${lastModified}`;   
    
    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
            technology: [
                'Python'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
            technology: [
                'HTML',
                'CSS'
            ],
            completed: true
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
            technology: [
                'Python'
            ],
            completed: true
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
            technology: [
                'C#'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: false
        }
    ]
     
    const coursesDiv = document.getElementById('courses');

    const ul = document.createElement('ul');

    courses.forEach(course => {
        const li = document.createElement('li');
        li.textContent = `${course.subject} ${course.number}`;
        ul.appendChild(li);

    coursesDiv.appendChild(ul);    
    })

    function displayCourses(filter = null) {
        const coursesDiv = document.getElementById('courses');
        coursesDiv.innerHTML = '';
        const ul = document.createElement('ul');
    
        const filteredCourses = filter
            ? courses.filter(course => course.subject === filter)
            : courses;
    
        filteredCourses.forEach(course => {
            const li = document.createElement('li');
            li.textContent = `${course.subject} ${course.number}`;
            ul.appendChild(li);
            li.textContent = `${course.subject} ${course.number}`;
            li.style.color = course.completed ? 'blue' : 'brown';
        });

        
    
        coursesDiv.appendChild(ul);
    }
      
    
    document.querySelector('.filter-all').addEventListener('click', () => displayCourses());
    document.querySelector('.filter-cse').addEventListener('click', () => displayCourses('CSE'));
    document.querySelector('.filter-wdd').addEventListener('click', () => displayCourses('WDD'));      
    
    displayCourses();

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        hamburger.textContent = navMenu.classList.contains('active') ? 'X' : '☰';
    });

    function highlightActiveLink() {
        const links = document.querySelectorAll('#nav-menu a');
        const currentPage = window.location.href;
    
        links.forEach(link => {
            if (link.href === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    highlightActiveLink();


    function highlightActiveButton() {
        const filterButtons = document.querySelectorAll('#buttons button');
    
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active')); // Remove active class from all buttons
                button.classList.add('active');
            });
        });
    }
      
    highlightActiveButton();

    const totalCredits = courses.reduce((accumulator, course) => accumulator + course.credits, 0);
    document.getElementById('credits').innerHTML += `<p>${totalCredits}</p>`;
    
});