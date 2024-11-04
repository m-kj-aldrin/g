import { formatSmallFloats } from "./numbers.js";

/**
 * @param {Float32Array|number[]} elements
 * @param {number} numRows
 * @param {number} numCols
 * @param {number} [columnSpacing=2]
 * @param {string} [matrixPrefix="Mat"]
 */
export function matrixToString(
    elements,
    numRows,
    numCols,
    columnSpacing = 2,
    matrixPrefix = ""
) {
    let repr = "";

    const spacer = " ".repeat(columnSpacing);

    const formattedRows = [];

    for (let i = 0; i < numRows; i++) {
        const row = [];
        for (let j = 0; j < numCols; j++) {
            let value = elements[j * numRows + i];
            let formatted = formatSmallFloats(value);
            row.push(formatted);
        }
        formattedRows.push(row);
    }

    const colWidths = [];
    for (let col = 0; col < numCols; col++) {
        let maxWidth = 0;
        for (let row = 0; row < numRows; row++) {
            const cell = formattedRows[row][col];
            const cellWidth = cell.startsWith("-")
                ? cell.length
                : cell.length + 1;
            if (cellWidth > maxWidth) {
                maxWidth = cellWidth;
            }
        }
        colWidths[col] = maxWidth;
    }

    for (let i = 0; i < numRows; i++) {
        const formattedLine = formattedRows[i]
            .map((cell, j) => {
                const width = colWidths[j];

                if (cell.startsWith("-")) {
                    return cell.padStart(width);
                } else {
                    return " " + cell.padStart(width - 1);
                }
            })
            .join(spacer);

        i !== 0 && (repr += "     ");
        repr += `${formattedLine}`;
        i !== numRows - 1 && (repr += "\n");
    }

    return `${matrixPrefix}(${repr} )`;
}
