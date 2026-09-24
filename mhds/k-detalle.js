// MHDS — paso a paso del cálculo de transmitancia térmica (K) de EV01 a EV14.
// ARCHIVO GENERADO: no editar a mano. Se regenera con
//   node envolvente/gen-k-detalle.mjs
// Fuente: envolvente/datos.js (base de materiales IRAM 11601 anexo A) y
// envolvente/soluciones.js (las capas de cada ficha). Criterios: IRAM 11601
// para las resistencias superficiales y 11605 para los máximos admisibles
// (temperatura exterior de diseño -3 °C, zona bioambiental II).
const K_DETALLE = {
 "EV01": {
  "tipo": "muro",
  "estacion": "invierno y verano (flujo horizontal)",
  "rsi": 0.13,
  "rse": 0.04,
  "capas": [
   {
    "n": "Hormigón normal con agregados pétreos (2400)",
    "e": 0.1,
    "lambda": 1.63,
    "rTab": null,
    "r": 0.0613,
    "nota": null
   }
  ],
  "sumaCapas": 0.0613,
  "rTot": 0.2313,
  "k": 4.32,
  "kExacto": 4.3225,
  "esp": 10,
  "clase": "No cumple",
  "limites": {
   "A": 0.33,
   "B": 0.91,
   "C": 1.59
  }
 },
 "EV02": {
  "tipo": "muro",
  "estacion": "invierno y verano (flujo horizontal)",
  "rsi": 0.13,
  "rse": 0.04,
  "capas": [
   {
    "n": "Morteros de revoques y juntas (exterior) (1800 a 2000)",
    "e": 0.02,
    "lambda": 1.16,
    "rTab": null,
    "r": 0.0172,
    "nota": null
   },
   {
    "n": "Ladrillos cerámicos macizos (1600)",
    "e": 0.12,
    "lambda": 0.81,
    "rTab": null,
    "r": 0.1481,
    "nota": null
   },
   {
    "n": "Mortero de cemento (2000)",
    "e": 0.005,
    "lambda": 1.13,
    "rTab": null,
    "r": 0.0044,
    "nota": null
   },
   {
    "n": "Morteros de revoques y juntas (exterior) (1800 a 2000)",
    "e": 0.025,
    "lambda": 1.16,
    "rTab": null,
    "r": 0.0216,
    "nota": null
   }
  ],
  "sumaCapas": 0.1914,
  "rTot": 0.3614,
  "k": 2.77,
  "kExacto": 2.7673,
  "esp": 17,
  "clase": "No cumple",
  "limites": {
   "A": 0.33,
   "B": 0.91,
   "C": 1.59
  }
 },
 "EV03": {
  "tipo": "muro",
  "estacion": "invierno y verano (flujo horizontal)",
  "rsi": 0.13,
  "rse": 0.04,
  "capas": [
   {
    "n": "Morteros de revoques y juntas (exterior) (1800 a 2000)",
    "e": 0.02,
    "lambda": 1.16,
    "rTab": null,
    "r": 0.0172,
    "nota": null
   },
   {
    "n": "Ladrillo 12 x 18 x 25.0/33.0",
    "e": 0.12,
    "lambda": null,
    "rTab": 0.36,
    "r": 0.36,
    "nota": null
   },
   {
    "n": "Mortero de cemento (2000)",
    "e": 0.005,
    "lambda": 1.13,
    "rTab": null,
    "r": 0.0044,
    "nota": null
   },
   {
    "n": "Morteros de revoques y juntas (exterior) (1800 a 2000)",
    "e": 0.025,
    "lambda": 1.16,
    "rTab": null,
    "r": 0.0216,
    "nota": null
   }
  ],
  "sumaCapas": 0.4032,
  "rTot": 0.5732,
  "k": 1.74,
  "kExacto": 1.7445,
  "esp": 17,
  "clase": "No cumple",
  "limites": {
   "A": 0.33,
   "B": 0.91,
   "C": 1.59
  }
 },
 "EV04": {
  "tipo": "muro",
  "estacion": "invierno y verano (flujo horizontal)",
  "rsi": 0.13,
  "rse": 0.04,
  "capas": [
   {
    "n": "Morteros de revoques y juntas (exterior) (1800 a 2000)",
    "e": 0.02,
    "lambda": 1.16,
    "rTab": null,
    "r": 0.0172,
    "nota": null
   },
   {
    "n": "Ladrillo 18 x 18 x 25.0/33.0",
    "e": 0.18,
    "lambda": null,
    "rTab": 0.41,
    "r": 0.41,
    "nota": null
   },
   {
    "n": "Mortero de cemento (2000)",
    "e": 0.005,
    "lambda": 1.13,
    "rTab": null,
    "r": 0.0044,
    "nota": null
   },
   {
    "n": "Morteros de revoques y juntas (exterior) (1800 a 2000)",
    "e": 0.025,
    "lambda": 1.16,
    "rTab": null,
    "r": 0.0216,
    "nota": null
   }
  ],
  "sumaCapas": 0.4532,
  "rTot": 0.6232,
  "k": 1.6,
  "kExacto": 1.6046,
  "esp": 23,
  "clase": "No cumple",
  "limites": {
   "A": 0.33,
   "B": 0.91,
   "C": 1.59
  }
 },
 "EV05": {
  "tipo": "muro",
  "estacion": "invierno y verano (flujo horizontal)",
  "rsi": 0.13,
  "rse": 0.04,
  "capas": [
   {
    "n": "Morteros de revoques y juntas (exterior) (1800 a 2000)",
    "e": 0.015,
    "lambda": 1.16,
    "rTab": null,
    "r": 0.0129,
    "nota": null
   },
   {
    "n": "Ladrillos cerámicos macizos (1600)",
    "e": 0.27,
    "lambda": 0.81,
    "rTab": null,
    "r": 0.3333,
    "nota": null
   },
   {
    "n": "Morteros de revoques y juntas (exterior) (1800 a 2000)",
    "e": 0.015,
    "lambda": 1.16,
    "rTab": null,
    "r": 0.0129,
    "nota": null
   }
  ],
  "sumaCapas": 0.3592,
  "rTot": 0.5292,
  "k": 1.89,
  "kExacto": 1.8897,
  "esp": 30,
  "clase": "No cumple",
  "limites": {
   "A": 0.33,
   "B": 0.91,
   "C": 1.59
  }
 },
 "EV06": {
  "tipo": "muro",
  "estacion": "invierno y verano (flujo horizontal)",
  "rsi": 0.13,
  "rse": 0.04,
  "capas": [
   {
    "n": "Morteros de revoques y juntas (exterior) (1800 a 2000)",
    "e": 0.02,
    "lambda": 1.16,
    "rTab": null,
    "r": 0.0172,
    "nota": null
   },
   {
    "n": "Ladrillos cerámicos macizos (1600)",
    "e": 0.12,
    "lambda": 0.81,
    "rTab": null,
    "r": 0.1481,
    "nota": null
   },
   {
    "n": "Mortero de cemento (2000)",
    "e": 0.005,
    "lambda": 1.13,
    "rTab": null,
    "r": 0.0044,
    "nota": null
   },
   {
    "n": "Superficies de mediana o alta emitancia (caso general) (50mm a 100mm)",
    "e": 0.03,
    "lambda": null,
    "rTab": 0.17,
    "r": 0.17,
    "nota": null
   },
   {
    "n": "Ladrillos cerámicos macizos (1600)",
    "e": 0.12,
    "lambda": 0.81,
    "rTab": null,
    "r": 0.1481,
    "nota": null
   },
   {
    "n": "Morteros de revoques y juntas (exterior) (1800 a 2000)",
    "e": 0.025,
    "lambda": 1.16,
    "rTab": null,
    "r": 0.0216,
    "nota": null
   }
  ],
  "sumaCapas": 0.5095,
  "rTot": 0.6795,
  "k": 1.47,
  "kExacto": 1.4716,
  "esp": 32,
  "clase": "Clase C",
  "limites": {
   "A": 0.33,
   "B": 0.91,
   "C": 1.59
  }
 },
 "EV07": {
  "tipo": "muro",
  "estacion": "invierno y verano (flujo horizontal)",
  "rsi": 0.13,
  "rse": 0.04,
  "capas": [
   {
    "n": "Morteros de revoques y juntas (exterior) (1800 a 2000)",
    "e": 0.02,
    "lambda": 1.16,
    "rTab": null,
    "r": 0.0172,
    "nota": null
   },
   {
    "n": "Ladrillo 18 x 18 x 25.0/33.0",
    "e": 0.18,
    "lambda": null,
    "rTab": 0.41,
    "r": 0.41,
    "nota": null
   },
   {
    "n": "Mortero de cemento (2000)",
    "e": 0.005,
    "lambda": 1.13,
    "rTab": null,
    "r": 0.0044,
    "nota": null
   },
   {
    "n": "Mortero de cemento (2000)",
    "e": 0.003,
    "lambda": 1.13,
    "rTab": null,
    "r": 0.0027,
    "nota": null
   },
   {
    "n": "Poliestireno expandido en planchas (20)",
    "e": 0.025,
    "lambda": 0.035,
    "rTab": null,
    "r": 0.7143,
    "nota": null
   },
   {
    "n": "Mortero de cemento (2000)",
    "e": 0.005,
    "lambda": 1.13,
    "rTab": null,
    "r": 0.0044,
    "nota": null
   }
  ],
  "sumaCapas": 1.153,
  "rTot": 1.323,
  "k": 0.76,
  "kExacto": 0.7558,
  "esp": 23.8,
  "clase": "Clase B",
  "limites": {
   "A": 0.33,
   "B": 0.91,
   "C": 1.59
  }
 },
 "EV08": {
  "tipo": "muro",
  "estacion": "invierno y verano (flujo horizontal)",
  "rsi": 0.13,
  "rse": 0.04,
  "capas": [
   {
    "n": "Placa de yeso (1000)",
    "e": 0.0125,
    "lambda": 0.44,
    "rTab": null,
    "r": 0.0284,
    "nota": null
   },
   {
    "n": "Lana de vidrio",
    "e": 0.1,
    "lambda": null,
    "rTab": 2.3,
    "r": 2.3,
    "nota": null
   },
   {
    "n": "Placa OSB (650)",
    "e": 0.011,
    "lambda": 0.13,
    "rTab": null,
    "r": 0.0846,
    "nota": null
   },
   {
    "n": "Barrera de agua y viento ( tipo wichi roofing)",
    "e": 0.0003,
    "lambda": null,
    "rTab": null,
    "r": 0,
    "nota": "barrera de vapor o de viento: aporte térmico despreciable"
   },
   {
    "n": "Poliestireno expandido en planchas (20)",
    "e": 0.02,
    "lambda": 0.035,
    "rTab": null,
    "r": 0.5714,
    "nota": null
   },
   {
    "n": "Mortero de cemento (2000)",
    "e": 0.005,
    "lambda": 1.13,
    "rTab": null,
    "r": 0.0044,
    "nota": null
   }
  ],
  "sumaCapas": 2.9889,
  "rTot": 3.1589,
  "k": 0.32,
  "kExacto": 0.3166,
  "esp": 14.9,
  "clase": "Clase A",
  "limites": {
   "A": 0.33,
   "B": 0.91,
   "C": 1.59
  }
 },
 "EV09": {
  "tipo": "cubierta",
  "estacion": "verano (flujo descendente)",
  "rsi": 0.17,
  "rse": 0.04,
  "capas": [
   {
    "n": "Hormigón normal con agregados pétreos (2400)",
    "e": 0.1,
    "lambda": 1.63,
    "rTab": null,
    "r": 0.0613,
    "nota": null
   },
   {
    "n": "Polietileno (100 um)",
    "e": 0.0001,
    "lambda": null,
    "rTab": null,
    "r": 0,
    "nota": "barrera de vapor o de viento: aporte térmico despreciable"
   },
   {
    "n": "Hormigón de ladrillo triturado (1600)",
    "e": 0.06,
    "lambda": 0.76,
    "rTab": null,
    "r": 0.0789,
    "nota": null
   },
   {
    "n": "Mortero de cemento (2000)",
    "e": 0.02,
    "lambda": 1.13,
    "rTab": null,
    "r": 0.0177,
    "nota": null
   },
   {
    "n": "Asfalto (espesor mínimo 7 mm y membranas asfálticas) (2000)",
    "e": 0.005,
    "lambda": 0.7,
    "rTab": null,
    "r": 0.0071,
    "nota": null
   }
  ],
  "sumaCapas": 0.1651,
  "rTot": 0.3751,
  "k": 2.67,
  "kExacto": 2.6657,
  "esp": 18.5,
  "clase": "No cumple",
  "limites": {
   "A": 0.18,
   "B": 0.45,
   "C": 0.72
  }
 },
 "EV10": {
  "tipo": "cubierta",
  "estacion": "verano (flujo descendente)",
  "rsi": 0.17,
  "rse": 0.04,
  "capas": [
   {
    "n": "Placa de yeso (1000)",
    "e": 0.0125,
    "lambda": 0.44,
    "rTab": null,
    "r": 0.0284,
    "nota": null
   },
   {
    "n": "Superficies de mediana o alta emitancia (caso general) (50mm a 100mm)",
    "e": 0.3,
    "lambda": null,
    "rTab": 0.21,
    "r": 0.21,
    "nota": null
   },
   {
    "n": "Chapa de acero",
    "e": 0.0005,
    "lambda": null,
    "rTab": null,
    "r": 0,
    "nota": "sin dato en la base; su resistencia es despreciable"
   }
  ],
  "sumaCapas": 0.2384,
  "rTot": 0.4484,
  "k": 2.23,
  "kExacto": 2.2301,
  "esp": 31.3,
  "clase": "No cumple",
  "limites": {
   "A": 0.18,
   "B": 0.45,
   "C": 0.72
  }
 },
 "EV11": {
  "tipo": "cubierta",
  "estacion": "verano (flujo descendente)",
  "rsi": 0.17,
  "rse": 0.04,
  "capas": [
   {
    "n": "Placa de yeso (1000)",
    "e": 0.0125,
    "lambda": 0.44,
    "rTab": null,
    "r": 0.0284,
    "nota": null
   },
   {
    "n": "Lana de vidrio",
    "e": 0.05,
    "lambda": null,
    "rTab": 1.2,
    "r": 1.2,
    "nota": null
   },
   {
    "n": "Polietileno (100 um)",
    "e": 0.0001,
    "lambda": null,
    "rTab": null,
    "r": 0,
    "nota": "barrera de vapor o de viento: aporte térmico despreciable"
   },
   {
    "n": "Superficies de mediana o alta emitancia (caso general) (50mm a 100mm)",
    "e": 0.3,
    "lambda": null,
    "rTab": 0.21,
    "r": 0.21,
    "nota": null
   },
   {
    "n": "Chapa de acero",
    "e": 0.0005,
    "lambda": null,
    "rTab": null,
    "r": 0,
    "nota": "sin dato en la base; su resistencia es despreciable"
   }
  ],
  "sumaCapas": 1.4384,
  "rTot": 1.6484,
  "k": 0.61,
  "kExacto": 0.6066,
  "esp": 36.3,
  "clase": "Clase C",
  "limites": {
   "A": 0.18,
   "B": 0.45,
   "C": 0.72
  }
 },
 "EV12": {
  "tipo": "cubierta",
  "estacion": "verano (flujo descendente)",
  "rsi": 0.17,
  "rse": 0.04,
  "capas": [
   {
    "n": "Placa de yeso (1000)",
    "e": 0.0125,
    "lambda": 0.44,
    "rTab": null,
    "r": 0.0284,
    "nota": null
   },
   {
    "n": "Lana de vidrio",
    "e": 0.1,
    "lambda": null,
    "rTab": 2.3,
    "r": 2.3,
    "nota": null
   },
   {
    "n": "Polietileno (100 um)",
    "e": 0.0001,
    "lambda": null,
    "rTab": null,
    "r": 0,
    "nota": "barrera de vapor o de viento: aporte térmico despreciable"
   },
   {
    "n": "Placa OSB (650)",
    "e": 0.011,
    "lambda": 0.13,
    "rTab": null,
    "r": 0.0846,
    "nota": null
   },
   {
    "n": "Barrera de agua y viento ( tipo wichi roofing)",
    "e": 0.0003,
    "lambda": null,
    "rTab": null,
    "r": 0,
    "nota": "barrera de vapor o de viento: aporte térmico despreciable"
   },
   {
    "n": "Lana de vidrio",
    "e": 0.05,
    "lambda": null,
    "rTab": 1.2,
    "r": 1.2,
    "nota": null
   },
   {
    "n": "Chapa de acero",
    "e": 0.0005,
    "lambda": null,
    "rTab": null,
    "r": 0,
    "nota": "sin dato en la base; su resistencia es despreciable"
   }
  ],
  "sumaCapas": 3.613,
  "rTot": 3.823,
  "k": 0.26,
  "kExacto": 0.2616,
  "esp": 17.4,
  "clase": "Clase B",
  "limites": {
   "A": 0.18,
   "B": 0.45,
   "C": 0.72
  }
 },
 "EV13": {
  "tipo": "cubierta",
  "estacion": "verano (flujo descendente)",
  "rsi": 0.17,
  "rse": 0.04,
  "capas": [
   {
    "n": "Placa de yeso (1000)",
    "e": 0.0125,
    "lambda": 0.44,
    "rTab": null,
    "r": 0.0284,
    "nota": null
   },
   {
    "n": "Lana de vidrio",
    "e": 0.05,
    "lambda": null,
    "rTab": 1.2,
    "r": 1.2,
    "nota": null
   },
   {
    "n": "Polietileno (100 um)",
    "e": 0.0001,
    "lambda": null,
    "rTab": null,
    "r": 0,
    "nota": "barrera de vapor o de viento: aporte térmico despreciable"
   },
   {
    "n": "Chapa de acero",
    "e": 0.0007,
    "lambda": null,
    "rTab": null,
    "r": 0,
    "nota": "sin dato en la base; su resistencia es despreciable"
   },
   {
    "n": "Hormigón normal con agregados pétreos (2400)",
    "e": 0.05,
    "lambda": 1.63,
    "rTab": null,
    "r": 0.0307,
    "nota": null
   },
   {
    "n": "Hormigón con poliestireno expandido (300)",
    "e": 0.05,
    "lambda": 0.09,
    "rTab": null,
    "r": 0.5556,
    "nota": null
   },
   {
    "n": "Mortero de cemento (2000)",
    "e": 0.02,
    "lambda": 1.13,
    "rTab": null,
    "r": 0.0177,
    "nota": null
   },
   {
    "n": "Ceramicos, tipo porcela con mortero de cemento (1900)",
    "e": 0.01,
    "lambda": 0.7,
    "rTab": null,
    "r": 0.0143,
    "nota": null
   }
  ],
  "sumaCapas": 1.8466,
  "rTot": 2.0566,
  "k": 0.49,
  "kExacto": 0.4862,
  "esp": 19.3,
  "clase": "Clase C",
  "limites": {
   "A": 0.18,
   "B": 0.45,
   "C": 0.72
  }
 },
 "EV14": {
  "tipo": "cubierta",
  "estacion": "verano (flujo descendente)",
  "rsi": 0.17,
  "rse": 0.04,
  "capas": [
   {
    "n": "Placa de yeso (1000)",
    "e": 0.0125,
    "lambda": 0.44,
    "rTab": null,
    "r": 0.0284,
    "nota": null
   },
   {
    "n": "Lana de vidrio",
    "e": 0.1,
    "lambda": null,
    "rTab": 2.3,
    "r": 2.3,
    "nota": null
   },
   {
    "n": "Superficies de mediana o alta emitancia (caso general) (50mm a 100mm)",
    "e": 0.3,
    "lambda": null,
    "rTab": 0.21,
    "r": 0.21,
    "nota": null
   },
   {
    "n": "Chapa de acero",
    "e": 0.0005,
    "lambda": null,
    "rTab": null,
    "r": 0,
    "nota": "sin dato en la base; su resistencia es despreciable"
   }
  ],
  "sumaCapas": 2.5384,
  "rTot": 2.7484,
  "k": 0.36,
  "kExacto": 0.3638,
  "esp": 41.3,
  "clase": "Clase B",
  "limites": {
   "A": 0.18,
   "B": 0.45,
   "C": 0.72
  }
 }
};
