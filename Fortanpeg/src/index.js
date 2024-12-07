"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//import { func } from "./folder/hola.js";
var Parser = __importStar(require("../peggy/grammar.js"));
var analizar = document.getElementById('btn_analizar');
var editor = document.getElementById('inputCode');
var outputDiv = document.getElementById('outputCode');
var nuevo = document.getElementById('btn_nuevo');
analizar.addEventListener('click', function () {
    try {
        var input = editor.value; // Obtén el valor del editor
        var output = Parser.parse(input); // Intenta analizar el input con PEG.js
        console.log(output); // Muestra el resultado en la consola
        outputDiv.innerHTML = "Cadena válida"; // Muestra un mensaje si no hay errores
    }
    catch (error) {
        if (error instanceof Error) {
            // Extraer información específica del error de PEG.js
            var details = error.location; // PEG.js incluye `location` en los errores
            var found = error.found; // Token encontrado
            var expected = error.expected; // Tokens esperados
            var errorMessage = "Error al analizar el input:\n";
            errorMessage += "Mensaje: ".concat(error.message, "\n");
            if (details) {
                var start = details.start, end = details.end;
                errorMessage += "Posici\u00F3n: L\u00EDnea ".concat(start.line, ", Columna ").concat(start.column, "\n");
                errorMessage += "Rango: Caracteres ".concat(start.offset, " - ").concat(end.offset, "\n");
            }
            if (found !== undefined) {
                errorMessage += "Token encontrado: \"".concat(found, "\"\n");
            }
            if (expected && expected.length > 0) {
                var expectedTokens = expected.map(function (e) { return "\"".concat(e.text || e.description, "\""); }).join(", ");
                errorMessage += "Tokens esperados: ".concat(expectedTokens, "\n");
            }
            console.error("Error detallado:", error.message, details); // Muestra información en la consola
            outputDiv.innerHTML = errorMessage; // Muestra la información detallada en el div
        }
        else {
            console.error("Error desconocido:", error); // En caso de que no sea una instancia de Error
            outputDiv.innerHTML = "Error desconocido";
        }
    }
});
nuevo.addEventListener('click', function () {
    editor.value = "";
    outputDiv.innerHTML = "";
});
//# sourceMappingURL=index.js.map