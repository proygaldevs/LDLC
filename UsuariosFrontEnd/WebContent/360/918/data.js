var APP_DATA = {
  "scenes": [
    {
      "id": "0-saln",
      "name": "Salón",
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
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -0.28252916682709994,
          "pitch": 0.021294824361724807,
          "rotation": 0,
          "target": "1-comedor"
        },
        {
          "yaw": -0.9379638275796758,
          "pitch": 0.17438443393585423,
          "rotation": 0,
          "target": "2-cocina"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-comedor",
      "name": "Comedor",
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
        "yaw": -1.4114267500666902,
        "pitch": 0.010668929992149856,
        "fov": 1.4017901537432673
      },
      "linkHotspots": [
        {
          "yaw": -1.6167368977835856,
          "pitch": 0.3406683887362334,
          "rotation": 0,
          "target": "0-saln"
        },
        {
          "yaw": 0.12021156843798053,
          "pitch": 0.3068024036012904,
          "rotation": 0,
          "target": "2-cocina"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-cocina",
      "name": "Cocina",
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
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -0.41423508366326267,
          "pitch": 0.36680720929456356,
          "rotation": 0,
          "target": "1-comedor"
        },
        {
          "yaw": 0.17581335175505863,
          "pitch": -0.2026933508762525,
          "rotation": 0,
          "target": "0-saln"
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
    "viewControlButtons": true
  }
};
