dotnet add package Microsoft.EntityFrameworkCore --version 8.0.0
dotnet add package Microsoft.EntityFrameworkCore.Relational --version 8.0.0
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools

<!-- Make Global -->
dotnet tool install --global dotnet-ef

<!-- Fix for linux dotnet ef -->
export PATH="$HOME/.dotnet/tools:$PATH"

<!-- Use SQL Server on Docker (Recommended) -->
Since you're on Linux, the best alternative is to run SQL Server in a Docker container:
    Pull the SQL Server Docker image:

docker pull mcr.microsoft.com/mssql/server:latest

Run the SQL Server container:

docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourStrong!Passw0rd" -p 1433:1433 --name sqlserver -d mcr.microsoft.com/mssql/server:latest

Update appsettings.json: Change your connection string to:

"ConnectionStrings": {
  "JudgeDbConnection": "Server=localhost,1433;Database=JudgeBackend;User Id=sa;Password=YourStrong!Passw0rd;TrustServerCertificate=True;"
}

Test connection:

dotnet ef database update