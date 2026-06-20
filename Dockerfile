# অফিশিয়াল Node.js ইমেজ ব্যবহার
FROM node:18-bullseye-slim

# ভিডিও রেন্ডারিং ও ক্রোমিয়াম ব্রাউজারের জন্য প্রয়োজনীয় ডিপেন্ডেন্সি ইনস্টল
RUN apt-get update && apt-get install -y \
    chromium \
    ffmpeg \
    fonts-liberation \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# রিমোশনকে জানানো যে সিস্টেমে ইতিমধ্যে ক্রোম ইনস্টল আছে
ENV REMOTION_CHROMIUM_PATH=/usr/bin/chromium

WORKDIR /app

# প্রজেক্ট ফাইল কপি ও ইনস্টল
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# রিমোশন স্টুডিও রান করার কমান্ড
CMD ["npm", "run", "start"]
