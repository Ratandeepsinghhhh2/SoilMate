-- Create Database
CREATE DATABASE soilmate;
USE soilmate;

-- =====================
-- 1. Farmer Table
-- =====================
CREATE TABLE Farmer (
    farmerID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(150),
    crops VARCHAR(100),
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE
);

-- =====================
-- 2. Admin Table
-- =====================
CREATE TABLE Admin (
    adminID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    authorityLevel INT
);

-- =====================
-- 3. User Table (for logins)
-- =====================
CREATE TABLE User (
    userID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    passwordHash VARCHAR(255) NOT NULL,
    role ENUM('farmer', 'admin') NOT NULL,
    farmerID INT NULL,
    adminID INT NULL,
    FOREIGN KEY (farmerID) REFERENCES Farmer(farmerID) ON DELETE CASCADE,
    FOREIGN KEY (adminID) REFERENCES Admin(adminID) ON DELETE CASCADE
);

-- =====================
-- 4. Device Table
-- =====================
CREATE TABLE Device (
    deviceID INT AUTO_INCREMENT PRIMARY KEY,
    farmerID INT,
    batteryStatus DECIMAL(5,2),
    solarStatus DECIMAL(5,2),
    installedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmerID) REFERENCES Farmer(farmerID) ON DELETE CASCADE
);

-- =====================
-- 5. Soil Sensor Table
-- =====================
CREATE TABLE SoilSensor (
    sensorID INT AUTO_INCREMENT PRIMARY KEY,
    deviceID INT,
    type VARCHAR(50),          -- moisture, pH, temperature, etc.
    value FLOAT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (deviceID) REFERENCES Device(deviceID) ON DELETE CASCADE
);

-- =====================
-- 6. Alerts Table
-- =====================
CREATE TABLE AlertSystem (
    alertID INT AUTO_INCREMENT PRIMARY KEY,
    farmerID INT,
    type VARCHAR(50),
    message TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('unread','read') DEFAULT 'unread',
    FOREIGN KEY (farmerID) REFERENCES Farmer(farmerID) ON DELETE CASCADE
);

-- =====================
-- 7. Reports Table
-- =====================
CREATE TABLE Reports (
    reportID INT AUTO_INCREMENT PRIMARY KEY,
    farmerID INT,
    reportType VARCHAR(50),
    reportData TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmerID) REFERENCES Farmer(farmerID) ON DELETE CASCADE
);

-- =====================
-- 8. Crop Table (better crop management)
-- =====================
CREATE TABLE Crop (
    cropID INT AUTO_INCREMENT PRIMARY KEY,
    farmerID INT,
    name VARCHAR(100),
    season VARCHAR(50),
    plantingDate DATE,
    harvestDate DATE,
    FOREIGN KEY (farmerID) REFERENCES Farmer(farmerID) ON DELETE CASCADE
);

-- =====================
-- 9. Weather Table
-- =====================
CREATE TABLE Weather (
    weatherID INT AUTO_INCREMENT PRIMARY KEY,
    location VARCHAR(100),
    temperature FLOAT,
    humidity FLOAT,
    rainfall FLOAT,
    recordedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =====================
-- 10. Device Maintenance Log
-- =====================
CREATE TABLE DeviceLog (
    logID INT AUTO_INCREMENT PRIMARY KEY,
    deviceID INT,
    action VARCHAR(100),
    performedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (deviceID) REFERENCES Device(deviceID) ON DELETE CASCADE
);

-- =====================
-- 11. Recommendations Table
-- =====================
CREATE TABLE Recommendation (
    recID INT AUTO_INCREMENT PRIMARY KEY,
    farmerID INT,
    cropID INT,
    type ENUM('fertilizer', 'irrigation'),
    message TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmerID) REFERENCES Farmer(farmerID) ON DELETE CASCADE,
    FOREIGN KEY (cropID) REFERENCES Crop(cropID) ON DELETE CASCADE
);

-- =====================
-- 12. Subsidy Table (govt/NGO support)
-- =====================
CREATE TABLE Subsidy (
    subsidyID INT AUTO_INCREMENT PRIMARY KEY,
    farmerID INT,
    programName VARCHAR(100),
    amount DECIMAL(10,2),
    approvedDate DATE,
    FOREIGN KEY (farmerID) REFERENCES Farmer(farmerID) ON DELETE CASCADE
);

-- =====================
-- 13. Sensor Summary (analytics)
-- =====================
CREATE TABLE SensorSummary (
    summaryID INT AUTO_INCREMENT PRIMARY KEY,
    deviceID INT,
    date DATE,
    avgMoisture FLOAT,
    avgTemperature FLOAT,
    avgPH FLOAT,
    FOREIGN KEY (deviceID) REFERENCES Device(deviceID) ON DELETE CASCADE
);

-- =====================
-- SAMPLE DATA
-- =====================

