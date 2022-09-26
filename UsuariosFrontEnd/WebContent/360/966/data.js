var APP_DATA = {
  "scenes": [
    {
      "id": "0-centro-comedor",
      "name": "Centro Comedor",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 1000,
      "initialViewParameters": {
        "yaw": 0.34545985842422056,
        "pitch": 0.08308024852667906,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -2.6574758763653232,
          "pitch": 0.15227168209877817,
          "rotation": 0,
          "target": "1-esquina-comedor"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-esquina-comedor",
      "name": "Esquina Comedor",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 1000,
      "initialViewParameters": {
        "yaw": 0.05929813462822153,
        "pitch": 0.3390119908028968,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -0.11285694552021397,
          "pitch": 0.3281566025060254,
          "rotation": 0,
          "target": "0-centro-comedor"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "Project Title",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": true,
    "fullscreenButton": true,
    "viewControlButtons": false
  }
};
