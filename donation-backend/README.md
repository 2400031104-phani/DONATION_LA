# DonateHub Backend API

Spring Boot backend for the DonateHub donation management platform.

## Requirements

- Java 17 (LTS) or higher
- Maven 3.8+
- MySQL 8.0+

## Project Structure

```
donation-backend/
├── src/
│   ├── main/
│   │   ├── java/com/donatehub/api/
│   │   │   ├── controller/        # REST Controllers
│   │   │   ├── service/           # Business Logic
│   │   │   ├── repository/        # Data Access Layer
│   │   │   ├── entity/            # JPA Entities
│   │   │   ├── dto/               # Data Transfer Objects
│   │   │   ├── security/          # JWT Security
│   │   │   ├── config/            # Configuration Classes
│   │   │   ├── exception/         # Custom Exceptions
│   │   │   └── DonationBackendApplication.java
│   │   └── resources/
│   │       └── application.yml    # Configuration
│   └── test/
└── pom.xml                        # Maven Dependencies
```

## Setup Instructions

### 1. Database Setup

Create MySQL database and user:

```sql
CREATE DATABASE donatehub_db;
CREATE USER 'root'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON donatehub_db.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Configuration

Update `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/donatehub_db
    username: root
    password: your-password
```

**IMPORTANT:** Change the JWT secret in production!

```yaml
jwt:
  secret: your-secret-key-change-this-in-production-to-a-very-long-random-string-at-least-256-bits
```

### 3. Build & Run

```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The API will be available at `http://localhost:8080/api`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/health` - Health check

### Donations
- `POST /api/donations` - Create donation
- `GET /api/donations/{id}` - Get donation by ID
- `GET /api/donations/user/{userId}` - Get user's donations
- `GET /api/donations` - Get all donations
- `GET /api/donations/status/{status}` - Get donations by status
- `GET /api/donations/type/{type}` - Get donations by type
- `PUT /api/donations/{id}/approve` - Approve donation (Admin only)
- `PUT /api/donations/{id}/reject` - Reject donation (Admin only)
- `PUT /api/donations/{id}/complete` - Complete donation (Admin only)
- `DELETE /api/donations/{id}` - Delete donation (Admin only)

## Request/Response Examples

### Register
```json
POST /api/auth/register
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Login
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Create Food Donation
```json
POST /api/donations
Authorization: Bearer <token>

{
  "type": "FOOD",
  "riceQuantity": 10,
  "vegetableQuantity": 5,
  "description": "Rice and vegetables for charity"
}
```

### Create Money Donation
```json
POST /api/donations
Authorization: Bearer <token>

{
  "type": "MONEY",
  "amount": 500.00,
  "description": "Monthly donation"
}
```

## Security

- JWT token-based authentication
- BCrypt password hashing
- Role-based access control (DONOR, ADMIN, ORGANIZATION)
- CORS enabled for frontend applications

## Default User Roles

- **DONOR**: Can create donations and view their own donations
- **ADMIN**: Can manage all donations and approve/reject submissions
- **ORGANIZATION**: Can view donations available for collection

## Environment Variables

Optional environment variables:

```bash
JWT_SECRET=your-production-secret-key
JWT_EXPIRATION=86400000
DATABASE_URL=jdbc:mysql://localhost:3306/donatehub_db
DATABASE_USERNAME=root
DATABASE_PASSWORD=password
```

## Testing

Run tests with:

```bash
mvn test
```

## Troubleshooting

### Connection Refused
- Ensure MySQL is running: `mysql --version`
- Check connection: `mysql -u root -p`

### Port Already in Use
- Change server port in `application.yml`:
```yaml
server:
  port: 8081
```

## API Documentation

For OpenAPI/Swagger documentation, add to `pom.xml`:

```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.0.2</version>
</dependency>
```

Then access at: `http://localhost:8080/api/swagger-ui.html`

## License

MIT