-- Insert Farmers
INSERT INTO Farmer (name, location, crops, phone, email)
VALUES ('Ramesh Kumar', 'Punjab, India', 'Wheat', '9876543210', 'ramesh@example.com');

-- Insert Admin
INSERT INTO Admin (name, email, authorityLevel)
VALUES ('System Admin', 'admin@soilmate.com', 5);

-- Insert User (farmer login)
INSERT INTO User (username, passwordHash, role, farmerID)
VALUES ('ramesh', 'hashed_password_here', 'farmer', 1);

-- Insert User (admin login)
INSERT INTO User (username, passwordHash, role, adminID)
VALUES ('admin', 'hashed_password_here', 'admin', 1);

-- Insert Device
INSERT INTO Device (farmerID, batteryStatus, solarStatus)
VALUES (1, 85.50, 92.30);

-- Insert Soil Sensor Data
INSERT INTO SoilSensor (deviceID, type, value)
VALUES (1, 'Moisture', 30.5);

-- Insert Alert
INSERT INTO AlertSystem (farmerID, type, message)
VALUES (1, 'Low Moisture', 'Soil moisture is below safe level');

-- Insert Report
INSERT INTO Reports (farmerID, reportType, reportData)
VALUES (1, 'Weekly', 'Moisture average: 28.3%, Alerts: 2');

-- Insert Crop
INSERT INTO Crop (farmerID, name, season, plantingDate, harvestDate)
VALUES (1, 'Wheat', 'Rabi', '2025-01-15', '2025-04-30');

-- Insert Weather Data
INSERT INTO Weather (location, temperature, humidity, rainfall)
VALUES ('Punjab, India', 25.5, 65.0, 12.3);

-- Insert Device Log
INSERT INTO DeviceLog (deviceID, action)
VALUES (1, 'Battery replaced');

-- Insert Recommendation
INSERT INTO Recommendation (farmerID, cropID, type, message)
VALUES (1, 1, 'fertilizer', 'Add 50kg urea per acre this week');

-- Insert Subsidy
INSERT INTO Subsidy (farmerID, programName, amount, approvedDate)
VALUES (1, 'PM-Kisan Yojana', 6000.00, '2025-03-01');

-- Insert Sensor Summary
INSERT INTO SensorSummary (deviceID, date, avgMoisture, avgTemperature, avgPH)
VALUES (1, '2025-09-27', 28.3, 26.4, 6.5);
-- 1. Show all farmers
SELECT * FROM Farmer;

-- 2. Show all devices of a farmer
SELECT * FROM Device WHERE farmerID = 1;

-- 3. Show all soil sensor readings for a device
SELECT * FROM SoilSensor WHERE deviceID = 1 ORDER BY timestamp DESC;

-- 4. Get latest moisture reading for a farmer
SELECT s.value AS Moisture, s.timestamp
FROM SoilSensor s
JOIN Device d ON s.deviceID = d.deviceID
WHERE d.farmerID = 1 AND s.type = 'Moisture'
ORDER BY s.timestamp DESC
LIMIT 1;

-- 5. Show all alerts for a farmer
SELECT type, message, status, timestamp
FROM AlertSystem
WHERE farmerID = 1
ORDER BY timestamp DESC;

-- 6. Mark an alert as "read"
UPDATE AlertSystem
SET status = 'read'
WHERE alertID = 1;

-- 7. Show all reports of a farmer
SELECT reportType, reportData, createdAt
FROM Reports
WHERE farmerID = 1;

-- 8. Show all crops of a farmer
SELECT name, season, plantingDate, harvestDate
FROM Crop
WHERE farmerID = 1;

-- 9. Find farmers who got government subsidies
SELECT f.name, s.programName, s.amount, s.approvedDate
FROM Subsidy s
JOIN Farmer f ON s.farmerID = f.farmerID;

-- 10. Device maintenance history
SELECT d.deviceID, l.action, l.performedAt
FROM DeviceLog l
JOIN Device d ON l.deviceID = d.deviceID
WHERE d.farmerID = 1;

-- 11. Recommendations for a farmer
SELECT r.type, r.message, r.createdAt
FROM Recommendation r
WHERE r.farmerID = 1;

-- 12. Average sensor readings per day (from summary table)
SELECT date, avgMoisture, avgTemperature, avgPH
FROM SensorSummary
WHERE deviceID = 1
ORDER BY date DESC;

-- 13. Farmers with low soil moisture (< 30%)
SELECT f.name, s.value AS moisture, s.timestamp
FROM Farmer f
JOIN Device d ON f.farmerID = d.farmerID
JOIN SoilSensor s ON d.deviceID = s.deviceID
WHERE s.type = 'Moisture' AND s.value < 30
ORDER BY s.timestamp DESC;

-- 14. Weather records for a location
SELECT * FROM Weather WHERE location = 'Punjab, India';

-- 15. Login check (demo only, replace with real password hash)
SELECT username, role
FROM User
WHERE username = 'ramesh' AND passwordHash = 'hashed_password_here';
