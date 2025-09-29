# 🧍‍♂️ Posture Monitoring IoT System



## 📌 Project Overview

The **Posture Monitoring IoT System** is an integrated solution designed to track and improve spinal posture. Combining sensors, a microcontroller, cloud services, and mobile/web applications, it provides real-time feedback, notifications, and posture trend visualizations.

---

## 🛠️ Hardware Components

- **ESP32 Microcontroller**: Dual-core Tensilica LX6, 240 MHz, built-in Wi-Fi and Bluetooth, 4 MB flash.
- **MPU6050 Sensor**: 6-axis motion tracking (3-axis accelerometer + 3-axis gyroscope).
- **Flex Sensors**: Variable resistors to measure spinal bending and curvature.
- **Actuators**: Vibration motor for tactile feedback and piezoelectric buzzer for auditory alerts.
- **Power Supply**: Rechargeable 5V–12V Li-ion battery with stable current output.

---

## 💻 Firmware & Embedded Tools

- **Arduino IDE**: Development of ESP32 firmware in Embedded C/C++.
- **Proteus**: Circuit design and simulation of sensor-actuator system.
- **I²C Protocol**: For MPU6050 sensor data communication with ESP32.
- **UART Protocol**: For serial debugging and monitoring.
- **Wi-Fi (802.11 b/g/n)**: For IoT connectivity to Firebase cloud.
- **Logic Analyzer & Oscilloscope**: For debugging and timing verification.

---

## ☁️ Software Stack (Cloud + App + Web)

### IoT Cloud Layer

- Firebase Realtime Database – posture data logging
- Firebase Authentication – secure login
- Firebase Cloud Messaging (FCM) – push notifications

### Mobile Application Layer (Kotlin App)

- Kotlin (Android Native) – core app development
- Firebase SDK – real-time posture updates
- Graph Libraries – visualize posture trends
- Material UI Components – clean and ergonomic UI

### Web Dashboard Layer (Next.js App)

- Next.js (React Framework) – responsive web dashboard
- Tailwind CSS / Material UI – modern UI design
- Firebase SDK (Web) – fetch and display posture history
- Recharts / Chart.js – interactive posture graphs
- Authentication Integration – sync with mobile app login

---

## 🚀 Getting Started

### Hardware Setup

1. **Sensor Connections**:
   - Connect the **MPU6050** to the **ESP32** via the I²C interface.
   - Attach **flex sensors** to analog input pins on the ESP32.
   - Connect the **vibration motor** and **piezo buzzer** to digital output pins.

2. **Power Supply**:
   - Use a **5V–12V Li-ion battery** to power the system.

### Firmware Development

1. **Arduino IDE Setup**:
   - Install the **Arduino IDE** and configure it for **ESP32** development.
   - Load the provided firmware onto the ESP32.

2. **Wi-Fi Configuration**:
   - Set up the Wi-Fi credentials in the firmware for Firebase connectivity.

3. **Sensor Calibration**:
   - Calibrate the **MPU6050** and **flex sensors** for accurate data readings.

### Mobile Application (Kotlin)

1. **Project Setup**:
   - Open the Kotlin project in **Android Studio**.

2. **Firebase Integration**:
   - Configure the **Firebase SDK** with your project credentials.

3. **App Development**:
   - Implement features for real-time posture monitoring and feedback.

4. **UI/UX Design**:
   - Design a user-friendly interface using **Material UI Components**.

### Web Dashboard (Next.js)

1. **Project Initialization**:
   - Clone the repository and navigate to the project directory.

2. **Dependency Installation**:
   - Run `npm install` to install necessary dependencies.

3. **Firebase Configuration**:
   - Set up the **Firebase SDK** with your project credentials.

4. **Dashboard Development**:
   - Develop features for viewing posture trends and history.

---

## 🧪 Tools & Technologies Used

- **Microcontroller**: ESP32
- **Sensors**: MPU6050, Flex Sensors
- **Actuators**: Vibration Motor, Piezo Buzzer
- **Firmware**: Arduino IDE, I²C, UART
- **Cloud**: Firebase Realtime DB, Authentication, FCM
- **Mobile App**: Kotlin, Firebase SDK, Material UI
- **Web App**: Next.js, Tailwind CSS, Recharts/Chart.js

---

## 📄 License

This project is licensed under the **MIT License**.
