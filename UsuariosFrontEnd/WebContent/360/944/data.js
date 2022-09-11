var APP_DATA = {
  "scenes": [
    {
      "id": "0-centro",
      "name": "Centro",
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
      "faceSize": 1024,
      "initialViewParameters": {
        "yaw": -0.24069044735565548,
        "pitch": 0.027158777074792084,
        "fov": 1.3389277097875694
      },
      "linkHotspots": [
        {
          "yaw": -0.40929212824105043,
          "pitch": 0.026773888448317962,
          "rotation": 0,
          "target": "2-lateral-tv"
        },
        {
          "yaw": 0.8833472758701628,
          "pitch": 0.06329434891011587,
          "rotation": 0,
          "target": "2-lateral-tv"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-lateral-mesa",
      "name": "Lateral mesa",
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
      "faceSize": 1024,
      "initialViewParameters": {
        "yaw": -0.3762458212475295,
        "pitch": 0.21194178422443954,
        "fov": 1.3389277097875694
      },
      "linkHotspots": [
        {
          "yaw": -0.5568957473200875,
          "pitch": 0.17698307421424886,
          "rotation": 0,
          "target": "0-centro"
        },
        {
          "yaw": 0.605644919038042,
          "pitch": 0.16545760442501134,
          "rotation": 0,
          "target": "2-lateral-tv"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-lateral-tv",
      "name": "Lateral TV",
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
      "faceSize": 1024,
      "initialViewParameters": {
        "yaw": 0.642492941732403,
        "pitch": 0.09233984205432222,
        "fov": 1.3389277097875694
      },
      "linkHotspots": [
        {
          "yaw": 0.7293277130442704,
          "pitch": 0.09199348827012521,
          "rotation": 0,
          "target": "0-centro"
        },
        {
          "yaw": -0.16766228058499877,
          "pitch": 0.061530128128286066,
          "rotation": 0,
          "target": "1-lateral-mesa"
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
