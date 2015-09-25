install_react_tools:
	npm install --global --update react-tools

download_react:
	curl -s -L https://fb.me/react-0.13.3.js -o react.js

compile:
	jsx helloworld.js > helloworld_compile.js
