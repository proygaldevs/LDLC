var APP_DATA = {
  "scenes": [
    {
      "id": "0-habitacion",
      "name": "Habitacion",
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
        "yaw": -0.3298661506242446,
        "pitch": 0.20405421924407463,
        "fov": 1.3358749553179488
      },
      "linkHotspots": [
        {
          "yaw": 0.2702800371335208,
          "pitch": 0.23520800442175727,
          "rotation": 0,
          "target": "1-bao"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-bao",
      "name": "Baño",
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
        "yaw": 0.12812429552976745,
        "pitch": 0.07206397228854655,
        "fov": 1.3358749553179488
      },
      "linkHotspots": [
        {
          "yaw": -0.0937637752313858,
          "pitch": -0.16922751249128964,
          "rotation": 0,
          "target": "0-habitacion"
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
