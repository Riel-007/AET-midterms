document.addEventListener('DOMContentLoaded', () => {
  const scenes = document.querySelectorAll('.scene');
  const sceneBoxes = document.querySelectorAll('.scene-box');
  let draggedScene = null;

  // Show/hide appropriate scenes container based on current page
  function updateScenesContainer() {
    const page1Scenes = document.getElementById('page1-scenes');
    const page2Scenes = document.getElementById('page2-scenes');
    const page3Scenes = document.getElementById('page3-scenes');
    
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const page3 = document.getElementById('page3');

    page1Scenes.style.display = page1.style.display === 'block' ? 'flex' : 'none';
    page2Scenes.style.display = page2.style.display === 'block' ? 'flex' : 'none';
    page3Scenes.style.display = page3.style.display === 'block' ? 'flex' : 'none';
  }

  // Drag and drop functionality
  scenes.forEach(scene => {
    if (scene.getAttribute('draggable') === 'true') {
      scene.addEventListener('dragstart', handleDragStart);
      scene.addEventListener('dragend', handleDragEnd);
      scene.addEventListener('click', handleSceneClick);
    }
  });

  sceneBoxes.forEach(box => {
    box.addEventListener('dragover', handleDragOver);
    box.addEventListener('drop', handleDrop);
  });

  function handleSceneClick(e) {
    // Only return to container if the scene is in a scene-box
    if (this.parentElement.classList.contains('scene-box')) {
      const currentPage = document.querySelector('.container[style="display: block"]');
      const pageId = currentPage ? currentPage.id : 'page1';
      const scenesContainer = document.getElementById(`${pageId}-scenes`);
      
      if (scenesContainer) {
        this.parentElement.removeChild(this);
        scenesContainer.appendChild(this);
      }
    }
  }

  function handleDragStart(e) {
    draggedScene = this;
    this.classList.add('dragging');
    
    // If the scene was previously in a box, clear that box
    if (this.parentElement.classList.contains('scene-box')) {
      this.parentElement.removeChild(this);
    }
  }

  function handleDragEnd(e) {
    this.classList.remove('dragging');
    draggedScene = null;
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    
    if (draggedScene && this.children.length === 0) {
      // Remove the scene from its previous container if it was in a scene box
      if (draggedScene.parentElement) {
        draggedScene.parentElement.removeChild(draggedScene);
      }
      
      // Add the scene to the new container
      this.appendChild(draggedScene);
    }
  }

  // Initialize scenes container visibility
  updateScenesContainer();
});

// Page navigation
function navigateToPage(pageNumber) {
  const pages = {
    1: document.getElementById('page1'),
    2: document.getElementById('page2'),
    3: document.getElementById('page3')
  };
  
  Object.values(pages).forEach(page => {
    page.style.display = 'none';
  });
  
  pages[pageNumber].style.display = 'block';

  // Update scenes container visibility
  const page1Scenes = document.getElementById('page1-scenes');
  const page2Scenes = document.getElementById('page2-scenes');
  const page3Scenes = document.getElementById('page3-scenes');

  page1Scenes.style.display = pageNumber === 1 ? 'flex' : 'none';
  page2Scenes.style.display = pageNumber === 2 ? 'flex' : 'none';
  page3Scenes.style.display = pageNumber === 3 ? 'flex' : 'none';
}