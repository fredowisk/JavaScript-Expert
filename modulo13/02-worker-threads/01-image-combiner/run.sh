IMAGE_URL="https://i.imgur.com/MuUwwmT.png"
BACKGROUND_URL="https://wallpapercave.com/wp/wp3181495.jpg"

# curl "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"
npx autocannon --renderStatusCodes -c500 "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"