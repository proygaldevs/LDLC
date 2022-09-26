var APP_DATA = {
  "scenes": [
    {
      "id": "0-centro",
      "name": "centro",
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
        "yaw": 0.053871044516634825,
        "pitch": 0.12481875937164233,
        "fov": 1.349281773378271
      },
      "linkHotspots": [
        {
          "yaw": 0.6699026322263784,
          "pitch": 0.05575380050852985,
          "rotation": 0,
          "target": "2-chimenea"
        },
        {
          "yaw": -1.59239988441246,
          "pitch": -0.03659311565349732,
          "rotation": 0,
          "target": "1-entrada"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-entrada",
      "name": "entrada",
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
        "yaw": -0.3503835214490767,
        "pitch": 0.024395915234936894,
        "fov": 1.349281773378271
      },
      "linkHotspots": [
        {
          "yaw": -0.06550723644540746,
          "pitch": 0.4664408608151369,
          "rotation": 0,
          "target": "0-centro"
        },
        {
          "yaw": -0.32161957124621665,
          "pitch": -0.19867960720013222,
          "rotation": 0,
          "target": "2-chimenea"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-chimenea",
      "name": "chimenea",
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
        "yaw": 0.00017612240000275392,
        "pitch": 0,
        "fov": 1.349281773378271
      },
      "linkHotspots": [
        {
          "yaw": -0.15015159821057011,
          "pitch": 0.4327574470560265,
          "rotation": 0,
          "target": "0-centro"
        },
        {
          "yaw": -0.12395337481646962,
          "pitch": -0.1251857621141106,
          "rotation": 0,
          "target": "1-entrada"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "Project Title",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": true,
    "fullscreenButton": false,
    "viewControlButtons": false
  }
};
