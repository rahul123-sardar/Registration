FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

# HARDCODE FOR TESTING ONLY
ENV MONGODB_URI=mongodb+srv://rahulsardarr21_db_user:vZM6JNHDUrq1YJng@registration.aowbjnv.mongodb.net/registration

EXPOSE 5000
CMD ["node", "app.js"]