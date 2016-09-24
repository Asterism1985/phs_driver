echo "Start build Debug iOS..."
gulp
ionic platform remove ios
ionic platform add ios
ionic build ios