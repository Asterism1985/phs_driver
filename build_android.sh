echo "Start build Debug Android..."
gulp
ionic platform remove android
ionic platform add android
ionic build android