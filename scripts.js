// ============================================
// THEME TOGGLE
// ============================================

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const newTheme = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// Initialize theme on page load
initTheme();

// ============================================
// PARTICLE ANIMATION (Home Page)
// ============================================

function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 50;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    createParticles();
    animate();
}

// ============================================
// CIRCUIT ANIMATION (About Page)
// ============================================

function initCircuit() {
    const canvas = document.getElementById('circuitCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let nodes = [];
    let connections = [];
    const nodeCount = 30;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Node {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 4 + 2;
            this.pulse = Math.random() * Math.PI * 2;
        }

        update() {
            this.pulse += 0.02;
        }

        draw() {
            const opacity = 0.5 + Math.sin(this.pulse) * 0.3;
            ctx.fillStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function createNodes() {
        nodes = [];
        for (let i = 0; i < nodeCount; i++) {
            nodes.push(new Node());
        }
    }

    function createConnections() {
        connections = [];
        nodes.forEach((node, i) => {
            nodes.slice(i + 1).forEach(otherNode => {
                const dx = node.x - otherNode.x;
                const dy = node.y - otherNode.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) {
                    connections.push({
                        from: node,
                        to: otherNode,
                        distance: distance
                    });
                }
            });
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        nodes.forEach(node => {
            node.update();
        });

        // Draw connections
        connections.forEach(conn => {
            const opacity = 0.1 * (1 - conn.distance / 200);
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(conn.from.x, conn.from.y);
            ctx.lineTo(conn.to.x, conn.to.y);
            ctx.stroke();
        });

        // Draw nodes
        nodes.forEach(node => {
            node.draw();
        });

        requestAnimationFrame(animate);
    }

    createNodes();
    createConnections();
    animate();
}

// ============================================
// PULSE RING ANIMATION (Contact Page)
// ============================================

function initPulse() {
    const canvas = document.getElementById('pulseCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let rings = [];
    const ringCount = 3;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Ring {
        constructor() {
            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
            this.radius = 0;
            this.maxRadius = Math.max(canvas.width, canvas.height) * 0.8;
            this.speed = 1;
            this.opacity = 0.5;
        }

        update() {
            this.radius += this.speed;
            this.opacity = 0.5 * (1 - this.radius / this.maxRadius);

            if (this.radius > this.maxRadius) {
                this.radius = 0;
                this.opacity = 0.5;
            }
        }

        draw() {
            ctx.strokeStyle = `rgba(0, 212, 255, ${this.opacity})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    function createRings() {
        rings = [];
        for (let i = 0; i < ringCount; i++) {
            const ring = new Ring();
            ring.radius = (ring.maxRadius / ringCount) * i;
            rings.push(ring);
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        rings.forEach(ring => {
            ring.update();
            ring.draw();
        });

        requestAnimationFrame(animate);
    }

    createRings();
    animate();
}

