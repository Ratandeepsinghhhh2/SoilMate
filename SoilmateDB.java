import java.sql.*;
import java.util.Scanner;

public class SoilmateDB {
    private static final String URL = "jdbc:mysql://localhost:3306/Soilmatedb";
    private static final String USER = "root";
    private static final String PASSWORD = "Ratan@2006";

    public static void main(String[] args) {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD)) {
            System.out.println("✅ Connected to SoilMate Database!");
            Scanner sc = new Scanner(System.in);
            int choice;

            do {
                System.out.println("\n===== SoilMate Menu =====");
                System.out.println("1. Add Farmer");
                System.out.println("2. View Farmers");
                System.out.println("3. Add Device");
                System.out.println("4. Add Soil Sensor Data");
                System.out.println("5. View Alerts");
                System.out.println("6. Mark Alert as Read");
                System.out.println("7. Generate Report");
                System.out.println("8. Generate Recommendations");
                System.out.println("9. View Recommendations");
                System.out.println("10. Exit");
                System.out.print("Enter choice: ");
                choice = sc.nextInt();
                sc.nextLine(); // consume newline

                switch (choice) {
                    case 1 -> addFarmer(conn, sc);
                    case 2 -> viewFarmers(conn);
                    case 3 -> addDevice(conn, sc);
                    case 4 -> addSensor(conn, sc);
                    case 5 -> viewAlerts(conn);
                    case 6 -> markAlertRead(conn, sc);
                    case 7 -> generateReport(conn);
                    case 8 -> generateRecommendations(conn, sc);
                    case 9 -> viewRecommendations(conn, sc);
                    case 10 -> System.out.println("👋 Exiting SoilMate.");
                    default -> System.out.println("❌ Invalid choice.");
                }
            } while (choice != 10);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void addFarmer(Connection conn, Scanner sc) throws SQLException {
        System.out.print("Enter name: ");
        String name = sc.nextLine();
        System.out.print("Enter location: ");
        String location = sc.nextLine();
        System.out.print("Enter crops: ");
        String crops = sc.nextLine();
        System.out.print("Enter phone: ");
        String phone = sc.nextLine();
        System.out.print("Enter email: ");
        String email = sc.nextLine();

        String sql = "INSERT IGNORE INTO Farmer (name, location, crops, phone, email) VALUES (?, ?, ?, ?, ?)";
        PreparedStatement ps = conn.prepareStatement(sql);
        ps.setString(1, name);
        ps.setString(2, location);
        ps.setString(3, crops);
        ps.setString(4, phone);
        ps.setString(5, email);
        ps.executeUpdate();
        System.out.println("👨‍🌾 Farmer added!");
    }

    private static void viewFarmers(Connection conn) throws SQLException {
        String sql = "SELECT farmerID, name, location, crops FROM Farmer";
        Statement st = conn.createStatement();
        ResultSet rs = st.executeQuery(sql);
        while (rs.next()) {
            System.out.println("ID: " + rs.getInt("farmerID") +
                               ", Name: " + rs.getString("name") +
                               ", Location: " + rs.getString("location") +
                               ", Crops: " + rs.getString("crops"));
        }
    }

    private static void addDevice(Connection conn, Scanner sc) throws SQLException {
        System.out.print("Enter Farmer ID: ");
        int farmerID = sc.nextInt();
        System.out.print("Enter Battery %: ");
        double battery = sc.nextDouble();
        System.out.print("Enter Solar %: ");
        double solar = sc.nextDouble();

        String sql = "INSERT INTO Device (farmerID, batteryStatus, solarStatus) VALUES (?, ?, ?)";
        PreparedStatement ps = conn.prepareStatement(sql);
        ps.setInt(1, farmerID);
        ps.setDouble(2, battery);
        ps.setDouble(3, solar);
        ps.executeUpdate();
        System.out.println("🔋 Device added!");
    }

    private static void addSensor(Connection conn, Scanner sc) throws SQLException {
        System.out.print("Enter Device ID: ");
        int deviceID = sc.nextInt();
        sc.nextLine();
        System.out.print("Enter Sensor Type (Moisture/pH): ");
        String type = sc.nextLine();
        System.out.print("Enter Value: ");
        double value = sc.nextDouble();

        String sql = "INSERT INTO SoilSensor (deviceID, type, value) VALUES (?, ?, ?)";
        PreparedStatement ps = conn.prepareStatement(sql);
        ps.setInt(1, deviceID);
        ps.setString(2, type);
        ps.setDouble(3, value);
        ps.executeUpdate();
        System.out.println("🌱 Sensor data added!");
    }

    private static void viewAlerts(Connection conn) throws SQLException {
        String sql = "SELECT alertID, type, message, status FROM AlertSystem";
        Statement st = conn.createStatement();
        ResultSet rs = st.executeQuery(sql);
        while (rs.next()) {
            System.out.println("ID: " + rs.getInt("alertID") +
                               ", Type: " + rs.getString("type") +
                               ", Message: " + rs.getString("message") +
                               ", Status: " + rs.getString("status"));
        }
    }

    private static void markAlertRead(Connection conn, Scanner sc) throws SQLException {
        System.out.print("Enter Alert ID to mark as read: ");
        int alertID = sc.nextInt();
        String sql = "UPDATE AlertSystem SET status='read' WHERE alertID=?";
        PreparedStatement ps = conn.prepareStatement(sql);
        ps.setInt(1, alertID);
        int rows = ps.executeUpdate();
        if (rows > 0) System.out.println("✅ Alert marked as read!");
    }

    private static void generateReport(Connection conn) throws SQLException {
        String sql = "SELECT AVG(value) AS avgMoisture FROM SoilSensor WHERE type='Moisture'";
        Statement st = conn.createStatement();
        ResultSet rs = st.executeQuery(sql);
        if (rs.next()) {
            double avg = rs.getDouble("avgMoisture");
            System.out.println("📊 Average Moisture: " + avg + "%");
        }
    }

    // ===== NEW FEATURE: Recommendation Engine =====
    private static void generateRecommendations(Connection conn, Scanner sc) throws SQLException {
        System.out.print("Enter Farmer ID: ");
        int farmerID = sc.nextInt();

        String sql = "SELECT value FROM SoilSensor s JOIN Device d ON s.deviceID = d.deviceID " +
                     "WHERE d.farmerID=? AND s.type='Moisture' ORDER BY s.timestamp DESC LIMIT 1";
        PreparedStatement ps = conn.prepareStatement(sql);
        ps.setInt(1, farmerID);
        ResultSet rs = ps.executeQuery();

        if (rs.next()) {
            double moisture = rs.getDouble("value");
            String message;
            String type;

            if (moisture < 30) {
                type = "irrigation";
                message = "Moisture is too low (" + moisture + "%). Please irrigate crops.";
            } else if (moisture > 70) {
                type = "irrigation";
                message = "Moisture is high (" + moisture + "%). Reduce watering.";
            } else {
                type = "irrigation";
                message = "Moisture level is healthy (" + moisture + "%). No action needed.";
            }

            String insert = "INSERT INTO Recommendation (farmerID, type, message) VALUES (?, ?, ?)";
            PreparedStatement psInsert = conn.prepareStatement(insert);
            psInsert.setInt(1, farmerID);
            psInsert.setString(2, type);
            psInsert.setString(3, message);
            psInsert.executeUpdate();

            System.out.println("💡 Recommendation Generated: " + message);
        } else {
            System.out.println("❌ No sensor data found for this farmer.");
        }
    }

    private static void viewRecommendations(Connection conn, Scanner sc) throws SQLException {
        System.out.print("Enter Farmer ID: ");
        int farmerID = sc.nextInt();

        String sql = "SELECT recID, type, message, createdAt FROM Recommendation WHERE farmerID=?";
        PreparedStatement ps = conn.prepareStatement(sql);
        ps.setInt(1, farmerID);
        ResultSet rs = ps.executeQuery();

        while (rs.next()) {
            System.out.println("[" + rs.getInt("recID") + "] " +
                               rs.getString("type") + " - " +
                               rs.getString("message") +
                               " (" + rs.getTimestamp("createdAt") + ")");
        }
    }
}
