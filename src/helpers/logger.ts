import fs from 'fs';

export function logError(error: Error): void {
    const logMessage = `${new Date().toISOString()} - ${error.stack}\n`;

    fs.appendFile('error.log', logMessage, (err) => {
        if (err) {
            console.error('Erro ao escrever no arquivo de log:', err);
        }
    });
}