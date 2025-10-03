// =============================
// 🖥️ Example Server for Gallery API
// =============================
// This is an example Node.js server to demonstrate how to serve
// dynamic gallery images from your backend

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static images from public/images directory
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// =============================
// 🖼️ Gallery API Endpoint
// =============================
app.get('/api/gallery', async (req, res) => {
  try {
    const imagesDirectory = path.join(__dirname, 'public/images');
    
    try {
      // Read actual images from directory
      const files = await fs.readdir(imagesDirectory);
      const imageFiles = files.filter(file => 
        /\.(jpg|jpeg|png|webp)$/i.test(file)
      );
      
      if (imageFiles.length > 0) {
        // Organize images by category and create better descriptions
        const galleryImages = imageFiles.map((file, index) => {
          let alt = '';
          let order = index + 1;
          
          // Categorize images based on filename
          if (file.includes('h-corporate')) {
            alt = `Quarto Corporativo - ${file.replace('h-corporate-', '').replace('.jpg', '')}`;
            order = 100 + index; // Higher priority for room types
          } else if (file.includes('h-standard')) {
            alt = `Quarto Standard - ${file.replace('h-standard-', '').replace('.jpg', '')}`;
            order = 200 + index;
          } else if (file.includes('h-mobilidade')) {
            alt = 'Quarto de Mobilidade Reduzida';
            order = 300 + index;
          } else if (file.includes('bandeiras')) {
            alt = 'Área de Recepção com Bandeiras';
            order = 50 + index;
          } else if (file.match(/^\d+\.jpg$/)) {
            alt = `Área Comum do Hotel - ${file.replace('.jpg', '')}`;
            order = 400 + index;
          } else if (file.match(/^\d+_\d+\.jpg$/)) {
            alt = `Detalhe do Hotel - ${file.replace('.jpg', '')}`;
            order = 500 + index;
          } else {
            alt = `Hotel Santhyago - ${file.replace('.jpg', '')}`;
            order = 600 + index;
          }
          
          return {
            id: `hotel-image-${file.replace('.jpg', '')}`,
            url: `http://localhost:${PORT}/images/${file}`,
            alt: alt,
            order: order,
          };
        });
        
        // Sort by order to show most important images first
        galleryImages.sort((a, b) => a.order - b.order);
        
        console.log(`📸 Serving ${galleryImages.length} hotel images`);
        res.json(galleryImages);
        return;
      }
    } catch (error) {
      console.log('Error reading images directory:', error.message);
    }
    
    // Fallback to mock data if no images directory exists
    const mockImages = [
      {
        id: 'server-image-1',
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1920&auto=format&fit=crop',
        alt: 'Hotel lobby - Server Image 1',
        order: 1,
      },
      {
        id: 'server-image-2',
        url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1920&auto=format&fit=crop',
        alt: 'Hotel restaurant - Server Image 2',
        order: 2,
      },
      {
        id: 'server-image-3',
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1920&auto=format&fit=crop',
        alt: 'Hotel room - Server Image 3',
        order: 3,
      },
      {
        id: 'server-image-4',
        url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1920&auto=format&fit=crop',
        alt: 'Hotel pool - Server Image 4',
        order: 4,
      },
    ];
    
    res.json(mockImages);
    
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    res.status(500).json({ 
      error: 'Failed to fetch gallery images',
      message: error.message 
    });
  }
});

// =============================
// 🔧 Health Check Endpoint
// =============================
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'gallery-api'
  });
});

// =============================
// 🚀 Start Server
// =============================
app.listen(PORT, () => {
  console.log(`🖼️ Gallery API Server running on http://localhost:${PORT}`);
  console.log(`📡 Gallery endpoint: http://localhost:${PORT}/api/gallery`);
  console.log(`❤️ Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
