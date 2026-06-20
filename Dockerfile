# Node.js এবং Chromium ব্রাউজারসহ অফিশিয়াল রিমোশন ইমেজ ব্যবহার করা হচ্ছে
FROM ghcr.io/remotion-dev/template-blank:main

WORKDIR /app

# প্রজেক্ট ফাইল কপি এবং ইনস্টল করা
COPY package*.json ./
RUN npm install

COPY . .

# Render-এর জন্য পোর্ট এক্সপোজ করা
EXPOSE 3000

# রিমোশন স্টুডিও চালু করার কমান্ড
CMD ["npm", "run", "start"]

