document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle-btn');
    const navRight = document.querySelector('.nav-right');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navRight) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navRight.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navRight.classList.remove('active');
            });
        });
    }

    // 1. Custom Cursor
    const cursor = document.getElementById('custom-cursor');
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .skill-tag, .cert-card');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });

    // Handle cursor leaving the window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });

    // 2. Scroll Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before it hits the bottom
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it's visible
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => observer.observe(el));

    // 3. Smooth scrolling for nav links
    document.querySelectorAll('.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Real AJAX Form Submission via FormSubmit
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.getElementById('submit-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'SENDING...';
            btn.style.backgroundColor = '#000';
            btn.style.color = '#FFD93D'; /* neo-secondary */

            const formData = {
                name: contactForm.querySelector('input[name="name"]').value,
                email: contactForm.querySelector('input[name="email"]').value,
                message: contactForm.querySelector('textarea[name="message"]').value,
                _captcha: "false"
            };

            fetch("https://formsubmit.co/ajax/hiteshchouhan2500@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(() => {
                btn.innerHTML = 'SENT! ✓';
                btn.style.backgroundColor = '#FFD93D';
                btn.style.color = '#000';
                setTimeout(() => {
                    contactForm.reset();
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '#FF6B6B'; /* neo-accent */
                    btn.style.color = '#fff';
                }, 3000);
            })
            .catch(() => {
                btn.innerHTML = 'ERROR! TRY AGAIN';
                btn.style.backgroundColor = '#FF6B6B';
                btn.style.color = '#fff';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '#FF6B6B';
                    btn.style.color = '#fff';
                }, 3000);
            });
        });
    }

    // 5. Project Modals
    const projectsData = [
        {
            title: "Kubernetes Disaster Recovery using Velero",
            desc: "This project provides robust backup, restore, and Disaster Recovery mechanisms for Kubernetes environments. It integrates Velero and Docker to ensure cluster state and persistent volume data are securely backed up, safeguarding against data loss and ensuring high availability across regions.",
            points: [
                "Automated scheduled backups of cluster state and persistent volumes.",
                "Ensured rapid granular recovery of specific namespaces during simulated failures.",
                "Containerized the backup environment using Docker for streamlined deployments."
            ],
            link: ""
        },
        {
            title: "AWS 2-Tier Architecture",
            desc: "Designed and deployed a highly available, scalable 2-tier foundation on AWS. Mapped with strict security best practices, utilizing EC2 instances for compute, RDS databases for data persistence, and custom VPC networking for secure isolation.",
            points: [
                "Architected a secure framework separating web and database tiers across multiple Availability Zones.",
                "Configured scalable EC2 compute instances backing an isolated RDS database.",
                "Implemented custom VPC configurations, subnets, and strict security group routing."
            ],
            link: ""
        },
        {
            title: "CampusMart",
            desc: "A full-stack marketplace aimed at college campuses, designed dynamically for students to easily buy, sell, and trade items locally. Built using Flask, SQL, and vanilla frontend technologies to create a fast and responsive user experience.",
            points: [
                "Developed a responsive student-focused marketplace using vanilla HTML, CSS, and JS.",
                "Engineered a fast and lightweight backend application with Flask.",
                "Designed a robust SQL database schema to handle users, products, and transactions."
            ],
            link: ""
        },
        {
            title: "DocuSense AI",
            desc: "An intelligent document analysis tool designed to extract key knowledge instantly from heavy, unstructured textual data.",
            points: [
                "Automates accurate text extraction from diverse document formats.",
                "Utilizes NLP algorithms to effortlessly summarize large texts.",
                "Integrates AI tools for contextual Question & Answering over documents.",
                "Built using Python for powerful and scalable processing."
            ],
            link: "https://docusense-ai-zfpn.onrender.com/" 
        },
        {
            title: "HostelMate",
            desc: "An Android hostel finder application bridging students and living spaces. It helps students locate verified accommodations nearby, leveraging Android Studio, Java, and Firebase for real-time reliable data synchronization.",
            points: [
                "Designed an intuitive Android UI/UX specifically catering to student housing searches.",
                "Integrated Firebase for real-time reliable data synchronization of hostel availability.",
                "Developed using Java and Android Studio for native optimal performance."
            ],
            link: ""
        },
        {
            title: "FALCON THEATER",
            desc: "A modern website built for a private theater business to establish a strong online presence and attract more customers. The platform showcases services, ambiance, and offerings with a clean, responsive design.",
            points: [
                "Designed a clean and engaging UI to showcase private theater experiences.",
                "Built a fully responsive website optimized for all screen sizes.",
                "Focused on performance and fast loading using a static deployment.",
                "Improved business visibility and digital credibility."
            ],
            link: "https://falcontheaters.vercel.app/"
        },
        {
            title: "GAMING HUB",
            desc: "A visually engaging website designed for a gaming room setup to highlight gaming experiences and attract local users. The platform focuses on modern UI and immersive presentation.",
            points: [
                "Created a modern UI with a gaming-focused visual experience.",
                "Showcased gaming setups and services in an engaging layout.",
                "Built a responsive design for seamless use across devices.",
                "Designed to improve customer engagement and interest."
            ],
            link: ""
        }
    ];

    const projectBtns = document.querySelectorAll('.project-btn');
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalPoints = document.getElementById('modal-points');
    const modalLink = document.getElementById('modal-link');

    projectBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const data = projectsData[index];
            modalTitle.textContent = data.title;
            modalDesc.textContent = data.desc;
            
            if (data.points && data.points.length > 0) {
                modalPoints.innerHTML = '';
                data.points.forEach(pt => {
                    const li = document.createElement('li');
                    li.textContent = pt;
                    modalPoints.appendChild(li);
                });
                modalPoints.style.display = 'block';
            } else {
                modalPoints.style.display = 'none';
            }

            if (data.link) {
                modalLink.href = data.link;
                modalLink.style.display = 'inline-flex';
            } else {
                modalLink.style.display = 'none';
            }

            modal.classList.add('active');
        });
    });

    if(modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if(modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

});
