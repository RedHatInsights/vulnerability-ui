from fedora
RUN dnf install -y npm
ADD . /frontend
WORKDIR "/frontend"
CMD "rm -rf node-modules package.json"
RUN npm install
RUN npm install node-sass
EXPOSE 8002
