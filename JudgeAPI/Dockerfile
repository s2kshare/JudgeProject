FROM ubuntu:18.04
WORKDIR /app

# Prevent tzdata from asking for user input
ARG DEBIAN_FRONTEND=noninteractive

# Update system and install required dependencies
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    apt-transport-https \
    unzip \
    libc6 \
    libgcc1 \
    libgssapi-krb5-2 \
    libicu60 \
    libssl1.1 \
    libstdc++6 \
    tzdata \
    python3 \
    python3-pip \
    openjdk-11-jdk \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables for Java
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
ENV PATH="${JAVA_HOME}/bin:${PATH}"

# Install .NET SDK using Microsoft's installation script
RUN curl -sOL https://dot.net/v1/dotnet-install.sh \
    && chmod +x dotnet-install.sh \
    && ./dotnet-install.sh --install-dir /usr/share/dotnet --version 8.0.100 \
    && ln -s /usr/share/dotnet/dotnet /usr/bin/dotnet \
    && rm dotnet-install.sh

# Set environment variables for .NET
ENV DOTNET_ROOT=/usr/share/dotnet
ENV PATH="$PATH:/usr/share/dotnet"

# Verify Installations
RUN python3 --version && java -version && javac -version && dotnet --version

# Copy Project Requirements
COPY ./requirements.txt .
RUN pip3 install -r requirements.txt
COPY . .

# Expose Flask API Port
EXPOSE 5000

# Run Python App
CMD ["python3", "app.py"]
