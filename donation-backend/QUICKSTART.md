# Quick Start Guide - DonateHub Backend

## Prerequisites

- Java 17+
- Maven 3.8+
- MySQL 8.0+ OR Docker

## Option 1: Using Docker (Recommended)

### Start MySQL Container
```bash
cd donation-backend
docker-compose up -d
```

This will start MySQL on port 3306 with:
- Database: `donatehub_db`
- User: `root`
- Password: `password`

### Verify MySQL is Running
```bash
docker-compose ps
```

## Option 2: Manual MySQL Setup

### Create Database
```sql
CREATE DATABASE donatehub_db;
CREATE USER 'root'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON donatehub_db.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

## Build and Run Application

### 1. Build
```bash
mvn clean install
```

### 2. Run
```bash
mvn spring-boot:run
```

The backend will start at: `http://localhost:8080/api`

### 3. Test Health Endpoint
```bash
curl http://localhost:8080/api/health
```

## Connecting Frontend

Update your React frontend to use the API:

```typescript
const API_URL = 'http://localhost:8080/api';

// Example: Register
const response = await fetch(`${API_URL}/auth/register`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'johndoe',
    email: 'john@example.com',
    password: 'securePass123',
    firstName: 'John',
    lastName: 'Doe'
  })
});
```

## API Testing

### Using cURL

#### Register User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testPass123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

#### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testPass123"
  }'
```

#### Create Food Donation (with token)
```bash
curl -X POST http://localhost:8080/api/donations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "type": "FOOD",
    "riceQuantity": 10,
    "vegetableQuantity": 5,
    "description": "Rice and vegetables"
  }'
```

### Using Postman

1. Import these endpoints into Postman
2. After login, use the token in subsequent requests
3. Set Authorization header: `Bearer {token}`

## Troubleshooting

### Error: "Connection refused"
- Ensure MySQL is running
- Check if Docker container is up: `docker-compose ps`
- Verify port 3306 is not in use

### Error: "Access denied for user"
- Check database credentials in `application.yml`
- Reset MySQL: `docker-compose down` then `docker-compose up -d`

### Error: "Port 8080 already in use"
- Kill existing process on port 8080
- OR change port in `application.yml`: `server.port: 8081`

## Stopping Services

### Stop Docker MySQL
```bash
docker-compose down
```

## File Structure

```
donation-backend/
├── pom.xml                   # Dependencies
├── docker-compose.yml        # MySQL Docker config
├── README.md                 # Full documentation
├── QUICKSTART.md            # This file
└── src/
    ├── main/
    │   ├── java/com/donatehub/api/
    │   │   ├── controller/            # REST endpoints
    │   │   ├── service/               # Business logic
    │   │   ├── repository/            # Database access
    │   │   ├── entity/                # JPA models
    │   │   ├── dto/                   # Request/Response models
    │   │   ├── security/              # JWT auth
    │   │   ├── config/                # Configuration
    │   │   └── exception/             # Error handling
    │   └── resources/
    │       └── application.yml        # App config
    └── test/                          # Unit tests
```

## Next Steps

1. ✅ Start MySQL (Docker or manual)
2. ✅ Build project: `mvn clean install`
3. ✅ Run backend: `mvn spring-boot:run`
4. ✅ Test endpoints using cURL or Postman
5. ✅ Connect frontend React app
6. ✅ Start frontend: `npm run dev` (port 5173)

## Production Deployment

Before deploying:

1. **Change JWT Secret** in `application.yml`
2. **Use Real Database** (not local MySQL)
3. **Set Environment Variables**:
   ```bash
   JWT_SECRET=<your-long-random-secret>
   DATABASE_URL=<production-db-url>
   DATABASE_USERNAME=<db-user>
   DATABASE_PASSWORD=<db-password>
   ```
4. **Build JAR**: `mvn clean package`
5. **Run JAR**: `java -jar target/donation-backend-1.0.0.jar`

## Need Help?

- Check `README.md` for detailed API documentation
- Review application logs for errors
- Ensure both frontend and backend are running
- Test connectivity: `curl http://localhost:8080/api/health`
