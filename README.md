Posture Monitoring IoT System
Project Overview

This project is an IoT-based posture monitoring system designed to track and improve spinal posture. It combines sensors, a microcontroller, cloud services, and mobile/web applications to provide real-time feedback, notifications, and posture trend visualization.

Hardware Components

ESP32 Microcontroller – Dual-core Tensilica LX6, 240 MHz, built-in Wi-Fi and Bluetooth, 4 MB flash.

MPU6050 Sensor – 6-axis motion tracking (3-axis accelerometer + 3-axis gyroscope).

Flex Sensors – Variable resistors to measure spinal bending and curvature.

Actuators – Vibration motor for tactile feedback and piezoelectric buzzer for auditory alerts.

Power Supply – Rechargeable 5V–12V Li-ion battery with stable current output.

Firmware & Embedded Tools

Arduino IDE – Development of ESP32 firmware in Embedded C/C++.

Proteus – Circuit design and simulation of sensor-actuator system.

I²C Protocol – For MPU6050 sensor data communication with ESP32.

UART Protocol – For serial debugging and monitoring.

Wi-Fi (802.11 b/g/n) – For IoT connectivity to Firebase cloud.

Logic Analyzer & Oscilloscope – For debugging and timing verification.

Software Stack
IoT Cloud Layer

Firebase Realtime Database – For posture data logging and synchronization.

Firebase Authentication – Secure user login and app data access.

Firebase Cloud Messaging (FCM) – Push notifications for prolonged bad posture alerts.

Mobile Application Layer (Kotlin App)

Kotlin (Android Native) – Core app development language.

Firebase SDK – Real-time posture updates from ESP32.

Graph Libraries – For daily/weekly posture trend visualization.

Material UI Components – Clean and ergonomic UI/UX.

Web Dashboard Layer (Next.js App)

Next.js (React Framework) – For responsive posture monitoring dashboard.

Tailwind CSS / Material UI – For modern and minimal front-end design.

Firebase SDK (Web) – To fetch and display posture history.

Recharts / Chart.js – Interactive posture trend graphs.

Authentication Integration – Sync with Firebase login used by mobile app.

Features

Real-time posture monitoring using MPU6050 and flex sensors.

Tactile and auditory feedback for incorrect posture.

Cloud storage of posture data for historical tracking.

Mobile app with visualized posture trends and notifications.

Web dashboard for remote posture analysis.

Getting Started
Hardware Setup

Connect ESP32 with MPU6050 sensor via I²C.

Connect flex sensors to analog input pins on ESP32.

Connect vibration motor and piezo buzzer to digital output pins.

Power the system using a rechargeable 5V–12V Li-ion battery.

Firmware Setup

Install Arduino IDE and ESP32 board support.

Load the provided firmware onto the ESP32.

Configure Wi-Fi credentials in the code for Firebase connectivity.

Monitor sensor data via Serial Monitor or Logic Analyzer.

Mobile App Setup

Open the Kotlin Android project in Android Studio.

Configure Firebase SDK with your project credentials.

Build and install the app on your Android device.

Web Dashboard Setup

Open the Next.js project.

Install dependencies using npm install.

Configure Firebase SDK with the same project credentials as the mobile app.

Run the dashboard using npm run dev.

Tools & Technologies Used

Microcontroller: ESP32

Sensors: MPU6050, Flex Sensors

Actuators: Vibration motor, Piezo buzzer

Firmware: Arduino IDE, I²C, UART

Cloud: Firebase Realtime Database, Authentication, FCM

Mobile App: Kotlin, Firebase SDK, Material UI

Web App: Next.js, Tailwind CSS, Recharts/Chart.js
