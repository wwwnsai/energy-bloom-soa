import { exec } from 'child_process';

// Define service start commands
const services = [
  'npm run start:billings',
  'npm run start:users',
  'npm run start:devices',
  'npm run start:electricity-usages',
];

// Start all services concurrently
services.forEach((command) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${command}`, error);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
});
