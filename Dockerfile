# Use an official k6 image from LoadImpact
FROM loadimpact/k6:0.34.1

# Set the working directory inside the container
WORKDIR /app

# Copy the local directory contents into the container at /app
COPY . .

# Corrected CMD instruction using environment variables
CMD ["run", "--out", "influxdb=http://host.docker.internal:8086/azkabanmetric", "/app/scripts/main.js"]

# Alternative CMD instruction
# CMD ["run", "--out", "json=result.json", "/app/scripts/main.js"]
