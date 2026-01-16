// Advanced 360° Viewer using Three.js
// Based on renderstuff.com functionality

class Advanced360Viewer {
    constructor(container) {
        this.container = container;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.sphere = null;
        this.texture = null;
        this.controls = {
            isMouseDown: false,
            mouseX: 0,
            mouseY: 0,
            rotationX: 0,
            rotationY: 0,
            zoom: 1
        };
        this.isInitialized = false;
        
        this.init();
    }
    
    init() {
        // Create scene
        this.scene = new THREE.Scene();
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75, // FOV
            this.container.clientWidth / this.container.clientHeight, // Aspect ratio
            0.1, // Near plane
            1000 // Far plane
        );
        this.camera.position.set(0, 0, 0);
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true 
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);
        
        // Create sphere geometry (inverted normals for inside viewing)
        const geometry = new THREE.SphereGeometry(500, 60, 40);
        geometry.scale(-1, 1, 1); // Invert the geometry to see from inside
        
        // Create material
        const material = new THREE.MeshBasicMaterial({
            map: null,
            side: THREE.DoubleSide
        });
        
        // Create sphere mesh
        this.sphere = new THREE.Mesh(geometry, material);
        this.scene.add(this.sphere);
        
        // Add event listeners
        this.addEventListeners();
        
        // Start render loop
        this.animate();
        
        this.isInitialized = true;
    }
    
    loadImage(imagePath) {
        return new Promise((resolve, reject) => {
            const loader = new THREE.TextureLoader();
            
            // Show loading state
            this.showLoading();
            
            loader.load(
                imagePath,
                (texture) => {
                    // Configure texture
                    texture.wrapS = THREE.RepeatWrapping;
                    texture.repeat.x = -1; // Flip horizontally for correct orientation
                    
                    // Apply texture to sphere
                    this.sphere.material.map = texture;
                    this.sphere.material.needsUpdate = true;
                    
                    // Hide loading state
                    this.hideLoading();
                    
                    resolve(texture);
                },
                (progress) => {
                    // Update loading progress
                    const percentComplete = (progress.loaded / progress.total) * 100;
                    this.updateLoadingProgress(percentComplete);
                },
                (error) => {
                    console.error('Error loading 360° image:', error);
                    this.hideLoading();
                    this.showError();
                    reject(error);
                }
            );
        });
    }
    
    addEventListeners() {
        const canvas = this.renderer.domElement;
        
        // Mouse events
        canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        canvas.addEventListener('wheel', this.onWheel.bind(this));
        
        // Touch events for mobile
        canvas.addEventListener('touchstart', this.onTouchStart.bind(this));
        canvas.addEventListener('touchmove', this.onTouchMove.bind(this));
        canvas.addEventListener('touchend', this.onTouchEnd.bind(this));
        
        // Prevent context menu
        canvas.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // Window resize
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }
    
    onMouseDown(event) {
        this.controls.isMouseDown = true;
        this.controls.mouseX = event.clientX;
        this.controls.mouseY = event.clientY;
        this.renderer.domElement.style.cursor = 'grabbing';
    }
    
    onMouseMove(event) {
        if (!this.controls.isMouseDown) return;
        
        const deltaX = event.clientX - this.controls.mouseX;
        const deltaY = event.clientY - this.controls.mouseY;
        
        this.controls.rotationY += deltaX * 0.005;
        this.controls.rotationX += deltaY * 0.005;
        
        // Limit vertical rotation
        this.controls.rotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.controls.rotationX));
        
        this.controls.mouseX = event.clientX;
        this.controls.mouseY = event.clientY;
        
        this.updateCameraRotation();
    }
    
    onMouseUp(event) {
        this.controls.isMouseDown = false;
        this.renderer.domElement.style.cursor = 'grab';
    }
    
    onWheel(event) {
        event.preventDefault();
        
        const zoomSpeed = 0.1;
        const zoomDirection = event.deltaY > 0 ? 1 : -1;
        
        this.controls.zoom += zoomDirection * zoomSpeed;
        this.controls.zoom = Math.max(0.5, Math.min(3, this.controls.zoom));
        
        this.camera.fov = 75 / this.controls.zoom;
        this.camera.updateProjectionMatrix();
    }
    
    // Touch events for mobile support
    onTouchStart(event) {
        if (event.touches.length === 1) {
            this.controls.isMouseDown = true;
            this.controls.mouseX = event.touches[0].clientX;
            this.controls.mouseY = event.touches[0].clientY;
        }
    }
    
    onTouchMove(event) {
        event.preventDefault();
        
        if (event.touches.length === 1 && this.controls.isMouseDown) {
            const deltaX = event.touches[0].clientX - this.controls.mouseX;
            const deltaY = event.touches[0].clientY - this.controls.mouseY;
            
            this.controls.rotationY += deltaX * 0.005;
            this.controls.rotationX += deltaY * 0.005;
            
            this.controls.rotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.controls.rotationX));
            
            this.controls.mouseX = event.touches[0].clientX;
            this.controls.mouseY = event.touches[0].clientY;
            
            this.updateCameraRotation();
        }
    }
    
    onTouchEnd(event) {
        this.controls.isMouseDown = false;
    }
    
    updateCameraRotation() {
        // Apply rotation to camera
        this.camera.rotation.order = 'YXZ';
        this.camera.rotation.y = this.controls.rotationY;
        this.camera.rotation.x = this.controls.rotationX;
    }
    
    onWindowResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(width, height);
    }
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
    
    showLoading() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'viewer-loading';
        loadingDiv.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <p>Loading 360° Experience...</p>
                <div class="loading-progress">
                    <div class="progress-bar" id="loading-progress-bar"></div>
                </div>
            </div>
        `;
        this.container.appendChild(loadingDiv);
    }
    
    updateLoadingProgress(percent) {
        const progressBar = document.getElementById('loading-progress-bar');
        if (progressBar) {
            progressBar.style.width = `${percent}%`;
        }
    }
    
    hideLoading() {
        const loadingDiv = this.container.querySelector('.viewer-loading');
        if (loadingDiv) {
            loadingDiv.remove();
        }
    }
    
    showError() {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'viewer-error';
        errorDiv.innerHTML = `
            <div class="error-content">
                <p>Failed to load 360° image</p>
                <p class="error-subtitle">Please try again later</p>
            </div>
        `;
        this.container.appendChild(errorDiv);
    }
    
    reset() {
        this.controls.rotationX = 0;
        this.controls.rotationY = 0;
        this.controls.zoom = 1;
        this.camera.fov = 75;
        this.camera.updateProjectionMatrix();
        this.updateCameraRotation();
    }
    
    dispose() {
        if (this.renderer) {
            this.container.removeChild(this.renderer.domElement);
            this.renderer.dispose();
        }
        
        if (this.sphere && this.sphere.material.map) {
            this.sphere.material.map.dispose();
        }
        
        // Remove event listeners
        window.removeEventListener('resize', this.onWindowResize.bind(this));
    }
}

// Global viewer instance
let currentViewer = null;

// Initialize advanced 360° viewer
function initAdvanced360Viewer(container, imagePath) {
    // Dispose of existing viewer
    if (currentViewer) {
        currentViewer.dispose();
    }
    
    // Create new viewer
    currentViewer = new Advanced360Viewer(container);
    
    // Load image
    if (imagePath) {
        currentViewer.loadImage(imagePath).catch(error => {
            console.error('Failed to load 360° image:', error);
        });
    }
    
    return currentViewer;
}

// Export for use in other scripts
window.Advanced360Viewer = Advanced360Viewer;
window.initAdvanced360Viewer = initAdvanced360Viewer;

