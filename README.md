# Live Streaming Server with RTMP and HLS

A Docker-based live streaming server using NGINX with RTMP module for streaming and HLS for playback. This setup allows you to stream using OBS and view the stream via web or mobile app.

## Prerequisites

- Docker and Docker Compose installed on your system
- OBS Studio (for streaming)
- ngrok (for public access)
- Node.js and npm (for mobile app development)
- Expo Go app (for mobile testing)

## Quick Start

### 1. Start the Streaming Server

1. Clone this repository (if not already cloned):

   ```bash
   git clone https://github.com/Nitin6404/streaming
   cd streaming
   ```

2. Start the Docker containers:

   ```bash
   docker-compose up -d
   ```

   This will start the NGINX server with RTMP support on:

   - RTMP: rtmp://localhost:1935/live
   - HLS: http://localhost:8080/hls

### 2. Set Up OBS Studio

1. Open OBS Studio
2. Go to Settings > Stream
3. Set the following:
   - Service: Custom...
   - Server: rtmp://localhost/live
   - Stream Key: steam
4. Click "Apply" then "OK"
5. Add your video/audio sources in OBS
6. Click "Start Streaming"

### 3. Set Up ngrok (for Public Access)

1. [Download and install ngrok](https://ngrok.com/download)
2. Sign up and get your auth token from [ngrok dashboard](https://dashboard.ngrok.com/get-started/your-authtoken)
3. Authenticate ngrok:
   ```bash
   ngrok authtoken <your-auth-token>
   ```
4. Forward HTTP traffic to port 8080:
   ```bash
   ngrok http 8080
   ```
5. Note the HTTPS URL provided by ngrok (it will look like `https://abc123.ngrok.io`)

## Viewing the Stream

### Option 1: Web Player

1. Open a web browser and go to:
   ```
   https://hlsjs.video-dev.org/demo/
   ```
2. In the URL field, enter:
   ```
   http://localhost:8080/hls/stream.m3u8  # For local testing
   # OR
   https://your-ngrok-url.ngrok.io/hls/stream.m3u8  # For public access
   ```
3. Click "Load" and then "Play"

### Option 2: Mobile App

1. Clone the LiveStreamApp repository:

   ```bash
   git clone https://github.com/Nitin6404/LiveStreamApp
   cd LiveStreamApp
   ```

2. Edit the stream URL in the app's component:

   - Open the project in your code editor
   - Find and replace the stream URL with your ngrok URL:
     ```
     https://your-ngrok-url.ngrok.io/hls/stream.m3u8
     ```

3. Install dependencies and start the app:

   ```bash
   npm install
   npx expo start
   ```

4. On your mobile device:
   - Install Expo Go from App Store or Google Play
   - Scan the QR code shown in the terminal with Expo Go
   - Wait for the app to load and click the play button

## Troubleshooting

- **Stream not playing?**

  - Ensure OBS is streaming (check the status in the bottom right)
  - Verify the stream key is exactly "steam"
  - Check Docker logs: `docker-compose logs -f`

- **Mobile app not connecting?**

  - Make sure you're using the ngrok HTTPS URL (not localhost)
  - Check that ngrok is running and forwarding to port 8080
  - Verify your phone is connected to the internet

- **High latency?**
  - In OBS, try lowering the output resolution and bitrate
  - In `nginx.conf`, you can adjust HLS segment settings (hls_fragment, hls_playlist_length)

## Stopping the Services

To stop all services:

```bash
docker-compose down
```

And stop ngrok by pressing `Ctrl+C` in its terminal.

## License

This project is open source and available under the [MIT License](LICENSE).
