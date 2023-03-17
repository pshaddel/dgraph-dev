# Check if dist/bundle.js file exists and if not, create it
# first check if dist folder exists
if [ ! -d dist ]; then
  echo "Creating dist folder"
  # create dist folder
  mkdir dist
fi
if [ ! -f dist/bundle.js ]; then
  echo "Creating bundle.js file"
  # create empty js file
  touch dist/bundle.js
fi