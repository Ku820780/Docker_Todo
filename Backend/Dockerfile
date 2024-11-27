FROM node:20.11.1
WORKDIR /app
COPY ./package.json ./package.json
COPY . .
Run [-d node modules ] && rm -r node_module || true
RUN npm install 
EXPOSE 5500
CMD ["npm", "start"]